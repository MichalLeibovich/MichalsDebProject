CREATE TABLE debriefing_project.debriefings (
    id SERIAL PRIMARY KEY,  -- auto-incrementing ID
    title TEXT NOT NULL,
    system TEXT NOT NULL,
    documentFillerName TEXT NOT NULL,
    personalNumber BIGINT NOT NULL,
    date DATE NOT NULL,
    errorDescription TEXT,
    discoveryTime TEXT,
    startTime TEXT,
    endTime TEXT,
    errorSolution TEXT,
    totalTime TEXT,
    howErrorWasFound TEXT,
    errorCause TEXT,
    whatWasDamagedDueError TEXT,
    errorManagingConclusion TEXT,
    monitoringConclusion TEXT,
    additionalNotes TEXT,
    status TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);