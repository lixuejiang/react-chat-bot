
declare module '*.svg' {
  const url: string;
  export default url;
}

declare module '*.png' {
  const url: string;
  export default url;
}

declare module '*.gif' {
  const url: string;
  export default url;
}

declare module '*.webp' {
  const url: string;
  export default url;
}

declare module '*.webm' {
  const url: string;
  export default url;
}

declare module '*.mp4' {
  const url: string;
  export default url;
}

declare module '*.jpg' {
  const url: string;
  export default url;
}

/**
 * 考虑使用 typed-css-modules 对 less 自动生成 d.ts （主要是需要开进程 watch 编译，比较麻烦）
 * 或者调研 TypeScript 扩展
 */
declare module '*.less' {
  const styles: Record<string, string>;
  export default styles;
}

declare module 'dva-loading' {
  export default function createLoading(options: any): any;
}

declare module '*.woff';
declare module '*.woff2';
declare module '*.otf';


declare module 'echarts/map/json/*.json' {
  const json: any;
  export default json;
}
declare module 'react-lines-ellipsis' {
  // type definitions goes here
  const LinesEllipsis: any;
  export default LinesEllipsis;
}

declare module 'react-lines-ellipsis/lib/responsiveHOC' {
  const responsiveHOC: any;
  export default responsiveHOC;
}

declare module 'react-useanimations' {
  const UseAnimations: any;
  export default UseAnimations;
}

interface HTMLVideoElement {
  __hls__?: Hls;
}

declare module 'china-division/dist/*.json' {
  const json: any;
  export default json;
}

declare module 'braft-utils' {
  const ContentUtils: any;
  export { ContentUtils };
}
