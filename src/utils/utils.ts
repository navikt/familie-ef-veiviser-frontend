import { RefObject } from 'react';

const scrollTilRef = (ref: RefObject<HTMLDivElement>) => {
  if (!ref || !ref.current) return;
  window.scrollTo(0, ref.current!.offsetTop);
};

export const scrollTilNesteSporsmal = (
  nesteSporsmal: RefObject<HTMLDivElement>
) => {
  setTimeout(() => scrollTilRef(nesteSporsmal), 120);
};
