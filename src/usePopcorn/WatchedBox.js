const average = (arr) =>
     arr.reduce((acc, cur) => (acc + cur), 0) / arr.length;

export function WatchedMovieList({ watched, userRating, onDeleteWatched }) {
  return <ul className="list">
    {watched.map((movie) => (
         <WatchedMovie movie={movie} key={movie.imdbID}
                       userRating={userRating}
                       onDeleteWatched={onDeleteWatched}
         />
    ))}
  </ul>
}

function WatchedMovie({movie, onDeleteWatched}) {
  return <li>
    <img src={movie.poster} alt={`${movie.title} poster`}/>
    <h3>{movie.title}</h3>
    {movie &&
         <div>
           <p>
             <span>⭐️</span> <span>{movie.imdbRating}</span>
           </p>
           <p>
             <span>🌟</span> <span>{movie.userRating}</span>
           </p>
           <p>
             <span>⏳</span> <span>{movie.runtime} min</span>
           </p>
           <button className='btn-delete'
                   onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
         </div>
    }
  </li>
}

export function WatchedSummary({watched}) {
  const avgImdbRating = average(watched.map((movie) =>
       movie.imdbRating === "N/A" ? 0 : movie.imdbRating) );
  const avgUserRating = average(watched.map((movie) =>
       parseFloat(movie.userRating)));
  const avgRuntime = average(watched.map((movie) =>
       movie.runtime === "N/A" ? 0 : movie.runtime));

  return <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span> <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span> <span>{avgImdbRating.toFixed(2)}</span>
      </p>
      <p>
        <span>🌟</span> <span>{avgUserRating.toFixed(2) }</span>
      </p>
      <p>
        <span>⏳</span> <span>{parseInt(avgRuntime)} min</span>
      </p>
    </div>
  </div>

}
