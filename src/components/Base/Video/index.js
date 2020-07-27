import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import {
  Slider, Popconfirm,
} from 'antd';
import styles from './index.less';
// 调用hls
import HVideo from './HlsVideo';

import play from './images/play.svg'; // play 播放
import pause from './images/pause.svg'; // pause 暂停

import IDownload from './images/download.svg'; // 下载
import IVolumeFull from './images/volume_full.svg'; // 声音
import IVolumeMute from './images/volume_mute.svg'; // 静音
import IFullScreen from './images/full_screen.svg'; // 全屏
import IReduceScreen from './images/reduce_screen.svg'; // 取消全屏
import IFullWindow from './images/full_window.svg'; // 网页全屏
import IReduceWindow from './images/reduce_window.svg'; // 取消网页全屏
import ISetting from './images/setting.svg'; // 设置
// import { COVER_HOST } from '../../../constants';
// import { replaceWithCurrentProtocal } from '@/utils/urlTool';

// TODO: 目前测试环境和线上环境的 bucket 是未隔离的，而且都开启了 HTTPS，原则上可以直接替换成 HTTPS 而不是当前页面的协议
export function replaceWithCurrentProtocal(url) {
  return url && url.replace(/^http(s)?:/, location.protocol);
}

const speeds = ['0.5', '1.0', '1.5', '2.0', '5.0'];
const marks = {
  0: '0.5',
  25: '正常',
  50: '1.5',
  75: '2.0',
  100: '5.0',
};

// 格式化播放时间
const getSecondTimeFomate = (time) => {
  time = Math.ceil(time);
  let h = (parseInt(time / 3600, 10));
  if (h.toString().length === 1) {
    h = '0' + h;
  }
  let m = (parseInt((time % 3600) / 60, 10));
  if (m.toString().length === 1) {
    m = '0' + m;
  }
  let s = (time - 3600 * h - 60 * m);
  if (s.toString().length === 1) {
    s = '0' + s;
  }
  return time < 3600 ? (m + ':' + s) : (h + ':' + m + ':' + s);
};

// 1110 新增 根据 urls: [{}], // 开始时间, cutDuration, // 总时长 限制播放范围, url

class MVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCanPlay: false,
      isPlay: !!this.props.autoplay,
      currentTime: null,
      duration: null,
      percent: 0,
      load: 0,
      volume: 50,
      isMuted: false,
      isVideoExpand: false, // 是否全屏
      isVideoWindowExpand: false, // 是否网页全屏
      isShowSettingPanel: false,
      curSpeed: '1.0',
      lastTimeout: 0,
      currentIndex: 0, // 当前urls段播放的第几个
      isGetCheckDownloadCount: false,
      isHidePoster: props.unNeedThumbUrl || false, // 是否隐藏封面 主要是为了对于小数 浏览器的适配不一致问题
      // durationTime: 0, // 总时长
      resolutionType: '1080P', // 分辨率类型
      resolutionUrl: null, // 分辨率Url
      isShowResolutionPanel: false, // 分辨率面板
      errorText: null,
    };
    this.framesPer = 0.04;
  }

  componentDidMount() {
    this.init();
    window.addEventListener('fullscreenchange', this.fullscreenchange);
    window.addEventListener('webkitfullscreenchange', this.fullscreenchange);
    window.addEventListener('mozfullscreenchange', this.fullscreenchange);
    window.addEventListener('MSFullscreenChange', this.fullscreenchange);
    // 快捷键
    window.addEventListener('keydown', this.shortcutKeyChange);
  }

  componentWillUnmount() {
    window.removeEventListener('fullscreenchange', this.fullscreenchange);
    window.removeEventListener('webkitfullscreenchange', this.fullscreenchange);
    window.removeEventListener('mozfullscreenchange', this.fullscreenchange);
    window.removeEventListener('MSFullscreenChange', this.fullscreenchange);
    // 快捷键
    window.removeEventListener('keydown', this.shortcutKeyChange);
  }

  fullscreenchange = () => {
    this.setState({
      isVideoExpand: !this.state.isVideoExpand,
    });
  }

  // 快捷键监听
  shortcutKeyChange = (e) => {
    // 是否禁用快捷键
    if (!this.props.simple && !this.props.disableShortcut) {
      e = window.event || e;
      const code = e.keyCode || e.which;
      // 空格 32 控制播放/暂停
      if (code === 32) {
        this.play();
      }
      // 左右键 37 39 当播放暂停时，可以通过左右键控制光标逐幁调节播放 一帧===0.04s
      if (code === 37 && !this.state.isPlay) {
        this.mouseDownVideo(null, -1);
      }
      if (code === 39 && !this.state.isPlay) {
        this.mouseDownVideo(null, 1);
      }
      // J 74 播放速度减速
      if (code === 74) {
        this.mouseDownVideoSpeed(-1);
      }
      // K 75 播放暂停
      if (code === 75) {
        this.play();
      }
      // L 76 播放速度加速
      if (code === 76) {
        this.mouseDownVideoSpeed(1);
      }
    }
  }

  /**
   * 计算前 n 个视频的 duration 之和
   * @param {number} n
   */
  getFirstFewDuration(n, urls) {
    let duration = 0;
    for (let i = 0; i < n; i++) {
      duration += urls[i].cutDuration || 0;
    }
    return duration;
  }

  init() {
    const video = ReactDOM.findDOMNode(this.refs.video);// eslint-disable-line react/no-string-refs,react/no-find-dom-node
    // 加载
    video.addEventListener('loadedmetadata', () => {
      let durationTime = video.duration;
      const currentTime = durationTime < 3600 ? '00:00' : '00:00:00';
      // 若urls有值 则认为他是剪辑后的
      if (this.props.urls && this.props.urls.length > 0) {
        // 计算总时长
        durationTime = this.getFirstFewDuration(this.props.urls.length, this.props.urls);
        video.startTime = this.props.urls[this.state.currentIndex].cutStartTime;
        video.currentTime = this.props.urls[this.state.currentIndex].cutStartTime;
      }
      const duration = getSecondTimeFomate(Math.ceil(durationTime));
      this.setState({
        currentTime,
        duration,
        // durationTime,
      });
    });
    // 加载进度条
    const loadbar = () => {
      let load = 0;
      if (video.readyState === 4) {
        const bufferIndex = video.buffered.length;
        if (bufferIndex > 0 && video.buffered !== undefined) {
          load = video.buffered.end(bufferIndex - 1) / video.duration * 100;
          if (Math.abs(video.duration - video.buffered.end(bufferIndex - 1)) < 1) {
            load = 100;
          }
          return load;
        }
      }
    };
    // 播放
    video.addEventListener('timeupdate', () => {
      const load = loadbar();
      let current = video.currentTime;
      let percent = video.currentTime / video.duration * 100;
      // 若urls有值 则认为他是剪辑后的
      if (this.props.urls && this.props.urls.length > 0) {
        const durationTime = this.getFirstFewDuration(this.props.urls.length, this.props.urls);
        current = this.state.lastTimeout + current - this.props.urls[this.state.currentIndex].cutStartTime;
        percent = current / durationTime * 100;
      }
      const currentTime = getSecondTimeFomate(Math.ceil(current)); // 转化的展示播放时间

      this.setState({
        currentTime,
        percent: isNaN(percent) ? 0 : percent,
        load,
      }, () => {
        if (this.state.percent >= 100) {
          // 若urls有值 则认为他是剪辑后的
          if (this.props.urls && this.props.urls.length > 0) {
            this.setState({
              isPlay: false,
              percent: 0,
              currentIndex: 0,
              lastTimeout: 0,
            }, () => {
              video.currentTime = this.props.urls[this.state.currentIndex].cutStartTime;
              if (this.state.currentIndex + 1 < this.props.urls.length) {
                //
              } else {
                video.pause();
                this.props.handlePause && this.props.handlePause();
              }
            });
          } else {
            this.setState({
              isPlay: false,
            });
            video.pause();
            this.props.handlePause && this.props.handlePause();
          }
        }
      });
    });
    // 准备好开始播放
    video.addEventListener('canplay', () => {
      // console.log('canplay', this.state.isCanPlay);
      if (!this.state.isCanPlay) {
        this.setState({
          isCanPlay: true,
        }, () => {
          this.handleChangeSpeed(this.state.curSpeed);
        });
      }
    });
    // 播放结束
    video.addEventListener('ended', () => {
      // 若urls有值 则认为他是剪辑后的
      if (this.props.urls && this.props.urls.length > 0) {
        if (this.props.urls.length > 1 && this.state.currentIndex + 1 < this.props.urls.length) {
          this.setState({
            currentIndex: this.state.currentIndex + 1,
            lastTimeout: this.state.lastTimeout + this.props.urls[this.state.currentIndex].cutDuration,
          }, () => {
            this.play();
          });
        } else {
          this.setState({
            isPlay: false,
            percent: 0,
            currentIndex: 0,
            lastTimeout: 0,
          }, () => {
            video.currentTime = this.props.urls[this.state.currentIndex].cutStartTime;
            this.pause();
          });
        }
      } else {
        this.setState({
          isPlay: false,
          percent: 100,
        });
      }
    });
    // 播放中
    video.addEventListener('play', () => {
      if (!this.state.isHidePoster) {
        this.setState({
          isHidePoster: true,
        });
      }
    });
    // 音量改变
    video.addEventListener('volumechange', () => {
    });

    // 报错
    let num = 0;
    let timer = null;
    video.addEventListener('error', () => {
      timer = setTimeout(() => {
        if (num >= 30) {
          clearTimeout(timer);
          num = 0;
          console.log('加载失败');
          this.setState({ errorText: '加载失败!' });
          this.props.onError && this.props.onError('加载失败!');
        } else {
          num++;
          video.load();
        }
      }, 1000);
    });
  }

  play = () => {
    if (!this.state.isCanPlay) {
      return false;
    }
    const video = ReactDOM.findDOMNode(this.refs.video);// eslint-disable-line react/no-string-refs,react/no-find-dom-node
    const isPlaying = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2;

    if (isPlaying) {
      this.setState({
        isPlay: false,
        isShowSettingPanel: false,
        isShowResolutionPanel: false,
      });
      video.pause();
      this.props.handlePause && this.props.handlePause();
    } else {
      this.setState({
        isPlay: true,
        isShowSettingPanel: false,
        isShowResolutionPanel: false,
      });
      video.play();
      this.props.handlePlay && this.props.handlePlay();
    }
  }

  mouseDownVideo = (percent, isShortcutKeyChange) => {
    if (!this.state.isCanPlay) {
      return false;
    }
    const video = ReactDOM.findDOMNode(this.refs.video);// eslint-disable-line react/no-string-refs,react/no-find-dom-node
    let durationTime = video.duration;
    let currentTime = video.currentTime || 0;
    if (percent === null && isShortcutKeyChange) {
      currentTime = (currentTime * 100 + isShortcutKeyChange * this.framesPer * 100) / 100;
      percent = currentTime / durationTime * 100;
    } else {
      currentTime = percent / 100 * durationTime;
    }
    // 若urls有值 则认为他是剪辑后的
    if (this.props.urls && this.props.urls.length > 0) {
      // 计算总时长
      durationTime = this.getFirstFewDuration(this.props.urls.length, this.props.urls);
      currentTime = percent / 100 * durationTime;
      // 计算是第几个视频 和 对应的时间
      let _lastTimeout = 0;
      let _currentIndex = 0;
      this.props.urls.forEach(item => {
        if (_lastTimeout + item.cutDuration < currentTime) {
          _lastTimeout += item.cutDuration;
          _currentIndex += 1;
        }
      });
      // 梳理后
      const _currentTime = getSecondTimeFomate(Math.ceil(currentTime)); // 转化的展示播放时间
      // currentTime = currentTime - _lastTimeout;
      this.setState({
        currentIndex: _currentIndex,
        percent,
        currentTime: _currentTime,
        lastTimeout: _lastTimeout,
        isPlay: false,
      }, () => {
        video.currentTime = currentTime - _lastTimeout + this.props.urls[this.state.currentIndex].cutStartTime;
        video.pause();
        this.props.handlePause && this.props.handlePause();
      });
    } else {
      video.currentTime = currentTime;
      this.setState({
        percent,
        isPlay: false,
      });
      video.pause();
      this.props.handlePause && this.props.handlePause();
    }
  }

  pause() {
    if (!this.state.isCanPlay) {
      return false;
    }
    const video = ReactDOM.findDOMNode(this.refs.video);// eslint-disable-line react/no-string-refs,react/no-find-dom-node
    const isPlaying = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2;
    if (isPlaying) {
      this.setState({
        isPlay: false,
        isShowSettingPanel: false,
        isShowResolutionPanel: false,
      });
      video.pause();
      this.props.handlePause && this.props.handlePause();
    }
  }

  /* 系统全屏 */
  videoExpand = () => {
    const video = this.videoWrapRef;
    // 系统全屏
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullScreen) {
      video.webkitRequestFullScreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    } else if (video.oRequestFullscreen) {
      video.oRequestFullScreen();
    }
  }

  /* 取消系统全屏 */
  videoReduce = () => {
    // 取消系统全屏
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.oExitFullscreen) {
      document.oExitFullscreen();
    }
  }

  /* 网页全屏 */
  videoWindowExpand = () => {
    this.setState({
      isVideoWindowExpand: true,
    });
  }

  videoWindowReduce = () => {
    this.setState({
      isVideoWindowExpand: false,
    }, () => {
      if (this.state.isVideoExpand) {
        this.videoReduce();
      }
    });
  }

  // 处理播放速度
  triggerSettingPanel = () => {
    if (!this.state.isShowSettingPanel) {
      this.pause();
    }
    this.setState({
      isShowSettingPanel: !this.state.isShowSettingPanel,
      isShowResolutionPanel: false,
    });
  }

  handleChangeSpeed = (speed) => {
    this.setState({
      curSpeed: speed,
    }, () => {
      const video = ReactDOM.findDOMNode(this.refs.video);// eslint-disable-line react/no-string-refs,react/no-find-dom-node
      video.playbackRate = this.state.curSpeed;
    });
  }

  // 打开声音
  disableMute = () => {
    const video = ReactDOM.findDOMNode(this.refs.video);// eslint-disable-line react/no-string-refs,react/no-find-dom-node
    video.muted = false;
    if (this.state.volume === 0) {
      video.volume = 0.5;
    }
    this.setState({
      isMuted: false,
      volume: this.state.volume !== 0 ? this.state.volume : 50,
      isShowSettingPanel: false,
      isShowResolutionPanel: false,
    });
  }

  // 关闭声音
  enableMute = () => {
    const video = ReactDOM.findDOMNode(this.refs.video);// eslint-disable-line react/no-string-refs,react/no-find-dom-node
    video.muted = true;
    this.setState({
      isMuted: true,
      isShowSettingPanel: false,
      isShowResolutionPanel: false,
    });
  }

  // 修改音量
  setVolume = (v) => {
    const video = ReactDOM.findDOMNode(this.refs.video);// eslint-disable-line react/no-string-refs,react/no-find-dom-node
    video.volume = v / 100;
    video.muted = false;
    if (v === 0) {
      video.muted = true;
    }
    this.setState({
      volume: v,
      isMuted: video.muted,
      isShowSettingPanel: false,
      isShowResolutionPanel: false,
    });
  }

  // 处理下载
  renderDownload = () => {
    const { isGetCheckDownloadCount, isGetCheckDownloadCountError, isGetCheckDownloadCountData } = this.state;
    // loading
    if (isGetCheckDownloadCount) {
      return (
        <div>
          加载中
        </div>
      );
    } else {
      let textOne = null;
      let textTwo = null;
      if (isGetCheckDownloadCountError) {
        textOne = (<span>{isGetCheckDownloadCountError}</span>);
      } else {
        if (isGetCheckDownloadCountData && isGetCheckDownloadCountData.limitTimes > isGetCheckDownloadCountData.downloadTimes) {
          textOne = (<span>{`是否下载? (普通机构可下载${isGetCheckDownloadCountData.limitTimes}次/天)`}</span>);
        }
        if (isGetCheckDownloadCountData && isGetCheckDownloadCountData.limitTimes <= isGetCheckDownloadCountData.downloadTimes) {
          textOne = (
            <span>
              本日下载已达到限制，联系我们体验无限下载服务
            </span>
          );
          textTwo = (
            <span>
              电话：4001050094
              <font style={{ width: 16, display: 'inline-block' }} />
              邮箱：business@shuwen.com
            </span>
          );
        }
      }
      return (
        <div>
          <div style={{ lineHeight: '22px' }}>
            {textOne}
          </div>
          {!!textTwo && (
            <div style={{ lineHeight: '22px' }}>
              {textTwo}
            </div>
          )}
        </div>
      );
    }
  }

  getCheckDownloadCount = () => {
    const { id, url } = this.props;
    if (!id || !url) {
      return false;
    }
    if (this.state.isGetCheckDownloadCount) {
      return false;
    }
    this.pause();
    this.setState({
      isGetCheckDownloadCount: true,
      isShowSettingPanel: false,
      isShowResolutionPanel: false,
    }, () => {
      this.props.dispatch({
        type: 'manuscript/checkDownloadCount',
        payload: { id },
        onResult: (error, data) => {
          this.setState({
            isGetCheckDownloadCount: false,
            isGetCheckDownloadCountError: error,
            isGetCheckDownloadCountData: data,
          });
        },
      });
    });
  }

  beforeDownload = () => {
    this.props.beforeDownload && this.props.beforeDownload(this.downloadVideo);
  }


  downloadVideo = () => {
    const {
      id,
      url,
      // title,
    } = this.props;
    const { isGetCheckDownloadCountData } = this.state;
    this.closeVisibleDownload();
    if (isGetCheckDownloadCountData && isGetCheckDownloadCountData.limitTimes > isGetCheckDownloadCountData.downloadTimes) {
      location.href = `/api/cms/data/do/download?id=${id}&url=${url}`;
      // console.log(id, url);
      // this.downloadWithBlob(url, title);
    }
    // this.downloadWithBlob(url, title);
  }

  closeVisibleDownload = () => {
    // this.setState({
    //   visibleDownload: false,
    // });
  }

  // 处理分辨率
  triggerResolutionPanel = () => {
    if (!this.state.isShowResolutionPanel) {
      this.pause();
    }
    this.setState({
      isShowResolutionPanel: !this.state.isShowResolutionPanel,
      isShowSettingPanel: false,
    });
  }

  // 切换分辨率
  changeResolution = ({ type, url }) => {
    this.pause();
    this.setState({
      resolutionType: type,
      resolutionUrl: url,
      isShowSettingPanel: false,
      isShowResolutionPanel: false,
      currentTime: null,
      duration: null,
      percent: 0,
      load: 0,
    }, () => {
      this.init();
    });
  }

  // 禁止右键
  disableContextMenu = () => {
    window.event.returnValue = false;
    return false;
  }

  // 播放速度调整
  mouseDownVideoSpeed = (isShortcutKeyChange) => {
    if (!this.state.isCanPlay) {
      return false;
    }
    const video = ReactDOM.findDOMNode(this.refs.video);// eslint-disable-line react/no-string-refs,react/no-find-dom-node
    const isPlaying = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2;
    if (!isPlaying) {
      this.setState({
        isPlay: true,
        isShowResolutionPanel: false,
      });
      video.play();
      this.props.handlePlay && this.props.handlePlay();
    }
    const { curSpeed } = this.state;
    const speed = speeds.indexOf(curSpeed) * 25;
    const newSpeed = speed + 25 * isShortcutKeyChange;
    if (newSpeed > 100) {
      this.handleChangeSpeed('1.0');
    } else if (newSpeed < 0) {
      this.handleChangeSpeed('1.0');
    } else {
      this.handleChangeSpeed(newSpeed === 25 ? '1.0' : marks[newSpeed]);
    }
  }

  render() {
    const {
      style,
      className,
      autoplay = false,
      thumbImageUrl = null,
      id = null,
      loop = false,
      simple = false,
      urls, // 多段视频
      resolution = null, // 分辨率 数组
      // 控制条上上按钮设置 注意 simple模式下 以下功能都不显示 轻易不要使用simple模式
      needExpand = false, // 是否显示浏览器全屏
      needWindowExpand = false, // 是否显示浏览器网页全屏
      needSetting = false, // 是否显示设置功能 倍速设置
      needDownload = false, // 是否显示下载功能
      needVolume = false, // 是否显示音量功能
      needResolution = false, // 是否需要显示分辨率
      needShowError = false, // 是否显示失败文案
    } = this.props;
    let { url } = this.props;
    const {
      isCanPlay,
      isPlay,
      isMuted,
      volume,
      isVideoExpand,
      isVideoWindowExpand,
      isShowSettingPanel,
      currentIndex, // 当前视频
      isHidePoster,
      resolutionType, // 分辨率类型
      isShowResolutionPanel, // 是否显示内容
      resolutionUrl,
      errorText,
    } = this.state;
    if (urls && !url && !!urls[currentIndex]) { url = urls[currentIndex].url; }// eslint-disable-line prefer-destructuring
    // const ossThumbUrl = `${COVER_HOST}?url=${encodeURIComponent(url)}&t=5000&f=jpg&w=532&h=300`;
    // TODO: 设置默认背景图
    const ossThumbUrl = '';
    if (resolutionUrl) {
      url = resolutionUrl;
    }
    url = replaceWithCurrentProtocal(url);
    return (
      <div className={`${styles.videoContainer} ${isVideoWindowExpand ? styles.videoFullWindow : ''}`} onContextMenu={this.disableContextMenu}>
        <div
          className={`${styles.video} ${isVideoExpand ? styles.isVideoExpand : ''} ${isPlay ? styles.isPlay : ''} ${className || ''}`}
          ref={ref => { this.videoWrapRef = ref; }} // eslint-disable-line react/no-string-refs
          style={style}
        >
          {!(needShowError && errorText) && !isCanPlay && (
            <div className={styles.isCanPlay}>
              <div className={styles.loading}>
                <div className={styles.rotateLoader} />
              </div>
            </div>
          )}
          {needShowError && errorText && (
            <div className={styles.errorText}>
              <span>{errorText}</span>
            </div>
          )}
          <HVideo
            ref="video" // eslint-disable-line react/no-string-refs
            src={url}
            poster={isHidePoster ? '' : (thumbImageUrl || ossThumbUrl)}
            autoPlay={autoplay}
            loop={loop}
            onClick={this.play}
          />
          <div className={styles.videoControls}>
            <div className={styles.videoProgress}>
              <Slider tipFormatter={null} onChange={this.mouseDownVideo} value={this.state.percent} step={this.framesPer} />
              <div
                className={styles.videoProgressLoad}
                style={{
                  width: `${this.state.load}%`,
                }}
              />
            </div>
            <div className={styles.videoPlayBtn} onClick={this.play}>
              {!this.state.isPlay && (
                <img src={play} alt="播放" />
              )}
              {this.state.isPlay && (
                <img src={pause} alt="暂停" />
              )}
            </div>
            {this.state.duration && (
              <div className={styles.videoTimes}>
                <span className={styles.videoNowTime}>{this.state.currentTime}</span>
                <span className={styles.videoAllTimes}>
                  ／
                  {this.state.duration}
                </span>
              </div>
            )}
            {!simple && needExpand && !isVideoExpand && (
              <div className={styles.videoBarBtn} onClick={this.videoExpand}>
                <img src={IFullScreen} alt="全屏" style={{ width: 16, height: 16, marginTop: -8 }} />
              </div>
            )}
            {!simple && needExpand && isVideoExpand && (
              <div className={styles.videoBarBtn} onClick={this.videoReduce}>
                <img src={IReduceScreen} alt="取消全屏" style={{ width: 16, height: 16, marginTop: -8 }} />
              </div>
            )}

            {!simple && needWindowExpand && !isVideoWindowExpand && (
              <div className={styles.videoBarBtn} onClick={this.videoWindowExpand}>
                <img src={IFullWindow} alt="网页全屏" style={{ width: 16, height: 16, marginTop: -8 }} />
              </div>
            )}
            {!simple && needWindowExpand && isVideoWindowExpand && (
              <div className={styles.videoBarBtn} onClick={this.videoWindowReduce}>
                <img src={IReduceWindow} alt="取消网页全屏" style={{ width: 16, height: 16, marginTop: -8 }} />
              </div>
            )}

            {isShowSettingPanel && (
              <div className={styles.settingPanel}>
                <div className={styles.playBackRateBox}>
                  <p className={styles.playBackRateDesc}>播放速度</p>
                  <Slider
                    included={false}
                    marks={marks}
                    step={25}
                    value={speeds.indexOf(this.state.curSpeed) * 25}
                    onChange={(v) => this.handleChangeSpeed(v === 25 ? '1.0' : marks[v])}
                    tipFormatter={null}
                  />
                </div>
              </div>
            )}
            {!simple && needSetting && (
              <div className={styles.videoBarBtn} onClick={this.triggerSettingPanel}>
                <img src={ISetting} alt="设置" style={{ width: 20, height: 20, marginTop: -10 }} />
              </div>
            )}
            {!simple && needDownload && id && url && (
              <Popconfirm
                title={this.renderDownload()}
                okText="确定 "
                cancelText="取消 "
                onCancel={this.closeVisibleDownload}
                onConfirm={this.beforeDownload}
                placement="top"
              >
                <div className={styles.videoBarBtn} onClick={() => this.getCheckDownloadCount()}>
                  <img src={IDownload} alt="下载" style={{ width: 16, height: 16, marginTop: -8 }} />
                </div>
              </Popconfirm>
            )}

            {!simple && needResolution && resolution && (
              <div className={styles.videoBarBtn} style={{ width: 60 }} onClick={this.triggerResolutionPanel}>
                <span>{resolutionType}</span>
                {isShowResolutionPanel && (
                  <div className={styles.resolutionPanel}>
                    {(resolution || []).map((item, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <div key={index} className={styles.resolutionItem} onClick={() => this.changeResolution(item)}>
                        {item.type}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {!simple && needVolume && (
              <div className={styles.volumeBarBtn}>
                <div className={styles.volumeBar}>
                  <Slider tipFormatter={null} onChange={this.setVolume} value={isMuted ? 0 : volume} />
                </div>
              </div>
            )}
            {!simple && needVolume && !isMuted && (
              <div className={styles.videoBarBtn} onClick={this.enableMute}>
                <img src={IVolumeFull} alt="声音" style={{ width: 20, height: 20, marginTop: -10 }} />
              </div>
            )}
            {!simple && needVolume && isMuted && (
              <div className={styles.videoBarBtn} onClick={this.disableMute}>
                <img src={IVolumeMute} alt="静音" style={{ width: 20, height: 20, marginTop: -10 }} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {
  };
};

export default connect(mapStateToProps, null, null)(MVideo);
