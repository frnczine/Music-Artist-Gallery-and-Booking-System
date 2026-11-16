import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";

export default function ArtistNavbar({onSearch}) {
  const location = useLocation();

  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    if (onSearch) onSearch(query);
  };
  const clearSearch = () => {
    setQuery("");
    if (onSearch) onSearch(""); 
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/*Artist Side Nav Paths, some are shared with the client side*/}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/Home" ? "active" : ""}`} to="/Home">HOME</Link></li>
            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/Profile" ? "active" : ""}`} to="/Profile">PROFILE</Link></li>
            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/PendingBookings" ? "active" : ""}`} to="/PendingBookings">PENDING BOOKINGS</Link></li>
            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/Upcoming" ? "active" : ""}`} to="/Upcoming">UPCOMING</Link></li>
            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/Artists" ? "active" : ""}`} to="/Artists">ARTISTS</Link></li>
            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/Contact" ? "active" : ""}`} to="/Contact">CONTACT</Link></li>
          </ul>

          {/*Search Bar Part*/}
          <form className="d-flex me-3" role="search" onSubmit={handleSearch}>
            <div className="input-group position-relative">
              <input className="form-control searchbar" type="text" placeholder="Search" aria-label="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
              {query && (<button type="button" className="clear-search-btn" onClick={clearSearch} aria-label="Clear search"><i className="bi bi-x-circle"></i></button>)}
              <button className="searchicon" type="submit" aria-label="Search"><i className="bi bi-search" aria-hidden="true"></i></button>
            </div>
          </form>

            <div className="dropdown">
              <button className="usericon" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-person" aria-hidden="true"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><Link className="dropdown-item" to="/landingpage" onClick={() => { localStorage.removeItem("userRole"); window.dispatchEvent(new Event("storage")); window.location.href = "/landingpage"; }}>Logout</Link></li>
              </ul>
            </div>
          </div>
        </div>
    </nav>
  );
}
