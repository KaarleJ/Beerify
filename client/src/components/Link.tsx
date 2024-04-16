import { AnchorHTMLAttributes } from 'react';


const Link = ({ children, className, ...props }:  AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a className={`mx-10 text-foreground/90 hover:text-foreground/70 ${className}`} {...props}>
      {children}
    </a>
  );
};

export default Link;
