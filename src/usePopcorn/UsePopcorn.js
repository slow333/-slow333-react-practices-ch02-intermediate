import { useState } from "react";
import {tempMovieData, tempWatchedData} from "./PopcornData";
import PopcornNav from "./PopcornNav";
import SearchedList from "./SearchedList";
import SelectedList from "./SelectedList";

export default function UsePopcorn() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <>
      <PopcornNav movies={movies} query={query} onQuery={(value) => setQuery(value)}/>

      <main className="main">
        <SearchedList movies={movies} isOpen1={isOpen1}
                      onOpen1={() => setIsOpen1(open => !open)}/>
        <SelectedList watched={watched} isOpen2={isOpen2}
                      onOpen2={() => setIsOpen2(open => !open)} />
      </main>
    </>
  );
}
