
function changePassword(){
    const loginForm = document.getElementById('login-form');
    const changePasswordModal = document.getElementById('changePasswordModal');

    // Simulate first login check
    const isFirstLogin = true;

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // Simulate login validation
        if (username === "test" && password === "password" && isFirstLogin) {
            alert('Login successful!');
            changePasswordModal.style.display = 'flex'; // Show password change modal
        } else {
            alert('Invalid login or not the first login.');
        }
    });

    function validateAndSubmit() {
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errorMessage = document.getElementById('errorMessage');

        if (newPassword !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match!";
            return;
        }
        const username = document.getElementById('login-username').value;
        const data = {
            userName: username,
            password: newPassword
        };

        // URL of the remote endpoint where you want to send the POST request
        const url = 'https://infinite-sands-52519-06605f47cb30.herokuapp.com/changePassword'; // Replace with your actual endpoint

        // Send the POST request using fetch
        fetch(url, {
            method: 'POST', // POST method
            headers: {
                'Content-Type': 'application/json' // Indicating the content type
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse response if it's successful
            }
            throw new Error('Failed to login');
        })
        .then(data => {
            console.log('Response:', data); // Handle the server response (success)
            sessionStorage.setItem('sessionToken', data.sessionToken);
            window.location.href = "https://mperumal-usd.github.io/ita/"; 
            alert('Password changed successfully!');
            closeModal();
        })
        .catch(error => {
            console.error('Error:', error); // Handle any errors (failed login, network issues)
            alert('Error logging in. Please try again.');
        });
   
    }
}

function showModal() {
    document.getElementById('changePasswordModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('changePasswordModal').style.display = 'none';
}

function login(){

const form = document.getElementById('login-form');
        // Add an event listener for form submission
form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevents the form from submitting normally

            // Get the form data
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            // Prepare the data to send to the server
            const data = {
                userName: username,
                password: password
            };

            // URL of the remote endpoint where you want to send the POST request
            const url = 'https://infinite-sands-52519-06605f47cb30.herokuapp.com/login'; // Replace with your actual endpoint

            // Send the POST request using fetch
            fetch(url, {
                method: 'POST', // POST method
                headers: {
                    'Content-Type': 'application/json' // Indicating the content type
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Parse response if it's successful
                }
                throw new Error('Failed to login');
            })
            .then(data => {
                console.log('Response:', data); // Handle the server response (success)
                if(data.isFirstLogin){
                    showModal();
                }
                sessionStorage.setItem('sessionToken', data.sessionToken);
                window.location.href = "https://mperumal-usd.github.io/ita/"; 
            })
            .catch(error => {
                console.error('Error:', error); // Handle any errors (failed login, network issues)
                alert('Error logging in. Please try again.');
            });
        });
}


login()
    