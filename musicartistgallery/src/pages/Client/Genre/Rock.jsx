import React from "react";
import { queen, nirvana, fooFighters, metallica, linkinpark, acdc } from "../../../assets";

export default function Rock({searchQuery}) {
  const artists = [
    {name: "Queen", genre: "Rock / Classic", image: queen, hitSong: "Bohemian Rhapsody"},
    {name: "Nirvana", genre: "Rock / Grunge", image: nirvana, hitSong: "Smells Like Teen Spirit"},
    {name: "Foo Fighters", genre: "Rock / Alternative", image: fooFighters, hitSong: "Everlong"},
    {name: "Metallica", genre: "Rock / Heavy Metal", image: metallica, hitSong: "Enter Sandman"},
    {name: "Linkin Park", genre: "Rock / Nu Metal", image: linkinpark, hitSong: "In the End"},
    {name: "AC/DC", genre: "Rock / Hard Rock", image: acdc, hitSong: "Back in Black"},
  ];
  const filteredArtists = artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="container-fluid py-4 text-white">
      <h3 className="fw-bold mb-4">PUNK/ROCK</h3>
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
                    Experience the raw energy and timeless sound of {artist.name}.
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
        {filteredArtists.length === 0 && (
          <p className="text-center text-secondary mt-4">No Rock artists found.</p>
        )}
      </section>
    </main>
  );
}
