import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "../components/Slider";
import anihubHime from "../assets/images/anihub.png";
import Form from "react-bootstrap/Form";
import CardSlider from "../components/CardSlider";
import "../css/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [topAnime, setTopAnime] = useState([]);

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
                media (isAdult: false, sort: POPULARITY_DESC) {
                  title {
                    english
                    romaji
                    native
                  }
                  coverImage {
                    large
                    color
                  }
                  bannerImage
                  }
                }
              }
            `,
      })
      .then(function (response) {
        setTopAnime(response.data.data.Page.media);
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
      <section class="pb-5">
        <div class="container pt-5">
          <div class="row align-items-center justify-content-center mb-5">
            <div class="col-12 col-md-10 col-lg-5 mb-5 mb-lg-0">
              <div class="mb-5">
                <h2 class="display-4 fw-bold">Welcome to AniHub!</h2>
                <p>Your one stop shop for all your anime/manga needs!</p>
              </div>
              <Form.Control
                type="text"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="Search for anime or manga"
                className="form-control-lg home-search"
                autoComplete="off"
              />
            </div>
            <div class="col-12 col-lg-6 offset-lg-1">
              <img class="img-fluid" src={anihubHime} alt="AniHub Hime" />
            </div>
          </div>
        </div>
      </section>
      <Slider />
      <div class="container-fluid my-4">
        <h1 class="display-5 fw-semibold">Upcoming Anime</h1>
        <p>Look forward to these new and upcoming series or new seasons of your favorite anime!</p>
      </div>
      <CardSlider />
    </div>
  );
}
