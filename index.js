const loginForm = document.getElementById('loginForm');
const loginSection = document.getElementById('login-section');
const uidSection = document.getElementById('uid-section');
const resultSection = document.getElementById('result-section');
const checkUidButton = document.getElementById('checkUid');
const uidInput = document.getElementById('uid');
const resultMessage = document.getElementById('resultMessage');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    loginSection.style.display = 'none';
    uidSection.style.display = 'block';
});

checkUidButton.addEventListener('click', () => {
    const enteredUid = uidInput.value.trim();

    if (!enteredUid) {
        alert('Please enter your UID.');
        return;
    }

    fetch('selected_uids.csv')
        .then(response => response.text())
        .then(data => {
            const uids = data.split('\n').map(uid => uid.trim());
            if (uids.includes(enteredUid)) {
                resultMessage.textContent = "Congratulations! You are selected.";
                resultMessage.style.color = 'green';
            } else {
                resultMessage.textContent = "Sorry, you are not selected.";
                resultMessage.style.color = 'red';
            }
            uidSection.style.display = 'none';
            resultSection.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching data from CSV:', error);
            resultMessage.textContent = "An error occurred. Please try again later.";
            resultMessage.style.color = 'red';
            uidSection.style.display = 'none';
            resultSection.style.display = 'block';
        });
});