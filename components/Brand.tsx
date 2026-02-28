import React from 'react';

const brandsData = [
  { name: 'Google', image: '/google.png' },
  { name: 'Slack', image: '/slack.png' },
  { name: 'Atlassian', image: '/atlassian.png' },
  { name: 'Dropbox', image: '/dropbox.png' },
  { name: 'Shopify', image: '/shopify.png' },
];

const Brand = () => (
  <section className="bg-gray-50 dark:bg-gray-900 py-16">
    <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-10">
      Trusted By Leading Companies
    </h2>
    <div className="flex flex-wrap justify-center items-center">
      {brandsData.map((brand, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 m-3 shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-md transition-all"
        >
          <img
            src={brand.image}
            alt={brand.name}
            className="max-w-full h-auto transition-transform duration-300 transform hover:scale-105"
          />
        </div>
      ))}
    </div>
  </section>
);

export default Brand;
