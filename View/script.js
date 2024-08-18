document.addEventListener('DOMContentLoaded', function () {
    const lookupForm = document.getElementById('lookupForm');
    const mentorForm = document.getElementById('registerMentorForm');
    const menteeForm = document.getElementById('registerMenteeForm');

    if (lookupForm) {
        lookupForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const phoneNumber = document.getElementById('phoneNumber').value;

            fetch(`https://mentorplus.onrender.com/api/v1/Mapping/FetchMentorByPhone?PhoneNo=${encodeURIComponent(phoneNumber)}`)
                .then(response => response.json())
                .then(data => {
                    const mentorDetailsDiv = document.getElementById('mentorDetails');
                    if (data.mentorDetails) {
                        mentorDetailsDiv.innerHTML = `
                            <h2>Mentor Details</h2>
                            <p>Name: ${data.mentorDetails.FullName}</p>
                            <p>Email: ${data.mentorDetails.Email}</p>
                            <p>Phone: ${data.mentorDetails.PhoneNumber}</p>
                        `;
                    } else {
                        mentorDetailsDiv.innerHTML = '<p>No mentor found for this phone number.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error fetching mentor details:', error);
                    document.getElementById('mentorDetails').innerHTML = '<p>Error fetching mentor details.</p>';
                });
        });
    }

    function displayMessage(form, message, isSuccess) {
        let messageDiv = form.querySelector('.message');
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            form.appendChild(messageDiv);
        }
        messageDiv.textContent = message;
        messageDiv.classList.toggle('success', isSuccess);
        messageDiv.classList.toggle('error', !isSuccess);
    }

    if (mentorForm) {
        mentorForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const FullName = document.getElementById('mentorFullName').value;
            const Email = document.getElementById('mentorEmail').value;
            const PhoneNumber = document.getElementById('mentorPhoneNumber').value;
            const Hobbies = document.getElementById('mentorHobbies').value.split(',');
            const Interests = document.getElementById('mentorInterests').value.split(',');

            const mentorData = {
                FullName,
                Email,
                PhoneNumber,
                Hobbies,
                Interests
            };

            fetch('https://mentorplus.onrender.com/api/v1/Auth/Register/mentor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mentorData)
            })
                .then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(({ status, body }) => {
                    if (status === 200) {
                        displayMessage(mentorForm, 'Mentor registered successfully', true);
                        mentorForm.reset();
                    } else {
                        displayMessage(mentorForm, 'Error registering mentor: ' + (body.message || body.error), false);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    displayMessage(mentorForm, 'Error registering mentor', false);
                });
        });
    }

    if (menteeForm) {
        menteeForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const FullName = document.getElementById('menteeFullName').value;
            const Email = document.getElementById('menteeEmail').value;
            const PhoneNumber = document.getElementById('menteePhoneNumber').value;
            const Hobbies = document.getElementById('menteeHobbies').value.split(',');
            const Interests = document.getElementById('menteeInterests').value.split(',');

            const menteeData = {
                FullName,
                Email,
                PhoneNumber,
                Hobbies,
                Interests
            };

            fetch('https://mentorplus.onrender.com/api/v1/Auth/Register/mentee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(menteeData)
            })
                .then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(({ status, body }) => {
                    if (status === 200) {
                        displayMessage(menteeForm, 'Mentee registered successfully', true);
                        menteeForm.reset();
                    } else {
                        displayMessage(menteeForm, 'Error registering mentee: ' + (body.message || body.error), false);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    displayMessage(menteeForm, 'Error registering mentee', false);
                });
        });
    }
});
