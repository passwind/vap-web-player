import React, { useEffect, useRef, useState } from 'react';
import Vap from 'video-animation-player';

function App() {
  const containerRef = useRef(null);
  const vapInstanceRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [urlParams, setUrlParams] = useState({ src: '', config: '' });
  const [isPlaying, setIsPlaying] = useState(false);

  // 解析URL参数
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const src = searchParams.get('src') || '';
    const config = searchParams.get('config') || '';
    
    setUrlParams({ src, config });
    
    if (!src) {
      setError('请在URL中提供src参数，例如: ?src=your-video-url.mp4');
      setLoading(false);
      return;
    }

    initVapPlayer(src, config);
  }, []);

  const initVapPlayer = async (src, config) => {
    try {
      setLoading(true);
      setError(null);

      // 销毁之前的实例
      if (vapInstanceRef.current) {
        vapInstanceRef.current.destroy();
        vapInstanceRef.current = null;
      }

      // 清空容器内容，防止重复渲染
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      // 解析config参数
      let configObj = {};
      if (config) {
        try {
          // 如果config是URL，尝试获取JSON
          if (config.startsWith('http')) {
            const response = await fetch(config);
            configObj = await response.json();
          } else {
            // 如果config是JSON字符串，直接解析
            configObj = JSON.parse(decodeURIComponent(config));
          }
        } catch (e) {
          console.warn('Config解析失败，使用默认配置:', e);
        }
      }

      // 从config中获取尺寸和帧率信息
      const configInfo = configObj.info || {};
      const width = configInfo.w || 375;
      const height = configInfo.h || 375;
      const fps = configInfo.fps || 20;

      // 创建VAP实例
      const vapOptions = {
        container: containerRef.current,
        src: src,
        config: configObj,
        width: width,
        height: height,
        fps: fps,
        mute: false,
        loop: true,
        type: 'web-player',
        accurate: true,
        precache: false,
        onLoadError: (err) => {
          console.error('VAP加载错误:', err);
          setError('视频加载失败: ' + (err.message || '未知错误'));
          setLoading(false);
        },
        onDestroy: () => {
          console.log('VAP实例已销毁');
          setIsPlaying(false);
        }
      };

      const vapInstance = new Vap(vapOptions);
      vapInstanceRef.current = vapInstance;

      // 绑定事件
      vapInstance.on('loadstart', () => {
        console.log('开始加载视频');
      });

      vapInstance.on('canplay', () => {
        console.log('视频可以播放');
        setLoading(false);
      });

      vapInstance.on('play', () => {
        console.log('视频开始播放');
        setIsPlaying(true);
      });

      vapInstance.on('pause', () => {
        console.log('视频暂停');
        setIsPlaying(false);
      });

      vapInstance.on('ended', () => {
        console.log('视频播放结束');
        setIsPlaying(false);
      });

      vapInstance.on('error', (err) => {
        console.error('VAP播放错误:', err);
        setError('播放错误: ' + (err.message || '未知错误'));
        setLoading(false);
      });

      // 监听帧事件（可选）
      vapInstance.on('frame', (frameData) => {
        // console.log('当前帧:', frameData);
      });

    } catch (err) {
      console.error('初始化VAP失败:', err);
      setError('初始化失败: ' + err.message);
      setLoading(false);
    }
  };

  const handlePlay = () => {
    if (vapInstanceRef.current) {
      vapInstanceRef.current.play();
    }
  };

  const handlePause = () => {
    if (vapInstanceRef.current) {
      vapInstanceRef.current.pause();
    }
  };

  const handleRestart = () => {
    if (vapInstanceRef.current) {
      vapInstanceRef.current.setTime(0);
      vapInstanceRef.current.play();
    }
  };

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (vapInstanceRef.current) {
        vapInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>VAP Web Player</h1>
        <p>基于VAP的React视频动画播放器</p>
      </div>

      {/* 显示当前URL参数 */}
      <div className="url-params">
        <strong>当前参数:</strong><br />
        src: {urlParams.src || '未提供'}<br />
        config: {urlParams.config || '未提供'}
      </div>

      {/* 错误信息 */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* 播放器容器 */}
      <div className="player-container">
        {loading && !error && (
          <div className="loading">正在加载视频...</div>
        )}
        <div ref={containerRef} style={{ display: loading ? 'none' : 'block' }}></div>
      </div>

      {/* 控制按钮 */}
      {!loading && !error && (
        <div className="controls">
          <button onClick={handlePlay} disabled={isPlaying}>
            播放
          </button>
          <button onClick={handlePause} disabled={!isPlaying}>
            暂停
          </button>
          <button onClick={handleRestart}>
            重新开始
          </button>
        </div>
      )}

      {/* 使用说明 */}
      <div style={{ marginTop: '40px', padding: '20px', background: 'white', borderRadius: '8px' }}>
        <h3>使用说明:</h3>
        <p>在URL中添加以下参数来播放视频:</p>
        <ul>
          <li><strong>src</strong>: MP4视频文件的URL (必需)</li>
          <li><strong>config</strong>: VAP配置JSON的URL或JSON字符串 (可选)</li>
        </ul>
        <p><strong>示例:</strong></p>
        <code>
          ?src=https://example.com/video.mp4&config=https://example.com/config.json
        </code>
      </div>
    </div>
  );
}

export default App;