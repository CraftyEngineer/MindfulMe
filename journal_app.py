from flask import Flask, Blueprint, request, jsonify
import sqlite3

app = Flask(__name__)

journal_bp = Blueprint('journal', __name__)

DATABASE = 'journal_entries.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS journal_entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            mood INTEGER NOT NULL,
            tags TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    db.commit()

@journal_bp.route('/save-entry', methods=['POST'])
def save_entry():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data received"}), 400
        
        date = data.get('date')
        title = data.get('title')
        content = data.get('content')
        mood = data.get('mood')
        tags = data.get('tags')

        if not all([date, title, content, mood]):
            return jsonify({"error": "Date, title, content, and mood are required!"}), 400

        conn = get_db()
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO journal_entries (date, title, content, mood, tags) VALUES (?, ?, ?, ?, ?)',
            (date, title, content, mood, tags)
        )
        conn.commit()
        conn.close()
        return jsonify({"message": "Entry saved successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@journal_bp.route('/get-entries', methods=['GET'])
def get_entries():
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM journal_entries ORDER BY date DESC, timestamp DESC')
        entries = cursor.fetchall()
        conn.close()
        return jsonify([dict(entry) for entry in entries])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

init_db()

app.register_blueprint(journal_bp)
