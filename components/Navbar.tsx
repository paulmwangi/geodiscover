import { FaSearch } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { UserButton } from "@clerk/nextjs"; // Import UserButton from Clerk

const CustomNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Transparent spacer to push down content for fixed navbar */}
      <div style={{ height: isScrolled ? '70px' : '0', zIndex: 999 }} />

      <Navbar
        isBordered
        className={`fixed top-0 left-0 w-full z-50 ${isScrolled ? 'bg-white bg-opacity-80 backdrop-blur-md' : 'bg-transparent'}`}
      >
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <p className="hidden sm:block font-bold text-inherit">GeoDiscover</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-5">
          <NavbarItem>
              <Link color="foreground" href="/">
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/about">
                About
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="/events" aria-current="page" color="secondary">
                Explore
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/contact">
                Contact
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/blog">
                Blog
              </Link>
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small pl-5 pr-0",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="md"
            startContent={<div className="absolute inset-y-0 left-0 flex items-center pl-2"><FaSearch /></div>}
            type="search"
          />
          {/* Add the UserButton here */}
          <UserButton afterSignOutUrl="/" />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="warning"
                name="Jason Hughes"
                style={{ width: '60px', height: '65px' }} 
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              {/* Dropdown items go here */}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
