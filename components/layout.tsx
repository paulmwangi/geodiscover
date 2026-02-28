// components/layouts/Layout.js
import React, { ReactNode } from 'react';
import { Navbar ,Footer, ScrollToTop} from '.';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary-600 focus:text-white">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1" role="main">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
