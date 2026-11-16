console.log("This is a console log message");


document.addEventListener("click", (e) => {
  const target = e.target;

  /* CONTACT FORM for Client & Artist 
  if (target.classList.contains("btn-ContactSend")) {
    e.preventDefault();
    alert("Message Sent!");
    window.location.href = "/Contact";
  }*/
  /* CONTACT FORM for Admin 
  if (target.classList.contains("btn-ContactAdminSend")) {
    e.preventDefault();
    alert("Message Sent!");
    window.location.href = "/AdminContact";
  }*/
 
  /* Pending Bookings (ARTIST SIDE) */
  if (target.classList.contains("accept-btn")) {
    e.preventDefault();
    alert("Accepted!");
    window.location.href = "/PendingBookings";
  }
  /*ADMIN Bookings side, APPROVE & DECLINE alert*/
  if (target.classList.contains("decline-btn")) {
    e.preventDefault();
    alert("Declined Booking!");
    window.location.href = "/PendingBookings";
  }
  if (target.classList.contains("btn-verify")) {
  e.preventDefault();
  alert("Artist Verified!");
  window.location.href = "/PendingArtists";
  }
  if (target.classList.contains("btn-declineBookings")) {
  e.preventDefault();
  alert("Declined!");
  window.location.href = "/PendingBookingsAdmin";
  }
  if (target.classList.contains("btn-approve")) {
  e.preventDefault();
  alert("Approved!");
  window.location.href = "/PendingBookingsAdmin";
  }
});
