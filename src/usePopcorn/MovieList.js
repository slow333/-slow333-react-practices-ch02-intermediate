import {useState} from "react";

function MovieList({movies}) {

   const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <ToggleButton
           onToggle={() => setIsOpen1(open => !open)}
           isOpen={isOpen1}
      />
      {isOpen1 && (
        <Movies movies={movies}/>
      )}
    </div>
  );
}

function Movies({movies}) {

   return (
        <ul className="list">
           {movies?.map((movie) => (
                <Movie movie={movie} key={movie.imdbID}/>
           ))}
        </ul>
   )
}
function Movie({movie}) {
   return <li >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
         <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
         </p>
      </div>
   </li>
}
export function ToggleButton({onToggle, isOpen}){
  return <button className="btn-toggle" onClick={onToggle} >
    {isOpen ? "–" : "+"}
  </button>
}
export default MovieList