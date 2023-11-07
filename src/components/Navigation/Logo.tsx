import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import NewsPaperIcon from '../../icons/NewsPaperIcon';

interface ILogoProps {
  className?: string;
}
const Logo: FC<ILogoProps> = ({ className }) => {
  return (
    <NavLink to="/">
      <div className={`flex items-baseline ${className}`}>
        <NewsPaperIcon className="w-8 h-8 dark:fill-none tooltip my-4 relative  cursor-pointer dark:hover:text-white outline-none" />
        <span className="text-green-500 font-serif italic subpixel-antialiased text-xl sm:text-2xl font-bold tracking-wider">
          News
        </span>
      </div>
    </NavLink>
  );
};

export default Logo;
