import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminNavbar() {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/*Admin Side Navbar Paths*/}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/AdminHome" ? "active" : ""}`} to="/AdminHome">HOME</Link></li>
            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/PendingArtists" ? "active" : ""}`} to="/PendingArtists">PENDING ARTISTS</Link></li>
            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/PendingBookingsAdmin" ? "active" : ""}`} to="/PendingBookingsAdmin">PENDING BOOKINGS</Link></li>
            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/VerifiedArtists" ? "active" : ""}`} to="/VerifiedArtists">VERIFIED ARTISTS</Link></li>
                        <li className="nav-item"><Link className={`nav-link ${location.pathname === "/VerifiedArtists" ? "active" : ""}`} to="/VerifiedBookings">VERIFIED BOOKINGS</Link></li>
            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/AdminContact" ? "active" : ""}`} to="/AdminContact">CONTACT</Link></li>
          </ul>
          {/*No Searchbar for Admin*/}
            <div className="dropdown">
              <button className="usericon" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-person" aria-hidden="true"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><Link className="dropdown-item" to="/landingpage" onClick={() => { localStorage.removeItem("userRole"); 
                      window.dispatchEvent(new Event("storage")); window.location.href = "/landingpage"; }}>Logout</Link></li>
              </ul>
            </div>
          </div>
        </div>
    </nav>
  );
}
