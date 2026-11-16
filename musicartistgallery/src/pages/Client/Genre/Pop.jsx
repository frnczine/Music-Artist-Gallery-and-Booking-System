import React from "react";
import { taylor, ariana, dua, olivia, harry, ed, billie } from "../../../assets";

export default function Pop({searchQuery}) {
  const artists = [
    { name: "Taylor Swift", genre: "Pop", image: taylor, hitSong: "Shake It Off" },
    { name: "Ariana Grande", genre: "Pop / R&B", image: ariana, hitSong: "Into You" },
    { name: "Dua Lipa", genre: "Pop / Dance", image: dua, hitSong: "Levitating" },
    { name: "Olivia Rodrigo", genre: "Pop Rock", image: olivia, hitSong: "Vampire" },
    { name: "Harry Styles", genre: "Pop / Soft Rock", image: harry, hitSong: "As It Was" },
    { name: "Ed Sheeran", genre: "Pop / Acoustic", image: ed, hitSong: "Shape of You" },
    { name: "Billie Eilish", genre: "Pop / Alternative", image: billie, hitSong: "Bad Guy" },
  ];

  //same as indie.jsx
  const filteredArtists = artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="container-fluid py-4 text-white">
      <h3 className="fw-bold mb-4">POP</h3>
      <section className="row g-4">
        {filteredArtists.map((artist, index) => (
          <article key={index} className="col-md-6">
            <div className="card bg-dark text-white h-100 rounded-4 p-3 shadow">
              <div className="d-flex align-items-center">
                <img
                  src={artist.image}
                  className="rounded-3 me-3"
                  style={{ width: "130px", height: "135px", objectFit: "cover" }}
                  alt={artist.name}
                />
                <div>
                  <h5 className="fw-bold">{artist.name}</h5>
                  <p className="mb-1">{artist.genre}</p>
                  <p className="mb-1">HIT SONG: {artist.hitSong}</p>
                  <p>
                    Experience {artist.name}'s chart-topping pop hits and signature sound.
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
        {filteredArtists.length === 0 && (
          <p className="text-center text-secondary mt-4">No pop artists found.</p>
        )}
      </section>
    </main>
  );
}
