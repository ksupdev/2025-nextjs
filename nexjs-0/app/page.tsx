//rfce
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <nav>
        <div className='flex gap-4 text-2xl'>
          <Link href='/'>Home</Link>
          <Link href='/about'>About</Link>
          <Link href='/info'>Info</Link>
        </div>
      </nav>
    </div>
  )
}

export default page