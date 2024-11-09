'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"

 // Error boundaries must be Client Components
 
export default function Error({
  
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className='flex flex-col items-center w-full justify-center h-screen gap-4'>
        <h2 className='text-4xl'>Something Went Wrong</h2>
      <Link href="/"><Button>Go Back</Button></Link>
    </div>
  )
}