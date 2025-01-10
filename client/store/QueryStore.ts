import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QueryStore {
  tableName: string;
  attributes: string[];
  tableData: {
    cols: string[];
    row: (string | null)[][];
  };
  sampleQueries: string[];
  isFileUploaded: boolean;
  sqlQuery: string;
  queryResults: {
    rows: string[][];
    colsNames: string[];
  } | null;

  setTableName: (name: string) => void;
  setAttributes: (attrs: string[]) => void;
  setTableData: (data: { cols: string[]; row: (string | null)[][] }) => void;
  setSampleQueries: (queries: string[]) => void;
  setIsFileUploaded: (status: boolean) => void;
  setSqlQuery: (sqlQuery: string) => void;
  setQueryResults: (queryResults: { rows: string[][]; colsNames: string[] }) =>void;
  resetAllStates: () => void;
}

const customStorage = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useQueryStore = create<QueryStore>()(
  persist(
    (set) => ({
      tableName: "",
      attributes: [],
      tableData: { cols: [], row: [] },
      sampleQueries: [],
      isFileUploaded: false,
      sqlQuery: "",
      queryResults: null,

      setTableName: (name) => set({ tableName: name }),
      setAttributes: (attrs) => set({ attributes: attrs }),
      setTableData: (data) => set({ tableData: data }),
      setSampleQueries: (queries) => set({ sampleQueries: queries }),
      setIsFileUploaded: (status) => set({ isFileUploaded: status }),
      setSqlQuery: (sqlQuery) => set({ sqlQuery }),
      setQueryResults: (queryResults) => set({ queryResults }),
      resetAllStates: () =>
        set({
          tableName: "",
          attributes: [],
          tableData: { cols: [], row: [] },
          sampleQueries: [],
          isFileUploaded: false,
        }),
    }),
    {
      name: "query-store", // Key for localStorage
      storage: customStorage, // Use the customStorage here
    }
  )
);
