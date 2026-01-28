from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return psycopg2.connect(
        dbname="postgres",
        user="postgres",
        password="michal123",
        host="localhost",
        port="5432"
    )

@app.route("/api/debriefings", methods=["POST"])
def create_debriefing():
    data = request.get_json()
    title = data.get("title")

    if not title:
        return jsonify({"message": "Title is required"}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute(
            """
            INSERT INTO debriefing_project.debriefing (title)
            VALUES (%s)
            RETURNING id, title, created_at, updated_at;
            """,
            (title,)
        )

        new_row = cur.fetchone()
        conn.commit()

        cur.close()
        conn.close()

        return jsonify({
            "id": new_row[0],
            "title": new_row[1],
            "created_at": new_row[2],
            "updated_at": new_row[3],
        }), 201

    except Exception as e:
        print(e)
        return jsonify({"message": "Database error"}), 500


if __name__ == "__main__":
    app.run(port=3001, debug=True)
