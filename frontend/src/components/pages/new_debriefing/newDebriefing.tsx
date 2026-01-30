import React, { useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import useStyles from './newDebriefingStyles';
import { Typography } from '@mui/material';

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
  const [date, setDate] = useState("");
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
        <Typography variant="h5" className={classes.text}>תחקיר חדש</Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <label>כותרת:</label>
            <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div>
            <Typography variant="h5">פרטים כלליים</Typography>
            <div>
              <label>שם ממלא המסמך:</label>
              <input id="documentFillerName" type="text" value={documentFillerName} onChange={(e) => setDocumentFillerName(e.target.value)} required />
            </div>
            <div>
              <label>מ.א:</label>
              <input id="personalNumber" type="number" value={personalNumber} onChange={(e) => setPersonalNumber(e.target.value)} required />
            </div>
            <div>
              <label>תאריך:</label>
              <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>

          <div>
            <Typography variant="h5">הגורמים המשתתפים</Typography>
            <div>
              <label>מנהלי התקלה מצוות נוק:</label>
              <input id="errorDealers" type="text" value={errorDealers} onChange={(e) => setErrorDealers(e.target.value)} required />
            </div>
            <div>
              <Typography variant="h6">מגלה התקלה</Typography>

              {errorDiscoverers.map((person) => (
                <div key={person.id} style={{ marginBottom: "16px" }}>
                  <div>
                    <label>שם מלא:</label>
                    <input
                      type="text"
                      value={person.name}
                      onChange={(e) =>
                        setErrorDiscoverers((prev) =>
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
                    <label>מספר טלפון:</label>
                    <input
                      type="number"
                      value={person.phone}
                      onChange={(e) =>
                        setErrorDiscoverers((prev) =>
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

              <button
                type="button"
                onClick={() =>
                  setErrorDiscoverers((prev) => [
                    ...prev,
                    { id: Date.now(), name: "", phone: "" }
                  ])
                }
              >
                +
              </button>

              <button
                type="button"
                onClick={() => {
                  setErrorDiscoverers((prev) => {
                    if (prev.length <= 1) return prev; // leave at least one field
                    return prev.slice(0, prev.length - 1) // remove last
                  })
                }}
              >
                -
              </button>
            </div>

            <div>
              <Typography variant="h6">פותר התקלה</Typography>

              {errorSolvers.map((person) => (
                <div key={person.id} style={{ marginBottom: "16px" }}>
                  <div>
                    <label>שם מלא:</label>
                    <input
                      id="errorSolvers"
                      type="text"
                      value={person.name}
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
                    <label>מספר טלפון:</label>
                    <input
                      id="phone"
                      type="number"
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

              <button
                type="button"
                onClick={() =>
                  setErrorSolvers((prev) => [
                    ...prev,
                    { id: Date.now(), name: "", phone: "" }
                  ])
                }
              >
                +
              </button>

              <button
                type="button"
                onClick={() => {
                  setErrorSolvers((prev) => {
                    if (prev.length <= 1) return prev; // leave at least one field
                    return prev.slice(0, prev.length - 1) // remove last
                  })
                }}
              >
                -
              </button>
            </div>

            <div>
              <Typography variant="h6">צוותים שמעורבים בתקלה ומי מכל צוות:</Typography>
              <div>
                {teams.map((team) => (
                  <div
                    key={team}>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <input type="checkbox" checked={team in selectedTeams}
                        onChange={() => toggle(team)}
                      />
                      {team}
                    </label>

                    {team in selectedTeams && (
                      <label> שם/ות:
                        <input
                          type="text"
                          value={selectedTeams[team]}
                          placeholder=""
                          onChange={(e) =>
                            setSelectedTeams((prev) => ({
                              ...prev,
                              [team]: e.target.value,
                            }))
                          }
                          style={{ width: "200px" }}
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div>
            <Typography variant="h5">תיאור התקלה</Typography>
            <div>
              <label>תיאור התקלה:</label>
              <input id="errorDescription" type="text" value={errorDescription} onChange={(e) => setErrorDescription(e.target.value)} required />
            </div>

            <div>
              <div>
                <label>זמן גילוי:</label>
                <input id="discoveryTime" type="text" value={discoveryTime} onChange={(e) => setDiscoveryTime(e.target.value)} required />
              </div>
              <div>
                <label>זמן התחלה:</label>
                <input id="startTime" type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
              </div>
              <div>
                <label>זמן סיום:</label>
                <input id="endTime" type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
              </div>
            </div>
          </div>

          <div>
            <Typography variant="h5">פירוט התקלה</Typography>

            <div>
              <Typography variant="h6">השתלשלות האירועים:</Typography>

              <div>
                <Typography variant="h6">זמן</Typography>
                <Typography variant="h6">התרחשות</Typography>
              </div>

              <div>
                {chainOfEvents.map((event) => (
                  <div key={event.id} style={{ marginBottom: "16px" }}>
                    <div>
                      <input
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
                      <input
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

                <button
                  type="button"
                  onClick={() =>
                    setChainOfEvents((prev) => [
                      ...prev,
                      { id: Date.now(), time: "", occurrence: "" }
                    ])
                  }
                >
                  +
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setChainOfEvents((prev) => {
                      if (prev.length <= 1) return prev; // leave at least one field
                      return prev.slice(0, prev.length - 1) // remove last
                    })
                  }}
                >
                  -
                </button>
              </div>

            </div>
          </div>

          <div>
            <Typography variant="h5">פתרון התקלה</Typography>
            <div>
              <label htmlFor="errorSolution">פתרון:</label>
              <input id="errorSolution" type="text" value={errorSolution} onChange={(e) => setErrorSolution(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="teamsInvolved">זמן שלקח לפתור את התקלה:</label>
              <input id="teamsInvolved" type="text" value={totalTime} onChange={(e) => setTotalTime(e.target.value)} required />
            </div>
          </div>

          <div>
            <Typography variant="h6">סיכום אירוע</Typography>
            <div>
              <div>
                <label>כיצד נודע לנו על התקלה:</label>
                <input id="howErrorWasFound" type="text" value={howErrorWasFound} onChange={(e) => setHowErrorWasFound(e.target.value)} required />
              </div>
              <div>
                <label>מה נפגע במערכת:</label>
                <input id="whatWasDamagedDueError" type="text" value={whatWasDamagedDueError} onChange={(e) => setWhatWasDamagedDueError(e.target.value)} required />
              </div>
              <div>
                <label>מה גרם לתקלה:</label>
                <input id="errorCause" type="text" value={errorCause} onChange={(e) => setErrorCause(e.target.value)} required />
              </div>
            </div>
          </div>

          <div>
            <Typography variant="h6">מסקנות להמשך</Typography>
            <div>
              <div>
                <label>מסקנות לגבי הניטור:</label>
                <input id="monitoringConclusion" type="text" value={monitoringConclusion} onChange={(e) => setMonitoringConclusion(e.target.value)} required />
              </div>
              <div>
                <label>מסקנות לגבי ניהול התקלה:</label>
                <input id="errorManagingConclusion" type="text" value={errorManagingConclusion} onChange={(e) => setErrorManagingConclusion(e.target.value)} required />
              </div>
            </div>
          </div>


          <button type="submit">Save Data</button>
        </form>
        {message && <p>{message}</p>}
      </div >
    </div >
  );
};

export default NewDebriefing;
