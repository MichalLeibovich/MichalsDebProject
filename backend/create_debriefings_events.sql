CREATE TABLE debriefing_project.debriefing_events (
    id SERIAL PRIMARY KEY,
    debriefing_id INT NOT NULL,  -- foreign key to parent
    event_time TEXT NOT NULL,
    occurrence TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (debriefing_id) REFERENCES debriefing_project.debriefings(id) ON DELETE CASCADE
);