import * as SQLite from 'expo-sqlite';
import { INewRoutine, IRoutine } from '../models/routine';

export const getAllRoutines = async (db: SQLite.WebSQLDatabase) => {
  return new Promise<IRoutine[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Routines (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT,
          status INTEGER
        )`
      );
      tx.executeSql(
        `SELECT * FROM Routines`,
        [],
        (txObj, resultSet) => {
          const routines: IRoutine[] = resultSet.rows._array;
          resolve(routines);
        },
        (txObj, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const createNewRoutine = async (
  newRoutine: INewRoutine,
  db: SQLite.WebSQLDatabase
) => {
  return new Promise<number>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          CREATE TABLE IF NOT EXISTS Routines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status INTEGER
          )
          `,
        [],
        () => {
          tx.executeSql(
            `
              INSERT INTO Routines (title, description, status)
              VALUES (?, ?, ?)
              `,
            [newRoutine.title, newRoutine.description],
            (txObj, resultSet) => {
              const insertedId = resultSet.insertId;
              if (insertedId) {
                resolve(insertedId);
              }
            },
            (txObj, error) => {
              reject(error);
              return false;
            }
          );
        },
        (txObj, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const deleteRoutineById = async (
  id: number,
  db: SQLite.WebSQLDatabase
) => {
  return new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          DELETE FROM Routines
          WHERE id = ?
          `,
        [id],
        () => {
          resolve();
        },
        (txObj, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const completeRoutineById = async (
  id: number,
  db: SQLite.WebSQLDatabase
) => {
  return new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          UPDATE Routines
          SET completed = 1
          WHERE id = ?
          `,
        [id],
        () => {
          resolve();
        },
        (txObj, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};
