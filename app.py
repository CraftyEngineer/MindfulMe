from flask import Flask
from flask_cors import CORS
from index_app import index_bp
from journal_app import journal_bp

app = Flask(__name__)
CORS(app)

# Register the journal blueprint
app.register_blueprint(index_bp)
app.register_blueprint(journal_bp)

if __name__ == '__main__':
    app.run(debug=True) 