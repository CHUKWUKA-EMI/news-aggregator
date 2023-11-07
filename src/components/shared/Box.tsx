import React, { LegacyRef } from 'react';

type TDivWithChidren = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & React.PropsWithChildren;

interface IProps extends TDivWithChidren {}

const Box = React.forwardRef((props: IProps, ref: LegacyRef<HTMLDivElement>) => {
  return (
    <div ref={ref} className={props.className} {...props}>
      {props.children}
    </div>
  );
});

export default Box;
