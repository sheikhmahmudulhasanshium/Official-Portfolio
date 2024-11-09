import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
export default function NotFound() {
  return (
    <div className='flex flex-col items-center w-full justify-center h-screen gap-4'>
        <Image src={'/Designer.jpeg'} alt={'404'} height={300} width={300} priority/>
        <h2 className='text-4xl'>Page Not Found</h2>
      <Link href="/"><Button>Go Back</Button></Link>
    </div>
  )
}