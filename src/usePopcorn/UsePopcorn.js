import { useState } from "react";
import {tempMovieData, tempWatchedData} from "./PopcornData";
import NavBar from "./NavBar";
import MovieList from "./MovieList";
import WatchedList from "./WatchedList";

export default function UsePopcorn() {

  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <NavBar movies={movies}/>
      <main className="main">
        <MovieList movies={movies}/>
        <WatchedList />
      </main>
    </>
  );
}
