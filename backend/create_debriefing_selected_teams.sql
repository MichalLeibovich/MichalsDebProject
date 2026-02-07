CREATE TABLE debriefing_project.debriefing_selected_teams (
    id SERIAL PRIMARY KEY,
    debriefing_id INT NOT NULL,       -- foreign key to parent
    team_name TEXT NOT NULL,
    people_names TEXT,                -- the names you typed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (debriefing_id) REFERENCES debriefing_project.debriefings(id) ON DELETE CASCADE
);