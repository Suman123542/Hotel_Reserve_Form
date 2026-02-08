const form = document.getElementById("bookingForm");

const today = new Date();
today.setHours(0, 0, 0, 0);

document.getElementById("checkin").min =
  today.toISOString().split("T")[0];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let isValid = true;

  document.querySelectorAll(".error").forEach(e => e.textContent = "");

  function error(id, msg) {
    document.getElementById(id).nextElementSibling.textContent = msg;
    isValid = false;
  }

  const name = nameValue();
  const email = emailValue();
  const phone = phoneValue();
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const room = document.getElementById("room").value;
  const adults = document.getElementById("adults").value;

  function nameValue() {
    return document.getElementById("name").value.trim();
  }
  function emailValue() {
    return document.getElementById("email").value.trim();
  }
  function phoneValue() {
    return document.getElementById("phone").value.trim();
  }

  if (name.length < 2) error("name", "Name must be at least 2 characters");
  if (!email.includes("@")) error("email", "Invalid email address");
  if (!/^\d{10,}$/.test(phone)) error("phone", "Phone must be at least 10 digits");

  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);

  if (!checkin) error("checkin", "Select check-in date");
  else if (checkinDate < today) error("checkin", "Check-in cannot be in the past");

  if (!checkout) error("checkout", "Select check-out date");
  else if (checkoutDate <= checkinDate)
    error("checkout", "Check-out must be after check-in");

  if (!room) error("room", "Select a room type");
  if (adults < 1) error("adults", "At least one adult required");

  if (isValid) {
    window.location.href = "conformation.html";
  }
});
