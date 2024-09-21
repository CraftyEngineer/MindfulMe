const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Journal',
  password: 'devansh03',
  port: 5432, // Default PostgreSQL port
});

// Route to handle saving a journal entry
app.post('/save-entry', async (req, res) => {
  const { title, date, content, mood, tags } = req.body;

  try {
    const query = 'INSERT INTO journal_entries (title, date, content, mood, tags) VALUES ($1, $2, $3, $4, $5)';
    const values = [title, date, content, mood, tags];

    await pool.query(query, values);
    res.status(200).json({ message: 'Journal entry saved successfully!' });
  } catch (error) {
    console.error('Error saving journal entry:', error);
    res.status(500).json({ message: 'Error saving journal entry.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
