import React from "react";
import { sombr, arcticmonkeys, the1975, tameimpala, lana, mitski, phoebe } from "../../../assets";

export default function Indie({searchQuery}) {
  const artists = [
    { name: "SOMBR", genre: "Alternative / Indie", image: sombr, hitSong: "Back to Friends" },
    { name: "Arctic Monkeys", genre: "Indie Rock", image: arcticmonkeys, hitSong: "Do I Wanna Know?" },
    { name: "The 1975", genre: "Indie Pop / Rock", image: the1975, hitSong: "Somebody Else" },
    { name: "Tame Impala", genre: "Psychedelic Indie", image: tameimpala, hitSong: "The Less I Know The Better" },
    { name: "Lana Del Rey", genre: "Dream Pop / Indie", image: lana, hitSong: "Summertime Sadness" },
    { name: "Mitski", genre: "Indie Rock / Pop", image: mitski, hitSong: "Nobody" },
    { name: "Phoebe Bridgers", genre: "Indie Folk / Rock", image: phoebe, hitSong: "Motion Sickness" },
  ];

  //this filters out the artists for seach query (case-insensitive)
  const filteredArtists = artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="container-fluid py-4 text-white">
      <h3 className="fw-bold mb-4">INDIE</h3>

      {/*ARTIST CARDS*/}
      <section className="row g-4">
        {filteredArtists.map((artist, index) => (
          <article key={index} className="col-md-6">
            <div className="card bg-dark text-white h-100 rounded-4 p-3 shadow">
              <div className="d-flex align-items-center">
                {/*Artist image*/}
                <img
                  src={artist.image}
                  className="rounded-3 me-3"
                  style={{ width: "130px", height: "135px", objectFit: "cover" }}
                  alt={artist.name}
                />
                
                {/*Details*/}
                <div>
                  <h5 className="fw-bold">{artist.name}</h5>
                  <p className="mb-1">{artist.genre}</p>
                  <p className="mb-1">HIT SONG: {artist.hitSong}</p>
                  <p>
                    Discover the soulful sounds of {artist.name}, one of today’s top indie artists.
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/*Fallback message shown when no artists match the search*/}
        {filteredArtists.length === 0 && (
          <p className="text-center text-secondary mt-4">No indie artists found.</p>
        )}
      </section>
    </main>
  );
}
