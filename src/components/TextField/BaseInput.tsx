import React, { FC, InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const BaseInput: FC<IProps> = (props) => {
  return <input {...props} />;
};

export default BaseInput;
