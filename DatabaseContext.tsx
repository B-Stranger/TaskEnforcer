import React, { ReactNode, createContext, useContext } from 'react';
import * as SQLite from 'expo-sqlite';

interface DatabaseProviderProps {
  children: ReactNode;
}
const db = SQLite.openDatabase('TaskEnforcer.db');
const DatabaseContext = createContext<SQLite.WebSQLDatabase | null>(null);

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({
  children,
}) => {
  return (
    <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);
