import React, { useState, useEffect } from "react";
import axios from "axios";
import { requestVerification, getVerification } from "../../api/verificationApi";
import { sampleicon, verified } from "../../assets";

export default function Profile() {
  const [profile, setProfile] = useState({
    artistName: "",
    genre: "",
    status: "",
    socialLinks: [""],
    description: "",
    bookingStatus: "available",
    profileImage: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [userID, setUserID] = useState(() => {
    const val = localStorage.getItem("user_id");
    return val ? Number(val) : null;
  });

  // update userID if other tabs/login change localStorage
  useEffect(() => {
    const handler = () => {
      const val = localStorage.getItem("user_id");
      setUserID(val ? Number(val) : null);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // Load existing profile
  useEffect(() => {
    if (!userID) {
      // clear UI if not logged in
      setProfile({
        artistName: "",
        genre: "",
        status: "",
        socialLinks: [""],
        description: "",
        bookingStatus: "available",
        profileImage: "",
      });
      setSelectedImages([]);
      setImageFile(null);
      return;
    }

    let cancelled = false;
    axios
      .get(`http://localhost/webdev/backend/api/get_profile.php?user_id=${userID}`)
      .then((res) => {
        if (cancelled) return;
        const data = res.data;
        if (data.exists === false) {
          // no saved profile yet
          setProfile((p) => ({ ...p, profileImage: "", socialLinks: ["" ]}));
          return;
        }
        const links = Array.isArray(data.socialLinks) ? data.socialLinks : [""];
        setProfile({
          artistName: data.artistName || "",
          genre: data.genre || "",
          status: data.status || "",
          socialLinks: links,
          description: data.description || "",
          bookingStatus: data.bookingStatus || "available",
          profileImage: data.profileImage || "",
        });
        setSelectedImages([]);
        setImageFile(null);
      })
      .catch((err) => {
        console.error("get_profile error:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [userID]);

  // verification status lookup
  useEffect(() => {
    if (!profile.artistName || !profile.artistName.trim()) return;
    let mounted = true;
    (async () => {
      try {
        const res = await getVerification(profile.artistName);
        if (!mounted) return;
        if (res.data && res.data.status !== "none") {
          setProfile((p) => ({ ...p, status: res.data.status, genre: res.data.genre || p.genre }));
        } else {
          setProfile((p) => ({ ...p, status: "" }));
        }
      } catch (err) {
        console.error("verification lookup error:", err);
      }
    })();
    return () => { mounted = false; };
  }, [profile.artistName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const handleSocialChange = (index, value) => {
    const updated = [...profile.socialLinks];
    updated[index] = value;
    setProfile((p) => ({ ...p, socialLinks: updated }));
  };

  const addSocialLink = () => setProfile((p) => ({ ...p, socialLinks: [...p.socialLinks, ""] }));
  const removeSocialLink = (index) => setProfile((p) => ({ ...p, socialLinks: p.socialLinks.filter((_,i)=>i!==index) }));

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setImageFile(file || null);
    if (file) setSelectedImages([URL.createObjectURL(file)]);
  };

  // Save using FormData (multipart)
  const handleSave = async () => {
    if (!userID) {
      alert("No user logged in (user_id missing).");
      return;
    }

    const form = new FormData();
    form.append("user_id", userID);
    form.append("artistName", profile.artistName || "");
    form.append("genre", profile.genre || "");
    form.append("status", profile.status || "");
    form.append("socialLinks", JSON.stringify(profile.socialLinks || []));
    form.append("description", profile.description || "");
    form.append("bookingStatus", profile.bookingStatus || "available");
    if (imageFile) form.append("profileImage", imageFile);

    try {
      const res = await axios.post("http://localhost/webdev/backend/api/save_profile.php", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log("save_profile response:", res.data);
      if (res.data && (res.data.success || res.data.message)) {
        alert("Profile saved successfully!");
        // reload profile from server to ensure values and profileImage are fresh
        const reload = await axios.get(`http://localhost/webdev/backend/api/get_profile.php?user_id=${userID}`);
        const data = reload.data;
        if (data.exists !== false) {
          const links = Array.isArray(data.socialLinks) ? data.socialLinks : [""];
          setProfile({
            artistName: data.artistName || "",
            genre: data.genre || "",
            status: data.status || "",
            socialLinks: links,
            description: data.description || "",
            bookingStatus: data.bookingStatus || "available",
            profileImage: data.profileImage || "",
          });
          setImageFile(null);
          setSelectedImages([]);
        }
      } else {
        alert("Saved but server returned unexpected response. Check console.");
        console.warn("save_profile unexpected:", res.data);
      }
    } catch (err) {
      console.error("save_profile error:", err);
      if (err.response && err.response.data) {
        alert("Save failed: " + (err.response.data.error || JSON.stringify(err.response.data)));
      } else {
        alert("Network error while saving. Open DevTools -> Network to inspect.");
      }
    }
  };

  const handleReset = () => {
    setProfile({
      artistName: "",
      genre: "",
      status: "",
      socialLinks: [""],
      description: "",
      bookingStatus: "available",
      profileImage: "",
    });
    setSelectedImages([]);
    setImageFile(null);
  };

  const handleVerify = async () => {
    if (!profile.artistName.trim()) {
      alert("Enter your Artist Name before requesting verification.");
      return;
    }
    try {
      const res = await requestVerification({ username: profile.artistName, genre: profile.genre });
      if (res.data && (res.data.status === "success" || res.data.status === "exists")) {
        alert("Verification request sent!");
        setProfile((p) => ({ ...p, status: "pending" }));
      } else {
        alert("Verification request returned: " + JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("requestVerification error:", err);
      alert("Verification request failed.");
    }
  };

  // UI (unchanged)
  return (
    <section className="profile-container">
      <h1 className="profile-title">PROFILE</h1>

      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-pic">
            <img
              src={ selectedImages[0]
                ? selectedImages[0]
                : profile.profileImage
                  ? `http://localhost/webdev/backend/api/uploads/${profile.profileImage}`
                  : sampleicon
              }
              alt="artist"
              className="rounded-circle"
              width="120"
              height="120"
            />
          </div>

          {profile.status === "verified" ? (
            <button className="verify-btn verified" disabled><img src={verified} alt="" width="20" height="20" /> Verified</button>
          ) : profile.status === "pending" ? (
            <button className="verify-btn pending" disabled>Pending</button>
          ) : (
            <button className="verify-btn" onClick={handleVerify}>Get Verified</button>
          )}

          <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
            <label>Artist Name:</label>
            <input type="text" name="artistName" value={profile.artistName} onChange={handleChange} placeholder="Enter artist name" />

            <label>Genre/s:</label>
            <input type="text" name="genre" value={profile.genre} onChange={handleChange} placeholder="Enter genres" />

            <label>Social Media Links:</label>
            <div className="social-links-container">
              {profile.socialLinks.map((link, index) => (
                <div className="social-input-wrapper" key={index}>
                  <input type="text" className="social-input" value={link} onChange={(e) => handleSocialChange(index, e.target.value)} placeholder="Enter social link" />
                  {profile.socialLinks.length > 1 && <span className="delete-social-btn" onClick={() => removeSocialLink(index)}>✕</span>}
                </div>
              ))}
            </div>
            <button type="button" className="add-social-btn" onClick={addSocialLink}>+</button>

            <label>Description:</label>
            <textarea name="description" rows="4" value={profile.description} onChange={handleChange} placeholder="Write a short description"></textarea>

            <div className="booking-status">
              <p>Booking Status:</p>
              <div className="toggle-group">
                <input type="radio" id="available" name="bookingStatus" value="available" checked={profile.bookingStatus === "available"} onChange={handleChange} />
                <label htmlFor="available">Available</label>

                <input type="radio" id="unavailable" name="bookingStatus" value="unavailable" checked={profile.bookingStatus === "unavailable"} onChange={handleChange} />
                <label htmlFor="unavailable">Currently Unavailable</label>
              </div>
            </div>
          </form>
        </div>

        <div className="profile-right">
          <div className="media-box card bg-dark text-white p-3">
            <h5 className="fw-bold mb-3 text-center">Attach Images</h5>

            <input type="file" accept="image/*" className="form-control mb-3" onChange={handleImageChange} />

            {selectedImages.length > 0 && (
              <div className="row g-2">
                {selectedImages.map((img, index) => (
                  <div className="col-4 position-relative" key={index}>
                    <img src={img} alt={`upload-${index}`} className="img-fluid rounded" />
                    <button type="button" className="btn btn-sm btn-danger position-absolute top-0 end-0" onClick={() => setSelectedImages((prev) => prev.filter((_, i) => i !== index))}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="profile-actions">
            <button className="save-btn" onClick={handleSave}>Save Changes</button>
            <button className="reset-btn" onClick={handleReset}>Reset to Default</button>
          </div>
        </div>
      </div>
    </section>
  );
}
