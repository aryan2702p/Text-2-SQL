'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SpinnerCircular } from 'spinners-react'
import { cn } from '@/lib/utils'
import { uploadFile } from '@/app/api/api'
import LShape from './svg/Corner'

interface FileUploadProps {
  attributes: string[]
  setAttributes: (attributes: string[]) => void
  tableName: string
  setTableName: (tableName: string) => void
  tableData: {cols: string[], row: string[][]} | undefined
  setTableData: (tableData: {cols: string[], row: string[][]}) => void
  sampleQueries: string[]
  setSampleQueries: (sampleQueries: string[]) => void
}

export function FileUpload({
  attributes,
  setAttributes,
  tableName,
  setTableName,
  tableData,
  setTableData,
  sampleQueries,
  setSampleQueries,
}: FileUploadProps) {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/octet-stream': ['.parquet'],
      'application/json': ['.json'],
      'text/csv': ['.csv']
    },
  })

  const handleUpload = async () => {
    if (files.length === 0) return

    const file = files[0];

    setLoading(true);

    const response = await uploadFile(file);

    if (response) {
      const { data } = response;

      if (data.attributes) {
        setAttributes(data.attributes);
      }

      if (data.tableName) {
        setTableName(data.tableName);
      }

      if (data.descObj) {
        setTableData(data.descObj);
      }
      if(data.naturalLanguageQueries) {
        setSampleQueries(data.naturalLanguageQueries);
      }
    }

    setLoading(false);

    router.push(`/query?tableName=${encodeURIComponent(tableName)}&attributes=${encodeURIComponent(JSON.stringify(attributes))}&tableData=${encodeURIComponent(JSON.stringify(tableData))}&sampleQueries=${encodeURIComponent(JSON.stringify(sampleQueries))}`);
  }

  return (
    <div className='relative w-full h-full'>
      {/* Full screen drop zone */}
        <div className="absolute top-8 left-0">
          <LShape size={150} angle={90} color="#6dacda" thickness={12} length={70} />
        </div>
        <div className="absolute top-0 right-8">
          <LShape size={150} angle={180} color="#6dacda" thickness={12} length={70} />
        </div>
        <div className="absolute bottom-0 left-8">
          <LShape size={150} angle={0} color="#6dacda" thickness={12} length={70} />
        </div>
        <div className="absolute bottom-8 right-0">
          <LShape size={150} angle={270} color="#6dacda" thickness={12} length={70} />
        </div>

      <div
        {...getRootProps()}
        className="fixed inset-0 pointer-events-none"
      >
        <input {...getInputProps()} />
        {isDragActive && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div className="relative">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-[#8BA7B4] -translate-x-6 -translate-y-6" />
              <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-[#8BA7B4] translate-x-6 -translate-y-6" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-[#8BA7B4] -translate-x-6 translate-y-6" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-[#8BA7B4] translate-x-6 translate-y-6" />
              
              <div className="text-white font-mono text-4xl px-24 py-12">
                DROP YOUR FILE ANYWHERE
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className={cn(
        "text-center flex flex-col items-center justify-center h-full transition-opacity duration-200",
        isDragActive && "opacity-50"
      )}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mx-auto items-center">
          {/* Left side - Logo and text */}
          <div className="text-center">
          <img src='/sql.png' alt="SQL" className="w-[15rem] h-auto mx-auto" />
            <h1 className="text-[#E3D5B8] text-5xl font-bold mb-4 mt-4 ml-1">
              SQL made easy
            </h1>
            <p className="text-white text-xl font-mono ml-1">
              Convert your text to SQL queries
            </p>
          </div>

          {/* Right side - File upload */}
          <div className="flex flex-col gap-4">
            <Card
              {...getRootProps()}
              className="bg-[#0A1929] border-2 border-dashed border-[#8BA7B4] rounded-lg p-12 cursor-pointer hover:border-white transition-colors"
            >
              <input {...getInputProps()} />
              <div className="text-center space-y-4">
                <Button 
                  className="bg-[#8BA7B4] hover:bg-[#7B97A4] text-black font-mono mb-4"
                >
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
                {loading ? <SpinnerCircular /> : 'Upload and Continue'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

