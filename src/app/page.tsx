import Image from 'next/image'
import Link from 'next/link'
const ArrowIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path></svg>
  )
}
const ArrowRightUpIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path></svg>
  )
}
export default function Home() {
  return (
    <main className='bg-accent gap-10 h-screen p-10 justify-between items-center flex flex-col'>
      <div>

      </div>
      <div className='items-center flex flex-col gap-4'>
        <svg width="80" height="80" viewBox="0 0 222 222" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M88.4599 35.8512C88.4599 35.8512 147.26 105.551 61.2599 126.151C52.8599 128.151 31.4599 132.251 18.3599 121.251C-2.84012 103.251 4.15988 50.7512 32.2599 24.6512C52.5599 5.85125 77.8599 6.45125 119.26 7.35125C131.76 7.65125 142.36 9.25125 151.16 16.3512C157.46 21.4512 160.76 29.8512 167.16 45.5512C179.76 76.5512 226.16 55.2512 213.96 94.6512C201.76 134.051 183.86 150.751 114.06 141.451C108.56 152.251 99.0599 167.451 83.2599 182.051C60.3599 203.151 36.0599 211.851 22.7599 215.551" stroke="black" strokeWidth="12" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M143.47 69.1373C147.165 68.9397 149.933 64.5322 149.653 59.2928C149.373 54.0534 146.15 49.9663 142.455 50.1639C138.76 50.3615 135.992 54.7691 136.272 60.0084C136.552 65.2478 139.775 69.3349 143.47 69.1373Z" fill="black" stroke="black" strokeWidth="3" strokeMiterlimit="10"/>
        </svg>

      <div className='text-center'>
        <h1 className='text-4xl'>eddah</h1>
        <h1 className='text-xl opacity-50'>backend</h1>
      </div>
      <br /><br />
        <Link href={"/admin"} className='p-4 bg-black fill-white rounded-full'>
            <ArrowIcon/>       
        </Link>
      </div>
      
      <Link href={"/apis"} className='flex gap-1 items-center px-6 p-4 text-sm bg-black bg-opacity-20 fill-black rounded-full'>
          check the api 
          <ArrowRightUpIcon/>     
      </Link>
    </main>
  )
}
