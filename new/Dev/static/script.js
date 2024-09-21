document.getElementById('save-entry').addEventListener('click', function () {
    const content = document.getElementById('journal-entry').value;
    const mood = document.getElementById('mood').value;
  
    if (content && mood) {
      const entry = {
        content: content,
        mood: mood
      };
  
      fetch('http://127.0.0.1:5000/save-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message);  // Show success message
        // Optionally reset form fields after saving the entry
        document.getElementById('journal-entry').value = '';
        document.getElementById('mood').value = 3;
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error saving entry.');
      });
    } else {
      alert('Please fill out all the required fields.');
    }
  });
  