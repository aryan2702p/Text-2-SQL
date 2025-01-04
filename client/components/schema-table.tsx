import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"

const schemaData = [
  { name: 'name', type: 'VARCHAR(255)', nullable: 'NO' },
  { name: 'id', type: 'INT', nullable: 'NO' },
  { name: 'state', type: 'CHAR(2)', nullable: 'YES' },
  { name: 'expenditure', type: 'DECIMAL(10,2)', nullable: 'YES' },
  { name: 'company', type: 'VARCHAR(100)', nullable: 'YES' },
  { name: 'city', type: 'VARCHAR(100)', nullable: 'YES' },
]

export function SchemaTable() {
  return (
    <Card className="bg-[#0A1929] border-none p-4">
     
      <Table>
        <TableHeader className="bg-[#051421]">
          <TableRow>
            <TableHead className="text-[#8BA7B4] font-mono">Column Name</TableHead>
            <TableHead className="text-[#8BA7B4] font-mono">Type</TableHead>
            <TableHead className="text-[#8BA7B4] font-mono">Nullable</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schemaData.map((column, i) => (
            <TableRow key={i} className="border-b border-[#8BA7B4]/20">
              <TableCell className="text-white font-mono">{column.name}</TableCell>
              <TableCell className="text-white font-mono">{column.type}</TableCell>
              <TableCell className="text-white font-mono">{column.nullable}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

