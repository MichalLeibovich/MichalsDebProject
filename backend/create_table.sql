CREATE SCHEMA debriefing_project;

CREATE TABLE debriefing_project.debriefing (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION debriefing_project.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_debriefing_updated_at
BEFORE UPDATE ON debriefing_project.debriefing
FOR EACH ROW
EXECUTE FUNCTION debriefing_project.update_updated_at();
