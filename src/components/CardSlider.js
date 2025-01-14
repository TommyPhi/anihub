import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Card from "../components/Card";
import "../css/CardSlider.css";

export default function CardSlider(props) {
  const [status, setStatus] = useState(props.status);
  const [isSeasonal, setIsSeasonal] = useState(props.isSeasonal);
  const [data, setData] = useState([]);
  const slider = useRef(null);
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = months[currentDate.getMonth() - 1];
  console.log(currentMonth);
  let currentSeason;

  if (
    currentMonth === "March" ||
    currentMonth === "April" ||
    currentMonth === "May"
  ) {
    currentSeason = "SPRING";
  } else if (
    currentMonth === "June" ||
    currentMonth === "July" ||
    currentMonth === "August"
  ) {
    currentSeason = "SUMMER";
  } else if (
    currentMonth === "September" ||
    currentMonth === "October" ||
    currentMonth === "November"
  ) {
    currentSeason = "FALL";
  } else if (
    currentMonth === "December" ||
    currentMonth === "January" ||
    currentMonth === "February"
  ) {
    currentSeason = "WINTER";
  } else {
    currentSeason = null;
  }

  const scroll = (scrollOffset) => {
    slider.current.scrollLeft += scrollOffset;
  };

  useEffect(() => {
    axios
      .post("https://graphql.anilist.co", {
        query: `
                query($page: Int = 1){
                    Page (page: $page, perPage: 15) {
                      pageInfo {
                        total
                        currentPage
                        lastPage
                        hasNextPage
                        perPage
                      }
                    media (isAdult: false, type: ANIME, sort: POPULARITY_DESC, status: ${status}, ${
          isSeasonal ? `season: ${currentSeason}` : ""
        }) {
                      title {
                        english
                        romaji
                        native
                      }
                      coverImage {
                        extraLarge
                        color
                      }
                      description
                      bannerImage
                      genres
                      }
                    }
                  }
                `,
        headers: {},
      })
      .then(function (response) {
        setData(response.data.data.Page.media);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("done");
      });
  }, []);

  return (
    <div class="card-slider-container">
      <div className="card-slider-btns">
        <div class="nav-container-left card-slider-nav-container">
          <button
            onClick={() => {
              scroll(-650);
            }}
            className="card-slider-nav-left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="white"
              class="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>
          </button>
        </div>
        <div class="nav-container-right card-slider-nav-container">
          <button onClick={() => scroll(650)} className="card-slider-nav-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="white"
              class="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        class="container-fluid d-flex pt-3 card-slider slider-bg"
        ref={slider}
      >
        <div class="d-flex justify-content-center text-start">
          {data.map((anime, index) => (
            <Card
              key={index}
              cardImage={anime.coverImage.extraLarge}
              animeColor = {anime.coverImage.color}
              animeTitle={
                anime.title.english ? anime.title.english : anime.title.romaji
              }
              description = {anime.description.replace(/<[^>]+>|\\n|\\r/g, '')}
              bannerImage = {anime.bannerImage}
              genres = {anime.genres}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
