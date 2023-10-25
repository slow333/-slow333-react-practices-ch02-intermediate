import {useEffect, useState} from "react";
import NavBar, {NumResult, SearchInput} from "./NavBar";
import {LoadingMovie, MovieList} from "./ListBox";
import {WatchedMovieList, WatchedSummary} from "./WatchedBox";
import Main, {Box} from "./Main";
import StartRating from "./StartRating";

const key = "7c0d2be6"

export default function UsePopcornApp() {

  const [queryMovies, setQueryMovies] = useState([])
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedId, setSelectedId] = useState(null)
  const [total, setTotal] = useState("")

  const searchUrl = `http://www.omdbapi.com/?apikey=${key}&s=${query}`

  function handleQuery(value) {
    setQuery(value)
  }

  useEffect(function () {
    async function fetchMovies() {
      try {
        setLoading(true)
        setError("") // 기존 설정한 error 값을 갖고 있어 계속 error 메세지만 나옮
        const res = await fetch(searchUrl)
        if (!res.ok)  throw new Error("Something went wrong .... ??? ^.^;;;")

        const data = await res.json()
        if(data.Response === "False") throw new Error("Movie not found")
        setQueryMovies(data.Search)
        setTotal(data.totalResults)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    // 초기화 관련
    if(query.length < 2) {
      setQueryMovies([])
      setError("")
      return;
    }
    fetchMovies();
    }, [ query ]);

  function handleDetailId(id) {
    setSelectedId(id)
  }
  function handleCloseDetail() {
    setSelectedId(null)
  }

  function handleAddWatched(movie) {
    setWatched(movies =>  [ ...movies, movie ] )
  }

  function handleDeleteWatched(id) {
    setWatched(movies => {
      return movies.filter(movie =>  movie.imdbID !== id) } )
  }

  return (
       <>
         <NavBar>
           <SearchInput query={ query }
                        onQuery={ handleQuery }/>
           <NumResult searchCount={ total }/>
         </NavBar>
         <Main>
           <Box>
             { loading && <LoadingMovie/> }
             { (!loading && !error) &&
                  <MovieList movies={ queryMovies } onSelectedId={handleDetailId}/>}
             { error && <ErrorMessage message={ error }/> }
           </Box>
           <Box>
             { selectedId ?
                  <DetailView onCloseDetail={handleCloseDetail}
                              selectedId={selectedId}
                              onAddWatched={handleAddWatched}
                              key={selectedId}
                              watched={watched}
                  /> : <>
               <WatchedSummary watched={ watched }/>
               <WatchedMovieList watched={ watched}
                                 onDeleteWatched={handleDeleteWatched}/> </>
             }
           </Box>
         </Main>
       </>
  );
}

function DetailView({onCloseDetail, selectedId, onAddWatched, watched}) {

  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating]= useState(0)

  const isWatched = watched.map(m => m.imdbID).includes(selectedId)
  const watchedUserRating = watched.find(m => m.imdbID === selectedId)?.userRating

  const { Title: title, Poster: poster, Plot: plot, Year: year, Runtime: runtime,
    Actors: actor, Genre: genre, Director: director, Released: released, imdbID, imdbRating
  } = movie;

  const detailUrl = `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`

  useEffect(() => {
    async function getDetail() {
      setIsLoading(true)
      const res = await fetch(detailUrl)
      const data = await res.json()
      setMovie(data)
      setIsLoading(false)
    }
    getDetail()
  }, [selectedId]);

  useEffect(() => {
    if(!title) return
    document.title = `| ${title} |`
  }, [title]);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId, title, year, poster,
      imdbRating: Number(imdbRating),
      runtime : Number(runtime.split(" ").at(0)),
      userRating
    }
    // newWatchedMovie["userRating"] = userRating;
    onAddWatched(newWatchedMovie)
    onCloseDetail();
  }
  function handleUserRating(rating) {
    setUserRating(rating)
  }

  return <div className='details'>
    {isLoading ? <LoadingMovie/> :
    <>
      <header >
        <button onClick={onCloseDetail} className='btn-back'>	&larr;</button>
        <img src={poster} alt={`${title} poster`}/>
        <div className="details-overview">
          <h2>{title}</h2>
          <p>{released} &bull; {runtime}</p>
          <p>{genre}</p>
          <p><span>⭐️</span>{imdbRating} IMDb rating </p>
        </div>
      </header>
      <section className=''>
        <div className="rating">
          { isWatched ?
               <div>이미 <em style={{fontSize: "26px"}}>{watchedUserRating}🌟</em>로 평가했습니다.</div> :<>
                 <StartRating onUserRating={handleUserRating} rating={userRating}/>
                 {userRating > 0 &&
                      <button className='btn-add'
                              onClick={handleAdd}>+ ADD to list</button> }
               </>
          }
        </div>
        <p><em>{plot}</em></p>
        <p>actors : {actor}</p>
        <p>director : {director}</p>
      </section>

    </>}
  </div>
}

function ErrorMessage({message}) {
  return <div className={'error'}>
    <span> ⛔ ⛔ </span> {message}
  </div>
}