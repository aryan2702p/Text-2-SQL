'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from '../ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Search, Eye, UserCog, UserMinus } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { getAllUsers } from '@/app/api/api'
import { Card } from '@/components/ui/card'

interface UsersData {
  rows: string[][];
  colsNames: string[];
}


export function UserGrid() {
  const [usersData, setUsersData] = useState<UsersData>({ rows: [], colsNames: [] })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call

    const handleGetUsersData= async () => {
      try {
        const response = await getAllUsers();
       if(response && response.data){
         const data = response.data;

         const {rows, colNames} = data ;
          setUsersData({rows : rows, colsNames: colNames});
       }
      }  catch (error) {
        console.error("Error fetching user data:", error)
        toast({
          title: "Error",
          description: "Failed to fetch user data.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    handleGetUsersData();
    // setTimeout(() => {
    //   setUsersData(mockUsersData)
    //   setLoading(false)
    // }, 1000)
  }, [toast])

  const filteredRows = usersData.rows.filter(row =>
    row.some(cell => cell.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleAction = (action: string, userName: string) => {
    toast({
      title: `${action} User`,
      description: `${action} action triggered for user: ${userName}`,
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
        <h2 className="text-2xl font-bold text-[#E3D5B8]">Users</h2>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#8BA7B4]" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-[#0A1929] border-[#8BA7B4]/20 text-white placeholder-[#8BA7B4] focus:ring-[#8BA7B4]"
          />
        </div>
      </div>

      {filteredRows.length === 0 ? (
        <div className="text-center py-8 text-[#8BA7B4]">No users found</div>
      ) : (

        <Card className="bg-[#0A1929] border-none p-4">
        <Table>
          <ScrollArea className="h-[55vh] w-full rounded-md mt-2 pb-2">
          <TableHeader className='sticky top-0 bg-[#051421]'>
            <TableRow>
              {usersData.colsNames.map((colName, index) => (
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
                    <Button className="bg-[#0A1929]" variant="default" size="sm" onClick={() => handleAction('View Profile', row[0])}>
                      <Eye className="h-4 w-4 text-white hover:text-black " />
                    </Button>
                    <Button variant="default" size="sm" onClick={() => handleAction('Change Role', row[0])}>
                      <UserCog className="h-4 w-4 text-white hover:text-black" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleAction('Deactivate', row[0])}>
                      <UserMinus className="h-4 w-4 text-white hover:text-black" />
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

      {/* Pagination controls would go here */}
    </div>
  )
}

