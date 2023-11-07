import { RefObject, useEffect, useState } from 'react';

const useIntersectionObserver = (
  targetElementRef: RefObject<HTMLElement>,
  targetContainerRef?: RefObject<HTMLElement>
) => {
  const [isTargetIntersecting, setIsTargetIntersecting] = useState(false);

  useEffect(() => {
    if (targetElementRef.current) {
      let tabsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsTargetIntersecting(entry.isIntersecting);
          });
        },
        {
          root: targetContainerRef ? targetContainerRef.current : null,
          rootMargin: '0px',
          threshold: 1.0
        }
      );
      tabsObserver.observe(targetElementRef.current);

      return () => {
        tabsObserver.disconnect();
      };
    }
  }, [targetElementRef, targetContainerRef]);

  return { isTargetIntersecting };
};

export default useIntersectionObserver;
