import { RefObject } from 'react';

const scrollTilRef = (ref: RefObject<HTMLDivElement>) => {
  if (!ref || !ref.current) return;
  window.scrollTo({ top: ref.current!.offsetTop, left: 0, behavior: 'smooth' });
};

export const scrollTilNesteSporsmal = (
  nesteSporsmal: RefObject<HTMLDivElement>
) => {
  setTimeout(() => scrollTilRef(nesteSporsmal), 120);
};
