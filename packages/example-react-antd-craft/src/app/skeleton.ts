import classNames from 'classnames';
import { useAppProvider, useNodeActive } from './app-provider';
import styles from './skeleton.module.scss';

export const useBlockNodeSkeleton = () => {
  const { isCreative } = useAppProvider();
  const { isActive } = useNodeActive();

  const className = classNames(styles.skeleton, {
    [styles.isCreative]: isCreative,
    [styles.isActive]: isActive,
  });

  return { className, styles };
};

export const useContainerNodeSkeleton = () => {
  const { isCreative } = useAppProvider();
  const { isActive } = useNodeActive();

  const className = classNames(styles.skeleton, {
    [styles.isContainer]: true,
    [styles.isCreative]: isCreative,
    [styles.isActive]: isActive,
  });

  return { className, styles };
};
