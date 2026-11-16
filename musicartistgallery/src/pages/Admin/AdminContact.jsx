import React, {useState} from "react";
import AdminNavbar from "../../components/AdminNavbar";

export default function AdminContact() { /*Same Validation as the contact.jsx, but Admin side without Contact Info. */
  const [formData, setFormData] = useState({name:"",phone:"",email:"",subject:"",message:""});
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => { const { id, value } = e.target; setFormData({...formData,[id.toLowerCase()]:value}); };
  const validate = () => {
    const tempErrors = {};
    if (!formData.name) tempErrors.name="*Required";
    if (!formData.phone) tempErrors.phone="*Required";
    if (!formData.email) tempErrors.email="*Required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email="Email is invalid"; /*regular expression(regex) to check the basic pattern ng email*/
    if (!formData.subject) tempErrors.subject="*Required";
    if (!formData.message) tempErrors.message="*Required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length===0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Message Sent!", formData);
      setSuccess(true);
      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
      setErrors({});
    } else {
      setSuccess(false);
    }
  };

  return (
    <>
      <section className="section-box">
        <article className="col-md-8">
          <div className="boxContact">
            <h2>Contact Client &amp; Artists</h2>
            {success && <div className="alert alert-success" role="alert">Message sent successfully!</div>}
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="name"><strong>Name</strong></label>
                  <input type="text" id="name" className="form-control" value={formData.name} onChange={handleChange}/>
                  {errors.name && <small className="text-danger">{errors.name}</small>}
                </div>
                <div className="col">
                  <label htmlFor="phone"><strong>Contact No.</strong></label>
                  <input type="text" id="phone" className="form-control" value={formData.phone} onChange={handleChange}/>
                  {errors.phone && <small className="text-danger">{errors.phone}</small>}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" id="email" className="form-control" value={formData.email} onChange={handleChange}/>
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>
              <div className="mb-3">
                <label htmlFor="subject"><strong>Subject</strong></label>
                <input type="text" id="subject" className="form-control" value={formData.subject} onChange={handleChange}/>
                {errors.subject && <small className="text-danger">{errors.subject}</small>}
              </div>
              <div className="mb-3">
                <label htmlFor="message"><strong>Message</strong></label>
                <textarea id="message" rows="4" className="form-control" value={formData.message} onChange={handleChange}></textarea>
                {errors.message && <small className="text-danger">{errors.message}</small>}
              </div>
              <div className="text-center">
                <button type="submit" className="btn-ContactAdminSend">Send</button>
              </div>
            </form>
          </div>
        </article>
      </section>
    </>
  );
}
