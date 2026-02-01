from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from werkzeug.security import generate_password_hash

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

    # title
    title = data.get("title")

    # system
    system = data.get("system")

    # personal info
    documentFillerName = data.get("documentFillerName")
    personalNumber = data.get("personalNumber")
    date = data.get("date")

    # people involved
    errorDealers = data.get("errorDealers")
    errorDiscoverers = data.get("errorDiscoverers")
    errorSolvers = data.get("errorSolvers")
    #todo טבלה נפרדת selectedTeams = data.get("selectedTeams")

    # error description
    errorDescription = data.get("errorDescription")
    discoveryTime = data.get("discoveryTime")
    startTime = data.get("startTime")
    endTime = data.get("endTime")

    # error elaboration
    # todo טבלה נפרדת chainOfEvents = data.get("chainOfEvents")
    # { id: 0, time: "", occurrence: "" }

    # error solution
    errorSolution = data.get("title")
    totalTime = data.get("totalTime")

    # error summary
    howErrorWasFound = data.get("howErrorWasFound")
    errorCause = data.get("errorCause")
    whatWasDamagedDueError = data.get("whatWasDamagedDueError")

    # error conclusion
    errorManagingConclusion = data.get("errorManagingConclusion")
    monitoringConclusion = data.get("monitoringConclusion")

    # additionalNotes
    additionalNotes = data.get("additionalNotes")

    # status
    status = data.get("status")

    is_required_field_empty = ((not title) or (not system) or (not documentFillerName) or (not personalNumber) or (not date) or
                               (not errorDealers) or (not errorDiscoverers) or (not errorSolvers) or (not errorDescription) or
                               (not discoveryTime) or (not startTime) or (not endTime) or (not errorSolution) or (not totalTime) or
                               (not howErrorWasFound) or (not errorCause) or (not whatWasDamagedDueError) or
                               (not errorManagingConclusion) or (not monitoringConclusion) or (not status))
    if is_required_field_empty:
        return jsonify({"message": "Required field is missing"}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute(
            """            INSERT INTO debriefing_project.debriefings (title, system, documentFillerName, personalNumber, date, errorDescription, 
            discoveryTime, startTime, endTime, errorSolution, totalTime, howErrorWasFound, errorCause, 
            whatWasDamagedDueError, errorManagingConclusion, monitoringConclusion, additionalNotes, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id, title, system, status, updated_at, created_at;

            """,
            (title, system, documentFillerName, personalNumber, date, errorDescription, discoveryTime, startTime, errorSolution,
             totalTime, howErrorWasFound, errorCause, whatWasDamagedDueError, errorManagingConclusion, monitoringConclusion,
             additionalNotes, status)
        )

        new_row = cur.fetchone()
        conn.commit()

        cur.close()
        conn.close()

        return jsonify({
            "id": new_row[0],
            "title": new_row[1],
            "system": new_row[2],
            "status": new_row[3],
            "updated_at": new_row[4],
            "created_at": new_row[5],
        }), 201

    except Exception as e:
        print(e)
        return jsonify({"message": "Database error"}), 500



@app.route("/api/users", methods=["POST"])
def create_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "All fields are required"}), 400


    # 🔐 hash the password
    password_hash = generate_password_hash(password)

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute(
            """
            INSERT INTO debriefing_project.users (username, password_hash)
            VALUES (%s, %s)
            RETURNING id, username, password_hash, created_at;
            """,
            (username, password_hash)
        )

        new_row = cur.fetchone()
        conn.commit()

        cur.close()
        conn.close()

        return jsonify({
            "id": new_row[0],
            "username": new_row[1],
            "created_at": new_row[2],
            "updated_at": new_row[3],
        }), 201

    except Exception as e:
        print(e)
        return jsonify({"message": "Database error"}), 500



if __name__ == "__main__":
    app.run(port=3001, debug=True)
