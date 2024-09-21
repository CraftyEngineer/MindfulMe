document.getElementById('journal-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const content = document.getElementById('entry').value;
  const mood = document.getElementById('mood').value;

  if (content && mood) {
    const entry = {
      content: content,
      mood: mood
    };

    fetch('http://127.0.0.1:5000/entry', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message); 
        document.getElementById('entry').value = '';
        document.getElementById('mood').value = 3;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error saving entry: ' + error.message);
    });
  } else {
     alert('Please fill out all the required fields.');
  }
});