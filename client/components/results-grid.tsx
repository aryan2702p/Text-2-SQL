'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { useState } from "react";
import { CrossIcon, DownloadIcon } from "lucide-react";

export function ResultsGrid({ sqlQuery, queryResults }: { sqlQuery: string, queryResults: { rows: any[][], colsNames: string[] } | undefined }) {
  const [showFullTable, setShowFullTable] = useState(false);
  const { rows, colsNames } = queryResults || { rows: [], colsNames: [] };

  console.log('rows', rows);
  console.log('colsNames', colsNames);

  return (
    <div className="p-0 h-[100%] max-h-full overflow-hidden pb-2 rounded-lg">
      {/* SQL Query Display */}
      <Card className="bg-[#0A1929] border-none p-4 max-h-[20vh]">
        <h3 className="text-white font-mono mb-2">Generated SQL:</h3>
        <pre className="bg-[#051421] p-3 rounded text-[#8BA7B4] font-mono text-sm overflow-y-scroll max-h-[14vh] h-[14vh]">
          {sqlQuery || 'Your SQL query will appear here'}
        </pre>
      </Card>

      {/* Results Table */}
      {showFullTable && (
        <div className="absolute z-[999] top-0 left-0 w-full h-[100vh] bg-[#051525]/50 rounded-lg flex justify-center items-center">
          <CrossIcon className="text-white rotate-45 w-8 h-8 hover:cursor-pointer absolute top-5 right-5" onClick={() => setShowFullTable(!showFullTable)} />
          <div className="max-h-[90vh] w-[90%] rounded-md bg-[#0A1929] opacity-100 p-2">
            <Table>
              <ScrollArea className="h-[80vh] rounded- bg-[#051421] top-0">
                <TableHeader className="bg-[#051421] sticky top-0 border-b-[1px]">
                  <TableRow>
                    {colsNames.map((col, i) => (
                      <TableHead key={i} className="text-[#8BA7B4] font-mono">{col}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow key={i}>
                      {row?.map((cell, j) => {
                      if(typeof cell === 'object') {
                        cell = JSON.stringify(cell);
                      }
                      return <TableCell key={j} className="text-[#e4e6e7] font-mono">{cell}</TableCell>
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
          <h2 className="text-[#8BA7B4] hidden hover:text-white font-mono px-4 rounded-lg hover:cursor-pointer w-full sm:flex justify-end lg:flex"
          onClick={() => setShowFullTable(!showFullTable)}
        >
          View Full Table {">>"}
        </h2>
        )}
        <div className="w-full">
          <Table>
            <ScrollArea className="h-[55vh] w-full rounded-md mt-2 pb-2">
              <TableHeader className="bg-[#051421] sticky top-0">
                <TableRow>
                  {colsNames.map((col, i) => (
                    <TableHead key={i} className="text-[#8BA7B4] font-mono">{col}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i}>
                    {row?.map((cell, j) => {
                      if(typeof cell === 'object') {
                        cell = JSON.stringify(cell);
                      }
                      return <TableCell key={j} className="text-[#eceeef] font-mono">{cell}</TableCell>
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </ScrollArea>
          </Table>
        </div>
      </div>
    </div>
  )
}

