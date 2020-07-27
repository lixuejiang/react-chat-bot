import React, { PureComponent } from 'react';
import Hls from 'hls.js';

/**
 * 判断 URL 是不是 m3u8 资源
 */
export function isHLS(url: string) {
  return /\.m3u8(\?.*)?/.test(url);
}

const hlsSupported = Hls.isSupported();

export interface HlsVideoProps extends React.MediaHTMLAttributes<HTMLVideoElement> {
  isHls: boolean;
  onRef?(audio: HTMLAudioElement): void;
}

/**
 * 一个对 Native Video 标签的扩展
 */
export default class Video extends PureComponent<HlsVideoProps> {
  $video: HTMLVideoElement | null = null;

  isHls() {
    const { src, isHls } = this.props;
    if (isHls === true || isHls === false) {
      return isHls;
    }

    return isHLS(src || '');
  }

  refVideo = (el: HTMLVideoElement) => {
    const { onRef } = this.props;

    // 清理掉老的 $video
    this.destoryHls(this.$video);
    this.$video = el;
    this.initHls(el);

    if (onRef) onRef(el);
  }

  initHls($video: HTMLVideoElement) {
    const { src = '', preload } = this.props;
    const isHls = this.isHls();
    if (isHls && hlsSupported && $video) {
      const hls = new Hls({
        maxFragLookUpTolerance: 0,
        liveSyncDurationCount: 1.5,
        autoStartLoad: preload !== 'none',
      });

      hls.attachMedia($video);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(src);
      });

      $video.__hls__ = hls; // eslint-disable-line
    }
  }

  destoryHls($video: HTMLVideoElement | null) {
    if ($video && $video.__hls__) {
      const hls = $video.__hls__;
      if (hls) {
        hls.destroy();
      }
    }
  }

  componentWillUnmount() {
    this.destoryHls(this.$video);
  }

  render() {
    const {
      onRef,
      src,
      isHls: _,
      ...props
    } = this.props;
    const isHls = this.isHls();

    return (
      <video
        // key 的作用：当 props.src 发生变化时，会 mount 新的 video 标签
        key={src}
        ref={this.refVideo}
        src={isHls && hlsSupported ? undefined : src}
        {...props}
      />
    );
  }
}
