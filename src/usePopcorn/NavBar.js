import {useState} from "react";

function NavBar({movies}) {
   return (
        <nav className="nav-bar">
           <Logo/>
           <SearchInput/>
           <NumResult movies={movies}/>
        </nav>
   );
}

function Logo() {
   return (
        <div className="logo">
           <span role="img">🍿</span>
           <h1>usePopcorn</h1>
        </div>
   )
}

function SearchInput() {
   const [query, setQuery] = useState("");
   return (
        <input
             className="search"
             type="text"
             placeholder="Search movies..."
             value={query}
             onChange={(e) => setQuery(e.target.value)}
        />
   )
}
function NumResult({movies}) {
   return <p className="num-results">
      Found <strong>{movies.length}</strong> results
   </p>
}
export default NavBar