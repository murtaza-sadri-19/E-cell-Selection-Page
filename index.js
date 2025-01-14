// References to HTML elements
const loginForm = document.getElementById('loginForm');
const loginSection = document.getElementById('login-section');
const uidSection = document.getElementById('uid-section');
const resultSection = document.getElementById('result-section');
const checkUidButton = document.getElementById('checkUid');
const uidInput = document.getElementById('uid');
const resultMessage = document.getElementById('resultMessage');

// Handle login form submission
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();

    if (!username) {
        alert('Please enter your username.');
        return;
    }

    // Display the next section
    loginSection.classList.remove('active');
    uidSection.classList.add('active');
});

// Handle UID check
checkUidButton.addEventListener('click', () => {
    const enteredUid = uidInput.value.trim();

    if (!enteredUid) {
        alert('Please enter your UID.');
        return;
    }

    // Remove previous themes
    uidInput.classList.remove('green-theme', 'red-theme');
    resultMessage.classList.remove('success', 'error');

    // Fetch UID data from the CSV file
    fetch('selected_uids.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch the UID data');
            }
            return response.text();
        })
        .then(data => {
            const uids = data.split('\n').map(uid => uid.trim());

            if (uids.includes(enteredUid)) {
                // UID is selected
                resultMessage.textContent = "Congratulations! You are selected.";
                resultMessage.classList.add('success');
                uidInput.classList.add('green-theme');
            } else {
                // UID is not selected
                resultMessage.textContent = "Sorry, you are not selected.";
                resultMessage.classList.add('error');
                uidInput.classList.add('red-theme');
            }

            // Display the result section
            uidSection.classList.remove('active');
            resultSection.classList.add('active');
        })
        .catch(error => {
            console.error('Error fetching or processing UID data:', error);

            // Display an error message
            resultMessage.textContent = "An error occurred. Please try again later.";
            resultMessage.classList.add('error');

            // Display the result section
            uidSection.classList.remove('active');
            resultSection.classList.add('active');
        });
});
