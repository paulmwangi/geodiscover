import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input } from "@nextui-org/react";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from 'next/router';
import ThemeToggle from './ThemeToggle';

const CustomNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/events?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Explore' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => router.pathname === href;

  return (
    <div>
      {/* Spacer to reserve space for fixed navbar */}
      <div style={{ height: '64px' }} />

      <Navbar
        isBordered
        className={`fixed top-0 left-0 w-full z-50 ${isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm' : 'bg-transparent'}`}
        aria-label="Main navigation"
      >
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <Link href="/" aria-label="GeoDiscover home" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">GeoDiscover</span>
            </Link>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-5" aria-label="Site pages">
            {navLinks.map((link) => (
              <NavbarItem key={link.href} isActive={isActive(link.href)}>
                <Link
                  href={link.href}
                  color={isActive(link.href) ? 'primary' : 'foreground'}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={isActive(link.href) ? 'font-semibold' : ''}
                >
                  {link.label}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <form onSubmit={handleSearchSubmit} className="hidden sm:block">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[12rem] h-10",
                mainWrapper: "h-full",
                input: "text-small pl-5 pr-0",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-gray-800/50",
              }}
              placeholder="Search events..."
              size="md"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              startContent={<div className="absolute inset-y-0 left-0 flex items-center pl-2"><FaSearch aria-hidden="true" /></div>}
              type="search"
              aria-label="Search events and content"
            />
          </form>
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
          {/* Mobile menu toggle */}
          <button
            className="sm:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </NavbarContent>
      </Navbar>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <nav className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-xl p-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <form onSubmit={handleSearchSubmit} className="pt-3">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  type="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Search events"
                />
              </div>
            </form>
          </nav>
        </div>
      )}
    </div>
  );
};

export default CustomNavbar;
