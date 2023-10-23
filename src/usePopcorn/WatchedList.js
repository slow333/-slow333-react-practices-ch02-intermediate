import {useState} from "react";
import {tempWatchedData} from "./PopcornData";
import {ToggleButton} from "./MovieList";

const average = (arr) =>
     arr.reduce((acc, cur) => (acc + cur), 0) / arr.length;

function WatchedList() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
       <div className="box">
         <ToggleButton onToggle={() => setIsOpen2(pre => !pre)}
         isOpen={isOpen2}/>

         {isOpen2 && (
              <>
                <Summary watched={watched}/>
                <WatchedMovies watched={watched}/>
              </>
         )}
       </div>
  );
}
function WatchedMovies ({watched}) {
  return <ul className="list">
    {watched.map((movie) => (
         <WatchedMovie movie={movie}/>
    ))}
  </ul>
}
function WatchedMovie({movie}) {
  return <li key={movie.imdbID}>
    <img src={movie.Poster} alt={`${movie.Title} poster`}/>
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
    </div>
  </li>
}
function Summary({watched}) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
       <div className="summary">
         <h2>Movies you watched</h2>
         <div>
           <p>
             <span>#️⃣</span>
             <span>{watched.length} movies</span>
           </p>
           <p>
             <span>⭐️</span>
             <span>{avgImdbRating}</span>
           </p>
           <p>
             <span>🌟</span>
             <span>{avgUserRating}</span>
           </p>
           <p>
             <span>⏳</span>
             <span>{avgRuntime} min</span>
           </p>
         </div>
       </div>
  )
}

export default WatchedList