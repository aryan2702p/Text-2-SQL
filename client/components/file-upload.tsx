// "use client";

// import { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { SpinnerCircular } from "spinners-react";
// import { cn } from "@/lib/utils";
// import { uploadFile } from "@/app/api/api";
// import LShape from "./svg/Corner";
// import { useQueryContext } from "@/context/QueryContext";
// import toast from "react-hot-toast"; // Add this import

// export function FileUpload() {
//   const router = useRouter();
//   const [files, setFiles] = useState<File[]>([]);
//   const [loading, setLoading] = useState(false);

//   const {
//     attributes,
//     setAttributes,
//     tableName,
//     setTableName,
//     tableData,
//     setTableData,
//     sampleQueries,
//     setSampleQueries,
//     isFileUploaded,
//     setIsFileUploaded,
//     resetAllStates,
//   } = useQueryContext();
//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     setFiles(acceptedFiles);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
//         ".xlsx",
//       ],
//       "application/octet-stream": [".parquet"],
//       "application/json": [".json"],
//       "text/csv": [".csv"],
//     },
//   });

 

//   const handleUpload = async () => {
//     if (files.length === 0) {
//       toast.error("Please select a file first");
//       return;
//     }

//     const file = files[0];
//     setLoading(true);

//     try {
//       const response = await uploadFile(file);

//       if (response && response.data) {
//         const { data } = response;

//         // Update the states
//         resetAllStates();
//         setAttributes(data.attributes || []);
//         setTableName(data.tableName || "");
//         setTableData(data.descObj || { cols: [], row: [] });
//         setSampleQueries(data.naturalLanguageQueries || []);

//         // Set file uploaded to true to trigger navigation to query section
//         setIsFileUploaded(true);
//         toast.success("File uploaded successfully!");
//       }
//     } catch (error) {
//       console.error("File upload failed", error);
//       toast.error("File upload failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative w-full h-full">
//       {/* Full screen drop zone */}
//       <div className="absolute top-8 left-0">
//         <LShape
//           size={150}
//           angle={90}
//           color="#6dacda"
//           thickness={12}
//           length={70}
//         />
//       </div>
//       <div className="absolute top-0 right-8">
//         <LShape
//           size={150}
//           angle={180}
//           color="#6dacda"
//           thickness={12}
//           length={70}
//         />
//       </div>
//       <div className="absolute bottom-0 left-8">
//         <LShape
//           size={150}
//           angle={0}
//           color="#6dacda"
//           thickness={12}
//           length={70}
//         />
//       </div>
//       <div className="absolute bottom-8 right-0">
//         <LShape
//           size={150}
//           angle={270}
//           color="#6dacda"
//           thickness={12}
//           length={70}
//         />
//       </div>

//       <div {...getRootProps()} className="fixed inset-0 pointer-events-none">
//         <input {...getInputProps()} />
//         {isDragActive && (
//           <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
//             <div className="relative">
//               {/* Corner decorations */}
//               <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-[#8BA7B4] -translate-x-6 -translate-y-6" />
//               <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-[#8BA7B4] translate-x-6 -translate-y-6" />
//               <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-[#8BA7B4] -translate-x-6 translate-y-6" />
//               <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-[#8BA7B4] translate-x-6 translate-y-6" />

//               <div className="text-white font-mono text-4xl px-24 py-12">
//                 DROP YOUR FILE ANYWHERE
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Main content */}
//       <div
//         className={cn(
//           "text-center flex flex-col items-center justify-center h-full transition-opacity duration-200",
//           isDragActive && "opacity-50",
//         )}
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mx-auto items-center">
//           {/* Left side - Logo and text */}
//           <div className="text-center">
//             <img
//               src="/sql.png"
//               alt="SQL"
//               className="w-[15rem] h-auto mx-auto"
//             />
//             <h1 className="text-[#E3D5B8] text-5xl font-bold mb-4 mt-4 ml-1">
//               SQL made easy
//             </h1>
//             <p className="text-white text-xl font-mono ml-1">
//               Convert your text to SQL queries
//             </p>
//           </div>

//           {/* Right side - File upload */}
//           <div className="flex flex-col gap-4">
//             <Card
//               {...getRootProps()}
//               className="bg-[#0A1929] border-2 border-dashed border-[#8BA7B4] rounded-lg p-12 cursor-pointer hover:border-white transition-colors"
//             >
//               <input {...getInputProps()} />
//               <div className="text-center space-y-4">
//                 <Button className="bg-[#8BA7B4] hover:bg-[#7B97A4] text-black font-mono mb-4">
//                   Choose your file
//                 </Button>
//                 <p className="text-white font-mono">
//                   {isDragActive
//                     ? "Drop your files here..."
//                     : "Just drop your files anywhere, we'll handle the rest"}
//                 </p>
//                 {files.length > 0 && (
//                   <div className="mt-4">
//                     <p className="text-[#8BA7B4] font-mono">Selected files:</p>
//                     <ul className="text-white font-mono">
//                       {files.map((file) => (
//                         <li key={file.name}>{file.name}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </Card>

//             {files.length > 0 && (
//               <Button
//                 onClick={handleUpload}
//                 className="bg-[#8BA7B4] hover:bg-[#7B97A4] text-black font-mono w-full min-w-full py-6 text-lg"
//               >
//                 {loading ? <SpinnerCircular /> : "Upload and Continue"}
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useCallback, use } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SpinnerCircular } from "spinners-react";
import { cn } from "@/lib/utils";
import { uploadFile } from "@/app/api/api";
import { Select,SelectContent,SelectValue,SelectTrigger,SelectItem } from "./ui/select";

import { useQueryStore } from "@/store/QueryStore"; // Import the Zustand store
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getUserTables,getTableData } from "@/app/api/api";

export function FileUpload() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [tables, setTables] = useState<string[]>([]); // State for existing tables
  const [selectedTable, setSelectedTable] = useState<string>(""); // Selected table

  // Zustand store methods
  const {
    setAttributes,
    setTableName,
    setTableData,
    setSampleQueries,
    setIsFileUploaded,
    resetAllStates,
  } = useQueryStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/octet-stream": [".parquet"],
      "application/json": [".json"],
      "text/csv": [".csv"],
    },
  });

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select a file first");
      return;
    }

    const file = files[0];
    setLoading(true);

    try {
      const response = await uploadFile(file);

      if (response && response.data) {
        const { data } = response;

        // Update the Zustand store
        resetAllStates();
        setAttributes(data.attributes || []);
        setTableName(data.tableName || "");
        setTableData(data.descObj || { cols: [], row: [] });
        setSampleQueries(data.naturalLanguageQueries || []);

        // Set file uploaded to true to trigger navigation to query section
        setIsFileUploaded(true);
        toast.success("File uploaded successfully!");
        router.push("/query"); // Navigate to the query page
      }
    } catch (error) {
      console.error("File upload failed", error);
      toast.error("File upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchTables = async() => {
    if (!selectedTable) {
      toast.error("Please select a table first");
      return;
    }
   
    console.log("Selected table:", selectedTable);

    // Set the table name in the Zustand store
    setTableName(selectedTable);

    try {
      const response = await getTableData(selectedTable);

      if (response && response.data) {
        const { data } = response;

        // Update the Zustand store
        resetAllStates();
        setAttributes(data.attributes || []);
        setTableName(data.tableName || "");
        setTableData(data.descObj || { cols: [], row: [] });
        setSampleQueries(data.naturalLanguageQueries || []);

        // Set file uploaded to true to trigger navigation to query section
        setIsFileUploaded(true);
        toast.success("Table selected successfully!");
        router.push("/query"); // Navigate to the query page
      }
    } catch (error) {
      console.error("File upload failed", error);
      toast.error("File upload failed. Please try again.");
    } finally {
      setLoading(false);
    }

    // Navigate to the query page
    router.push("/query");
  };

  useEffect(() => {
    const loadTables = async () => {
      try {
        const response = await getUserTables();
        setTables(response.data.tables || []);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };
    loadTables();
  }, []);


  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto space-y-8">

    {/* <div className="relative w-full h-full"> */}
       <Card className="bg-[#0A1929] border-none p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Select value={selectedTable} onValueChange={setSelectedTable}>
              <SelectTrigger className="w-full sm:w-[200px] bg-[#051421] border-[#8BA7B4]/20 text-white font-mono">
                <SelectValue placeholder="Select a table" />
              </SelectTrigger>
              <SelectContent className="bg-[#0A1929] border-[#8BA7B4]/20">
                {tables.length > 0 ? (
                  tables.map((table) => (
                    <SelectItem key={table} value={table} className="text-white font-mono">
                      {table}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="empty" disabled className="text-[#8BA7B4] font-mono">
                    No tables found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <Button
              onClick={handleFetchTables}
              className="bg-[#8BA7B4] hover:bg-[#7B97A4] text-black font-mono w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? (
                <>
                  <SpinnerCircular className="mr-2 h-4 w-4 animate-spin" />
                  Fetching...
                </>
              ) : (
                'Fetch Table Data'
              )}
            </Button>
          </div>
        </Card>
      {/* Full screen drop zone */}
      {/* <div className="absolute top-8 left-0">
        <LShape
          size={150}
          angle={90}
          color="#6dacda"
          thickness={12}
          length={70}
        />
      </div>
      <div className="absolute top-0 right-8">
        <LShape
          size={150}
          angle={180}
          color="#6dacda"
          thickness={12}
          length={70}
        />
      </div>
      <div className="absolute bottom-0 left-8">
        <LShape
          size={150}
          angle={0}
          color="#6dacda"
          thickness={12}
          length={70}
        />
      </div>
      <div className="absolute bottom-8 right-0">
        <LShape
          size={150}
          angle={270}
          color="#6dacda"
          thickness={12}
          length={70}
        />
      </div> */}

      <div {...getRootProps()} className="fixed inset-0 pointer-events-none">
        <input {...getInputProps()} />
        {isDragActive && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div className="relative">
              <div className="text-white font-mono text-4xl px-24 py-12">
                DROP YOUR FILE ANYWHERE
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className={cn(
          "text-center flex flex-col items-center justify-center h-full transition-opacity duration-200",
          isDragActive && "opacity-50",
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mx-auto items-center">
          <div className="text-center">
            <img
              src="/sql.png"
              alt="SQL"
              className="w-[15rem] h-auto mx-auto"
            />
            <h1 className="text-[#E3D5B8] text-5xl font-bold mb-4 mt-4 ml-1">
              SQL made easy
            </h1>
            <p className="text-white text-xl font-mono ml-1">
              Convert your text to SQL queries
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Card
              {...getRootProps()}
              className="bg-[#0A1929] border-2 border-dashed border-[#8BA7B4] rounded-lg p-12 cursor-pointer hover:border-white transition-colors"
            >
              <input {...getInputProps()} />
              <div className="text-center space-y-4">
                <Button className="bg-[#8BA7B4] hover:bg-[#7B97A4] text-black font-mono mb-4">
                  Choose your file
                </Button>
                <p className="text-white font-mono">
                  {isDragActive
                    ? "Drop your files here..."
                    : "Just drop your files anywhere, we'll handle the rest"}
                </p>
                {files.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[#8BA7B4] font-mono">Selected files:</p>
                    <ul className="text-white font-mono">
                      {files.map((file) => (
                        <li key={file.name}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>

            {files.length > 0 && (
              <Button
                onClick={handleUpload}
                className="bg-[#8BA7B4] hover:bg-[#7B97A4] text-black font-mono w-full min-w-full py-6 text-lg"
              >
                {loading ? <SpinnerCircular /> : "Upload and Continue"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
    // </div>
  );
}
