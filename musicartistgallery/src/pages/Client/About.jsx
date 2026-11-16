import React from "react";
import {logo} from "../../assets";

export default function About() {
  return (
    <>
      <div className="container my-5">
        {/*ABOUT US*/}
        <h1 className="section-title text-center">ABOUT US</h1>
        <div className="row about-section align-items-center mb-5">
          {/*IMAGE design*/}
          <div className="col-md-6 about-image text-center">
            <img src={logo} alt="Aboutlogo" className="Aboutlogo"/>
          </div>
          {/*about us information*/}
          <div className="col-md-6 about-text">
            <p>
              Welcome to MusicaGB, where you can immerse yourself in a world of sound and 
              connect with your favorite artists. Explore a diverse gallery of talented musicians, listen to their tracks, and easily access their music on platforms like YouTube. 
            </p>
            <p>
              Our core feature allows you to effortlessly book artists for events and gigs, making it simple for you to bring live music to your occasions. Plus, you can view your upcoming events!
              Experience the perfect blend of discovery, connection, and booking, all in one place!
            </p>
          </div>
        </div>

        {/*WHAT WE DO section*/}
        <h2 className="section-subtitle text-center">WHAT WE DO</h2>
        <div className="row what-we-do text-center">
          <div className="col-md-4 mb-3">
            <div className="feature-box">
              <h3>Artist Discovery</h3>
              <p>
                Dive into our extensive collection of musicians across various genres. Discover new talent and revisit familiar favorites, all while enjoying seamless access to their music. 
                Our platform makes it easy to find artists who resonate with your taste and elevate your listening experience.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="feature-box">
              <h3>Event Support</h3>
              <p>
                Planning an event? Our platform provides comprehensive support to ensure your gig is a success. We focus on connecting you with a diverse range of artists, including emerging talents who are ready for new opportunities. 
                From coordinating logistics to facilitating bookings, we’re here to guide you every step of the way. Our goal is to help you discover and secure the right artists for your event, ensuring that your audience enjoys an unforgettable musical experience.              </p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="feature-box">
              <h3>Booking / Reservation</h3>
              <p>
              Booking your favorite artists has never been easier! Our user-friendly reservation system allows you to secure performers for any occasion, whether it's a private party, corporate event, or public concert. Simply browse our artist gallery and select your favorites.
              <br></br>
              <br></br>
              Once you submit a booking request, our admin team will monitor the process and verify the artists. The request will be sent to the selected artists for their acceptance. After they confirm, 
              Our admin will finalize the booking process, ensuring that all parties are satisfied and that your event is set up for success.              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
