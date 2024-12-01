'use client';

import { useTranslation } from "react-i18next";
import "./VideoFrame.css";

export default function VideoFrame() {

  const handleContextMenu = (event: React.MouseEvent<HTMLVideoElement>) => {
    event.preventDefault();
  };

  const { t } = useTranslation("home");

  return (
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

      {/* <details>
        <summary
          aria-controls="transcript_content_desktop"
          tabIndex={0}
          aria-expanded="false"
          className="video-description-button"
        >
          {t('home.video.summary')}
        </summary>
        <div
          aria-live="off"
          aria-atomic="true"
          aria-relevant="all"
          tabIndex={0}
          aria-expanded="false"
          role="article"
          className="video-description-content"
          id="transcript_content_desktop"
        >
          {t('home.video.content')}
        </div>
      </details> */}
    </figure>
  );
};
