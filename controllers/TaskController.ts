import * as SQLite from 'expo-sqlite';
import { INewTask, ITask } from '../models/task';

export const getTasksByDate = async (
  date: Date,
  db: SQLite.WebSQLDatabase
): Promise<ITask[]> => {
  return new Promise<ITask[]>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql('SELECT * FROM Tasks ', [], (_, resultSet) => {
          const tasks: ITask[] = resultSet.rows._array;
          resolve(tasks);
        });
      },
      (error) => {
        reject(error);
        return true;
      }
    );
  });
};

export const completeTaskById = async (
  id: number,
  db: SQLite.WebSQLDatabase
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'UPDATE Tasks SET status = 1 WHERE id = ?',
          [id],
          (_, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              resolve();
            } else {
              reject(new Error('Task not found'));
            }
          },
          (_, error) => {
            reject(error);
            return true;
          }
        );
      },
      (error) => {
        reject(error);
        return true;
      }
    );
  });
};

export const deleteTaskById = async (
  id: number,
  db: SQLite.WebSQLDatabase
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'DELETE FROM Tasks WHERE id = ?',
          [id],
          (_, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              resolve();
            } else {
              reject(new Error('Task not found'));
            }
          },
          (_, error) => {
            reject(error);
            return true;
          }
        );
      },
      (error) => {
        reject(error);
        return true;
      }
    );
  });
};

export const createNewTask = async (
  newTask: INewTask,
  db: SQLite.WebSQLDatabase
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
            CREATE TABLE IF NOT EXISTS Tasks (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT NOT NULL,
              description TEXT,
              status INTEGER NOT NULL,
              date TEXT NOT NULL
            )
            `,
        []
      );
      tx.executeSql(
        'INSERT INTO Tasks (title, description, status, date) VALUES (?, ?, ?, ?)',
        [newTask.title, newTask.description, 0, newTask.date.toISOString()],
        (_, resultSet) => {
          resolve(resultSet.insertId);
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

export const getCompletedTasksCount = async (
  db: SQLite.WebSQLDatabase
): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT * FROM Tasks WHERE status = 1',
          [],
          (_, resultSet) => {
            const count: number = resultSet.rows.length;
            resolve(count);
          },
          (_, error) => {
            reject(error);
            return true;
          }
        );
      },
      (error) => {
        reject(error);
        return true;
      }
    );
  });
};
