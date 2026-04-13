// Button to change theme
const themeBtn = document.querySelector("#theme-btn");
// Title image (src changes to match theme)
const title = document.querySelector("#title");
// Phone and address icons (srces change to match theme)
const phone = document.querySelector("#phone-icon");
const address = document.querySelector("#address-icon");
// Click event listener
themeBtn.addEventListener("click", changeTheme);
// Get stylesheets
let darkTheme = document.styleSheets[0];
let lightTheme = document.styleSheets[1];
let darkForm = document.styleSheets[2];
let lightForm = document.styleSheets[3];
// Enable the dark theme (original) by default
darkTheme.disabled = false;
darkForm.disabled = false;
lightTheme.disabled = true;
lightForm.disabled = true;
// Change the theme
function changeTheme() {
    // Enable appropriate stylesheet and update images to match (this was the simplest way in my mind)
    if (title.src.includes("calligraphy-title-dark.png")) {
        darkTheme.disabled = true;
        darkForm.disabled = true;
        lightTheme.disabled = false;
        lightForm.disabled = false;
        title.src = "calligraphy-title-light.png";
        phone.src = "phone-icon-light.png";
        address.src = "address-icon-light.png";
    }
    else {
        darkTheme.disabled = false;
        darkForm.disabled = false;
        lightTheme.disabled = true;
        lightForm.disabled = true;
        title.src = "calligraphy-title-dark.png";
        address.src = "address-icon-light.png";
    }
};
