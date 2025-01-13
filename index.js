// index.js

const loginForm = document.getElementById('loginForm');
const loginSection = document.getElementById('login-section');
const uidSection = document.getElementById('uid-section');
const resultSection = document.getElementById('result-section');
const accountSection = document.getElementById('account-section');
const checkUidButton = document.getElementById('checkUid');
const uidInput = document.getElementById('uid');
const resultMessage = document.getElementById('resultMessage');
const usernameDisplay = document.getElementById('usernameDisplay');
const emailDisplay = document.getElementById('emailDisplay');
const profileImage = document.getElementById('profileImage');
const profileImageInput = document.getElementById('profileImageInput');

// Sample user data (replace with actual data fetching logic)
const sampleUserData = {
    username: "JohnDoe123",
    email: "john.doe@example.com"
};

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    loginSection.style.display = 'none';
    uidSection.style.display = 'block';
});

checkUidButton.addEventListener('click', () => {
    showLoading();

    const enteredUid = uidInput.value.trim();

    // UID validation (optional)
    const uidRegex = /^0801[A-Z]{2}\d{2}[1][0-2]\d{3}$/;
    if (!uidRegex.test(enteredUid)) {
        resultMessage.textContent = "Invalid UID format. Please check and try again.";
        resultMessage.style.color = 'red';
        uidSection.style.display = 'none';
        resultSection.style.display = 'block';
        hideLoading();
        return;
    }

    // Simulate fetching selected UIDs from CSV (replace with actual logic)
    const selectedUids = ["0801CS2310001", "0801CS2310010", "0801CS2310020"];

    if (selectedUids.includes(enteredUid)) {
        resultMessage.textContent = "Congratulations! You are selected.";
        resultMessage.style.color = 'green';

        // Display user details
        usernameDisplay.textContent = sampleUserData.username;
        emailDisplay.textContent = sampleUserData.email;

        accountSection.style.display = 'block';
    } else {
        resultMessage.textContent = "Sorry, you are not selected.";
        resultMessage.style.color = 'red';
        uidSection.style.display = 'none';
        resultSection.style.display = 'block';
    }
    hideLoading();
});

function showAccountDetails() {
    loginSection.style.display = 'none';
    uidSection.style.display = 'none';
    resultSection.style.display = 'none';
    accountSection.style.display = 'block';
}

function checkNotifications() {
    // Simulate fetching and displaying notifications
    alert("Checking notifications...");
    // Replace with actual notification fetching and display logic
}

profileImageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function logout() {
    // Simulate a basic logout (replace with actual implementation)
    alert("Logging out...");
    // Clear any local storage or session data if applicable
    // Redirect to a login page (e.g., window.location.href = "login.html";)
}

// Enhancements:

// Responsive Design (basic)
const mediaQuery = window.matchMedia('(max-width: 768px)');

mediaQuery.addListener(handleMediaQueryChange);
handleMediaQueryChange(mediaQuery);

function handleMediaQueryChange(media) {
    if (media.matches) {
        // Handle smaller screens (e.g., mobile)
        document.body.style.padding = '10px';
    } else {
        // Handle larger screens
        document.body.style.padding = '0';
    }
}

// Placeholder Images
profileImage.src = "placeholder.png";

// Loading States (basic)
function showLoading() {
    resultMessage.textContent = "Loading...";
    resultMessage.style.color = '#000';
}

function hideLoading() {
    resultMessage.textContent = "";
}

// Accessibility Improvements
loginForm.setAttribute('aria-label', 'Login Form');
uidInput.setAttribute('aria-label', 'Enter UID');
checkUidButton.setAttribute('aria-label', 'Check Selection Status');

// User Feedback
loginForm.addEventListener('submit', () => {
    // Add a subtle animation or visual cue on submit
    loginForm.classList.add('submitted');
    setTimeout(() => {
        loginForm.classList.remove('submitted');
    }, 200);
});

// CSS for submit animation
loginForm.classList.add('no-transition'); // Disable initial transition
setTimeout(() => {
    loginForm.classList.remove('no-transition');
}, 10);