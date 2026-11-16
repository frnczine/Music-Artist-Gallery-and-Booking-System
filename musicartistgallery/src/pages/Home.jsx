import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClientNavbar from "../components/ClientNavbar";
import ArtistNavbar from "../components/ArtistNavbar";
import AdminNavbar from "../components/AdminNavbar";
import LandingPage from "../pages/landingpage";
import {logo} from "../assets"

export default function Home() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (!storedRole) {
      navigate("/login");
    } else {
      setRole(storedRole);
    }
  }, [navigate]);

  return (
    <>
    {role === "artist" ? <ArtistNavbar /> : role === "client" ? <ClientNavbar /> : role === "admin" ? <AdminNavbar /> : <LandingPage/>}
      <main>
        <section className="groupIntro">
          <article className="introText">
            <h1>Music Artists' Gallery</h1>
            <p>
              Immerse yourself in a world of music and connect with your favorite artists. Explore a diverse gallery of talented musicians, 
              listen to their tracks, and easily access their music on platforms like YouTube. Our core feature allows you to effortlessly book artists for events and gigs. 
              Plus, you can view your upcoming events! Experience the perfect blend of discovery, connection, and booking, all in one place!
            </p>
            <div className="exAndSuButton">
              <Link to="/artists" className="btn-explore">Explore</Link>
            </div>
          </article>

          <aside className="homeLogo">
            <img src={logo} alt="logo" className="logo"/>
          </aside>
        </section>
      </main>
    </>
  );
}
