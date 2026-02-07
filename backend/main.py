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

    # people involved - CHILD FIELDS
    # expects a list of {name, role, phone}
    people = data.get("peopleInvolved", [])
    # people involved - CHILD FIELDS
    # expects a list of {team_name, people_names}
    selected_teams = data.get("selectedTeams", [])

    # error description
    errorDescription = data.get("errorDescription")
    discoveryTime = data.get("discoveryTime")
    startTime = data.get("startTime")
    endTime = data.get("endTime")

    # error elaboration - CHILD FIELDS
    # expects a list of {time, occurrence}
    events = data.get("chainOfEvents", [])

    # error solution
    errorSolution = data.get("errorSolution")
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

    # try:
    #     personalNumber = int(personalNumber)
    # except (TypeError, ValueError):
    #     return jsonify({"message": "Invalid personalNumber"}), 400
    #
    # from datetime import datetime
    # try:
    #     date = datetime.strptime(date, "%Y-%m-%d").date()
    # except (ValueError, TypeError):
    #     return jsonify({"message": "Invalid date format"}), 400

    if not all([title, system, documentFillerName, personalNumber, date, errorDescription, discoveryTime, startTime,
                endTime,
                errorSolution, totalTime, howErrorWasFound, errorCause, whatWasDamagedDueError,
                errorManagingConclusion, monitoringConclusion, status]):
        return jsonify({"message": "Required field is missing"}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute(
            """INSERT INTO debriefing_project.debriefings 
            (title, system, documentFillerName, personalNumber, date,
            errorDescription, discoveryTime, startTime, endTime, errorSolution, totalTime, howErrorWasFound, errorCause, 
            whatWasDamagedDueError, errorManagingConclusion, monitoringConclusion, additionalNotes, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
            """,
            (title, system, documentFillerName, personalNumber, date, errorDescription,
             discoveryTime, startTime, endTime, errorSolution, totalTime, howErrorWasFound,
             errorCause, whatWasDamagedDueError, errorManagingConclusion, monitoringConclusion,
             additionalNotes, status)
        )

        debriefing_id = cur.fetchone()[0]

        # --- Insert people involved ---
        for person in people:
            cur.execute(
                """INSERT INTO debriefing_project.debriefing_people
                   (debriefing_id, person_name, role, phone)
                   VALUES (%s, %s, %s, %s);""",
                (debriefing_id, person["name"], person["role"], person.get("phone"))
            )

        # --- Insert chain of events ---
        for event in events:
            cur.execute(
                """INSERT INTO debriefing_project.debriefing_events
                   (debriefing_id, event_time, occurrence)
                   VALUES (%s, %s, %s);""",
                (debriefing_id, event["time"], event["occurrence"])
            )

        for team in selected_teams:
            cur.execute(
                """INSERT INTO debriefing_project.debriefing_selected_teams
                   (debriefing_id, team_name, people_names)
                   VALUES (%s, %s, %s);""",
                (debriefing_id, team["teamName"], team["peopleNames"])
            )

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Debriefing created", "id": debriefing_id}), 201

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
