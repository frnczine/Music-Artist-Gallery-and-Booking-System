import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/Footer.css';
import "./script.js";

/*COMPONENTS */
import ClientNavbar from "./components/ClientNavbar";
import ArtistNavbar from "./components/ArtistNavbar";
import AdminNavbar from "./components/AdminNavbar";
import FooterComponent from './components/FooterComponent';
import GuestNavbar from "./components/GuestNavbar";
/*Shared Pages*/
import LandingPage from "./pages/landingpage";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import Contact from "./pages/Contact";
/*SIDE (for bi-bi person)*/
import Registration from "./pages/Account/Registration";
import Login from "./pages/Account/login";
import AdminLogin from './pages/Account/adminlogin';
/*Client Pages*/ 
import About from "./pages/Client/About";
import Indie from "./pages/Client/Genre/Indie";
import Pop from "./pages/Client/Genre/Pop";
import RnB from "./pages/Client/Genre/RnB";
import Rock from "./pages/Client/Genre/Rock";
import UpcomingBooked from "./pages/Client/UpcomingBooked";
/*ARTIST*/
import Profile from "./pages/Artist/Profile";
import PendingBookings from "./pages/Artist/PendingBookings";
import Upcoming from "./pages/Artist/Upcoming";
/*ADMIN*/
import PendingArtists from './pages/Admin/PendingArtists';
import PendingBookingsAdmin from './pages/Admin/PendingBookingsAdmin';
import VerifiedArtists from './pages/Admin/VerifiedArtists';
import VerifiedBookings from "./pages/Admin/VerifiedBookings";
import AdminContact from './pages/Admin/AdminContact';
import AdminHome from './pages/Admin/AdminHome';

function App() {
  return (
    <Router>
      <MainApp/>
    </Router>
  );
}
function MainApp() {
  const location = useLocation();
  const [role, setRole] = useState(localStorage.getItem("userRole") || null);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
  setSearchQuery("");
}, [location]);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);}, [location]
  ); 
  const guest = ["/", "/landingpage", "/login", "/registration", "/adminlogin"];
  const Navbar = () => {
    if (!role || guest.includes(location.pathname)) return <GuestNavbar onSearch={setSearchQuery}/>;
    if (role === "client") return <ClientNavbar onSearch={setSearchQuery} />;
    if (role === "artist") return <ArtistNavbar onSearch={setSearchQuery}/>;
    if (role === "admin") return <AdminNavbar />; 
    return <GuestNavbar onSearch={setSearchQuery}/>;
  };
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/landingpage" replace />} /> {/* Since this is with diff button for guests*/}
        <Route path="/landingpage" element={<LandingPage/>}/> {/*Particularly for guests with no acc's*/}
        {/*Since Only the Admin will be having a different Home Page, this have a specific role (client & artists share the same Home page*/}
        <Route path="/Home" element={role === "admin" ? <Navigate to="/AdminHome" replace /> : <Home/>} />
        {/*CLIENT SIDE*/}
        <Route path="/About" element={<About />} />
        <Route path="/Genre/Indie" element={<Indie searchQuery={searchQuery}/>} />
        <Route path="/Genre/Pop" element={<Pop searchQuery={searchQuery}/>} />
        <Route path="/Genre/RnB" element={<RnB searchQuery={searchQuery}/>} />
        <Route path="/Genre/Rock" element={<Rock searchQuery={searchQuery}/>} />
        <Route path="/Artists" element={<Artists searchQuery={searchQuery}/>} />
        <Route path="/UpcomingBooked" element={<UpcomingBooked searchQuery={searchQuery}/>} />
        <Route path="/Contact" element={<Contact />} />

        {/*ARTIST SIDE*/}
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/PendingBookings" element={<PendingBookings/>} />
        <Route path="/Upcoming" element={<Upcoming />} />

        {/*ADMIN SIDE*/}
        <Route path="/PendingArtists" element={<PendingArtists/>} />
        <Route path="/PendingBookingsAdmin" element={<PendingBookingsAdmin/>} />
        <Route path="/VerifiedArtists" element={<VerifiedArtists/>} />
        <Route path="/VerifiedBookings" element={<VerifiedBookings />} />
        <Route path="/AdminContact" element={<AdminContact/>} />
        <Route path="/AdminHome" element={<AdminHome/>} />

        {/*ACCOUNT*/}
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

      </Routes>
        <FooterComponent />
      </>
  );
}

export default App;
