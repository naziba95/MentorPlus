document.getElementById('lookupForm').addEventListener('submit', function (event)
{
    event.preventDefault();

    const phoneNumber = document.getElementById('phoneNumber').value;

    fetch(`https://mentorplus.onrender.com/api/v1/Mapping/FetchMentorByPhone?PhoneNo=${encodeURIComponent(phoneNumber)}`)
        .then(response => response.json())
        .then(data =>
        {
            const mentorDetailsDiv = document.getElementById('mentorDetails');
            if (data.mentorDetails)
            {
                mentorDetailsDiv.innerHTML = `
                    <h2>Mentor Details</h2>
                    <p>Name: ${data.mentorDetails.FullName}</p>
                    <p>Email: ${data.mentorDetails.Email}</p>
                    <p>Phone: ${data.mentorDetails.PhoneNumber}</p>
                `;
            } else
            {
                mentorDetailsDiv.innerHTML = '<p>No mentor found for this phone number.</p>';
            }
        })
        .catch(error =>
        {
            console.error('Error fetching mentor details:', error);
            document.getElementById('mentorDetails').innerHTML = '<p>Error fetching mentor details.</p>';
        });
});
