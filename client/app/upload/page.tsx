import { NavBar } from '@/components/nav-bar'
import { FileUpload } from '@/components/file-upload'

export default function uploadPage() {
  return (
    <div className="min-h-screen bg-[#051421]">
      <NavBar />
      <FileUpload />
    </div>
  )
}

