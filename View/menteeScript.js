document.addEventListener('DOMContentLoaded', function ()
{
    const lookupForm = document.getElementById('lookupForm');
    const menteeDetailsDiv = document.getElementById('menteeDetails');
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');

    let currentIndex = 0;
    let mentees = [];

    function displayMentee(index)
    {
        const mentee = mentees[index];
        if (mentee)
        {
            menteeDetailsDiv.innerHTML = `
                <h2>Mentee Details</h2>
                <p><strong>Name:</strong> ${mentee.FullName}</p>
                <p><strong>Email:</strong> ${mentee.Email}</p>
                <p><strong>Phone:</strong> ${mentee.PhoneNumber}</p>
                <p><strong>Parent Contact:</strong> ${mentee.ParentContact}</p>
                <p><strong>Interests:</strong> ${mentee.Interests.join(', ')}</p>
                <p><strong>Hobbies:</strong> ${mentee.Hobbies.join(', ')}</p>
            `;

            // Enable/disable navigation buttons
            prevButton.style.display = currentIndex > 0 ? 'block' : 'none';
            nextButton.style.display = currentIndex < mentees.length - 1 ? 'block' : 'none';
        } else
        {
            menteeDetailsDiv.innerHTML = '<p>No mentees to display.</p>';
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }
    }

    lookupForm.addEventListener('submit', function (event)
    {
        event.preventDefault();

        const phoneNumber = document.getElementById('phoneNumber').value;

        fetch(`https://mentorplus.onrender.com/api/v1/Mapping/GetMenteesByPhone?PhoneNo=${encodeURIComponent(phoneNumber)}`)
            .then(response => response.json())
            .then(data =>
            {
                if (data.mentees && data.mentees.length > 0)
                {
                    mentees = data.mentees;
                    currentIndex = 0;
                    displayMentee(currentIndex);
                } else
                {
                    menteeDetailsDiv.innerHTML = '<p>No mentees found for this phone number.</p>';
                    prevButton.style.display = 'none';
                    nextButton.style.display = 'none';
                }
            })
            .catch(error =>
            {
                console.error('Error fetching mentee details:', error);
                menteeDetailsDiv.innerHTML = '<p>Error fetching mentee details.</p>';
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
            });
    });

    prevButton.addEventListener('click', function ()
    {
        if (currentIndex > 0)
        {
            currentIndex--;
            displayMentee(currentIndex);
        }
    });

    nextButton.addEventListener('click', function ()
    {
        if (currentIndex < mentees.length - 1)
        {
            currentIndex++;
            displayMentee(currentIndex);
        }
    });
});
