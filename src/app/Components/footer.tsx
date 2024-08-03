import Image from "next/image";

export default function Footer() {

  
  return (
    <footer className="bg-black py-8 md:py-12 rounded-t-110px relative">
      <div className="flex flex-col md:flex-row items-start justify-between px-8 md:px-20">
        {/* Logo */}
        <div className="mb-8 md:mb-0 md:order-2">
          <Image
            src={'/white_logo.png'}
            alt="Company Logo"
            width={150}
            height={50}
            unoptimized
          />
        </div>

        {/* Social Icons */}

        {/* Links */}
        <ul className="flex flex-col md:flex-row gap-4 md:gap-8 list-none text-white mb-4 md:mb-0 md:order-3">
          <li>Home</li>
          <li>Modules</li>
          <li>Use Cases</li>
          <li>Sectors</li>
          <li>Pricing</li>
          <li>Resources</li>
        </ul>
      </div>

      {/* <div className="text-white px-8 md:px-20 mt-4 md:mt-0 md:text-left md:order-4">

      <div className="flex gap-4 md:ml-auto md:order-1 ">
          <a href="#">
            <Image src="/social.png" alt="Social" width={30} height={30} />
          </a>
          <a href="#">
            <Image src="/li.png" alt="LinkedIn" width={30} height={30} />
          </a>
          <a href="#">
            <Image src="/you.png" alt="YouTube" width={30} height={30} />
          </a>
          <a href="#">
            <Image src="/in.png" alt="Instagram" width={30} height={30} />
          </a>
        </div>
        </div> */}

      {/* All Rights Reserved */}
      <div className="text-white px-8 md:px-20 mt-4 md:mt-0 md:text-left md:order-4 mt-2">
        <p>&copy; 2024 Rubicr. All rights reserved</p>
      </div>
    </footer>
  );
}