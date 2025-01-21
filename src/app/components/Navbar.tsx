import Link from 'next/link';
import Image from 'next/image';


export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white p-4 px-8">
   
    <div>
     <Link href="/"><Image src="/images/Chicocustom.png" alt="Chico Custom Lab" width={120} height={40} /></Link>
    </div>
    
 
    <div className="flex">
      <Link href="/" className="mr-4 cursor-pointer hover:underline">Home</Link>
      <Link href="../pages/shop" className="mr-4 cursor-pointer hover:underline">Shop</Link>
      <Link href="../pages/contact" className="cursor-pointer hover:underline">Contact</Link>
    </div>
  </nav>
  );
}
