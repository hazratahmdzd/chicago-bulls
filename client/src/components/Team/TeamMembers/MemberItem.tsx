import React from "react";
import "./MemberItem.css";

interface MemberItemProps {
    playerImg: any,
    playerName: string,
    playerNum: string,
  }

const MemberItem: React.FC<MemberItemProps> = ({playerImg,playerName,playerNum}) => {
  return (
    <div className="member-item">
      <h1>{playerNum}</h1>
      <img src={playerImg} alt="player" />

      <div className="bottom">
        <h1>{playerName}</h1>
      </div>
    </div>
  );
};

export default MemberItem;
