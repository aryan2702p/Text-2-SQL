'use client'

import { FileUpload } from '@/components/file-upload'
import { NavBar } from '@/components/nav-bar'
import { QuerySection } from '@/components/query-section'
import { ResultsGrid } from '@/components/results-grid'
import { useState } from 'react'
// import { set } from 'react-hook-form'

export default function QueryPage() {
  const [attributes, setAttributes] = useState<string[]>([])
  const [sampleQueries, setSampleQueries] = useState<string[]>([])
  const [tableName, setTableName] = useState<string>('')
  const [tableData, setTableData] = useState<{cols: string[], row: string[][]}>()

  const [sqlQuery, setSqlQuery] = useState<string>('')
  const [queryResults, setQueryResults] = useState<{rows: any[][], colsNames: string[]}>()

  const handleClick = () => {
    setTableName('')
    setTableData({cols: [], row: []})
    setSqlQuery('')
    setQueryResults({rows: [], colsNames: []})
    setAttributes([])
    setSampleQueries([])
  }
  // bg-[#051421]
  return (
    <div className="min-h-screen bg-[#051421] h-[75%] mb-[50px]">
      {!tableName && (
      <div className="absolute top-0 left-0 w-full h-full z-[999] bg-[#051421] bg-opacity-100">
        <FileUpload
        attributes={attributes}
        setAttributes={setAttributes}
        tableName={tableName}
        setTableName={setTableName}
        tableData={tableData}
        setTableData={setTableData}
        sampleQueries={sampleQueries}
        setSampleQueries={setSampleQueries}
      />
      </div>
      )}
      <NavBar handleClick={handleClick} />
      <main className="container mx-auto p-6 pb-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <QuerySection
              tableName={tableName}
              tableData={tableData}
              sqlQuery={sqlQuery}
              setSqlQuery={setSqlQuery}
              queryResults={queryResults}
              setQueryResults={setQueryResults}
              sampleQueries={sampleQueries}
              setSampleQueries={setSampleQueries}
            />
          </div>
          <div>
            <ResultsGrid 
              sqlQuery={sqlQuery}
              queryResults={queryResults}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

