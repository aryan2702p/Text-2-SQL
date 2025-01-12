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

import { useState, useEffect,useRef} from "react";
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
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}


export function QuerySection() {

  const { tableName, tableData, sampleQueries, setSqlQuery, setQueryResults,resetAllStates,setTableData,setTableName,setSampleQueries } = useQueryStore(
    
  );

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize the router

  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState("");


  const recognitionRef = useRef<any>(null);

  
  const startRecording = () => {
    setIsRecording(true);
    //
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    
    recognitionRef.current.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0];

      // Log the recognition results and update the transcript state
      //console.log(event.results);
      setTranscript(transcript);
      setQuery(transcript);
    };

  
    recognitionRef.current.start();
  };

  
  useEffect(() => {
    return () => {
      
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  
  const stopRecording = () => {
    if (recognitionRef.current) {
      
      recognitionRef.current.stop();
      setRecordingComplete(true);
    }
  };

  // Toggle recording state and manage recording actions
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  
  useEffect(() => {
   // console.log("tablename effect issue")
    if (!tableName) {
      router.push("/upload"); // Redirect to upload page
    }
  }, [tableName]); // Depend only on tableName, avoid excessive triggers 

  
  useEffect(() => {
    //console.log("sampleQueries effect issue")
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
          <div className="flex space-x-4">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="enter your query here...."
            className="min-h-[40px] max-h-[40px] bg-transparent border-none text-white font-mono placeholder:text-gray-400"
          />
          {isRecording ? (
            // Button for stopping recording
            <button
              onClick={handleToggleRecording}
              className="mt-4 m-auto flex items-center justify-center bg-red-400 hover:bg-red-500 rounded-full w-10 h-10 focus:outline-none"
            >
              <svg
                className="h-6 w-6 "
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>
          ) : (
            // Button for starting recording
            <button
              onClick={handleToggleRecording}
              className="mt-4 m-auto flex items-center justify-center bg-[#0A1929] hover:bg-[#153251] rounded-full w-10 h-10 focus:outline-none"
            >
              <svg
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
              >
                <path
                  fill="currentColor" // Change fill color to the desired color
                  d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
                />
              </svg>
            </button>
          )}
          </div>

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

          
            
           <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              className="bg-[#8BA7B4] hover:bg-[#7B97A4] text-black font-mono "
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

