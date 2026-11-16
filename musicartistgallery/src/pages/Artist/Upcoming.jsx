import React, { useEffect, useState } from "react";

export default function Upcoming() {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const artistId = localStorage.getItem("artist_id");
    if (!artistId) return;

    fetch(
      `http://localhost/webdev/backend/api/booking/getUpcomingBookingsArtist.php?artist_id=${artistId}`
    )
      .then((res) => res.json())
      .then((data) => setUpcoming(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <br />
      <header>
        <h1 className="pending-titles">SCHEDULE</h1>
      </header>

      <main>
        <section className="container">
          {upcoming.length === 0 && (
            <p style={{ textAlign: "center", color: "#aaa" }}>
              No upcoming bookings.
            </p>
          )}

          {upcoming.map((item) => (
            <article key={item.booking_id} className="booking-card">
              <div className="client-info">
                <div>
                  <h2>{item.client_name}</h2>
                  <ul>
                    <li>
                      Date: {item.date}
                    </li>
                    <li>
                      Time: {item.time} – {item.end_time}
                    </li>
                    <li>
                      Place: {item.place}
                    </li>
                    <li>
                      Status: <strong>{item.status}</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
