import React, { useState } from "react";
import { regUser } from "./api";
import { Link, useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ /*Data to put on formData (on api.js) to API (Sheetdb)*/
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
/*Validation for Registration*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 7) {
      setMessage("Password must be at least 7 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match. Try Again.");
      return;
    }
    if (!formData.role) {
      setMessage("Please select a role.");
      return;
    }

    try {
      await regUser(formData);
      setMessage("Registered successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });

      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setMessage("Error. Try again.");
    }
  };

  return ( /*Registration Form with REQUIRED validation*/
    <section className="section-box">
      <div className="boxSignup">
        <form onSubmit={handleSubmit} id="signupForm">
          <p className="text-center fw-bold"><strong>R E G I S T R A T I O N</strong></p>

          <div className="row mb-3">
            <label htmlFor="firstName" className="col-sm-2 col-form-label"><strong>First Name:</strong></label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required/>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="lastName" className="col-sm-2 col-form-label"><strong>Last Name:</strong></label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required/>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="email" className="col-sm-2 col-form-label"><strong>Email:</strong></label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required/>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="password" className="col-sm-2 col-form-label"><strong>Password:</strong></label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required/>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="confirmPassword" className="col-sm-2 col-form-label"><strong>Confirm Password:</strong></label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required/>
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-2 col-form-label"><strong>Role:</strong></label>
            <div className="col-sm-10">
              <select className="form-control" name="role" value={formData.role} onChange={handleChange} required>
                <option value="">-- Select Role --</option>
                <option value="client">Client</option>
                <option value="artist">Artist</option>
              </select>
            </div>
          </div>

          {message && <p className="text-center text-danger mb-3">{message}</p>}
          <br />
          <button className="btn-signup" type="submit">Sign Up</button>
        </form>

        <div className="text-center mt-3">
          <p>
            Already have an Account?{" "}<Link to="/login" style={{color: "lightblue", textDecoration: "none", fontWeight: "bold"}}>Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
