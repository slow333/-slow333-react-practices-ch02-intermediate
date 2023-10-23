import {useEffect, useState} from "react";
import {tempMovieData, tempWatchedData} from "./PopcornData";
import NavBar, {Logo, NumResult, SearchInput} from "./NavBar";
import  {MovieList} from "./ListBox";
import  {WatchedMovieList, WatchedSummary} from "./WatchedBox";
import axios from "axios";
import Main, {Box} from "./Main";

export default function UsePopcorn() {

  const [queryMovies, setQueryMovies] = useState([])
  // const [movies, setMovies] = useState(tempMovieData);
  const [query, setQuery] = useState("inception");
  const [watched, setWatched] = useState(tempWatchedData);

  const baseUrl = 'https://moviesdatabase.p.rapidapi.com/titles'

  function handleQuery(value) { setQuery(value) }

  const queryOptions = {
    method: 'GET',
    url: `${baseUrl}/search/keyword/${query}`,
    headers: {
      'X-RapidAPI-Key': '2d26a12669mshf286b9e288f6beap14db0fjsn7487a41c608c',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  }

  useEffect( () => {
    let complete = false;
    async function getQueryData () {
      const response = await axios.request(queryOptions)
           .then(response => {
             setQueryMovies(response.data.results)
             console.log("query data", response.data.results)
           })
           .catch(error => console.log(error))
    }
    getQueryData();
    return () => { complete = true}
  }, [query]);

  return (
    <>
      <NavBar>
        <SearchInput query={query}
                     onQuery={(value) => setQuery(value)}/>
        <NumResult movies={queryMovies}/>
      </NavBar>
      <Main>
        <Box >
          <MovieList movies={queryMovies}/>
        </Box>
        <Box>
          <WatchedSummary watched={watched}/>
          <WatchedMovieList watched={watched}/>
        </Box>
      </Main>
    </>
  );
}
