import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ModalComponent({ artist, artistId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [place, setPlace] = useState("");

const handleConfirmBooking = () => {
  if (!startDate || !startTime || !endTime || !place) {
    alert("Please fill all fields before confirming.");
    return;
  }

  const user_id = 1; // TEMP
  const artist_id = artist?.artist_id;

  if (!artist_id) {
    alert("Artist ID missing");
    return;
  }

  axios
    .post("http://localhost/webdev/backend/api/booking/createBooking.php", {
      user_id,
      artist_id,
      date: startDate,
      time: startTime,
      end_time: endTime,
      place,
    })
    .then((res) => {
      if (res.data.success) {
        alert("Booking created successfully");

        setShowBookingForm(false);
        setStartDate("");
        setStartTime("");
        setEndTime("");
        setPlace("");
        setIsOpen(false);
      } else {
        alert(res.data.message || "Failed to create booking");
      }
    })
    .catch(() => {
      alert("Error connecting to server");
    });
};



  const handleCancelBooking = () => {
    setShowBookingForm(false);
    setStartDate("");
    setStartTime("");
    setEndTime("");
    setPlace("");
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        className="btn btn-light btn-sm rounded-pill"
        onClick={() => setIsOpen(true)}
      >
        More <i className="bi bi-arrow-right"></i>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="custom-modal-box position-relative text-light"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
              onClick={() => setIsOpen(false)}
            ></button>

            {/* Artist Image */}
            <div className="text-center mb-3">
              <img
                src={artist?.image}
                alt={artist?.name}
                className="artist-image rounded-circle mb-3"
              />
            </div>

            {/* Name */}
            <h4 className="fw-bold mb-2">{artist?.name || "Artist Name"}</h4>

            {/* Description */}
            <p className="text-light opacity-75 small mb-3">
              {artist?.description || "No description available."}
            </p>

            {/* YouTube */}
            {artist?.youtube && (
              <a
                href={artist.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-danger btn-sm mb-3"
              >
                <i className="bi bi-youtube me-1"></i> Visit YouTube
              </a>
            )}

            {/* Songs */}
            <h6 className="fw-bold mt-4 mb-2">Top 5 Songs</h6>
            <ul className="list-group list-group-flush bg-transparent text-light song-list">
              {(artist?.songs?.length
                ? artist.songs.slice(0, 5)
                : [
                    { title: "Song 1" },
                    { title: "Song 2" },
                    { title: "Song 3" },
                    { title: "Song 4" },
                    { title: "Song 5" },
                  ]
              ).map((song, index) => (
                <li
                  key={index}
                  className="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center"
                >
                  <span className="small">
                    {index + 1}. {song.title || song}
                  </span>
                  {song.link && (
                    <a
                      href={song.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-danger btn-sm rounded-circle"
                    >
                      <i className="bi bi-play-fill"></i>
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* Booking Section */}
            <div className="mt-4 text-center">
              {!showBookingForm ? (
                <button
                  className="btn btn-light fw-bold rounded-pill px-4"
                  onClick={() => setShowBookingForm(true)}
                >
                  Book Now
                </button>
              ) : (
                <div className={`booking-form mt-3 slide-in`}>
                  <label className="form-label text-light d-block mb-2">
                    Select Booking Date, Event Duration, & Location:
                  </label>

                  <div className="d-flex flex-column align-items-center">
                    <input
                      type="date"
                      className="form-control mb-2 booking-date-input"
                      value={startDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setStartDate(e.target.value)}
                    />

                    <input
                      type="time"
                      className="form-control mb-3 booking-date-input"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />

                    <input
                      type="time"
                      className="form-control mb-4 booking-date-input"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />

                    <input
                      type="text"
                      className="form-control mb-4 booking-date-input"
                      placeholder="Enter event location"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                    />

                    {/* Buttons */}
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-success fw-bold rounded-pill px-4"
                        onClick={handleConfirmBooking}
                      >
                        Confirm Booking
                      </button>

                      <button
                        className="btn btn-outline-light fw-bold rounded-pill px-4"
                        onClick={handleCancelBooking}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
