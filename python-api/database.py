import sqlite3
import hashlib
import uuid

DATABASE = "users.db"

def init_db():
    conn = sqlite3.connect(DATABASE)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            token TEXT
        )
    """)
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


def get_user_by_token(token):
    conn = get_connection()
    user = conn.execute(
        "SELECT id, username FROM users WHERE token = ?",
        (token,)
    ).fetchone()
    conn.close()
    return user