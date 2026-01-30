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

  const [teams, setTeams] = useState<string[]>([]);
  const [selected, setSelected] = useState<Record<string, string>>({});

  const [errorDescription, setErrorDescription] = useState("");

  const [message, setMessage] = useState("");


  useEffect(() => {
    console.log(teams);
  }, [teams]);

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
                <label>
                  <input
                    type="checkbox"
                    value="אפקט הפרפר"
                    checked={teams.includes("אפקט הפרפר")}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTeams((prev) =>
                        prev.includes(value)
                          ? prev.filter((v) => v !== value)
                          : [...prev, value]
                      );
                    }}
                  />
                  אפקט הפרפר
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    value="גאוסיין"
                    checked={teams.includes("גאוסיין")}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTeams((prev) =>
                        prev.includes(value)
                          ? prev.filter((v) => v !== value)
                          : [...prev, value]
                      );
                    }}
                  />
                  גאוסיין
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    value="הרמוניה"
                    checked={teams.includes("הרמוניה")}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTeams((prev) =>
                        prev.includes(value)
                          ? prev.filter((v) => v !== value)
                          : [...prev, value]
                      );
                    }}
                  />
                  הרמוניה
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    value="סופרנובה"
                    checked={teams.includes("סופרנובה")}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTeams((prev) =>
                        prev.includes(value)
                          ? prev.filter((v) => v !== value)
                          : [...prev, value]
                      );
                    }}
                  />
                  סופרנובה
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    value="סוויטץ'"
                    checked={teams.includes("סוויטץ'")}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTeams((prev) =>
                        prev.includes(value)
                          ? prev.filter((v) => v !== value)
                          : [...prev, value]

                      );
                    }}

                  />
                  סוויטץ'
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    value="סטארלייט"
                    checked={teams.includes("סטארלייט")}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTeams((prev) =>
                        prev.includes(value)
                          ? prev.filter((v) => v !== value)
                          : [...prev, value]
                      );
                    }}
                  />
                  סטארלייט
                </label>
              </div>
            </div>
          </div>


          <div>
            <Typography variant="h4">תיאור התקלה</Typography>
            <div>
              <label htmlFor="teamsInvolved">תיאור התקלה:</label>
              <input id="teamsInvolved" type="text" value={errorDescription} onChange={(e) => setErrorDescription(e.target.value)} required />
            </div>
          </div>

          <div>
            <Typography variant="h6">פירוט התקלה</Typography>
          </div>

          <div>
            <Typography variant="h6">פתרון התקלה</Typography>
          </div>

          <div>
            <Typography variant="h6">סיכום אירוע</Typography>
          </div>

          <div>
            <label htmlFor="title">מסקנות להמשך</label>
            <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <button type="submit">Save Data</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default NewDebriefing;
