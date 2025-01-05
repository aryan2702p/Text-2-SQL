"use client";

import { FileUpload } from "@/components/file-upload";
import { NavBar } from "@/components/nav-bar";
import { QuerySection } from "@/components/query-section";
import { ResultsGrid } from "@/components/results-grid";
import { useQueryContext } from "@/context/QueryContext";
import { useState } from "react";
// import { set } from 'react-hook-form'

export default function QueryPage() {
  // const [attributes, setAttributes] = useState<string[]>([]);
  // const [sampleQueries, setSampleQueries] = useState<string[]>([]);
  // const [tableName, setTableName] = useState<string>("");
  // const [tableData, setTableData] = useState<{
  //   cols: string[];
  //   row: string[][];
  // }>();

  const {
    attributes,
    tableName,
    tableData,
    sampleQueries,
    sqlQuery,
    setSqlQuery,
    queryResults,
    setQueryResults,
  } = useQueryContext();

  // const [sqlQuery, setSqlQuery] = useState<string>("");
  // const [queryResults, setQueryResults] = useState<{
  //   rows: any[][];
  //   colsNames: string[];
  // }>();

  // const handleClick = () => {
  //   setTableName("");
  //   setTableData({ cols: [], row: [] });
  //   setSqlQuery("");
  //   setQueryResults({ rows: [], colsNames: [] });
  //   setAttributes([]);
  //   setSampleQueries([]);
  // };
  // bg-[#051421]
  return (
    <main className="container mx-auto p-4">
      <FileUpload />
      <QuerySection />
    </main>
  );
}
