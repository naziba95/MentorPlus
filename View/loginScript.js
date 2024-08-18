document.addEventListener('DOMContentLoaded', function ()
{
    const loginForm = document.getElementById('loginForm');

    if (loginForm)
    {
        loginForm.addEventListener('submit', function (event)
        {
            event.preventDefault();

            const Email = document.getElementById('email').value;
            const Password = document.getElementById('password').value;

            const loginData = {
                Email,
                Password
            };

            fetch('https://church-count.onrender.com/api/v1/auth/Login/Worker', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
                .then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(({ status, body }) =>
                {
                    const loginMessageDiv = document.getElementById('loginMessage');
                    if (status === 200)
                    {
                        loginMessageDiv.textContent = 'Login successful';
                        loginMessageDiv.classList.add('success');
                        window.location.href = 'mentee.html'; // Redirect to dashboard or another page
                    } else
                    {
                        loginMessageDiv.textContent = 'Error logging in: ' + (body.message || body.error);
                        loginMessageDiv.classList.add('error');
                    }
                })
                .catch(error =>
                {
                    console.error('Error:', error);
                    const loginMessageDiv = document.getElementById('loginMessage');
                    loginMessageDiv.textContent = 'Error logging in';
                    loginMessageDiv.classList.add('error');
                });
        });
    }
});
