// Get form and message elements
const form = document.getElementById("serviceForm");
const messageEl = document.getElementById("formMessage");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop default reload behavior

  // Collect basic form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Collect multiple checkbox values (Contact Preference)
  const contactPreferences = [];
  form.querySelectorAll('input[name="contactPreference"]:checked').forEach((checkbox) => {
    contactPreferences.push(checkbox.value);
  });
  data.contactPreference = contactPreferences;

  // 👉 Handle uploaded images
  const imageFiles = form.querySelector("#serviceImage")?.files;
  if (imageFiles && imageFiles.length > 0) {
    data.images = Array.from(imageFiles).map(file => ({
      name: file.name,
      size: file.size + " bytes",
      type: file.type
    }));
  }

  console.log("📩 Submitted Form Data:", data);

  // Success message
  messageEl.textContent = "Thank you! Your service request has been submitted.";
  messageEl.className = "form-message success";

  // Reset form after submit
  form.reset();
});
