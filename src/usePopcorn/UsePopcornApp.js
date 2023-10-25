import {useEffect, useState} from "react";
import NavBar, {NumResult, SearchInput} from "./NavBar";
import {LoadingMovie, MovieList} from "./ListBox";
import {WatchedMovieList, WatchedSummary} from "./WatchedBox";
import Main, {Box} from "./Main";
import StarRating from "./StarRating";

const key = "7c0d2be6"

export default function UsePopcornApp() {

  const [queryMovies, setQueryMovies] = useState([])
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchedTotal, setSearchedTotal] = useState("")
  const [selectedId, setSelectedId] = useState(null)

  const searchUrl = `http://www.omdbapi.com/?apikey=${key}&s=${query}`

  function handleQuery(value) { setQuery(value) }

  useEffect(function () {
    async function fetchMovies() {
      try {
        setLoading(true)
        setError("")
        const res = await fetch(searchUrl)
        if (!res.ok)
          throw new Error("Something went wrong .... ??? ^.^;;;")

        const data = await res.json()
        if(data.Response === "False")
          throw new Error("Movie not found")
        setQueryMovies(data.Search)
        setSearchedTotal(data.totalResults)
        console.log(data.Search)
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

  function handleSelectId(id) {
    setSelectedId(selectedId => (id === selectedId) ? null : id)
  }
  function handleCloseMovie() {
    setSelectedId(null)
  }

  return (
       <>
         <NavBar>
           <SearchInput query={ query }
                        onQuery={ handleQuery }/>
           <NumResult foundResults={ searchedTotal }/>
         </NavBar>
         <Main>
           <Box>
             { loading && <LoadingMovie/> }
             { (!loading && !error) &&
               <MovieList movies={ queryMovies }
                          onSelectId={handleSelectId}/>}
             { error && <ErrorMessage message={ error }/> }
           </Box>
           <Box>
             { selectedId ? <MovieDetails
                 selectedId={selectedId} onCloseMovie={handleCloseMovie}/>
               : <>
                 <WatchedSummary watched={ watched }/>
               <WatchedMovieList watched={ watched }/>
               </>
             }
           </Box>
         </Main>
       </>
  );
}

function MovieDetails({selectedId, onCloseMovie}) {

  const [selectedMovie, setSelectedMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { Title: title, Year: year, Poster: poster, Runtime: runtime,
    imdbRating, Plot: plot, Released: released, Actors: actors,
    Director: director, Genre: genre
  } = selectedMovie;
  const selectUrl = `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true)
      const res = await fetch(selectUrl)
      const data = await res.json()
      setSelectedMovie(data)
      setIsLoading(false)
    }
    getMovieDetails();
  }, [ selectedId ]);

  return <div className='details'>
    {isLoading ? <LoadingMovie/> : <>
      <header>
        <button className='btn-back' onClick={onCloseMovie}> &larr;</button>
        <img src={poster} alt={`${title} poster`}/>
        <div className="details-overview">
          <h2>{title}</h2>
          <p>{released} &bull; {runtime}</p>
          <p>{genre}</p>
          <p><span>⭐️</span>{imdbRating} IMDb rating </p>
        </div>
      </header>
      <section>
        <div className='rating'>
          <StarRating size={24} maxRating={10}/>
        </div>
        <p><em>{plot}</em></p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </>}

  </div>
}

function ErrorMessage({message}) {
  return <div className={'error'}>
    <span> ⛔ ⛔ </span> {message}
  </div>
}