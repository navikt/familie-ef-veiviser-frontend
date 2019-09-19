import classNames from 'classnames';

export interface BEMWrapper {
  block: string;
  element: (e?: string, m?: string) => string;
  modifier: (m?: string) => string;
}

const BEMHelper = (cls: string) => ({
  block: cls,
  element: (e?: string, m?: string) =>
    `${cls}__${e}${m ? ` ${cls}__${e}--${m}` : ''}`,
  modifier: (m?: string) => `${cls}--${m}`,
  modifierConditional: (m: string, condition: boolean | undefined) =>
    condition === true ? `${cls}--${m}` : undefined,
  child: (c: string) => BEMHelper(BEMHelper(cls).element(c)),
  classNames
});

export default BEMHelper;
