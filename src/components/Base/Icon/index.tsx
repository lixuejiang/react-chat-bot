import React, { HTMLAttributes, NamedExoticComponent } from 'react';
import classnames from 'classnames';
import styles from './index.less';

interface IconProps extends HTMLAttributes<SVGElement> {
  name: string;
  size?: string | number;
}

const MIcon = React.memo(function Icon({
  name, className = '', size, ...props
}: IconProps) {
  const style: { fontSize?: number } = {};
  if (size !== undefined) {
    style.fontSize = Number(size) || 14;
  }
  return (
    <svg
      data-name={name}
      className={classnames(styles.icon, className)}
      {...props}
      style={style}
    >
      <use
        xlinkHref={`#icon-${name}`}
      />
    </svg>
  );
}) as NamedExoticComponent<IconProps> & {
  list: string[];
};

const list: string[] = [];
/**
 * require all symbols/*.svg
 */
(require as any).context('./icons/', false).keys().map((file: string) => {
  list.push(file.slice(2, file.length - 4));
  return require('./icons/' + file.slice(2)); // eslint-disable-line global-require,import/no-dynamic-require
});

MIcon.list = list;

export default MIcon;
