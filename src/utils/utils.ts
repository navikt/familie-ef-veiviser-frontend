import { RefObject } from 'react';

export const scrollTilRef = (ref: RefObject<HTMLDivElement>) =>
  window.scrollTo(0, ref.current!.offsetTop);
