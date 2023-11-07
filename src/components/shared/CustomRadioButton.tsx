import React, { FC } from 'react';
import { ThemeState } from '../../types/theme';

interface IProps {
  buttonId: string;
  label?: string;
  value?: any;
  theme: ThemeState;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}
const CustomRadioButton: FC<IProps> = (props) => {
  return (
    <label autoFocus role="button" className="flex items-center bg-inherit gap-3 px-6 py-2 bg-none hover:bg-gray-300 dark:hover:bg-gray-800" htmlFor={props.buttonId}>
      <button
        autoFocus
        value={props.value}
        onClick={props.onClick}
        id={props.buttonId}
        className={`rounded-[100%] outline-none border-none focus:ring-offset-2 ${
          props.theme.themeType === props.value ? 'ring-4 ring-offset-1 ring-offset-green-500 ring-green-500' : ''
        } focus:ring-green-500 focus:ring-4 ring-offset-4 focus:ring-offset-green-500 dark:ring-offset-gray-900 ring-1 ring-gray-500`}
      >
        <div className="w-1 h-1 rounded-[100%] p-1 bg-inherit"></div>
      </button>
      {props.label && <span>{props.label}</span>}
    </label>
  );
};

export default CustomRadioButton;
