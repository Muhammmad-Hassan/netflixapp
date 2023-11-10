import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
const url = "https://api.themoviedb.org/3";
const imgurl = "https://image.tmdb.org/t/p/original";
const apikey = "888fc2b41a3061e6e5532f7598c5425a";
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"
const upcoming = "upcoming";
const nowplaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h3>{title}</h3>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgurl}${item.backdrop_path}`} />
      ))}
    </div>
  </div>
);


function Home() {
  const [upcomingMovies, setUpComingMovies] = useState([]);
  const [nowPlayingMovies, setNowplyingMovies] = useState([]);
  const [PopularMovies, setPopularMovies] = useState([]);
  const [TopRatedMovies, setTopratedMovies] = useState([]);
  console.log(PopularMovies[0]);

  useEffect(() => {
    const fetchUpComing = async () => {
      const result = await axios.get(
        `${url}/movie/${upcoming}?api_key=${apikey}`
      );
      console.log(result.data.results);
      setUpComingMovies(result.data.results);
      // console.log(upcomingMovies)
    };
    const fetchNowPlying = async () => {
      const result = await axios.get(
        `${url}/movie/${nowplaying}?api_key=${apikey}`
      );
      console.log(result.data.results);
      setNowplyingMovies(result.data.results);
      // console.log(upcomingMovies)
    };
    const fetchPopular = async () => {
      const result = await axios.get(
        `${url}/movie/${popular}?api_key=${apikey}`
      );
      console.log(result.data.results);
      setPopularMovies(result.data.results);
      // console.log(upcomingMovies)
    };
    const fetchTopRated = async () => {
      const result = await axios.get(
        `${url}/movie/${topRated}?api_key=${apikey}`
      );
      console.log(result.data.results);
      setTopratedMovies(result.data.results);
      // console.log(upcomingMovies)
    };
    fetchUpComing();
    fetchNowPlying();
    fetchPopular();
    fetchTopRated();
  }, []);
  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: PopularMovies[0]
            ? `url(${`${imgurl}/${PopularMovies[7].backdrop_path}`})`
            : "none",
        }}
      >
        {PopularMovies[0] && <h1>{PopularMovies[0].original_title}</h1>}

        {PopularMovies[0] && <p>{PopularMovies[0].overview}</p>}
        <div>
          <button><BiPlay/>Play</button>
          <button>My List<AiOutlinePlus/></button>
        </div>
      </div>
      <Row title={"UpComing Movies"} arr={upcomingMovies} />
      <Row title={"NowPlaying"} arr={nowPlayingMovies} />
      <Row title={"Popular"} arr={PopularMovies} />
      <Row title={"Top Rated"} arr={TopRatedMovies} />
    </section>
  );
}

export default Home;
