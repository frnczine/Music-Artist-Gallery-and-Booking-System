import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";

export default function PendingBookingsAdmin() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost/webdev/backend/api/booking/getApprovedBookingsAdmin.php"
    )
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const verifyBooking = async (bookingId) => {
    await fetch(
      "http://localhost/webdev/backend/api/booking/verifyBookingAdmin.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id: bookingId }),
      }
    );

    //Removes verified booking from list
    setBookings((prev) =>
      prev.filter((b) => b.booking_id !== bookingId)
    );
  };

  return (
    <>
      <AdminNavbar />

      <main className="container my-5">
        <h1 className="pending-titles">PENDING BOOKINGS</h1>

        {bookings.length === 0 && (
          <p className="text-center text-muted mt-4">
            No bookings to verify.
          </p>
        )}

        {bookings.map((item) => (
          <article
            key={item.booking_id}
            className="row align-items-center mb-4"
          >
            {/*CLIENT*/}
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
                  <li>{item.date} @ {item.time}</li>
                  <li>{item.place}</li>
                </ul>
              </div>
            </div>

            {/*ARROW*/}
            <div className="col-md-1 text-center">
              <i
                className="bi bi-arrow-right"
                style={{ fontSize: "2rem", color: "#fff" }}
              ></i>
            </div>

            {/*ARTIST*/}
            <div className="col-md-4 d-flex align-items-center">
              <img
                src="sampleicon.jpg"
                alt="Artist"
                className="rounded-circle me-3"
                width="70"
                height="70"
              />
              <div>
                <h5 className="fw-bold">{item.artist_name}</h5>
                <ul className="mb-0">
                  <li>Status: {item.status}</li>
                </ul>
              </div>
            </div>

            {/* VERIFY BUTTON */}
            <div className="col-md-3 text-end">
              <button
                className="btn btn-approve"
                onClick={() => verifyBooking(item.booking_id)}
              >
                VERIFY
              </button>
            </div>
          </article>
        ))}
      </main>
    </>
  );
}
