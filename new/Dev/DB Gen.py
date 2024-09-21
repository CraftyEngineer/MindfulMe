import sqlite3

conn = sqlite3.connect('journal_entries.db')
cursor = conn.cursor()

# Create the table here i'm just leaving this as a dummy please generate your own code:-
cursor.execute('''
    CREATE TABLE IF NOT EXISTS journal_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        mood TEXT NOT NULL
    )
''')

conn.commit()
conn.close()
