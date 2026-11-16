import React from "react";
import { drake, breent, tory, sza, theweeknd, chrisbrown, usher } from "../../../assets";

export default function RnB({searchQuery}) {
  const artists = [
    { name: "Drake", genre: "R&B / Rap", image: drake, hitSong: "Hotline Bling" },
    { name: "Brent Faiyaz", genre: "R&B / Soul", image: breent, hitSong: "Poison" },
    { name: "Tory Lanez", genre: "R&B / Hip-Hop", image: tory, hitSong: "Say It" },
    { name: "SZA", genre: "R&B / Neo Soul", image: sza, hitSong: "Snooze" },
    { name: "The Weeknd", genre: "R&B / Pop", image: theweeknd, hitSong: "Blinding Lights" },
    { name: "Chris Brown", genre: "R&B / Dance", image: chrisbrown, hitSong: "Under The Influence" },
    { name: "Usher", genre: "R&B / Classic Soul", image: usher, hitSong: "Yeah!" },
  ];
  const filteredArtists = artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="container-fluid py-4 text-white">
      <h3 className="fw-bold mb-4">R&B</h3>
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
                    Discover {artist.name}'s signature R&B sound and soulful tracks.
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
        {filteredArtists.length === 0 && (
          <p className="text-center text-secondary mt-4">No R&B artists found.</p>
        )}
      </section>
    </main>
  );
}
