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
    selected_teams = data.get("selectedTeams", {})

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

        for team_name, people_names in selected_teams.items():
            cur.execute(
                """INSERT INTO debriefing_project.debriefing_selected_teams
                   (debriefing_id, team_name, people_names)
                   VALUES (%s, %s, %s);""",
                (debriefing_id, team_name, people_names)
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


@app.route("/api/recent_debriefings", methods=["GET"])
def get_recent_debriefings():
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("""
            SELECT
                id,
                title,
                system,
                status,
                created_at,
                updated_at
            FROM debriefing_project.debriefings
            ORDER BY updated_at DESC;
        """)

        rows = cur.fetchall()

        debriefings = []
        for row in rows:
            debriefings.append({
                "id": row[0],
                "title": row[1],
                "system": row[2],
                "status": row[3],
                "created_at": row[4],
                "updated_at": row[5],
            })

        cur.close()
        conn.close()

        return jsonify(debriefings), 200

    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to fetch debriefings"}), 500


@app.route("/api/all_debriefings", methods=["GET"])
def get_all_debriefings():
    system = request.args.get("system")  # optional

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("""
            SELECT
                id,
                title,
                status,
                created_at,
                updated_at
            FROM debriefing_project.debriefings
            WHERE system = %s
            ORDER BY updated_at DESC;
        """, (system,))

        rows = cur.fetchall()

        debriefings = []
        for row in rows:
            debriefings.append({
                "id": row[0],
                "title": row[1],
                "status": row[2],
                "created_at": row[3],
                "updated_at": row[4],
            })

        cur.close()
        conn.close()

        return jsonify(debriefings), 200

    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to fetch debriefings"}), 500

@app.route("/api/user", methods=["GET"])
def get_user():
    user = request.args.get("user")  # optional

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("""
            SELECT
                id,
                title,
                status,
                created_at,
                updated_at
            FROM debriefing_project.debriefings
            WHERE user = %s
            ORDER BY updated_at DESC;
        """, (user,))

        rows = cur.fetchall()

        debriefings = []
        for row in rows:
            debriefings.append({
                "id": row[0],
                "title": row[1],
                "status": row[2],
                "created_at": row[3],
                "updated_at": row[4],
            })

        cur.close()
        conn.close()

        return jsonify(debriefings), 200

    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to fetch debriefings"}), 500


@app.route("/api/opened_debriefing/<int:id>", methods=["GET"])
def get_opened_debriefing(id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("SELECT * FROM debriefing_project.debriefings WHERE id = %s", (id,))
        row = cur.fetchone()
        cur.close()
        conn.close()

        if not row:
            return jsonify({"error": "Not found"}), 404

        # Map the row to your field names
        return jsonify({
            "id": row[0],
            "title": row[1],
            "system": row[2],
            "documentFillerName": row[3],
            "personalNumber": row[4],
            "date": row[5],
            "errorDescription": row[6],
            "discoveryTime": row[7],
            "startTime": row[8],
            "endTime": row[9],
            "errorSolution": row[10],
            "totalTime": row[11],
            "howErrorWasFound": row[12],
            "errorCause": row[13],
            "whatWasDamagedDueError": row[14],
            "errorManagingConclusion": row[15],
            "monitoringConclusion": row[16],
            "additionalNotes": row[17],
            "status": row[18]
        })

    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to fetch debriefings"}), 500


@app.route("/api/opened_debriefing_people/<int:id>/<string:role>", methods=["GET"])
def get_opened_debriefing_people(id, role):
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute(
            "SELECT * FROM debriefing_project.debriefing_people WHERE debriefing_id = %s AND LOWER(role) = LOWER(%s)",
            (id, role,)
        )

        if role == "Dealer":
            row = cur.fetchone()  # only one row expected
            if not row:
                cur.close()
                conn.close()
                return jsonify({"error": "Not found"}), 404

            person = {
                "id": row[0],
                "debriefing_id": row[1],
                "person_name": row[2],
                "phone": row[3],
                "role": row[4],
                "created_at": row[5],
                "updated_at": row[6]
            }

            cur.close()
            conn.close()
            return jsonify(person)

        else:
            # multiple rows possible
            rows = cur.fetchall()
            people = []
            for row in rows:
                people.append({
                    "id": row[0],
                    "debriefing_id": row[1],
                    "person_name": row[2],
                    "phone": row[3],
                    "role": row[4],
                    "created_at": row[5],
                    "updated_at": row[6]
                })

            cur.close()
            conn.close()
            return jsonify(people)

    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to fetch debriefings"}), 500


@app.route("/api/opened_debriefing_events/<int:id>", methods=["GET"])
def get_opened_debriefing_events(id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute(
            "SELECT * FROM debriefing_project.debriefing_events WHERE debriefing_id = %s",
            (id,)
        )

        rows = cur.fetchall()
        events = []
        for row in rows:
            events.append({
                "id": row[0],
                "debriefing_id": row[1],
                "time": row[2],
                "occurrence": row[3],
                "created_at": row[4],
                "updated_at": row[5]
            })

        cur.close()
        conn.close()
        return jsonify(events)

    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to fetch debriefings"}), 500


@app.route("/api/opened_debriefing_selected_teams/<int:id>", methods=["GET"])
def get_opened_debriefing_selected_teams(id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute(
            "SELECT * FROM debriefing_project.debriefing_selected_teams WHERE debriefing_id = %s",
            (id,)
        )

        rows = cur.fetchall()
        # selected_teams = []
        # for row in rows:
        #     selected_teams.append({
        #         "team_name": row[2],
        #         "people_names": row[3],
        #     })

        selected_teams = {}
        for row in rows:
            team_name = row[2]
            people_names = row[3]
            selected_teams[team_name] = people_names

            # selected_teams[row[2]] = row[3]

        cur.close()
        conn.close()
        conn.close()
        return jsonify(selected_teams)

    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to fetch debriefings"}), 500


if __name__ == "__main__":
    app.run(port=3001, debug=True)
