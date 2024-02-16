import React, {useState, useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Container } from 'react-bootstrap';
import '../css/Slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Slider() {
    const [topAnime, setTopAnime] = useState([]);

    useEffect(() => {
        axios
          .post("https://graphql.anilist.co", {
            query: `
                query($page: Int = 1){
                    Page (page: $page, perPage: 5) {
                      pageInfo {
                        total
                        currentPage
                        lastPage
                        hasNextPage
                        perPage
                      }
                    media (isAdult: false, type: ANIME, sort: POPULARITY_DESC, status: RELEASING) {
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
    <div className='slider-bg'>
      <Carousel fade>
        {topAnime.map((anime, index) => (
          <Carousel.Item key={index} className='d-flex justify-content-center'>
            <img
              className="d-block slider-img"
              src={anime.bannerImage}
              alt={anime.title.english}
            />
            <Carousel.Caption>
              <Container>
                <h3 style={{fontWeight: 'bold'}}>{anime.title.english}</h3>
                <p>{anime.title.native}</p>
              </Container>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}
