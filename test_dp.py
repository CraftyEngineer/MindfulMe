import psycopg2

try:
    conn = psycopg2.connect(
    host="localhost", 
    port="5432", 
    dbname="postgres" ,
    user="postgres" ,
    password="devansh03" 
    )
    cursor = conn.cursor()
    # cursor.execute("SELECT version();")
    # db_version = cursor.fetchone()
    # print(f"Connected to database: {db_version}")

    title = "Test Title"
    date = "2024-09-06"
    content = "This is a test entry."
    mood = 3
    tags = "test"

    query = """
        INSERT INTO journal_entries (title, date, content, mood, tags)
        VALUES (%s, %s, %s, %s, %s)
        """
    
    cursor.execute(query, (title, date, content, mood, tags))
    print(query, (title, date, content, mood, tags))
    cursor.close()
    conn.close()
except Exception as e:
    print(f"Error: {e}")
