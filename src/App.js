import React, { useEffect, useRef, useState } from 'react';
import Vap from 'video-animation-player';

function App() {
  const containerRef = useRef(null);
  const vapInstanceRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [urlParams, setUrlParams] = useState({ src: '', config: '' });
  const [isPlaying, setIsPlaying] = useState(false);

  // Parse URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const src = searchParams.get('src') || '';
    const config = searchParams.get('config') || '';
    
    setUrlParams({ src, config });
    
    if (!src) {
      setError('Please provide src parameter in URL, e.g.: ?src=your-video-url.mp4');
      setLoading(false);
      return;
    }

    initVapPlayer(src, config);
  }, []);

  const initVapPlayer = async (src, config) => {
    try {
      setLoading(true);
      setError(null);

      // Destroy previous instance
      if (vapInstanceRef.current) {
        vapInstanceRef.current.destroy();
        vapInstanceRef.current = null;
      }

      // Clear container content to prevent duplicate rendering
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      // Parse config parameter
      let configObj = {};
      if (config) {
        try {
          // If config is URL, try to fetch JSON
          if (config.startsWith('http')) {
            const response = await fetch(config);
            configObj = await response.json();
          } else {
            // If config is JSON string, parse directly
            configObj = JSON.parse(decodeURIComponent(config));
          }
        } catch (e) {
          console.warn('Config parsing failed, using default config:', e);
        }
      }

      // Get size and fps info from config
      const configInfo = configObj.info || {};
      const width = configInfo.w || 375;
      const height = configInfo.h || 375;
      const fps = configInfo.fps || 20;

      // Create VAP instance
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
          console.error('VAP loading error:', err);
          setError('Video loading failed: ' + (err.message || 'Unknown error'));
          setLoading(false);
        },
        onDestroy: () => {
          console.log('VAP instance destroyed');
          setIsPlaying(false);
        }
      };

      const vapInstance = new Vap(vapOptions);
      vapInstanceRef.current = vapInstance;

      // Bind events
      vapInstance.on('loadstart', () => {
        console.log('Start loading video');
      });

      vapInstance.on('canplay', () => {
          console.log('Video can play');
          setLoading(false);
        });

     vapInstance.on('playing', () => {
          console.log('Video started playing');
          setIsPlaying(true);
        });

      vapInstance.on('pause', () => {
          console.log('Video paused');
          setIsPlaying(false);
        });

      vapInstance.on('ended', () => {
          console.log('Video playback ended');
          setIsPlaying(false);
        });

      vapInstance.on('error', (err) => {
          console.error('VAP playback error:', err);
          setError('Playback error: ' + (err.message || 'Unknown error'));
          setLoading(false);
        });

      // Listen to frame events (optional)
        vapInstance.on('frame', (frameData) => {
          // console.log('Current frame:', frameData);
        });

    } catch (err) {
        console.error('VAP initialization failed:', err);
        setError('Initialization failed: ' + err.message);
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

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (vapInstanceRef.current) {
        vapInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'transparent',
      margin: 0,
      padding: 0
    }}>
      <div ref={containerRef}></div>
    </div>
  );
}

export default App;