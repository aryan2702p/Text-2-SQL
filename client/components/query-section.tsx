// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Card } from "@/components/ui/card";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { executeQuery } from "@/app/api/api";

// import { SpinnerCircular } from "spinners-react";
// import toast, { Toaster } from "react-hot-toast";
// import { useQueryContext } from "@/context/QueryContext";



// export function QuerySection() {
//   const { tableName, tableData, setSqlQuery, setQueryResults, sampleQueries } =
//     useQueryContext();
//   const [query, setQuery] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     return () => {
//       setQuery("");
//     };
//   }, [sampleQueries]);

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       const response = await executeQuery(query, tableName);

//       if (response) {
//         const { data } = response;

//         const { rows, colsNames, sqlQuery } = data;

//         setSqlQuery(sqlQuery);

//         if (rows && colsNames) {
//           setQueryResults({ rows, colsNames });
//         }
//       }
//       setLoading(false);
//     } catch (e) {
//       setLoading(false);
//       if (e instanceof Error) {
//         toast(
//           "Error: " + "The SQL Query can't be processed.. Please try again.",
//           { icon: "❌", style: { color: "white", backgroundColor: "black" } },
//         );
//       } else {
//         toast("An unknown error occurred", { icon: "❌" });
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       <Card className="bg-[#0A1929] border-none max-h-[40%]">
//         <div className="p-4 space-y-4">
//           <Textarea
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="enter your query here...."
//             className="min-h-[40px] max-h-[40px] bg-transparent border-none text-white font-mono placeholder:text-gray-400"
//           />

//           {/* Sample Queries Scroll Area */}
//           <ScrollArea className="w-full whitespace-nowrap rounded-md">
//             <div className="flex flex-wrap p-1">
//               {sampleQueries.map((sampleQuery, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setQuery(sampleQuery)}
//                   className="inline-flex mr-1 mb-[2px] px-3 py-1 bg-[#051421] text-[#8BA7B4] rounded-lg hover:bg-[#0C2137] font-mono text-sm transition-colors"
//                 >
//                   {sampleQuery}
//                 </button>
//               ))}
//             </div>
//             <ScrollBar orientation="horizontal" />
//           </ScrollArea>

//           <div className="flex justify-end">
//             <Button
//               onClick={handleSubmit}
//               className="bg-[#8BA7B4] hover:bg-[#7B97A4] text-black font-mono"
//             >
//               {loading ? <SpinnerCircular /> : "Submit"}
//             </Button>
//           </div>
//         </div>
//       </Card>

//       <Card className=" bg-[#0A1929] border-none p-4 max-h-[40vh]   ">
//         <Table>
//           <ScrollArea className="h-[15rem] mt-2">
//             <TableHeader className="bg-[#051421] sticky top-0">
//               <TableRow className="w-full">
//                 {tableData?.cols &&
//                   tableData.cols.map((col, i) => (
//                     <TableHead key={i} className="text-[#8BA7B4] font-mono">
//                       {col}
//                     </TableHead>
//                   ))}
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {tableData?.row &&
//                 tableData?.row.map((row, i) => (
//                   <TableRow key={i} className="border-b border-[#8BA7B4]/20">
//                     {row.map((cell, j) => (
//                       <TableCell key={j} className="text-[#dfe2e3] font-mono">
//                         {cell ? cell : "NULL"}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </ScrollArea>
//         </Table>
//       </Card>
//       <Toaster />
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import the router from next
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { executeQuery, getTableData} from "@/app/api/api";

import { SpinnerCircular } from "spinners-react";
import toast, { Toaster } from "react-hot-toast";
import { useQueryStore } from "@/store/QueryStore"; // Importing Zustand store


export function QuerySection() {

  const { tableName, tableData, sampleQueries, setSqlQuery, setQueryResults,resetAllStates,setTableData,setTableName,setSampleQueries } = useQueryStore(
    // (state) => ({
    //   tableName: state.tableName,
    //   tableData: state.tableData,
    //   setSqlQuery: state.setSqlQuery,
    //   setQueryResults: state.setQueryResults,
    //   sampleQueries: state.sampleQueries,
    // })
  );

  

  const handleSelectTable =  async(tableName: string) => {

    try{

      const response = await getTableData(tableName);

      if(response && response.data){
        const data = response.data;
        resetAllStates();
        setTableName(data.tableName || "");
        setTableData(data.descObj || { cols: [], row: [] });
        setSampleQueries(data.naturalLanguageQueries || []);
      }

    }catch(error){
      console.error(error);
      throw error;
    }

  }

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize the router

  // Effect to handle redirection when tableName is empty
  useEffect(() => {
    console.log("tablename effect issue")
    if (!tableName) {
      router.push("/upload"); // Redirect to upload page
    }
  }, [tableName]); // Depend only on tableName, avoid excessive triggers 

  // Effect to reset query when sampleQueries change
  useEffect(() => {
    console.log("sampleQueries effect issue")
    if (sampleQueries.length > 0) {
      setQuery(""); // Reset query only if sampleQueries is not empty
    }
  }, [sampleQueries]); // Ensure only triggers when sampleQueries changes

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await executeQuery(query, tableName);

      if (response) {
        const { data } = response;

        const { rows, colsNames, sqlQuery } = data;

        setSqlQuery(sqlQuery);

        if (rows && colsNames) {
          setQueryResults({ rows, colsNames });
        }
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      if (e instanceof Error) {
        toast(
          "Error: " + "The SQL Query can't be processed.. Please try again.",
          { icon: "❌", style: { color: "white", backgroundColor: "black" } },
        );
      } else {
        toast("An unknown error occurred", { icon: "❌" });
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Card className="bg-[#0A1929] border-none max-h-[40%]">
        <div className="p-4 space-y-4">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="enter your query here...."
            className="min-h-[40px] max-h-[40px] bg-transparent border-none text-white font-mono placeholder:text-gray-400"
          />

          {/* Sample Queries Scroll Area */}
          <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex flex-wrap p-1">
              {sampleQueries.map((sampleQuery, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(sampleQuery)}
                  className="inline-flex mr-1 mb-[2px] px-3 py-1 bg-[#051421] text-[#8BA7B4] rounded-lg hover:bg-[#0C2137] font-mono text-sm transition-colors"
                >
                  {sampleQuery}
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <div className="flex justify-between">
            
            <select
            
              onChange={(e) => setQuery(e.target.value)}
              className="ml-2 bg-[#051421] text-[#8BA7B4] rounded-lg font-mono text-sm w-[30%]"
            >
              <option value="" disabled selected>
                Select a query
              </option>
              {sampleQueries.map((sampleQuery, index) => (
                <option key={index} value={sampleQuery}
                onClick={() => handleSelectTable(sampleQuery)}>
                  {sampleQuery}
                </option>
              ))}
            </select>
            <Button
              onClick={handleSubmit}
              className="bg-[#8BA7B4] hover:bg-[#7B97A4] text-black font-mono"
            >
              {loading ? <SpinnerCircular /> : "Submit"}
            </Button>
          </div>
        </div>
      </Card>

      <Card className="bg-[#0A1929] border-none p-4 max-h-[40vh]">
        <Table>
          <ScrollArea className="h-[15rem] mt-2">
            <TableHeader className="bg-[#051421] sticky top-0">
              <TableRow className="w-full">
                {tableData?.cols &&
                  tableData.cols.map((col, i) => (
                    <TableHead key={i} className="text-[#8BA7B4] font-mono">
                      {col}
                    </TableHead>
                  ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData?.row &&
                tableData?.row.map((row, i) => (
                  <TableRow key={i} className="border-b border-[#8BA7B4]/20">
                    {row.map((cell, j) => (
                      <TableCell key={j} className="text-[#dfe2e3] font-mono">
                        {cell ? cell : "NULL"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </ScrollArea>
        </Table>
      </Card>
      <Toaster />
    </div>
  );
}

