import {
  faPlay,
  faPause,
  faStepBackward,
  faStepForward,
  faVolumeUp,
  faVolumeMute,
  faRepeat,
  faBackward,
  faShuffle,
  faSquarePlus,
  faList,
  faShareNodes,
  faVolumeOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ImageDefault from '../../../assets/imgs/noded.jpg'

export default function PlayBar() {
  const musicURL = useSelector((st) => st.postURL);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  var audioRef = useRef(new Audio());
  useEffect(() => {
    audioRef.current.src = musicURL.musicSource;
    if(audioRef.current.src == "")
    {
      setIsPlaying(false);
    }
    else
    {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [musicURL]);
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const handlePrev = () => {
    // Implement your logic for handling previous track
  };

  const handleNext = () => {
    // Implement your logic for handling next track
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(false);
  };

  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    audioRef.current.volume = newMutedState ? 0 : volume;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  useEffect(() => {
    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioRef.current.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const handleSeek = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    let interval;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };
  return (
    <>
      <div className="play-music flex items-center pl-[20px] pr-[20px] justify-between w-full h-[80px] bg-black">
        <div className="song-info flex items-center gap-2 w-[25%]">
          <img
            src={musicURL.musicImage || ImageDefault}
            className="w-[50px] h-[50px] border-white border-2 object-cover"
            alt=""
          />
          <div className="song-name flex flex-col">
            <Link className="text-white capitalize">{musicURL.musicName}</Link>
            <Link className="text-white capitalize text-xs">{musicURL.musicAuthor}</Link>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="text-white text-xl hover:text-[#00ff00] transition"
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button
              type="button"
              className="text-white text-xl hover:text-[#00ff00] transition"
            >
              <FontAwesomeIcon icon={faShareNodes} />
            </button>
          </div>
        </div>
        <div className="music-controll w-[50%] flex flex-col items-center">
          <div className="music-btn-controll flex w-full justify-center gap-5">
            <button
              type="button"
              className="text-white text-3xl hover:text-[#00ff00] transition"
            >
              <FontAwesomeIcon icon={faRepeat} />
            </button>
            <button
              type="button"
              onClick={handlePrev}
              className="text-white text-3xl hover:text-[#00ff00] transition"
            >
              <FontAwesomeIcon icon={faStepBackward} />
            </button>
            <button
              type="button"
              onClick={handlePlayPause}
              className="text-white text-3xl hover:text-[#00ff00] transition"
            >
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="text-white text-3xl hover:text-[#00ff00] transition"
            >
              <FontAwesomeIcon icon={faStepForward} />
            </button>
            <button
              type="button"
              className="text-white text-3xl hover:text-[#00ff00] transition"
            >
              <FontAwesomeIcon icon={faShuffle} />
            </button>
          </div>
          <div className=" text-white music-range gap-2 w-full flex justify-center">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              onChange={handleSeek}
              max={duration}
              min="0"
              step="1"
              value={currentTime}
              className="w-[80%] hover:bg-[#00ff00] cursor-pointer"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div className="w-[25%] flex justify-end gap-2">
          <button
            type="button"
            className="text-white text-xl hover:text-[#00ff00] transition"
          >
            <FontAwesomeIcon icon={faSquarePlus} />
          </button>
          <button
            type="button"
            className="text-white text-xl hover:text-[#00ff00] transition"
          >
            <FontAwesomeIcon icon={faList} />
          </button>
          <button
            type="button"
            onClick={handleMuteToggle}
            className="text-white text-xl hover:text-[#00ff00] transition"
          >
            <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
          </button>
          <input
            type="range"
            onChange={handleVolumeChange}
            min="0"
            max="1"
            step="0.1"
            value={volume}
          />
        </div>
      </div>
    </>
  );
}
