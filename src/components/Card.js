import React from "react";
import "../css/Card.css";

export default function Card(props) {
  return (
    <div class="mx-2">
      <div
        class="card my-1"
        style={{
          background: `url('${props.cardImage}') no-repeat center/cover`,
        }}
      >
      </div>
      <small>{props.animeTitle}</small>
    </div>
  );
}
