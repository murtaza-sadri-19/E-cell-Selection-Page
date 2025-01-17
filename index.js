// References to HTML elements
const loginForm = document.getElementById('loginForm');
const loginSection = document.getElementById('login-section');
const uidSection = document.getElementById('uid-section');
const resultSection = document.getElementById('result-section');
const checkUidButton = document.getElementById('checkUid');
const uidInput = document.getElementById('uid');
const resultMessage = document.getElementById('resultMessage');
const downloadCsvButton = document.getElementById('downloadCsv'); // New button for downloading CSV

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
    fetch('Eligible Students List(Result).csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch the UID data');
            }
            return response.text();
        })
        .then(data => {
            const rows = data.split('\n').map(row => row.split(',').map(cell => cell.trim()));
            const header = rows[0]; // First row is the header
            const uidIndex = header.indexOf('Enrollment Number');
            const eligibilityIndex = header.indexOf('Eligible for GSPL Auction');

            // Check if the entered UID is eligible
            let isEligible = false;
            for (let i = 1; i < rows.length; i++) { // Start from 1 to skip header
                if (rows[i][uidIndex] === enteredUid) {
                    isEligible = rows[i][eligibilityIndex] === 'TRUE';
                    break;
                }
            }

            if (isEligible) {
                // UID is selected and eligible
                resultMessage.textContent = "Congratulations! You are eligible to participate!";
                resultMessage.classList.add('success');
                uidInput.classList.add('green-theme');
            } else {
                // UID is not selected or not eligible
                resultMessage.innerHTML = "Sorry, you are not eligible. To become eligible, actively participate in events having the following date sheet:<ul>" +
                    "<li>Jugaadu - 24 January</li>" +
                    "<li>Makeathon - 29 January</li>" +
                    "<li>Trackathon - 1 February</li>" +
                    "<li>Bootcamp - 1-2 February</li>" +
                    "<li>Surprise Event - 4 February</li>" +
                    "</ul>";
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

// Add functionality to download the CSV file
downloadCsvButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'Eligible Students List(Result).csv'; // URL of the CSV file
    link.download = 'Eligible_Students_List.csv'; // Name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});