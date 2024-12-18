"use client"

import "./VideoFrame.css";

export default function VideoFrame() {

  const handleContextMenu = (event: React.MouseEvent<HTMLVideoElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <h1 className="title-home-video">SpaceXplorer - The beginning of something huge 💫</h1>
      <figure className="video-container">
        <video
          src="https://www.dropbox.com/scl/fi/ywx7cnptz0wxghra8byqt/spaceXplorer.mp4?rlkey=6ux574yydma6r36wya8iun73l&st=qe36canm&raw=1"
          muted
          autoPlay
          preload="auto"
          controls
          loop
          className="video-content"
          controlsList="nodownload"
          playsInline
          onContextMenu={handleContextMenu}
        ></video>
      </figure>
    </>
  );
};
