import Link from 'next/link'

export function NavBar({handleClick}: {handleClick: () => void}) {

  return (
    <nav className="flex items-center justify-=between p-6 pb-0">
      <Link href="/" className="text-[#8BA7B4] text-2xl font-mono">
        tex2SQL
      </Link>
      <button className="ml-auto text-[#8BA7B4] font-mono hover:text-white" onClick={handleClick}>Upload</button>
    </nav>
  )
}

