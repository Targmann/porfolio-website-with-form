/*
This function is the only thing controlling the main page.
Code to change the theme is found in page.js.
*/

// Function to change shown section via menu
function showSection(sectionName) {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById(sectionName).classList.remove("hidden");
};
// Main entrypoint for the application
document.addEventListener("DOMContentLoaded", function() {
    initValidation("visitor-form", "success");
});
