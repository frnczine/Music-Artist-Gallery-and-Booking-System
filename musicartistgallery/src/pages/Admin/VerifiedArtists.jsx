import React, { useEffect, useState } from "react";
import axios from "axios";
import { sampleicon } from "../../assets";

export default function VerifiedArtists() {
  const [verifiedArtists, setVerifiedArtists] = useState([]);

  const fetchVerified = async () => {
    try {
      const res = await axios.get("http://localhost/webdev/backend/api/getVerifiedArtists.php");
      setVerifiedArtists(res.data);
    } catch (err) {
      console.error("Error fetching verified:", err);
    }
  };

  useEffect(() => {
    fetchVerified();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="pending-titles">VERIFIED ARTISTS</h1>

      <div className="row">
        {verifiedArtists.length === 0 ? (
          <p className="text-center text-muted">No verified artists.</p>
        ) : (
          verifiedArtists.map((artist, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="p-3 bg-dark text-white rounded d-flex">
                
                <img src={artist.profileImage ? `http://localhost/webdev/backend/api/uploads/${artist.profileImage}` : sampleicon}
                alt=""
                className="rounded-circle me-3"
                width="70"
                height="70"
                />

                <div className="bookings">
                  <h5>{artist.Username}</h5>
                  <ul>
                    <li>Genre: {artist.Genre}</li>
                    <li>Status: Verified</li>
                  </ul>
                </div>

                <span className="badge bg-primary ms-auto align-self-start">
                  ✔ Verified
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
