import { FC, InputHTMLAttributes } from 'react';
import BaseInput from './BaseInput';
import SearchIcon from '../../icons/SearchIcon';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  inputWrapperClassName: string;
}
const SearchInput: FC<IProps> = ({ inputWrapperClassName, ...props }) => {
  return (
    <div
      className={`flex w-full text-gray-500 dark:text-gray-400 font-semibold dark:border-[0.5px] border-gray-500 border-[1px] hover:border-green-600 dark:hover:border-green-500 rounded-md p-2 items-center ${inputWrapperClassName}`}
    >
      <SearchIcon className="h-6 w-6" />
      <BaseInput
        {...props}
        placeholder="Search for articles by keyword"
        type="search"
        className={`py-2 sm:px-4 w-full rounded-sm bg-transparent placeholder:font-semibold dark:placeholder:text-gray-400 placeholder:text-gray-500 sm:tracking-[2px] text-gray-800 dark:text-white outline-none`}
      />
    </div>
  );
};

export default SearchInput;
