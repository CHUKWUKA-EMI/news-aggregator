import { FC } from 'react';

interface IProps {
  numberOfSkeletons: number;
}
const Loader: FC<IProps> = ({ numberOfSkeletons = 4 }) => {
  return (
    <div className="flex gap-4 items-center flex-wrap justify-between px-8 w-full mx-auto mt-[8rem]">
      {Array.from(Array(numberOfSkeletons).keys()).map((_, index) => (
        <div
          key={index}
          className="border h-[8rem] border-blue-300 shadow rounded-md w-[46%]"
        >
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-md bg-slate-700 h-12 w-12"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
      ;
    </div>
  );
};

export default Loader;
