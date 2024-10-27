import React from "react";
import "../css/Card.css";

export default function Card(props) {
  function darkenHexColor(hex, percent) {
    hex = toString(hex)

    // Remove the hash (#) if it exists
    hex = hex.replace(/^#/, '');

    // Convert 3-digit hex to 6-digit hex (e.g., #abc -> #aabbcc)
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    // Convert hex to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Calculate the darkened RGB values by decreasing brightness by the given percentage
    r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent / 100))));
    g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent / 100))));
    b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent / 100))));

    // Convert the darkened RGB values back to hex
    const newHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

    return newHex;
  }

  return (
    <div class="mx-2">
      <div
        class="card my-1"
        style={{
          background: `url('${props.cardImage}') no-repeat center/cover`,
        }}
      >
        <div class="card-body">
          <div class="card-banner">
            <img src={props.bannerImage}></img>
          </div>
          <div class="card-info">
            <h1>{props.animeTitle}</h1>
            <p>{props.description}</p>
            <div class="genres">
              {props.genres.map((genre) => (
                <small class="genre" style={{backgroundColor: props.animeColor}}>{genre}</small>
              ))}
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}
