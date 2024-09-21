from flask import Flask, request, jsonify,Blueprint
import sqlite3

index_bp = Blueprint('index', __name__)


# Database setup
DATABASE = 'journal_entry.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# def init_db():
#         db = get_db() 
#         cursor = db.cursor()
#         cursor.execute('''
#             CREATE TABLE IF NOT EXISTS journal_entry (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 content TEXT NOT NULL,
#                 mood INTEGER NOT NULL,
#                 timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
#             )
#         ''')
#         db.commit()

@index_bp.route('/entry', methods=['POST'])
def save_entry():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data received"}), 400
        
        content = data.get('content')
        mood = data.get('mood')

        if not content or not mood:
            return jsonify({"error": "Content and mood are required!"}), 400

        conn = get_db()
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO journal_entry (content, mood) VALUES (?, ?)',
            (content, mood)
        )
        conn.commit()
        conn.close()
        return jsonify({"message": "Entry saved successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

