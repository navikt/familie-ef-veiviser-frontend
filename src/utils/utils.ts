import { RefObject } from 'react';

export const scrollTilRef = (ref: RefObject<HTMLDivElement>) => {
  if (!ref || !ref.current) return;
  window.scrollTo(0, ref.current!.offsetTop);
};
