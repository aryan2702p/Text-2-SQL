"use client";
import React, { createContext, useContext, useState } from "react";

interface QueryContextProps {
  attributes: string[];
  setAttributes: (attributes: string[]) => void;
  tableName: string;
  setTableName: (tableName: string) => void;
  tableData: { cols: string[]; row: string[][] } | undefined;
  setTableData: (
    tableData: { cols: string[]; row: string[][] } | undefined,
  ) => void;
  sampleQueries: string[];
  setSampleQueries: (sampleQueries: string[]) => void;
  sqlQuery: string;
  setSqlQuery: (sqlQuery: string) => void;
  queryResults: { rows: any[][]; colsNames: string[] } | undefined;
  setQueryResults: (
    queryResults: { rows: any[][]; colsNames: string[] } | undefined,
  ) => void;
  isFileUploaded: boolean;
  setIsFileUploaded: (value: boolean) => void;
  resetAllStates: () => void; // Add this line
}


interface QueryProviderProps {
  children: React.ReactNode;
}

const QueryContext = createContext<QueryContextProps | undefined>(undefined);


export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  const [attributes, setAttributes] = useState<string[]>([]);
  const [tableName, setTableName] = useState<string>("");
  const [tableData, setTableData] = useState<
    { cols: string[]; row: string[][] } | undefined
  >(undefined);
  const [sampleQueries, setSampleQueries] = useState<string[]>([]);
  const [sqlQuery, setSqlQuery] = useState<string>("");
  const [queryResults, setQueryResults] = useState<
    { rows: any[][]; colsNames: string[] } | undefined
  >(undefined);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const resetAllStates = () => {
    setAttributes([]);
    setTableName("");
    setTableData(undefined);
    setSampleQueries([]);
    setSqlQuery("");
    setQueryResults(undefined);
    setIsFileUploaded(false);
  };

  return (
    <QueryContext.Provider
      value={{
        attributes,
        setAttributes,
        tableName,
        setTableName,
        tableData,
        setTableData,
        sampleQueries,
        setSampleQueries,
        sqlQuery,
        setSqlQuery,
        queryResults,
        setQueryResults,
        isFileUploaded,
        setIsFileUploaded,
        resetAllStates,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export const useQueryContext = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error("useQueryContext must be used within a QueryProvider");
  }
  return context;
};
