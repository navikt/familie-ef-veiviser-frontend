import React from 'react';
import styles from './InnholdsContainer.module.css';

export const InnholdsContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <div className={styles.innholdscontainer}>{children}</div>;
};
