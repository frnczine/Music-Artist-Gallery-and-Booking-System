import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "./api";

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await loginUser({ email, password });
      const data = response.data;

      if (data.status === "success") {
        const user = data.user;

        /* STORE COMMON USER INFO */
        localStorage.setItem("user_id", user.user_id);
        localStorage.setItem("loggedInUser", user.username); // ✅ FIXED
        localStorage.setItem("userRole", user.role);

        /* STORE ARTIST ID ONLY IF ARTIST */
        if (user.role === "artist") {
          if (!user.artist_id) {
            setError("Artist profile not found.");
            return;
          }
          localStorage.setItem("artist_id", user.artist_id);
        } else {
          localStorage.removeItem("artist_id");
        }

        /* DEBUG (optional) */
        console.log("LOGIN SUCCESS:", user);

        navigate("/Home");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <section className="section-box">
      <div className="box">
        <form onSubmit={handleLogin}>
          <p className="text-center fw-bold">
            <strong>LOGIN</strong>
          </p>

          <div className="row mb-3">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              <strong>Email:</strong>
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              <strong>Password:</strong>
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-danger mt-2 text-center">{error}</p>
          )}

          <button type="submit" className="btn-login">
            Sign in
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Don’t have an Account?{" "}
            <Link
              to="/registration"
              style={{
                color: "lightblue",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register
            </Link>
          </p>
          <p>
            Are you an Admin?{" "}
            <Link
              to="/adminlogin"
              style={{
                color: "lightblue",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Admin
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
