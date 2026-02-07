CREATE TABLE debriefing_project.debriefing_people (
    id SERIAL PRIMARY KEY,
    debriefing_id INT NOT NULL,  -- foreign key to parent
    person_name TEXT NOT NULL,
    phone BIGINT,
    role TEXT NOT NULL,           -- e.g., "Error Dealer", "Solver", "Discoverer"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (debriefing_id) REFERENCES debriefing_project.debriefings(id) ON DELETE CASCADE
);
