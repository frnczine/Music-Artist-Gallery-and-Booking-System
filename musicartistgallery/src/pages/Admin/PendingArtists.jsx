import React, { useEffect, useState } from "react";
import axios from "axios";
import { sampleicon } from "../../assets";

export default function PendingArtists() {
  const [pendingArtists, setPendingArtists] = useState([]);

  const fetchPending = async () => {
    try {
      const res = await axios.get("http://localhost/webdev/backend/api/getPendingVerifications.php");
      setPendingArtists(res.data);
    } catch (err) {
      console.error("Error fetching pending artists:", err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleVerify = async (username) => {
    try {
      await axios.post("http://localhost/webdev/backend/api/verifyArtist.php", { username });
      alert(`${username} verified!`);
      fetchPending();
    } catch (err) {
      alert("Verification failed.");
    }
  };

  const handleDecline = async (username) => {
    try {
      await axios.post("http://localhost/webdev/backend/api/declineArtist.php", { username });
      alert(`${username} declined.`);
      fetchPending();
    } catch (err) {
      alert("Decline failed.");
    }
  };

  return (
    <main className="container my-5">
      <h1 className="pending-titles">PENDING ARTISTS</h1>

      {pendingArtists.length === 0 ? (
        <p className="text-center text-muted">No pending artists.</p>
      ) : (
        pendingArtists.map((artist, index) => (
          <div key={index} className="row align-items-center mb-3">
            <div className="col-md-8 d-flex align-items-center">
              <img
              className="rounded-circle me-3"
              alt=""
              src={artist.profileImage ? `http://localhost/webdev/backend/api/uploads/${artist.profileImage}` : sampleicon}
              width="70"
              height="70"
              />

              <div className="bookings">
                <h5>{artist.Username}</h5>
                <ul>
                  <li>Genre: {artist.Genre}</li>
                  <li>Status: Pending</li>
                </ul>
              </div>
            </div>

            <div className="col-md-4 text-end">
              <button className="btn btn-verify me-2" onClick={() => handleVerify(artist.Username)}>
                Verify
              </button>
              <button className="btn btn-decline" onClick={() => handleDecline(artist.Username)}>
                X
              </button>
            </div>
          </div>
        ))
      )}
    </main>
  );
}
