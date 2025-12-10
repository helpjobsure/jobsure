// ---------------- within your try { ... } after adding student doc ----------------

// Firestore save success झाल्यावर
progressBar.style.width = '90%';
progressText.textContent = '90%';

// EmailJS parameters
const templateParams = {
  to_name: data.fullName,
  to_email: data.email,
  uid: uid,
  cv_link: cvURL,
  photo_link: photoURL,
  message: `Hi ${data.fullName},

Thanks for registering at Jobsure Automation Training.

Your registration ID is: ${uid}

We will contact you soon.

Regards,
Jobsure Team`
};

// Send Email
try {
  if (window.emailjs && emailjs.send) {
    await emailjs.send("service_bw58d2g", "template_oj6reh7", templateParams);
    console.log("Confirmation email sent:", data.email);
  } else {
    console.warn("EmailJS not available");
  }
} catch (emailErr) {
  console.warn("Email send failed:", emailErr);
}

// Finalize progress
progressBar.style.width = '100%';
progressText.textContent = '100%';

// clear local storage draft
localStorage.removeItem(AUTO_SAVE_KEY);

// success message
statusMsg.textContent = "Registration submitted successfully! Redirecting…";
statusMsg.classList.add("text-green-600");

// redirect
setTimeout(() => {
  window.location.href = "index.html";
}, 1000);
