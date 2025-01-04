import { NavBar } from '@/components/nav-bar'
import QueryPage from './query/page'

export default function Home() {

  return (
    <div className="min-h-screen bg-[#051421] sm:overflow-hidden">
      {/* <NavBar /> */}
      <QueryPage />
    </div>
  )
}

