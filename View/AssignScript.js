document.addEventListener('DOMContentLoaded', function ()
{
    const menteePhoneInput = document.getElementById('menteePhone');
    const menteeSuggestions = document.getElementById('menteeSuggestions');
    const mentorPhoneInput = document.getElementById('mentorPhone');
    const mentorSuggestions = document.getElementById('mentorSuggestions');
    const assignMentorForm = document.getElementById('assignMentorForm');

    let selectedMenteeId = null;
    let selectedMentorId = null;

    function fetchSuggestions(url, query, suggestionsDiv, setIdCallback)
    {
        if (query.length > 2)
        {
            fetch(`${url}?PhoneNo=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data =>
                {
                    suggestionsDiv.innerHTML = '';
                    if (data.results && data.results.length > 0)
                    {
                        data.results.forEach(item =>
                        {
                            const div = document.createElement('div');
                            div.textContent = `${item.FullName} (${item.PhoneNumber})`;
                            div.dataset.id = item._id;
                            suggestionsDiv.appendChild(div);
                        });
                    } else
                    {
                        suggestionsDiv.innerHTML = '<div>No results found</div>';
                    }
                })
                .catch(error =>
                {
                    console.error('Error fetching suggestions:', error);
                });
        } else
        {
            suggestionsDiv.innerHTML = '';
        }
    }

    function handleSuggestionClick(event, input, setIdCallback, suggestionsDiv)
    {
        const target = event.target;
        if (target.dataset.id)
        {
            input.value = target.textContent;
            setIdCallback(target.dataset.id);
            suggestionsDiv.innerHTML = '';
        }
    }

    menteePhoneInput.addEventListener('input', function ()
    {
        fetchSuggestions('http://localhost:3000/api/v1/Mapping/FetchMenteeByPhone', menteePhoneInput.value, menteeSuggestions, id => selectedMenteeId = id);
    });

    menteeSuggestions.addEventListener('click', function (event)
    {
        handleSuggestionClick(event, menteePhoneInput, id => selectedMenteeId = id, menteeSuggestions);
    });

    mentorPhoneInput.addEventListener('input', function ()
    {
        fetchSuggestions('http://localhost:3000/api/v1/Mapping/GetMentorByMentorPhone', mentorPhoneInput.value, mentorSuggestions, id => selectedMentorId = id);
    });

    mentorSuggestions.addEventListener('click', function (event)
    {
        handleSuggestionClick(event, mentorPhoneInput, id => selectedMentorId = id, mentorSuggestions);
    });

    assignMentorForm.addEventListener('submit', function (event)
    {
        event.preventDefault();

        if (selectedMenteeId && selectedMentorId)
        {
            const assignmentData = {
                mentorId: selectedMentorId
            };

            fetch(`https://mentorplus.onrender.com/api/v1/Mapping/AssignMentor?menteeId=${encodeURIComponent(selectedMenteeId)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(assignmentData)
            })
                .then(response => response.json())
                .then(data =>
                {
                    if (data.success)
                    {
                        alert('Mentor assigned successfully');
                        assignMentorForm.reset();
                        selectedMenteeId = null;
                        selectedMentorId = null;
                    } else
                    {
                        alert('Error assigning mentor: ' + data.message);
                    }
                })
                .catch(error =>
                {
                    console.error('Error:', error);
                    alert('Error assigning mentor');
                });
        } else
        {
            alert('Please select both a mentee and a mentor');
        }
    });
});
