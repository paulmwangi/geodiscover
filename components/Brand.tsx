import React from 'react';

const brandsData = [
  { name: 'Google', image: '/google.png' },
  { name: 'Slack', image: '/slack.png' },
  { name: 'Atlassian', image: '/atlassian.png' },
  { name: 'Dropbox', image: '/dropbox.png' },
  { name: 'Shopify', image: '/shopify.png' },
];

const Brand = () => (
  <div className="flex flex-wrap justify-center items-center">
    {brandsData.map((brand, index) => (
      <div key={index} className="relative overflow-hidden rounded-lg shadow-lg m-4">
        <img
          src={brand.image}
          alt={brand.name}
          className="max-w-full h-auto transition-transform duration-300 transform hover:scale-105"
        />
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 hover:bg-opacity-0 transition-bg-opacity duration-300">
          <p className="text-white font-semibold text-lg">{brand.name}</p>
        </div>
      </div>
    ))}
  </div>
);

export default Brand;
