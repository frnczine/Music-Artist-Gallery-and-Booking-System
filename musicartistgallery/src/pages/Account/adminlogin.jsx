import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "./api";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await adminLogin({ email, password });
      const data = res.data;

      if (data.status === "success") {
        // Store admin session
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("adminUser", data.user.id);

        navigate("/AdminHome"); // change to your route
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Error logging in. Try again.");
    }
  };

  return (
    <section className="section-box">
      <div className="box">
        <form onSubmit={handleLogin}>
          <p className="text-center fw-bold">
            <strong>ADMIN LOGIN</strong>
          </p>

          <div className="row mb-3">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              <strong>Email:</strong>
            </label>
            <div className="col-sm-10">
              <input type="email" id="email" name="email" className="form-control" required />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              <strong>Password:</strong>
            </label>
            <div className="col-sm-10">
              <input type="password" id="password" name="password" className="form-control" required />
            </div>
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          <button type="submit" className="btn-login">Sign in</button>
        </form>

        <div className="text-center mt-3">
          <p>
            Not an admin?{" "}
            <Link to="/login" style={{ color: "lightblue", textDecoration: "none", fontWeight: "bold" }}>
              User Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
