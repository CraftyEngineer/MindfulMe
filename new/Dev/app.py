from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database setup
DATABASE = 'journal_entries.db'


def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


# Route to render the HTML page
@app.route('/')
def index():
    return render_template('index.html')


# API route to save journal entry
@app.route('/save-entry', methods=['POST'])
def save_entry():
    data = request.get_json()
    content = data.get('content')
    mood = data.get('mood')

    if content and mood:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO journal_entries (content, mood) VALUES (?, ?)',
            (content, mood)
        )
        conn.commit()
        conn.close()
        return jsonify({"message": "Entry saved successfully!"})
    else:
        return jsonify({"message": "Content and mood are required!"}), 400


if __name__ == '__main__':
    app.run(debug=True)
