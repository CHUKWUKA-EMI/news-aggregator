import { RefObject, useEffect } from 'react';

const useComponentOutsideClick = (ref: RefObject<HTMLElement>, eventListener: (this: Document, ev: MouseEvent) => void) => {
  useEffect(() => {
    document.addEventListener('mousedown', eventListener, false);

    return () => {
      document.removeEventListener('mousedown', eventListener, false);
    };
  }, [ref, eventListener]);
  return null;
};

export default useComponentOutsideClick;
