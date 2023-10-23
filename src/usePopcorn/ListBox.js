export function MovieList({ movies }) {
   return <ul className="list">
     {movies?.map((movie) => (
          <Movie movie={movie} key={movie.id}/>
     ))}
   </ul>
}

function Movie({movie}) {
   return <li >
      <img src={movie.primaryImage?.url}
           alt={`${movie.originalTitleText.text} poster`} />
      <h3>{movie.originalTitleText.text}</h3>
      <div>
         <p>
            <span>🗓</span>
            <span>{movie.releaseYear.year}</span>
         </p>
      </div>
   </li>
}
