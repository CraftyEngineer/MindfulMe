document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('save-entry');
    const entryForm = document.getElementById('entryForm');
    const entryListElement = document.getElementById('entries-list');

    if (!entryListElement) {
        console.error('Error: entries-list element not found');
        return;
    }

    const entryList = entryListElement;

    entryForm.addEventListener('submit', saveEntry);
    loadEntries();

    function saveEntry(event) {
        event.preventDefault();
        const date = document.getElementById('entryDate').value;
        const title = document.getElementById('entryTitle').value;
        const content = document.getElementById('entryContent').value;
        const mood = document.getElementById('entryMood').value;
        const tags = document.getElementById('entryTags').value;

        if (!date || !title || !content || !mood) {
            alert('Please fill out all required fields (date, title, content, and mood).');
            return;
        }

        const entry = { date, title, content, mood, tags };

        fetch('/save-entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            clearForm();
            loadEntries();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error saving entry: ' + error.message);
        });
    }

    function loadEntries() {
        fetch('/get-entries')
            .then(response => response.json())
            .then(entries => {
                entryList.innerHTML = '';
                entries.forEach(entry => {
                    const entryElement = document.createElement('div');
                    entryElement.className = 'entry';
                    entryElement.innerHTML = `
                        <h3>${entry.title}</h3>
                        <p>Date: ${entry.date}</p>
                        <p>Mood: ${entry.mood}</p>
                        <p>${entry.content.substring(0, 100)}...</p>
                        <p>Tags: ${entry.tags || 'None'}</p>
                    `;
                    entryList.appendChild(entryElement);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    function clearForm() {
        document.getElementById('entryDate').value = '';
        document.getElementById('entryTitle').value = '';
        document.getElementById('entryContent').value = '';
        document.getElementById('entryMood').value = '3';
        document.getElementById('entryTags').value = '';
    }
});