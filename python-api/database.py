import sqlite3
import hashlib
import uuid

DATABASE = "data.db"

def init_db():
    conn = sqlite3.connect(DATABASE)
    try: 
        conn.execute("""
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                token TEXT
            );
        """)

        conn.execute("""
            CREATE TABLE IF NOT EXISTS articles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT UNIQUE NOT NULL,
                description TEXT NOT NULL,
                content TEXT NOT NULL
            );
        """)

        conn.execute("INSERT INTO users (username, password) VALUES (?, ?)", (
            "admin",
            hash_password("password")
        ))

        conn.executemany("INSERT INTO articles (title, description, content) VALUES (?,?,?)", [
            ("Les dangers du Local Storage", "Pourquoi ne faut-il pas stocker de token dans le local storage et pourquoi je le fais quand même dans cet exemple ?", "Contenu..."),
            (":root et variables CSS", "Comment créer un système avec plusieurs thèmes ?", "A écrire..."),
        ])
        
    except Exception as e:
        print(e)
        pass

    conn.commit()
    conn.close()

def get_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def generate_token():
    return str(uuid.uuid4())

def create_user(username, password) -> str | None:
    conn = get_connection()
    try:
        token = generate_token()
        conn.execute(
            "INSERT INTO users (username, password, token) VALUES (?, ?, ?)",
            (username, hash_password(password), token)
        )
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        return None
    conn.close()
    return token


def authenticate_user(username, password):
    conn = get_connection()
    user = conn.execute(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        (username, hash_password(password))
    ).fetchone()

    if not user:
        conn.close()
        return None

    token = generate_token()
    conn.execute(
        "UPDATE users SET token = ? WHERE id = ?",
        (token, user["id"])
    )
    conn.commit()
    conn.close()

    return token

def get_article(id: int):
    conn = get_connection()
    
    article = conn.execute(
        "SELECT id, title, description, content FROM articles WHERE id = ? ", (id, )
    ).fetchone()
    conn.close()
    return article

def get_articles():
    conn = get_connection()
    
    articles = conn.execute(
        "SELECT id, title, description, content FROM articles LIMIT 10"
    ).fetchall()
    conn.close()
    return articles

def get_user_by_token(token):
    conn = get_connection()
    user = conn.execute(
        "SELECT id, username FROM users WHERE token = ?",
        (token,)
    ).fetchone()
    conn.close()
    return user