function NavBar({children}) {
   return (
        <nav className="nav-bar">
          <Logo />
          {children}
        </nav>
   );
}

export function Logo() {
   return (
        <div className="logo">
           <span role="img">🍿</span>
           <h1>usePopcorn</h1>
        </div>
   )
}

export function SearchInput({query, onQuery}) {
   return <input  className="search"  type="text"   placeholder="Search movies..."
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        />
}
export function NumResult({movies}) {
   return <p className="num-results">
      Found <strong>{movies?.length}</strong> results
   </p>
}
export default NavBar