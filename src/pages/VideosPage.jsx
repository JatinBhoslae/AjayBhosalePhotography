import { motion } from "framer-motion";
import { useRef, useState, useContext, useEffect } from "react";
import {
  IoPlayOutline,
  IoPauseOutline,
  IoExpandOutline,
  IoContractOutline,
  IoEllipsisVertical,
  IoDownloadOutline,
} from "react-icons/io5";
import { VideoContext } from "../App";

const videos = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dd4dobz2c/video/upload/q_auto/f_auto/v1781462754/akshay_pooja_mix_vertical_v3gtwj.mp4",
    title: "Akshay & Pooja Wedding",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dd4dobz2c/video/upload/q_auto/f_auto/v1781462735/Sequence_01_1-1_fqe1fx.mp4",
    title: "Prewedding Sequence",
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/dd4dobz2c/video/upload/q_auto/f_auto/v1781461839/shoeab_and_aaisha_p5y2qc.mp4",
    title: "Shoeb & Aaisha",
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/dd4dobz2c/video/upload/q_auto/f_auto/v1781461833/sk_prewedding_satara_02_vr_el5lsz.mp4",
    title: "SK Prewedding Satara",
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dd4dobz2c/video/upload/q_auto/f_auto/v1781461832/piyush_haldi_cinematic_fhczmn.mp4",
    title: "Piyush Haldi Cinematic",
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/dd4dobz2c/video/upload/q_auto/f_auto/v1781461816/akshay_haldi_blqcvc.mp4",
    title: "Akshay Haldi",
  },
  {
    id: 7,
    url: "https://res.cloudinary.com/dd4dobz2c/video/upload/q_auto/f_auto/v1781620008/sachin_03_western_pemht1.mp4",
    title: "Sachin Western",
  },
];

export default function VideosPage() {
  const { setVideoActive } = useContext(VideoContext);
  const videoRefs = useRef([]);
  const [activeVideosCount, setActiveVideosCount] = useState(0);
  const [playingVideos, setPlayingVideos] = useState(videos.map(() => false));
  const [videoProgress, setVideoProgress] = useState(videos.map(() => 0));
  const [videoDuration, setVideoDuration] = useState(videos.map(() => 0));
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const containerRefs = useRef([]);

  const checkActiveVideos = () => {
    let count = 0;
    videoRefs.current.forEach((video) => {
      if (video && !video.muted && !video.paused) {
        count++;
      }
    });
    setActiveVideosCount(count);
    setVideoActive(count > 0);
  };

  const handleVideoPlay = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.muted = false;
      setPlayingVideos((prev) => {
        const newPlaying = [...prev];
        newPlaying[index] = true;
        return newPlaying;
      });
      checkActiveVideos();
    }
  };

  const handleVideoPause = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.muted = true;
      setPlayingVideos((prev) => {
        const newPlaying = [...prev];
        newPlaying[index] = false;
        return newPlaying;
      });
      checkActiveVideos();
    }
  };

  const handleTimeUpdate = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      setVideoProgress((prev) => {
        const newProgress = [...prev];
        newProgress[index] = video.currentTime;
        return newProgress;
      });
    }
  };

  const handleLoadedMetadata = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      setVideoDuration((prev) => {
        const newDuration = [...prev];
        newDuration[index] = video.duration;
        return newDuration;
      });
    }
  };

  const handleSeek = (index, e) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = Number(e.target.value);
      setVideoProgress((prev) => {
        const newProgress = [...prev];
        newProgress[index] = Number(e.target.value);
        return newProgress;
      });
    }
  };

  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  const toggleFullscreen = (index) => {
    const container = containerRefs.current[index];
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullscreenIndex(null);
    } else {
      container.requestFullscreen().then(() => setFullscreenIndex(index)).catch(() => {});
    }
  };

  const handleDownload = (url, title) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = title || 'video';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setMenuOpenIndex(null);
  };

  const handlePiP = async (index) => {
    const video = videoRefs.current[index];
    if (video && document.pictureInPictureEnabled) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await video.requestPictureInPicture();
        }
      } catch (e) { console.log('PiP error:', e); }
    }
    setMenuOpenIndex(null);
  };

  useEffect(() => {
    const handleFSChange = () => {
      if (!document.fullscreenElement) setFullscreenIndex(null);
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => document.removeEventListener('fullscreenchange', handleFSChange);
  }, []);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Cleanup: when page unmounts, set video active to false
    return () => setVideoActive(false);
  }, [setVideoActive]);

  useEffect(() => {
    checkActiveVideos();
  }, [activeVideosCount]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative px-6 pb-20 pt-32 sm:px-8 sm:pt-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl sm:mb-20">
          <p className="text-[10px] uppercase tracking-[0.5em] text-amber-200/60 sm:text-xs">
            Motion Gallery
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-white sm:text-7xl">
            Moments in <br />
            <span className="text-white/40 italic">motion.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/50 sm:text-lg">
            Cinematic highlights and wedding films that tell a story beyond
            still frames.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="aspect-video col-span-2 md:col-span-2 lg:col-span-2"
            >
              <div
                ref={(el) => (containerRefs.current[index] = el)}
                className="group relative w-full h-full overflow-hidden rounded-2xl border border-white/10 bg-black sm:rounded-3xl"
              >
              <div className="w-full h-full flex items-center justify-center">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.url}
                  muted
                  playsInline
                  preload="metadata"
                  className={index < 4 ? "object-cover" : "w-full h-full object-contain"}
                  style={index < 4 ? { width: "56.25%", aspectRatio: "16 / 9", transform: "rotate(-90deg)" } : {}}
                  onPlay={() => handleVideoPlay(index)}
                  onPause={() => handleVideoPause(index)}
                  onTimeUpdate={() => handleTimeUpdate(index)}
                  onLoadedMetadata={() => handleLoadedMetadata(index)}
                  onVolumeChange={checkActiveVideos}
                />
              </div>

              {/* Custom play/pause overlay */}
              <div
                className="video-controls-overlay"
                onClick={() => togglePlay(index)}
              >
                <button
                  type="button"
                  className="video-play-btn"
                  aria-label={playingVideos[index] ? "Pause video" : "Play video"}
                >
                  {playingVideos[index] ? (
                    <IoPauseOutline size={28} />
                  ) : (
                    <IoPlayOutline size={28} />
                  )}
                </button>
              </div>

              {/* Bottom control bar */}
              <div className="video-bottom-bar">
                <button
                  type="button"
                  className="video-bar-btn"
                  onClick={(e) => { e.stopPropagation(); togglePlay(index); }}
                  aria-label={playingVideos[index] ? "Pause" : "Play"}
                >
                  {playingVideos[index] ? <IoPauseOutline size={16} /> : <IoPlayOutline size={16} />}
                </button>

                <span className="video-bar-time">
                  {formatTime(videoProgress[index])}
                </span>

                <div className="video-bar-progress">
                  <div
                    className="video-bar-progress-fill"
                    style={{ width: videoDuration[index] ? `${(videoProgress[index] / videoDuration[index]) * 100}%` : '0%' }}
                  />
                </div>

                <span className="video-bar-time">
                  {formatTime(videoDuration[index])}
                </span>

                <button
                  type="button"
                  className="video-bar-btn"
                  onClick={(e) => { e.stopPropagation(); toggleFullscreen(index); }}
                  aria-label={fullscreenIndex === index ? "Exit fullscreen" : "Fullscreen"}
                >
                  {fullscreenIndex === index ? <IoContractOutline size={16} /> : <IoExpandOutline size={16} />}
                </button>

                <div className="video-bar-menu-wrap">
                  <button
                    type="button"
                    className="video-bar-btn"
                    onClick={(e) => { e.stopPropagation(); setMenuOpenIndex(menuOpenIndex === index ? null : index); }}
                    aria-label="More options"
                  >
                    <IoEllipsisVertical size={16} />
                  </button>
                  {menuOpenIndex === index && (
                    <div className="video-bar-dropdown">
                      <button type="button" onClick={(e) => { e.stopPropagation(); handleDownload(video.url, video.title); }}>
                        <IoDownloadOutline size={14} /> Download
                      </button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); handlePiP(index); }}>
                        <IoExpandOutline size={14} /> Picture-in-Picture
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              <div className="absolute bottom-10 left-4 right-4 text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                <p className="font-display text-sm font-medium">
                  {video.title}
                </p>
              </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.main>
  );
}
