import React, { useState, useEffect } from "react";
import axios from "axios";
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
      <section class="pb-5 position-relative">
        <div class="container pt-5">
          <div class="row align-items-center justify-content-center mb-5">
            <div class="col-12 col-md-10 col-lg-5 mb-5 mb-lg-0">
              <div class="mb-5">
                <h2 class="display-4 fw-bold" style={{color: "#320b57"}}>Welcome to AniHub!</h2>
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
        <div class="custom-shape-divider-bottom-1710061304">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
      
      <div class="text-light py-4" style={{ backgroundColor: "#320b57" }}>
        <div class="container-fluid ps-4">
          <h1 class="display-5 fw-bold" style={{color: "#7e2ac3"}}>Upcoming Anime</h1>
          <p>
            Look forward to these new and upcoming series or new seasons of your
            favorite anime!
          </p>
        </div>
        <CardSlider status="NOT_YET_RELEASED" />
      </div>

      <div class="text-light py-4" style={{ backgroundColor: "#320b57" }}>
        <div class="container-fluid ps-4">
          <h1 class="display-5 fw-bold" style={{color: "#7e2ac3"}}>Seasonal Favorites</h1>
          <p>
            Check out these shows that are making waves during this current airing season!
          </p>
        </div>
        <CardSlider status="RELEASING" isSeasonal = {true} />
      </div>

      <div class="text-light py-4" style={{ backgroundColor: "#320b57" }}>
        <div class="container-fluid ps-4">
          <h1 class="display-5 fw-bold" style={{color: "#7e2ac3"}}>Top Rated</h1>
          <p>
            These are the best of the best, expect greatness when starting these shows or movies!
          </p>
        </div>
        <CardSlider status="FINISHED" />
      </div>

    </div>
  );
}
