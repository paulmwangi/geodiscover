// types/index.ts
import { MouseEventHandler } from 'react';
import React, { ReactNode, MouseEvent } from 'react';

export interface Event {
  id: string;
  name: string;
  description: string;
  url: string;
  // include other properties as needed
}

  export interface User {
    id: string;
    name: string;
    email: string;
    // ... other properties
  }
  // types/index.ts

export interface EventParams {
    eventId: string;
    [key: string]: string;
    // ... other parameters needed for EventDetails
  }
  export interface CustomButtonProps {
    isDisabled?: boolean;
    btnType?: "button" | "submit";
    containerStyles?: string;
    textStyles?: string;
    title?: string;
    rightIcon?: string;
    handleClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    children?: React.ReactNode;
    variant?: string;
    link?: string;
    onClick?: () => void; // Add this line
  }
  export interface HeroProps {
    title?: string;
    subtitle?: string;
    buttonText: string;
    buttonLink: string;
  }
  
   export interface EventCardProps {
    eventId: string;
   }