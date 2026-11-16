import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PendingBookings() {
  const [pending, setPending] = useState([]);
  const navigate = useNavigate();

 useEffect(() => {
  const artistId = localStorage.getItem("artist_id");
  console.log("ARTIST ID:", artistId);

  if (!artistId) return;

  fetch(
    `http://localhost/webdev/backend/api/booking/getPendingBookings.php?artist_id=${artistId}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("PENDING BOOKINGS:", data);
      setPending(data);
    })
    .catch((err) => console.error(err));
}, []);



  //ACCEPT
  const acceptBooking = async (bookingId) => {
    await fetch("http://localhost/webdev/backend/api/booking/acceptBooking.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ booking_id: bookingId }),
    });

    //REDIRECT SA UPCOMING
    navigate("/upcoming");
  };

  //DECLINE
  const declineBooking = async (bookingId) => {
    await fetch("http://localhost/webdev/backend/api/booking/declineBooking.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ booking_id: bookingId }),
    });
    setPending((prev) => prev.filter((item) => item.booking_id !== bookingId));
  };

  return (
    <>
      <br />
      <header>
        <h1 className="pending-titles">PENDING BOOKINGS</h1>
      </header>

      <main>
        <section className="container">
          {pending.length === 0 && (
            <p style={{ textAlign: "center", color: "#aaa" }}>
              No pending bookings.
            </p>
          )}
          {pending.map((item) => (
            <article key={item.booking_id} className="booking-card">
              <div className="client-info">
                {/*<img src="sampleicon.jpg" alt="Client" className="client-img"/> WAG NA SGURO TOH*/}
                <div>
                  <h2>{item.client_name}</h2>
                  <ul>
                    <li>{item.date} @{item.time}</li>
                    <li>{item.place}</li>
                  </ul>
                </div>
              </div>

              <footer className="booking-actions">
                <button
                  className="accept-btn"
                  onClick={() => acceptBooking(item.booking_id)}>ACCEPT</button>
                <button className="decline-btn" onClick={() => declineBooking(item.booking_id)}>DECLINE</button>
              </footer>
            </article>
          ))}

        </section>
      </main>
    </>
  );
}
