'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Search, Eye, Edit, Trash } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { getAllTables } from '@/app/api/api'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

interface TablesData {
  rows: string[][];
  colsNames: string[];
}

export function TableGrid() {
  const [tablesData, setTablesData] = useState<TablesData>({ rows: [], colsNames: [] })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    const handleGetTablesData = async () => {
      try {
        const response = await getAllTables()

        if (response && response.data) {
          const { rows, colNames } = response.data
          // console.log("rows", rows);
          // console.log("colsNames", colsNames);
          setTablesData({ rows: rows || [], colsNames: colNames || [] })
        }
      } catch (error) {
        console.error("Error fetching tables data:", error)
        toast({
          title: "Error",
          description: "Failed to fetch tables data.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    handleGetTablesData()
  }, [toast])

  const filteredRows = tablesData.rows.filter(row =>
    row.some(cell => cell?.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleAction = (action: string, tableName: string) => {
    toast({
      title: `${action} Table`,
      description: `${action} action triggered for table: ${tableName}`,
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#8BA7B4]" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#E3D5B8]">Tables</h2>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#8BA7B4]" />
          <Input
            type="text"
            placeholder="Search tables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-[#0A1929] border-[#8BA7B4]/20 text-white placeholder-[#8BA7B4] focus:ring-[#8BA7B4]"
          />
        </div>
      </div>

      {filteredRows.length === 0 ? (
        <div className="text-center py-8 text-[#8BA7B4]">No tables found</div>
      ) : (

        <Card className="bg-[#0A1929] border-none p-4">
        <Table>
        <ScrollArea className="h-[55vh] w-full rounded-md mt-2 pb-2">
          
          <TableHeader>
            <TableRow>
              {Array.isArray(tablesData.colsNames) && tablesData.colsNames.map((colName, index) => (
                <TableHead key={index} className="text-[#8BA7B4]">{colName}</TableHead>
              ))}
              <TableHead className="text-[#8BA7B4]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} className="text-white">{cell}</TableCell>
                ))}
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleAction('View', row[0])}>
                      <Eye className="h-4 w-4 text-white" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleAction('Edit', row[0])}>
                      <Edit className="h-4 w-4 text-white" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleAction('Delete', row[0])}>
                      <Trash className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </ScrollArea>
        </Table>
        </Card>
      )}
    </div>
  )
}
