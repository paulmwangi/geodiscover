import Head from 'next/head';
import { FaEnvelope, FaPhone, FaMapMarker, FaComments } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    // Optionally, redirect to a thank you page
    router.push('/thank-you');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* <Head>
        <title>Contact Us</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <header className="bg-gradient-to-r from-purple-900 via-pink-700 to-red-500 animate-gradient text-white p-20">
  <div className="max-w-3xl mx-auto text-center">
    <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-gray-100">
      Let's Connect
    </h1>
    <p className="text-lg leading-6 text-gray-200">
      Have questions or suggestions? We're here to help! Drop us a message anytime.
    </p>
  </div>
</header>


      <main className="grid grid-cols-2 grid-rows-2 gap-8 p-8">
        {/* Email Us */}
        <div className="bg-white p-6 border border-gray-300 rounded-lg transition duration-300 hover:bg-pink-100">
          <FaEnvelope className="text-4xl mb-4 text-purple-900" />
          <h2 className="text-xl font-bold mb-2">Email Us</h2>
          <p className="text-gray-700">
            <a href="mailto:hello@jumpx.com">hello@jumpx.com</a>
            <br />
            <a href="mailto:info@jumpx.com">info@jumpx.com</a>
          </p>
        </div>

        {/* Call Us */}
        <div className="bg-white p-6 border border-gray-300 rounded-lg transition duration-300 hover:bg-pink-100">
          <FaPhone className="text-4xl mb-4 text-purple-900" />
          <h2 className="text-xl font-bold mb-2">Call Us</h2>
          <p className="text-gray-700">
            Tel. + (123) 1800-567-8990
            <br />
            Tel. + (124) 1523-567-9874
          </p>
        </div>

        {/* Location */}
        <div className="bg-white p-6 border border-gray-300 rounded-lg transition duration-300 hover:bg-pink-100">
          <FaMapMarker className="text-4xl mb-4 text-purple-900" />
          <h2 className="text-xl font-bold mb-2">London</h2>
          <p className="text-gray-700">123, Western Road, Melbourne, Australia</p>
        </div>

        {/* Live Chat */}
        <div className="bg-white p-6 border border-gray-300 rounded-lg transition duration-300 hover:bg-pink-100">
          <FaComments className="text-4xl mb-4 text-purple-900" />
          <h2 className="text-xl font-bold mb-2">Live Chat</h2>
          <p className="text-gray-700">Live chat all the time with our company 24/7</p>
        </div>
      </main>
      <section className="flex-grow p-8 overflow-hidden transition duration-300 transform rounded-lg shadow-md hover:shadow-lg bg-gradient-to-r from-purple-900 via-pink-700 to-red-500 animate-gradientPulse">
      
  <form
    className="max-w-md mx-auto space-y-6"
    onSubmit={handleSubmit}
  >
    {/* Live Chat Form */}
    <div>
      <h2 className="text-xl font-bold mb-2">Live Chat</h2>
      <p className="text-gray-700">
        Live chat all the time with our company 24/7
      </p>
    </div>

    <div>
      <label htmlFor="name" className="block text-gray-700">
        Name
      </label>
      <input
        id="name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300"
        required
      />
    </div>

    <div>
      <label htmlFor="email" className="block text-gray-700">
        Email
      </label>
      <input
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300"
        required
      />
    </div>

    <div>
      <label htmlFor="phone" className="block text-gray-700">
        Phone number
      </label>
      <input
        id="phone"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300"
        required
      />
    </div>

    <div>
      <label htmlFor="subject" className="block text-gray-700">
        Subject
      </label>
      <input
        id="subject"
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300"
        required
      />
    </div>

    <div>
      <label htmlFor="message" className="block text-gray-700">
        Write your message...
      </label>
      <textarea
        id="message"
        name="message"
        rows={4}
        value={formData.message}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300"
        required
      ></textarea>
    </div>

    <button
      type="submit"
      className="w-full py-2 px-4 bg-white-600 hover:bg-pink-700 text-white rounded-md transition duration-300"
    >
      Send Message
    </button>
  </form>
</section>
<div>
  <img
    src="contact.png"
    alt="Image"
    className="w-full h-full object-cover rounded-b-lg"
    style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0' }}
  />
</div>

      

    </div>
  );
}
