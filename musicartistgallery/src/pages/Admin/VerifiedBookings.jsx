import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";

export default function VerifiedBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost/webdev/backend/api/booking/getVerifiedBookingsAdmin.php"
    )
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <AdminNavbar />

      <main className="container my-5">
        <h1 className="pending-titles">VERIFIED BOOKINGS</h1>

        {bookings.length === 0 && (
          <p className="text-center text-muted mt-4">
            No verified bookings.
          </p>
        )}

        {bookings.map((item) => (
          <article
            key={item.booking_id}
            className="row align-items-center mb-4"
          >
            {/* CLIENT */}
            <div className="col-md-4 d-flex align-items-center">
              <img
                src="sampleicon.jpg"
                alt="Client"
                className="rounded-circle me-3"
                width="70"
                height="70"
              />
              <div className="bookings">
                <h5 className="fw-bold">{item.client_name}</h5>
                <ul className="mb-0">
                  <li>{item.date} @ {item.time} – {item.end_time}</li>
                  <li>{item.place}</li>
                </ul>
              </div>
            </div>

            {/* ARROW */}
            <div className="col-md-1 text-center">
              <i
                className="bi bi-arrow-right"
                style={{ fontSize: "2rem", color: "#fff" }}
              ></i>
            </div>

            {/* ARTIST */}
            <div className="col-md-4 d-flex align-items-center">
              <img
                src="sampleicon.jpg"
                alt="Artist"
                className="rounded-circle me-3"
                width="70"
                height="70"
              />
              <div className="bookings">
                <h5 className="fw-bold">{item.artist_name}</h5>
                <ul className="mb-0">
                  <li>Status: <strong>{item.status}</strong></li>
                </ul>
              </div>
            </div>

            {/* STATUS BADGE */}
            <div className="col-md-3 text-end">
              <span className="badge bg-success fs-6">
                VERIFIED
              </span>
            </div>
          </article>
        ))}
      </main>
    </>
  );
}
