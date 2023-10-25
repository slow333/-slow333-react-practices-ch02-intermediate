import {useEffect, useState} from "react";
import NavBar, {NumResult, SearchInput} from "./NavBar";
import {LoadingMovie, MovieList} from "./ListBox";
import {WatchedMovieList, WatchedSummary} from "./WatchedBox";
import Main, {Box} from "./Main";
import ClipLoader from "react-spinners/ClipLoader"

export default function UsePopcornApp() {

  const [queryMovies, setQueryMovies] = useState([])
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const key = "7c0d2be6"
  // const searchUrl = `http://www.omdbapi.com/?apikey=${key}&s=interstellar`
  const searchUrl = `http://www.omdbapi.com/?apikey=${key}&s=${query}`

  function handleQuery(value) {
    setQuery(value)
  }

  useEffect(function () {
    async function fetchMovies() {
      try {
        setLoading(true)
        setError("")
        const res = await fetch(searchUrl)
        if (!res.ok)  throw new Error("Something went wrong .... ??? ^.^;;;")

        const data = await res.json()
        if(data.Response === "False") throw new Error("Movie not found")
        setQueryMovies(data.Search)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    if(query.length < 2) {
      setQueryMovies([])
      setError("")
      return;
    }
    fetchMovies();
    }, [ query ]);

  return (
       <>
         <NavBar>
           <SearchInput query={ query }
                        onQuery={ handleQuery }/>
           <NumResult movies={ queryMovies }/>
         </NavBar>
         <Main>
           <Box>
             { loading && <LoadingMovie/> }
             { (!loading && !error) && <MovieList movies={ queryMovies }/>}
             { error && <ErrorMessage message={ error }/> }
           </Box>
           <Box>
             <WatchedSummary watched={ watched }/>
             <WatchedMovieList watched={ watched }/>
           </Box>
         </Main>
       </>
  );
}

function ErrorMessage({message}) {
  return <div className={'error'}>
    <span> ⛔ ⛔ </span> {message}
  </div>
}