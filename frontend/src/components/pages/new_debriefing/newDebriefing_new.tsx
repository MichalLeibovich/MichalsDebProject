import React, { useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import useStyles from './newDebriefingStyles';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

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

interface FormData {
    title: string;
    system: string;
    description: string;
    documentFillerName: string;
    personalNumber: string;
    date: Dayjs | null;
    errorDealers: string;
    errorDiscoverers: PersonInvolved[];
    errorSolvers: PersonInvolved[];
    selectedTeams: Record<string, string>;
    errorDescription: string,
    discoveryTime: string,
    startTime: string,
    endTime: string,
    chainOfEvents: Event[],
    errorSolution: string,
    totalTime: string,
    howErrorWasFound: string,
    errorCause: string,
    whatWasDamagedDueError: string,
    errorManagingConclusion: string,
    monitoringConclusion: string,
    additionalNotes: string,
    status: string
}


const NewDebriefing: React.FC = () => {
      const { classes, cx } = useStyles();

    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<FormData>({
        title: "",
        system: "",
        description: "",
        documentFillerName: "",
        personalNumber: "",
        date: dayjs(),
        errorDealers: "",
        errorDiscoverers: [],
        errorSolvers: [],
        selectedTeams: {},
        errorDescription: "",
        discoveryTime: "",
        startTime: "",
        endTime: "",
        chainOfEvents: [],
        errorSolution: "",
        totalTime: "",
        howErrorWasFound: "",
        errorCause: "",
        whatWasDamagedDueError: "",
        errorManagingConclusion: "",
        monitoringConclusion: "",
        additionalNotes: "",
        status: ""
    });

    const [errorDiscoverers, setErrorDiscoverers] = useState<PersonInvolved[]>([
        { id: 0, name: "", phone: "" }
    ]);
    const [errorSolvers, setErrorSolvers] = useState<PersonInvolved[]>([
        { id: 0, name: "", phone: "" }
    ]);
    const teams = ["אפקט הפרפר", "גאוסיין", "גואט", "הרמוניה", "מגן עליון", "סוויטץ'", "סופרנובה", "סטארלייט"]
    const [selectedTeams, setSelectedTeams] = useState<Record<string, string>>({});
    const [chainOfEvents, setChainOfEvents] = useState<Event[]>([
        { id: 0, time: "", occurrence: "" }
    ]);
    // message if there's an error
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
      const peopleInvolved = [
        { name: formData.errorDealers, role: "Dealer" },   // single string
        ...errorDiscoverers.map(p => ({
          name: p.name,
          role: "Discoverer",
          phone: p.phone
        })),
        ...errorSolvers.map(p => ({
          name: p.name,
          personalNumber: p.phone,
          role: "Solver",
          phone: p.phone
        }))
      ];


      // Send a POST request to your backend endpoint
    //   const response = await axios.post("http://localhost:3001/api/debriefings", formData,
    //     chainOfEvents: chainOfEvents.map(e => ({ time: e.time, occurrence: e.occurrence })),
    //     selectedTeams
    //   );
      setMessage(`Created debriefing: ${response.data.title} at ${response.data.created_at}`);
      setTitle("");
      setSystem("");

      // personal info
      setDocumentFillerName("");
      setPersonalNumber(0);
      setDate(dayjs());

      // people involved
      setErrorDealers("");
      setErrorDiscoverers([
        { id: 0, name: "", phone: "" }
      ]);
      setErrorSolvers([
        { id: 0, name: "", phone: "" }
      ]);
      setSelectedTeams({});

      // error description
      setErrorDescription("");
      setDiscoveryTime("");
      setStartTime("");
      setEndTime("");

      // error elaboration
      setChainOfEvents([
        { id: 0, time: "", occurrence: "" }
      ]);

      // error solution
      setErrorSolution("");
      setTotalTime("");

      // error summary
      setHowErrorWasFound("");
      setErrorCause("");
      setWhatWasDamagedDueError("");

      // error conclusion
      setErrorManagingConclusion("");
      setMonitoringConclusion("");

      // additional notes
      setAdditionalNotes("");

      // status
      setStatus("");


      setMessage("");

    }
    catch (error) {
      console.error('There was an error saving the data!', error);
      setMessage('Error saving data.' + error);
    }
  };

  return (
    <div className={classes.wholePageContainer}>
      <div className={classes.allPartsContainer}>
        <Typography variant="h3" className={cx(classes.text, classes.titleNewDebriefing)}>תחקיר חדש</Typography>
        <form onSubmit={handleSubmit}>
          <div className={classes.titleContainer}>
            <div className={classes.fieldsTextAndFieldInOneLineContainer}>
              <Typography variant="h5" className={cx(classes.text, classes.fieldsTitle)}>כותרת:</Typography>
              <TextField className={cx(classes.allFields, classes.titleField)} id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className={classes.fieldsTextAndFieldInOneLineContainer}>
              <Typography variant="h5" className={cx(classes.text, classes.fieldsTitle)}>מערכת</Typography>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">מערכת</InputLabel>
                <Select
                  className={classes.selectField}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={system}
                  label="מערכת"
                  onChange={(e) => setSystem(e.target.value)}>
                  <MenuItem value="אפקט הפרפר">אפקט הפרפר</MenuItem>
                  <MenuItem value="גאוסיין">גאוסיין</MenuItem>
                  <MenuItem value="הרמוניה">הרמוניה</MenuItem>
                  <MenuItem value="מגן עליון">מגן עליון</MenuItem>
                  <MenuItem value="סוויטץ'">סוויטץ'</MenuItem>
                  <MenuItem value="סופרנובה">סופרנובה</MenuItem>
                  <MenuItem value="סטארלייט">סטארלייט</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>



          <div>
            <Typography className={cx(classes.titleSubject, classes.text)} variant="h4">פרטים כלליים</Typography>
            <div className={classes.generalInfoWholePart}>
              <div className={classes.generalInfoPart}>

                <div className={classes.fieldsTextAndFieldInOneLineContainer}>
                  <Typography variant="h6" className={classes.text}>שם ממלא המסמך:</Typography>
                  <TextField className={cx(classes.allFields, classes.personInfoFields)} id="documentFillerName" type="text" value={documentFillerName} onChange={(e) => setDocumentFillerName(e.target.value)} required />
                </div>

                <div className={classes.fieldsTextAndFieldInOneLineContainer}>
                  <Typography variant="h6" className={classes.text}>מ.א:</Typography>
                  <TextField className={cx(classes.allFields, classes.personInfoFields)} id="personalNumber" type="number" value={personalNumber} required
                    onChange={(e) => {
                      if (Number(e.target.value)) {
                        setPersonalNumber(Number(e.target.value))
                      }
                    }
                    }
                  />
                </div>

                <div className={classes.fieldsTextAndFieldInOneLineContainer}>
                  <Typography variant="h6" className={classes.text}>תאריך:</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className={classes.datePickerField}
                      label="תאריך התחקיר"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </div>


          <div>
            <Typography variant="h4" className={cx(classes.text, classes.titleSubject)}>הגורמים המשתתפים</Typography>
            <div className={classes.peopleInvolved}>

              <div className={classes.fieldsTextAndFieldInOneLineContainer}>
                <Typography variant="h6" className={classes.text}>מנהלי התקלה מצוות נוק:</Typography>
                <TextField className={cx(classes.allFields, classes.errorDealersTextField)} id="errorDealers" type="text" value={errorDealers} onChange={(e) => setErrorDealers(e.target.value)} required />
              </div>
              <div className={classes.generalInfoErrorSelversAndDescoverers}>
                <div>
                  <Typography className={cx(classes.text, classes.errorSolverOrDiscoverer)} variant="h6">מגלה התקלה</Typography>

                  {errorDiscoverers.map((person) => (
                    <div key={person.id} style={{ marginBottom: "16px" }}>
                      <div>
                        <Typography variant="h6" className={classes.text}>שם מלא:</Typography>
                        <TextField className={cx(classes.allFields, classes.personInfoFields)} id="errorDealersName" type="text" value={person.name} required
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
                        <TextField className={cx(classes.allFields, classes.personInfoFields)} id="errorDealerPhone" type="number" value={person.phone} required
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

                  <div className={classes.plusOrMinusButtonContainer}>
                    <Button
                      className={classes.plusOrMinusButton}
                      variant="contained"
                      onClick={() =>
                        setErrorDiscoverers((prev) => [
                          ...prev,
                          { id: Date.now(), name: "", phone: "" }
                        ])
                      }
                    >
                      +
                    </Button>

                    <Button
                      className={classes.plusOrMinusButton}
                      variant="contained"
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
                </div>

                <div>
                  <Typography className={cx(classes.text, classes.errorSolverOrDiscoverer)} variant="h6">פותר התקלה</Typography>

                  {errorSolvers.map((person) => (
                    <div key={person.id} style={{ marginBottom: "16px" }}>
                      <div>
                        <Typography variant="h6" className={classes.text}>שם מלא:</Typography>
                        <TextField className={cx(classes.allFields, classes.personInfoFields)} id="errorSolverName" type="text" value={person.name}
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
                        <TextField className={cx(classes.allFields, classes.personInfoFields)} id="errorSolverPhone" type="number"
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

                  <div className={classes.plusOrMinusButtonContainer}>
                    <Button
                      className={classes.plusOrMinusButton}
                      variant="contained"
                      onClick={() =>
                        setErrorSolvers((prev) => [
                          ...prev,
                          { id: Date.now(), name: "", phone: "" }
                        ])
                      }
                    >
                      +
                    </Button>

                    <Button
                      className={classes.plusOrMinusButton}
                      variant="contained"
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
                </div>
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
                        <div className={classes.fieldsTextAndFieldInOneLineContainer}>
                          <Typography variant="h6" className={classes.text}>שם/ות:</Typography>
                          <TextField
                            className={cx(classes.allFields, classes.personInfoFields)}
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
          </div>

          <div>
            <Typography variant="h4" className={cx(classes.text, classes.titleSubject)}>תיאור התקלה</Typography>
            <div className={classes.errorDescribing}>
              <div>
                <Typography variant="h6" className={classes.text}>תיאור התקלה:</Typography>
                <TextField className={cx(classes.allFields, classes.errorDescriptionAndSolutionFields)} id="errorDescription" type="text" value={errorDescription}
                  onChange={(e) => setErrorDescription(e.target.value)} required />
              </div>

              <div className={classes.times}>
                <div>
                  <Typography variant="h6" className={classes.text}>זמן גילוי:</Typography>
                  <TextField className={cx(classes.allFields, classes.timesField)} id="discoveryTime" label="זמן גילוי" value={discoveryTime} onChange={(e) => setDiscoveryTime(e.target.value)} required />
                </div>
                <div>
                  <Typography variant="h6" className={classes.text}>זמן התחלה:</Typography>
                  <TextField className={cx(classes.allFields, classes.timesField)} id="startTime" label="זמן התחלה" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </div>
                <div>
                  <Typography variant="h6" className={classes.text}>זמן סיום:</Typography>
                  <TextField className={cx(classes.allFields, classes.timesField)} id="endTime" label="זמן סיום" value={endTime} onChange={(e) => setEndTime(e.target.value)} required
                  // <TextField className={cx(classes.allFields, classes.timesField)} id="endTime" placeholder="זמן סיום" value={endTime} onChange={(e) => setEndTime(e.target.value)} required
                  />
                </div>
              </div>
            </div>
          </div>



          <div>
            <Typography className={cx(classes.text, classes.titleSubject)} variant="h4">פירוט התקלה</Typography>
            <div className={classes.errorElaboration}>
              <div>
                <Typography variant="h5" className={cx(classes.text, classes.titleChainOfEvents)}>השתלשלות האירועים:</Typography>

                <div className={classes.eventsTableHeader}>
                  <Typography variant="h6" className={classes.text}>זמן</Typography>
                  <Typography variant="h6" className={classes.text}>התרחשות</Typography>
                </div>

                <div>
                  {chainOfEvents.map((event) => (
                    <div className={classes.eventsTable} key={event.id}>
                      <div>
                        <TextField
                          className={cx(classes.allFields, classes.timesField)}
                          id="eventTime"
                          type="text"
                          label="זמן"
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
                          className={cx(classes.allFields, classes.occurrenceField)}
                          id="eventOccurrence"
                          type="string"
                          label="התרחשות"
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
                  <div className={classes.plusOrMinusButtonContainer}>
                    <Button
                      className={classes.plusOrMinusButton}
                      variant="contained"
                      onClick={() =>
                        setChainOfEvents((prev) => [
                          ...prev,
                          { id: Date.now(), time: "", occurrence: "" }
                        ])
                      }
                    >
                      +
                    </Button>

                    <Button
                      className={classes.plusOrMinusButton}
                      variant="contained"
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
            </div>
          </div>



          <div>
            <Typography variant="h4" className={cx(classes.text, classes.titleSubject)}>פתרון התקלה</Typography>
            <div className={classes.errorSolutionPart}>
              <div>
                <Typography variant="h6" className={classes.text}>פתרון:</Typography>
                <TextField className={cx(classes.allFields, classes.errorDescriptionAndSolutionFields)} id="errorSolution" type="text" value={errorSolution} onChange={(e) => setErrorSolution(e.target.value)} required />
              </div>
              <div className={classes.fieldsTextAndFieldInOneLineContainer}>
                <Typography variant="h6" className={classes.text}>זמן שלקח לפתור את התקלה:</Typography>
                <TextField className={cx(classes.allFields, classes.totalTimesField)} id="totalTime" type="text" value={totalTime} onChange={(e) => setTotalTime(e.target.value)} required />
              </div>
            </div>
          </div>

          <div>
            <Typography variant="h4" className={cx(classes.text, classes.titleSubject)}>סיכום אירוע</Typography>
            <div className={classes.sumerizingPart}>
              <div>
                <Typography variant="h6" className={classes.text}>כיצד נודע לנו על התקלה:</Typography>
                <TextField className={cx(classes.allFields, classes.summaryAndConclusionFields)} id="howErrorWasFound" type="text" value={howErrorWasFound} onChange={(e) => setHowErrorWasFound(e.target.value)} required />
              </div>
              <div>
                <Typography variant="h6" className={classes.text}>מה נפגע במערכת:</Typography>
                <TextField className={cx(classes.allFields, classes.summaryAndConclusionFields)} id="whatWasDamagedDueError" type="text" value={whatWasDamagedDueError} onChange={(e) => setWhatWasDamagedDueError(e.target.value)} required />
              </div>
              <div>
                <Typography variant="h6" className={classes.text}>מה גרם לתקלה:</Typography>
                <TextField className={cx(classes.allFields, classes.summaryAndConclusionFields)} id="errorCause" type="text" value={errorCause} onChange={(e) => setErrorCause(e.target.value)} required />
              </div>
            </div>
          </div>

          <div>
            <Typography variant="h4" className={cx(classes.text, classes.titleSubject)}>מסקנות להמשך</Typography>
            <div className={classes.conclusionPart}>
              <div>
                <Typography variant="h6" className={classes.text}>מסקנות לגבי הניטור:</Typography>
                <TextField className={cx(classes.allFields, classes.summaryAndConclusionFields)} id="monitoringConclusion" type="text" value={monitoringConclusion} onChange={(e) => setMonitoringConclusion(e.target.value)} required />
              </div>
              <div>
                <Typography variant="h6" className={classes.text}>מסקנות לגבי ניהול התקלה:</Typography>
                <TextField className={cx(classes.allFields, classes.summaryAndConclusionFields)} id="errorManagingConclusion" type="text" value={errorManagingConclusion} onChange={(e) => setErrorManagingConclusion(e.target.value)} required />
              </div>
            </div>
          </div>


          <div className={classes.debriefingStatusPart}>
            <div className={classes.fieldsTextAndFieldInOneLineContainer}>
              <Typography variant="h5" className={cx(classes.text, classes.fieldsTitle)}>סיימת למלא את התחקיר?</Typography>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">סטטוס סיום</InputLabel>
                <Select
                  className={classes.selectField}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="סטטוס התחקיר"
                  onChange={(e) => setStatus(e.target.value)} required>
                  <MenuItem value="בתהליך">עדיין לא</MenuItem>
                  <MenuItem value="מוכן">סיימתי</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className={classes.additionalNotesPart}>
            {status === "בתהליך" && (
              <div>
                <Typography variant="h6" className={classes.text}>הערות נוספות:</Typography>
                <TextField className={cx(classes.allFields, classes.summaryAndConclusionFields)} id="additionalNotes"
                  placeholder="מה לא סיימת בתחקיר..."
                  type="text" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} required />
              </div>
            )}
          </div>


          <div className={classes.submitButtonContainer}>
            <Button className={cx(classes.submitButton, classes.text)} type="submit" variant="contained">שמירת תחקיר</Button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div >
    </div >
  );
};

export default NewDebriefing;
