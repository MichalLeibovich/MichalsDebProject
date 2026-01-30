import React, { useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import useStyles from './newDebriefingStyles';
import { Typography } from '@mui/material';

type PersonInvolved = {
  id: number;
  name: string;
  phone: string;
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
  const [errorSolverers, setErrorSolverers] = useState<PersonInvolved[]>([
    { id: 0, name: "", phone: "" }
  ]);

  const teams = ["אפקט הפרפר", "גאוסיין", "הרמוניה", "סוויטץ'", "סופרנובה", "סטארלייט"]
  const [selected, setSelected] = useState<Record<string, string>>({});

  const [errorDescription, setErrorDescription] = useState("");
  const [discoveryTime, setDiscoveryTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalTime, setTotalTime] = useState("");

  const [errorManagingConclusion, setErrorManagingConclusion] = useState("");
  const [monitoringConclusion, setMonitoringConclusion] = useState("");

  errorManagingConclusion


  const [message, setMessage] = useState("");


  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const toggle = (team: string) => {
    setSelected((prev) => {
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
            <label htmlFor="title">כותרת:</label>
            <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div>
            <Typography variant="h4">פרטים כלליים</Typography>
            <div>
              <label htmlFor="title">שם ממלא המסמך:</label>
              <input id="title" type="text" value={documentFillerName} onChange={(e) => setDocumentFillerName(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="title">מ.א:</label>
              <input id="title" type="number" value={personalNumber} onChange={(e) => setPersonalNumber(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="title">תאריך:</label>
              <input id="title" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>

          <div>
            <Typography variant="h4">הגורמים המשתתפים</Typography>
            <div>
              <label htmlFor="title">מנהלי התקלה מצוות נוק:</label>
              <input id="title" type="text" value={errorDealers} onChange={(e) => setErrorDealers(e.target.value)} required />
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
            </div>

            <div>
              <Typography variant="h6">פותר התקלה</Typography>

              {errorSolverers.map((person) => (
                <div key={person.id} style={{ marginBottom: "16px" }}>
                  <div>
                    <label>שם מלא:</label>
                    <input
                      type="text"
                      value={person.name}
                      onChange={(e) =>
                        setErrorSolverers((prev) =>
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
                        setErrorSolverers((prev) =>
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
                  setErrorSolverers((prev) => [
                    ...prev,
                    { id: Date.now(), name: "", phone: "" }
                  ])
                }
              >
                +
              </button>
            </div>

            <div>
              <Typography variant="h6">צוותים שמעורבים בתקלה ומי מכל צוות:</Typography>
              <div>
                {teams.map((team) => (
                  <div
                    key={team}>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <input type="checkbox" checked={team in selected}
                        onChange={() => toggle(team)}
                      />
                      {team}
                    </label>

                    {team in selected && (
                      <label> שם/ות:
                        <input
                          type="text"
                          value={selected[team]}
                          placeholder=""
                          onChange={(e) =>
                            setSelected((prev) => ({
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
            <Typography variant="h4">תיאור התקלה</Typography>
            <div>
              <label htmlFor="teamsInvolved">תיאור התקלה:</label>
              <input id="teamsInvolved" type="text" value={errorDescription} onChange={(e) => setErrorDescription(e.target.value)} required />
            </div>

            <div>
              <div>
                <label htmlFor="teamsInvolved">זמן גילוי:</label>
                <input id="teamsInvolved" type="text" value={discoveryTime} onChange={(e) => setDiscoveryTime(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="teamsInvolved">זמן התחלה:</label>
                <input id="teamsInvolved" type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="teamsInvolved">זמן סיום:</label>
                <input id="teamsInvolved" type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
              </div>
            </div>
          </div>

          <div>
            <Typography variant="h6">פירוט התקלה</Typography>
          </div>

          <div>
            <Typography variant="h6">פתרון התקלה</Typography>
            <div>
              <label htmlFor="teamsInvolved">פתרון:</label>
              <input id="teamsInvolved" type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="teamsInvolved">זמן שלקח לפתור את התקלה:</label>
              <input id="teamsInvolved" type="text" value={totalTime} onChange={(e) => setTotalTime(e.target.value)} required />
            </div>
          </div>

          <div>
            <Typography variant="h6">סיכום אירוע</Typography>
          </div>

          <div>
            <Typography variant="h6">מסקנות להמשך</Typography>
            <div>
              <div>
                <label htmlFor="title">מסקנות לגבי הניטור:</label>
                <input id="title" type="text" value={monitoringConclusion} onChange={(e) => setMonitoringConclusion(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="title">מסקנות לגבי ניהול התקלה:</label>
                <input id="title" type="text" value={errorManagingConclusion} onChange={(e) => setErrorManagingConclusion(e.target.value)} required />
              </div>
            </div>
          </div>


          <button type="submit">Save Data</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default NewDebriefing;
