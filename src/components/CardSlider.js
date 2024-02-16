import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Card from "../components/Card";
import "../css/CardSlider.css";

export default function CardSlider(props) {
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const slider = useRef(null);

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
                    media (isAdult: false, type: ANIME, sort: POPULARITY_DESC, status: NOT_YET_RELEASED) {
                      title {
                        english
                        romaji
                        native
                      }
                      coverImage {
                        extraLarge
                        color
                      }
                      }
                    }
                  }
                `,
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
    <div>
      <div class="container-fluid d-flex mb-5 pt-3 card-slider slider-bg" ref={slider}>
        <div class="d-flex justify-content-center text-start">
          {data.map((anime, index) => (
            <Card
              key={index}
              cardImage={anime.coverImage.extraLarge}
              animeTitle={
                anime.title.english ? anime.title.english : anime.title.romaji
              }
            />
          ))}
        </div>
      </div>
      <button onClick={() => scroll(-650)}>LEFT</button>
      <button onClick={() => scroll(650)}>RIGHT</button>
    </div>
  );
}
