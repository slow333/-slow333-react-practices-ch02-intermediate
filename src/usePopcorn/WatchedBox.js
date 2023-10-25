const average = (arr) =>
     arr.reduce((acc, cur) => (acc + cur), 0) / arr.length;

export function WatchedMovieList({ watched }) {
  return <ul className="list">
    {watched.map((movie) => (
         <WatchedMovie movie={movie} key={movie.imdbID}/>
    ))}
  </ul>
}

function WatchedMovie({movie}) {
  console.log(movie[0])
  return <li>
    <img src={movie.Poster} alt={`${movie.Title} poster`}/>
    <h3>{movie.Title}</h3>

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
       </div>

  </li>
}

export function WatchedSummary({watched}) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span> <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span> <span>{avgImdbRating ? avgImdbRating : 0 }</span>
      </p>
      <p>
        <span>🌟</span> <span>{avgUserRating ? avgUserRating: 0 }</span>
      </p>
      <p>
        <span>⏳</span> <span>{avgRuntime ? avgRuntime : 0 } min</span>
      </p>
    </div>
  </div>

}
