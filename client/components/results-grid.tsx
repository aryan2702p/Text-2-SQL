"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { CrossIcon, DownloadIcon } from "lucide-react";

import { useQueryStore } from "@/store/QueryStore";

export function ResultsGrid() {
  const [showFullTable, setShowFullTable] = useState(false);
  const { sqlQuery, queryResults } = useQueryStore();


  const { rows, colsNames } = queryResults || { rows: [], colsNames: [] };

  const downloadCSV = () => {
    if (!rows.length || !colsNames.length) return;

    // Create CSV content
    const csvContent = [
      colsNames.join(","), // Header row
      ...rows.map((row) =>
        row
          .map((cell) =>
            typeof cell === "object"
              ? `"${JSON.stringify(cell).replace(/"/g, '""')}"`
              : `"${cell}"`,
          )
          .join(","),
      ),
    ].join("\n");

   
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "query_results.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // console.log("rows", rows);
  // console.log("colsNames", colsNames);

  return (
    <div className="p-0 h-[100%] max-h-full overflow-hidden pb-2 rounded-lg">
      {/* SQL Query Display */}
      <Card className="bg-[#0A1929] border-none p-4 max-h-[20vh]">
        <h3 className="text-white font-mono mb-2">Generated SQL:</h3>
        <pre className="bg-[#051421] p-3 rounded text-[#8BA7B4] font-mono text-sm overflow-y-scroll max-h-[14vh] h-[14vh]">
          {sqlQuery || "Your SQL query will appear here"}
        </pre>
      </Card>

      {/* Results Table */}
      {showFullTable && (
        <div className="absolute z-[999] top-0 left-0 w-full h-[100vh] bg-[#051525]/100 rounded-lg flex justify-center items-center">
          <CrossIcon
            className="text-white rotate-45 w-8 h-8 hover:cursor-pointer absolute top-5 right-5"
            onClick={() => setShowFullTable(!showFullTable)}
          />
          <div className="max-h-[90vh] w-[90%] rounded-md bg-[#0A1929] opacity-100 p-2">
            <Table>
              <ScrollArea className="h-[80vh] rounded- bg-[#051421] top-0">
                <TableHeader className="bg-[#051421] sticky top-0 border-b-[1px]">
                  <TableRow>
                    {colsNames.map((col, i) => (
                      <TableHead key={i} className="text-[#8BA7B4] font-mono">
                        {col}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow key={i}>
                      {row?.map((cell, j) => {
                        if (typeof cell === "object") {
                          cell = JSON.stringify(cell);
                        }
                        return (
                          <TableCell
                            key={j}
                            className="text-[#e4e6e7] font-mono"
                          >
                            {cell}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </ScrollArea>
            </Table>
          </div>
        </div>
      )}

      <div className="bg-[#0A1929] rounded-lg p-4 w-full h-full mb-2">
        {queryResults && (
          <div className="hidden sm:flex lg:flex justify-end gap-4 items-center">
            <h2
              className="text-[#8BA7B4] hover:text-white font-mono px-4 rounded-lg hover:cursor-pointer"
              onClick={() => setShowFullTable(!showFullTable)}
            >
              View Full Table {">>"}
            </h2>
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 text-[#8BA7B4] hover:text-white font-mono px-4 rounded-lg hover:cursor-pointer"
            >
              <DownloadIcon className="w-4 h-4" />
              Download CSV
            </button>
          </div>
        )}
        <div className="w-full">
          <Table>
            <ScrollArea className="h-[55vh] w-full rounded-md mt-2 pb-2">
              <TableHeader className="bg-[#051421] sticky top-0">
                <TableRow>
                  {colsNames.map((col, i) => (
                    <TableHead key={i} className="text-[#8BA7B4] font-mono">
                      {col}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i}>
                    {row?.map((cell, j) => {
                      if (typeof cell === "object") {
                        cell = JSON.stringify(cell);
                      }
                      return (
                        <TableCell key={j} className="text-[#eceeef] font-mono">
                          {cell}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </ScrollArea>
          </Table>
        </div>
      </div>
    </div>
  );
}
