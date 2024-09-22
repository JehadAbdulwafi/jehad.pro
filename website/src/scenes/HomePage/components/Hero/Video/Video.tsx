import React from "react";

//@ts-ignore
import * as styles from "./Video.module.scss";
import { useHomeHeroAssets } from "@hooks/queries";

const Video = () => {
  const { video } = useHomeHeroAssets();
  return (
    <div className={styles.folderContainer}>
      <div className={styles.folderWrapper}>
        <div
          className={styles.folder}
          // style={{ backgroundImage: `url(${imageUrl.publicURL})` }}
        >
          <video autoPlay muted loop src={video.publicURL}></video>
        </div>
      </div>
    </div>
  );
};

export default Video;
