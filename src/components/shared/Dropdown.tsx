/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useRef, useState } from 'react';
import DropdownArrowIcon from '../../icons/DropdownArrowIcon';
import useComponentOutsideClick from '../Hooks/useComponentOutsideClick';

type Item = {
  id: string;
  name: string;
};
interface IProps {
  defaultText: string;
  items: Item[];
  onSelect: (item: Item) => void;
  selectedItem: Item | null;
}

const Dropdown: FC<IProps> = ({
  defaultText,
  items,
  onSelect,
  selectedItem
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useComponentOutsideClick(dropdownRef, handleClickingOutsideDropdown);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleItemClick = (item: Item) => {
    onSelect(item);
    setIsDropdownOpen(false);
  };

  function handleClickingOutsideDropdown(evt: MouseEvent) {
    const target = evt.target as HTMLElement;
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(target) &&
      isDropdownOpen
    ) {
      setIsDropdownOpen(false);
    }
  }

  return (
    <div className="relative w-fit inline-block text-left">
      <div>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          type="button"
          className="inline-flex ring-1 ring-gray-500 capitalize w-full justify-center gap-x-2.5 rounded-md sm:px-3 py-1 px-2 text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-300"
          id="menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          {selectedItem && selectedItem.name ? selectedItem.name : defaultText}
          <DropdownArrowIcon className="w-6 h-6" />
        </button>
      </div>
      <div
        ref={dropdownRef}
        className={`absolute ${
          !isDropdownOpen ? 'hidden' : ''
        } right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="horizontal"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div className="py-1" role="none">
          {items.map((item) => (
            <a
              onClick={() => handleItemClick(item)}
              key={item.id}
              className="text-gray-700 capitalize hover:bg-gray-300 cursor-pointer block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
