import React, { useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import useStyles from './newDebriefingStyles';
import { Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';

type PersonInvolved = {
  id: number;
  name: string;
  phone: string;
};

type Event = {
  id: number;
  time: string;
  occurrence: string;
};

const NewDebriefing: React.FC = () => {
  const { classes, cx } = useStyles();
  const [title, setTitle] = useState("");
  const [documentFillerName, setDocumentFillerName] = useState("");
  const [personalNumber, setPersonalNumber] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [errorDealers, setErrorDealers] = useState("");
  const [errorDiscoverers, setErrorDiscoverers] = useState<PersonInvolved[]>([
    { id: 0, name: "", phone: "" }
  ]);
  const [errorSolvers, setErrorSolvers] = useState<PersonInvolved[]>([
    { id: 0, name: "", phone: "" }
  ]);

  const teams = ["אפקט הפרפר", "גאוסיין", "הרמוניה", "סוויטץ'", "סופרנובה", "סטארלייט"]
  const [selectedTeams, setSelectedTeams] = useState<Record<string, string>>({});

  const [errorDescription, setErrorDescription] = useState("");
  const [discoveryTime, setDiscoveryTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [chainOfEvents, setChainOfEvents] = useState<Event[]>([
    { id: 0, time: "", occurrence: "" }
  ]);

  const [errorSolution, setErrorSolution] = useState("");
  const [totalTime, setTotalTime] = useState("");

  const [errorManagingConclusion, setErrorManagingConclusion] = useState("");
  const [monitoringConclusion, setMonitoringConclusion] = useState("");

  const [howErrorWasFound, setHowErrorWasFound] = useState("");
  const [errorCause, setErrorCause] = useState("");
  const [whatWasDamagedDueError, setWhatWasDamagedDueError] = useState("");


  const [message, setMessage] = useState("");


  useEffect(() => {
    console.log(selectedTeams);
  }, [selectedTeams]);

  const toggle = (team: string) => {
    setSelectedTeams((prev) => {
      if (team in prev) {
        const copy = { ...prev };
        delete copy[team];   // uncheck → remove & clear
        return copy;
      }

      return { ...prev, [team]: "" }; // check → add empty text
    });
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend endpoint
      const response = await axios.post("http://localhost:3001/api/debriefings", {
        title,
      });
      setMessage(`Created debriefing: ${response.data.title}`);
      setTitle("");
    }
    catch (error) {
      console.error('There was an error saving the data!', error);
      setMessage('Error saving data.' + error);
    }
  };

  return (
    <div className={classes.wholePageContainer}>
      <div className={classes.allPartsContainer}>
        <Typography variant="h4" className={classes.text}>תחקיר חדש</Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <Typography variant="h5" className={classes.text}>כותרת:</Typography>
            <TextField id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div>
            <Typography variant="h5" className={classes.text}>פרטים כלליים</Typography>
            <div>
              <Typography variant="h6" className={classes.text}>שם ממלא המסמך:</Typography>
              <TextField id="documentFillerName" type="text" value={documentFillerName} onChange={(e) => setDocumentFillerName(e.target.value)} required />
            </div>
            <div>
              <Typography variant="h6" className={classes.text}>מ.א:</Typography>
              <TextField id="personalNumber" type="number" value={personalNumber} onChange={(e) => setPersonalNumber(e.target.value)} required />
            </div>
            <div>
              <Typography variant="h6" className={classes.text}>תאריך:</Typography>
              <TextField id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>

          <div>
            <Typography variant="h5" className={classes.text}>הגורמים המשתתפים</Typography>
            <div>
              <Typography variant="h6" className={classes.text}>מנהלי התקלה מצוות נוק:</Typography>
              <TextField id="errorDealers" type="text" value={errorDealers} onChange={(e) => setErrorDealers(e.target.value)} required />
            </div>
            <div>
              <Typography variant="h6" className={classes.text}>מגלה התקלה</Typography>

              {errorDiscoverers.map((person) => (
                <div key={person.id} style={{ marginBottom: "16px" }}>
                  <div>
                    <Typography variant="h6" className={classes.text}>שם מלא:</Typography>
                    <TextField id="errorDealersName" type="text" value={person.name} required
                      onChange={(e) =>
                        setErrorDiscoverers((prev) =>
                          prev.map((p) =>
                            p.id === person.id
                              ? { ...p, name: e.target.value }
                              : p
                          )
                        )
                      }
                    />
                  </div>

                  <div>
                    <Typography variant="h6" className={classes.text}>מספר טלפון:</Typography>
                    <TextField id="errorDealerPhone" type="number" value={person.phone} required
                      onChange={(e) =>
                        setErrorDiscoverers((prev) =>
                          prev.map((p) =>
                            p.id === person.id
                              ? { ...p, phone: e.target.value }
                              : p
                          )
                        )
                      }
                    />
                  </div>
                </div>
              ))}

              <Button variant="contained"
                onClick={() =>
                  setErrorDiscoverers((prev) => [
                    ...prev,
                    { id: Date.now(), name: "", phone: "" }
                  ])
                }
              >
                +
              </Button>

              <Button variant="contained"
                onClick={() => {
                  setErrorDiscoverers((prev) => {
                    if (prev.length <= 1) return prev; // leave at least one field
                    return prev.slice(0, prev.length - 1) // remove last
                  })
                }}
              >
                -
              </Button>
            </div>

            <div>
              <Typography variant="h6" className={classes.text}>פותר התקלה</Typography>

              {errorSolvers.map((person) => (
                <div key={person.id} style={{ marginBottom: "16px" }}>
                  <div>
                    <Typography variant="h6" className={classes.text}>שם מלא:</Typography>
                    <TextField id="errorSolverName" type="text" value={person.name}
                      onChange={(e) =>
                        setErrorSolvers((prev) =>
                          prev.map((p) =>
                            p.id === person.id
                              ? { ...p, name: e.target.value }
                              : p
                          )
                        )
                      }
                      required
                    />
                  </div>

                  <div>
                    <Typography variant="h6" className={classes.text}>מספר טלפון:</Typography>
                    <TextField id="errorSolverPhone" type="number"
                      value={person.phone}
                      onChange={(e) =>
                        setErrorSolvers((prev) =>
                          prev.map((p) =>
                            p.id === person.id
                              ? { ...p, phone: e.target.value }
                              : p
                          )
                        )
                      }
                      required
                    />
                  </div>
                </div>
              ))}

              <Button variant="contained"
                onClick={() =>
                  setErrorSolvers((prev) => [
                    ...prev,
                    { id: Date.now(), name: "", phone: "" }
                  ])
                }
              >
                +
              </Button>

              <Button variant="contained"
                onClick={() => {
                  setErrorSolvers((prev) => {
                    if (prev.length <= 1) return prev; // leave at least one field
                    return prev.slice(0, prev.length - 1) // remove last
                  })
                }}
              >
                -
              </Button>
            </div>

            <div>
              <Typography variant="h6" className={classes.text}>צוותים שמעורבים בתקלה ומי מכל צוות:</Typography>
              <div>
                {teams.map((team) => (
                  <div key={team}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={team in selectedTeams}
                          onChange={() => toggle(team)}
                        />
                      }
                      label={team}
                    />

                    {team in selectedTeams && (
                      <div>
                        <Typography variant="h6" className={classes.text}>שם/ות:</Typography>
                        <TextField
                          id="selectedTeamsNames"
                          type="text"
                          value={selectedTeams[team]}
                          onChange={(e) => setSelectedTeams((prev) => ({
                            ...prev,
                            [team]: e.target.value,
                          }))
                          }
                          variant="outlined"
                        />
                      </div>

                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div>
            <Typography variant="h5" className={classes.text}>תיאור התקלה</Typography>
            <div>
              <Typography variant="h6" className={classes.text}>תיאור התקלה:</Typography>
              <TextField id="errorDescription" label="תיאור התקלה" type="text" value={errorDescription}
                onChange={(e) => setErrorDescription(e.target.value)} required />
            </div>

            <div>
              <div>
                <Typography variant="h6" className={classes.text}>זמן גילוי:</Typography>
                <TextField id="discoveryTime" label="זמן גילוי" value={discoveryTime} onChange={(e) => setDiscoveryTime(e.target.value)} required />
              </div>
              <div>
                <Typography variant="h6" className={classes.text}>זמן התחלה:</Typography>
                <TextField id="startTime" label="זמן התחלה" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
              </div>
              <div>
                <Typography variant="h6" className={classes.text}>זמן סיום:</Typography>
                <TextField id="endTime" label="זמן סיום" value={endTime} onChange={(e) => setEndTime(e.target.value)} required
                />
              </div>
            </div>
          </div>

          <div>
            <Typography variant="h5" className={classes.text}>פירוט התקלה</Typography>

            <div>
              <Typography variant="h6" className={classes.text}>השתלשלות האירועים:</Typography>

              <div>
                <Typography variant="h6" className={classes.text}>זמן</Typography>
                <Typography variant="h6" className={classes.text}>התרחשות</Typography>
              </div>

              <div>
                {chainOfEvents.map((event) => (
                  <div key={event.id} style={{ marginBottom: "16px" }}>
                    <div>
                      <TextField
                        id="eventTime"
                        type="text"
                        placeholder="זמן"
                        value={event.time}
                        onChange={(e) =>
                          setChainOfEvents((prev) =>
                            prev.map((p) =>
                              p.id === event.id
                                ? { ...p, time: e.target.value }
                                : p
                            )
                          )
                        }
                        required
                      />
                    </div>

                    <div>
                      <TextField
                        id="eventOccurrence"
                        type="string"
                        placeholder="התרחשות"
                        value={event.occurrence}
                        onChange={(e) =>
                          setChainOfEvents((prev) =>
                            prev.map((p) =>
                              p.id === event.id
                                ? { ...p, occurrence: e.target.value }
                                : p
                            )
                          )
                        }
                        required
                      />
                    </div>
                  </div>
                ))}

                <Button variant="contained"
                  onClick={() =>
                    setChainOfEvents((prev) => [
                      ...prev,
                      { id: Date.now(), time: "", occurrence: "" }
                    ])
                  }
                >
                  +
                </Button>

                <Button variant="contained"
                  onClick={() => {
                    setChainOfEvents((prev) => {
                      if (prev.length <= 1) return prev; // leave at least one field
                      return prev.slice(0, prev.length - 1) // remove last
                    })
                  }}
                >
                  -
                </Button>
              </div>

            </div>
          </div>

          <div>
            <Typography variant="h5">פתרון התקלה</Typography>
            <div>
              <Typography variant="h6" className={classes.text}>פתרון:</Typography>
              <TextField id="errorSolution" type="text" value={errorSolution} onChange={(e) => setErrorSolution(e.target.value)} required />
            </div>
            <div>
              <Typography variant="h6" className={classes.text}>זמן שלקח לפתור את התקלה:</Typography>
              <TextField id="totalTime" type="text" value={totalTime} onChange={(e) => setTotalTime(e.target.value)} required />
            </div>
          </div>

          <div>
            <Typography variant="h5" className={classes.text}>סיכום אירוע</Typography>
            <div>
              <div>
                <Typography variant="h6" className={classes.text}>כיצד נודע לנו על התקלה:</Typography>
                <TextField id="howErrorWasFound" type="text" value={howErrorWasFound} onChange={(e) => setHowErrorWasFound(e.target.value)} required />
              </div>
              <div>
                <Typography variant="h6" className={classes.text}>מה נפגע במערכת:</Typography>
                <TextField id="whatWasDamagedDueError" type="text" value={whatWasDamagedDueError} onChange={(e) => setWhatWasDamagedDueError(e.target.value)} required />
              </div>
              <div>
                <Typography variant="h6" className={classes.text}>מה גרם לתקלה:</Typography>
                <TextField id="errorCause" type="text" value={errorCause} onChange={(e) => setErrorCause(e.target.value)} required />
              </div>
            </div>
          </div>

          <div>
            <Typography variant="h5" className={classes.text}>מסקנות להמשך</Typography>
            <div>
              <div>
                <Typography variant="h6" className={classes.text}>מסקנות לגבי הניטור:</Typography>
                <TextField id="monitoringConclusion" type="text" value={monitoringConclusion} onChange={(e) => setMonitoringConclusion(e.target.value)} required />
              </div>
              <div>
                <Typography variant="h6" className={classes.text}>מסקנות לגבי ניהול התקלה:</Typography>
                <TextField id="errorManagingConclusion" type="text" value={errorManagingConclusion} onChange={(e) => setErrorManagingConclusion(e.target.value)} required />
              </div>
            </div>
          </div>

          <Button type="submit" variant="contained">Save Data</Button>
        </form>
        {message && <p>{message}</p>}
      </div >
    </div >
  );
};

export default NewDebriefing;
