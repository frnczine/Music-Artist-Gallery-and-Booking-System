import React from "react";
import { sombr, lana, taylor, drake, breent, tory, oned, queen, creed } from "../assets";
import ModalComponent from "../components/ModalComponent.js";
import "../style.css";

export default function Artists({searchQuery}) {
  const artists = [
    {
      artist_id: 1,
      name: "SOMBR",
      genre: "Alternative / Indie",
      image: sombr,
      description: "SOMBR is an indie band known for their nostalgic sound and heartfelt lyrics.",
      youtube: "https://www.youtube.com/channel/UCXlqFQmZZOb78teSnAqhuwA",
      songs: [
        { title: "Back to Friends", link: "https://www.youtube.com/watch?v=song1" },
        { title: "Long Way Home", link: "https://www.youtube.com/watch?v=song2" },
        { title: "Dreaming", link: "https://www.youtube.com/watch?v=song3" },
        { title: "Lost at Night", link: "https://www.youtube.com/watch?v=song4" },
        { title: "Stay Awhile", link: "https://www.youtube.com/watch?v=song5" },
      ],
    },
    {
      artist_id: 2,
      name: "Lana Del Rey",
      genre: "Alternative / Indie",
      image: lana,
      description: "Lana Del Rey blends cinematic pop with nostalgic Americana themes.",
      youtube: "https://www.youtube.com/@lanadelrey",
      songs: [
        { title: "Summertime Sadness", link: "https://www.youtube.com/watch?v=TdrL3QxjyVw" },
        { title: "Born to Die", link: "https://www.youtube.com/watch?v=Bag1gUxuU0g" },
        { title: "Young and Beautiful", link: "https://www.youtube.com/watch?v=o_1aF54DO60" },
        { title: "Video Games", link: "https://www.youtube.com/watch?v=cE6wxDqdOV0" },
        { title: "West Coast", link: "https://www.youtube.com/watch?v=oKxuiw3iMBE" },
      ],
    },
    {
      artist_id: 3,
      name: "Taylor Swift",
      genre: "Pop",
      image: taylor,
      description: "Taylor Swift is one of the most influential pop artists of her generation.",
      youtube: "https://www.youtube.com/@TaylorSwift",
      songs: [
        { title: "Shake It Off", link: "https://www.youtube.com/watch?v=nfWlot6h_JM" },
        { title: "Love Story", link: "https://www.youtube.com/watch?v=8xg3vE8Ie_E" },
        { title: "Blank Space", link: "https://www.youtube.com/watch?v=e-ORhEE9VVg" },
        { title: "Anti-Hero", link: "https://www.youtube.com/watch?v=b1kbLwvqugk" },
        { title: "Cruel Summer", link: "https://www.youtube.com/watch?v=ic8j13piAhQ" },
      ],
    },
    {
      artist_id: 4,
      name: "Drake",
      genre: "RNB/Rap",
      image: drake,
      description: "Drake is a Canadian artist known for blending rap, R&B, and pop styles.",
      youtube: "https://www.youtube.com/@drake",
      songs: [
        { title: "Hotline Bling", link: "https://www.youtube.com/watch?v=uxpDa-c-4Mc" },
        { title: "One Dance", link: "https://www.youtube.com/watch?v=3iiSdjK-qDA" },
        { title: "God's Plan", link: "https://www.youtube.com/watch?v=xpVfcZ0ZcFM" },
        { title: "In My Feelings", link: "https://www.youtube.com/watch?v=DRS_PpOrUZ4" },
        { title: "Passionfruit", link: "https://www.youtube.com/watch?v=COz9lDCFHjw" },
      ],
    },
    {
      artist_id: 5,
      name: "Brent Faiyaz",
      genre: "RNB/Rap",
      image: breent,
      description: "Brent Faiyaz delivers soulful vocals and introspective R&B lyrics.",
      youtube: "https://www.youtube.com/@brentfaiyaz",
      songs: [
        { title: "Poison", link: "https://www.youtube.com/watch?v=zzYbSTC0sZ0" },
        { title: "All Mine", link: "https://www.youtube.com/watch?v=GkT6SgboM8g" },
        { title: "Clouded", link: "https://www.youtube.com/watch?v=Fv2ptxKzvEw" },
        { title: "Gravity", link: "https://www.youtube.com/watch?v=dOkJxQrB75U" },
        { title: "Dead Man Walking", link: "https://www.youtube.com/watch?v=GkT6SgboM8g" },
      ],
    },
    {
      artist_id: 6,
      name: "Tory Lanez",
      genre: "RNB/Rap",
      image: tory,
      description: "Tory Lanez is known for his energetic blend of rap and R&B.",
      youtube: "https://www.youtube.com/@torylanez",
      songs: [
        { title: "Traphouse", link: "https://www.youtube.com/watch?v=torysong1" },
        { title: "Say It", link: "https://www.youtube.com/watch?v=xUq1rZ7mmns" },
        { title: "Controlla", link: "https://www.youtube.com/watch?v=torysong2" },
        { title: "Broke in a Minute", link: "https://www.youtube.com/watch?v=torysong3" },
        { title: "The Color Violet", link: "https://www.youtube.com/watch?v=torysong4" },
      ],
    },
  ];
  const filteredArtists = artists.filter(
    artist =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/*Featured Artists*/}
      <section className="container-fluid py-4" style={{ color: "white" }}>
        <h2 className="fw-bold mb-3">FEATURED ARTISTS</h2>
        <div id="featuredCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner rounded-3">
            <div className="carousel-item active">
              <img src={oned} className="d-block w-100" alt="Featured Artist 1" />
            </div>
            <div className="carousel-item">
              <img src={queen} className="d-block w-100" alt="Featured Artist 2" />
            </div>
            <div className="carousel-item">
              <img src={creed} className="d-block w-100" alt="Featured Artist 3" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#featuredCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#featuredCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>

      {/*For You Section*/}
      <section className="container-fluid py-4" style={{ color: "white" }}>
        <h3 className="fw-bold mb-4">FOR YOU</h3>
        <div className="row g-4">
          {filteredArtists.map((artist, index) => (
            <div key={index} className="col-md-6">
              <div className="card bg-dark text-white h-100 rounded-4 p-3">
                <div className="d-flex align-items-center">
                  <img
                    src={artist.image}
                    className="rounded-3 me-3"
                    style={{ width: "100px", height: "100px" }}
                    alt={artist.name}
                  />
                  <div>
                    <h5 className="fw-bold">{artist.name}</h5>
                    <p className="mb-1">{artist.genre}</p>
                    <p className="mb-1">HIT SONG: {artist.songs[0].title}</p>
                    <p>{artist.description}</p>
                  </div>
                </div>
                <div className="text-end">
                  <ModalComponent artist={artist} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
