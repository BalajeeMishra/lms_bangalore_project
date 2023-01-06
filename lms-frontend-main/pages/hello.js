import React from "react";
import ReactPlayer from "react-player";

const Player = () => {
  return (
    <div className="player-wrapper">
      <ReactPlayer className="react-player" url="https://drive.google.com/file/d/1DW-v-Kpag4Rj-gVQYK75dgLdMp0orWBJ/view?usp=sharings" width="100%" height="100%" />
    </div>
  );
};

export default Player;
