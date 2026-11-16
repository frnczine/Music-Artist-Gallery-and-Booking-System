import { Link } from "react-router-dom";
import React from "react";
import {logo} from "../assets"

export default function LandingPage() {
  return (
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
            <Link to="/registration" className="btn-HomeSignup">Sign Up</Link>
          </div>
        </article>

        <aside className="homeLogo">
         <img src={logo} alt="logo" className="logo"/>
        </aside>
      </section>
    </main>
  );
}