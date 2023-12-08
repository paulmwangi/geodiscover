import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { footerLinks } from "../constants";

const Footer = () => (
  <footer className='flex flex-col text-white order-gray-100 bg-black'>
    <div className='relative flex flex-col max-md:flex-col sm:px-16 px-6 py-10 rounded-lg shadow-lg overflow-hidden bg-black'>
  {/* Content */}
  <div className='relative z-10 flex flex-col justify-start items-start gap-6'>
    <Image src='/logo.png' alt='Geodiscover Logo' width={118} height={18} className='object-contain' />
    <p className='text-lg text-white'>
      Discover the World with Geodiscover <br />
      &copy; 2023 All Rights Reserved
    </p>
  </div>

  <div className="footer__links grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
    {footerLinks.map((item) => (
      <div key={item.title} className="footer__link">
        <h3 className="text-xl font-semibold mb-3 text-white border-b-2 border-white pb-2">{item.title}</h3>
        <div className="flex flex-col gap-2">
          {item.links.map((link) => (
            <p key={link.title} className="text-gray-300">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-white"
              >
                {link.title}
              </a>
            </p>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>

    <div className='relative flex justify-between items-center flex-wrap mt-0 sm:px-16 px-6 py-10'>
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <img
      src="/trame2.jpg" // Replace with the actual image URL
      alt="Background"
      className="w-full h-full object-cover"
    />
  </div>

  <div className="text-white p-6 z-10 flex justify-between items-center w-full">
    <div className="left-content">
      <p>@2023 Geodiscover. All rights reserved</p>

      <div className="footer__copyrights-link">
        <p className="text-gray-500">
          <a href="/" target="_blank" rel="noopener noreferrer">Privacy & Policy</a>
        </p>
        <p className="text-gray-500">
          <a href="/" target="_blank" rel="noopener noreferrer">Terms & Condition</a>
        </p>
      </div>
    </div>

    <div className="footer__social-icons flex gap-4 ml-auto">
      <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500">
        <FaFacebook size={20} />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500">
        <FaTwitter size={20} />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500">
        <FaInstagram size={20} />
      </a>
      {/* Add more social icons as needed */}
    </div>
  </div>
</div>



  </footer>
);

export default Footer;
