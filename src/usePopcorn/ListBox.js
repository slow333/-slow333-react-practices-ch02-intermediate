export function MovieList({ movies, onSelectedId }) {
   return <ul className="list list-movies">
     {movies?.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} onSelectedId={onSelectedId}/>
     ))}
   </ul>
}

function Movie({movie, onSelectedId}) {
   return <li onClick={() => onSelectedId(movie.imdbID)}>
      <img src={movie.Poster ? movie.Poster : "/logo192.png"}
           alt={`${movie.Title.split(" ").slice(0, 2).join("+")} poster`} />
      <h3>{movie.Title}</h3>
      <div>
         <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
         </p>
      </div>
   </li>
}

export function LoadingMovie() {
   return <ul className='list'>
      {Array.from({length: 3}, (_,i) =>
         <li key={i}>
            <img src='logo512.png' style={{width: "40px", height: "60px",backgroundColor: "inherit"}}
                 alt={`poster`} />
            <h3>{"is loading ..."}</h3>
            <div>
               <p>
                  <span>🗓</span>
                  <span>{"Year ..."}</span>
               </p>
            </div>
         </li>
      )
      }

   </ul>
}
