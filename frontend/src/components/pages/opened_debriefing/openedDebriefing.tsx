import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useStyles from './openedDebriefingStyles';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Link, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

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

const OpenedDebriefing: React.FC = () => {
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
        selectedTeams: {} as { [key: string]: string },
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
    const [isEditing, setIsEditing] = useState(false);



    const teams = ["אפקט הפרפר", "גאוסיין", "גואט", "הרמוניה", "מגן עליון", "סוויטץ'", "סופרנובה", "סטארלייט"]
    const [selectedTeams, setSelectedTeams] = useState<Record<string, string>>({});
    // message if there's an error
    const [message, setMessage] = useState("");


    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/opened_debriefing/${id}`);
            setFormData((prev) => ({
                ...prev,
                title: res.data.title,
                system: res.data.system,
                description: res.data.description,
                documentFillerName: res.data.documentFillerName,
                personalNumber: res.data.personalNumber,
                date: res.data.date ? dayjs(res.data.date) : null,
                // errorDealers: res.data.errorDealers,
                // errorDiscoverers: res.data.errorDiscoverers,
                // errorSolvers: res.data.errorSolvers,
                // selectedTeams: res.data.selectedTeams,
                errorDescription: res.data.errorDescription,
                discoveryTime: res.data.discoveryTime,
                startTime: res.data.startTime,
                endTime: res.data.endTime,
                // chainOfEvents: res.data.chainOfEvents,
                errorSolution: res.data.errorSolution,
                totalTime: res.data.totalTime,
                howErrorWasFound: res.data.howErrorWasFound,
                errorCause: res.data.errorCause,
                whatWasDamagedDueError: res.data.whatWasDamagedDueError,
                errorManagingConclusion: res.data.errorManagingConclusion,
                monitoringConclusion: res.data.monitoringConclusion,
                additionalNotes: res.data.additionalNotes,
                status: res.data.status
            }))
        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchDealers = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3001/api/opened_debriefing_people/${id}/Dealer`
            );

            setFormData((prev) => ({
                ...prev,
                errorDealers: res.data.person_name  // just the name
            }));

        } catch (error) {
            console.error(error);
        }
    };

    const fetchErrorDiscoverers = async () => {
        if (!id) return;  // make sure ID exists

        try {
            const res = await axios.get(
                `http://localhost:3001/api/opened_debriefing_people/${id}/Discoverer`
            );

            const people: PersonInvolved[] = Array.isArray(res.data)
                ? res.data.map((person) => ({
                    id: person.id,
                    name: person.person_name,
                    phone: person.phone
                }))
                : [];

            setFormData((prev) => ({
                ...prev,
                errorDiscoverers: people
            }));

        } catch (error) {
            console.error(error);

            setFormData((prev) => ({
                ...prev,
                errorDiscoverers: []
            }));
        }
    };


    const fetchErrorSolvers = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/opened_debriefing_people/${id}/Solver`);
            const people: PersonInvolved[] = Array.isArray(res.data)
                ? res.data.map((person) => ({
                    id: person.id,
                    name: person.person_name,
                    phone: person.phone
                }))
                : [];

            setFormData((prev) => ({
                ...prev,
                errorSolvers: people
            }));

        } catch (error) {
            console.error(error);

            setFormData((prev) => ({
                ...prev,
                errorSolvers: []
            }));
        }
    }

    const fetchSelectedTeams = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/opened_debriefing_selected_teams/${id}`);
            setFormData((prev) => ({
                ...prev,
                selectedTeams: res.data
            }))
        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchChainOfEvents = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/opened_debriefing_events/${id}`);
            const events: Event[] = Array.isArray(res.data)
                ? res.data.map((event) => ({
                    id: event.id,
                    time: event.time,
                    occurrence: event.occurrence
                }))
                : [];

            setFormData((prev) => ({
                ...prev,
                chainOfEvents: events
            }));

        } catch (error) {
            console.error(error);

            setFormData((prev) => ({
                ...prev,
                chainOfEvents: []
            }));
        }
    }

    useEffect(() => {
        fetchDealers();
        fetchErrorDiscoverers();
        fetchErrorSolvers();
        fetchChainOfEvents();
        fetchData();
        fetchSelectedTeams();
    }, [id]);

    const toggle = (team: string) => {
        {
            isEditing &&
                setFormData(prev => {
                    const currentTeams = prev.selectedTeams;

                    if (team in currentTeams) {
                        // Uncheck → remove
                        const copy = { ...currentTeams };
                        delete copy[team];
                        return { ...prev, selectedTeams: copy };
                    } else {
                        // Check → add empty text
                        return { ...prev, selectedTeams: { ...currentTeams, [team]: "" } };
                    }
                });
        }
    };

    // Save changes to DB
    const handleSave = async () => {
        await axios.put(`/openedDebriefing/${id}`, formData);
        setIsEditing(false); // back to read-only
    };

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    console.log(formData);

    return (
        <div className={classes.wholePageContainer}>
            <div className={classes.allPartsContainer}>
                <div className={classes.viewersMode}>
                    <EditIcon className={classes.clickEdit} onClick={() => setIsEditing(true)} />
                    <Typography variant="h5" className={cx(classes.text)}>
                        {(isEditing && "Edit Mode")
                            ||
                            (!isEditing && "Read Mode")}
                    </Typography>
                </div>

                <Typography variant="h3" className={cx(classes.text, classes.titleNewDebriefing)}>תחקיר</Typography>

                <form onSubmit={handleSave}>
                    <div className={classes.titleContainer}>
                        <div className={classes.fieldsTextAndFieldInOneLineContainer}>
                            <Typography variant="h5" className={cx(classes.text, classes.fieldsTitle)}>כותרת:</Typography>
                            <TextField className={cx(classes.allFields, classes.titleField)} id="title" type="text"
                                value={formData.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                                disabled={!isEditing} required />
                        </div>
                        <div className={classes.fieldsTextAndFieldInOneLineContainer}>
                            <Typography variant="h5" className={cx(classes.text, classes.fieldsTitle)}>מערכת</Typography>

                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-label">מערכת</InputLabel>
                                <Select
                                    className={classes.selectField}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formData.system}
                                    onChange={(e) => handleChange("system", e.target.value)}
                                    disabled={!isEditing}
                                    label="מערכת">
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
                                    <TextField className={cx(classes.allFields, classes.personInfoFields)}
                                        id="documentFillerName" type="text"
                                        value={formData.documentFillerName}
                                        onChange={(e) => handleChange("documentFillerName", e.target.value)}
                                        disabled={!isEditing} required />
                                </div>

                                <div className={classes.fieldsTextAndFieldInOneLineContainer}>
                                    <Typography variant="h6" className={classes.text}>מ.א:</Typography>
                                    <TextField className={cx(classes.allFields, classes.personInfoFields)}
                                        id="personalNumber" type="number"
                                        value={formData.personalNumber}
                                        onChange={(e) => handleChange("personalNumber", e.target.value)}
                                        disabled={!isEditing} required
                                    />
                                </div>

                                <div className={classes.fieldsTextAndFieldInOneLineContainer}>
                                    <Typography variant="h6" className={classes.text}>תאריך:</Typography>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            className={classes.datePickerField}
                                            label="תאריך התחקיר"
                                            value={formData.date}
                                            onChange={(newDate) => handleChange("date", newDate)}
                                            disabled={!isEditing}
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
                                <TextField className={cx(classes.allFields, classes.errorDealersTextField)}
                                    id="errorDealers" type="text"
                                    value={formData.errorDealers}
                                    onChange={(e) => handleChange("errorDealers", e.target.value)}
                                    disabled={!isEditing} required
                                />
                            </div>
                            <div className={classes.generalInfoErrorSelversAndDescoverers}>
                                <div>
                                    <Typography className={cx(classes.text, classes.errorSolverOrDiscoverer)} variant="h6">מגלה התקלה</Typography>

                                    {formData.errorDiscoverers?.map((person, index) => (
                                        <div key={`${person.id}-${index}`} style={{ marginBottom: "16px" }}>
                                            <div>
                                                <Typography variant="h6" className={classes.text}>שם מלא:</Typography>
                                                <TextField className={cx(classes.allFields, classes.personInfoFields)}
                                                    id={`errorDiscovererName-${person.id}`} type="text"
                                                    value={person.name}
                                                    required
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            errorDiscoverers: prev.errorDiscoverers.map((p) =>
                                                                p.id === person.id ? { ...p, name: e.target.value } : p
                                                            )
                                                        }))
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <Typography variant="h6" className={classes.text}>מספר טלפון:</Typography>
                                                <TextField className={cx(classes.allFields, classes.personInfoFields)}
                                                    id={`errorDiscovererPhone-${person.id}`} type="number"
                                                    value={person.phone} required
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            errorDiscoverers: prev.errorDiscoverers.map((p) =>
                                                                p.id === person.id ? { ...p, phone: e.target.value } : p
                                                            )
                                                        }))
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {isEditing &&
                                        <div className={classes.plusOrMinusButtonContainer}>
                                            <Button
                                                className={classes.plusOrMinusButton}
                                                variant="contained"
                                            // noted
                                            // onClick={() =>
                                            //     setErrorDiscoverers((prev) => [
                                            //         ...prev,
                                            //         { id: Date.now(), name: "", phone: "" }
                                            //     ])
                                            // }
                                            >
                                                +
                                            </Button>

                                            <Button
                                                className={classes.plusOrMinusButton}
                                                variant="contained"
                                                // noted
                                                // onClick={() => {
                                                //     setErrorDiscoverers((prev) => {
                                                //         if (prev.length <= 1) return prev; // leave at least one field
                                                //         return prev.slice(0, prev.length - 1) // remove last
                                                //     })
                                                // }}
                                            >
                                                -
                                            </Button>
                                        </div>
                                    }
                                </div>

                                <div>
                                    <Typography className={cx(classes.text, classes.errorSolverOrDiscoverer)} variant="h6">פותר התקלה</Typography>

                                    {formData.errorSolvers?.map((person, index) => (
                                        <div key={`${person.id}-${index}`} style={{ marginBottom: "16px" }}>
                                            <div>
                                                <Typography variant="h6" className={classes.text}>שם מלא:</Typography>
                                                <TextField className={cx(classes.allFields, classes.personInfoFields)}
                                                    id="errorSolverName" type="text" value={person.name}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            errorSolvers: prev.errorSolvers.map((p) =>
                                                                p.id === person.id ? { ...p, name: e.target.value } : p
                                                            )
                                                        }))
                                                    }
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <Typography variant="h6" className={classes.text}>מספר טלפון:</Typography>
                                                <TextField className={cx(classes.allFields, classes.personInfoFields)}
                                                    id="errorSolverPhone" type="number"
                                                    value={person.phone}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            errorSolvers: prev.errorSolvers.map((p) =>
                                                                p.id === person.id ? { ...p, phone: e.target.value } : p
                                                            )
                                                        }))
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>


                                    ))}
                                    {isEditing &&
                                        <div className={classes.plusOrMinusButtonContainer}>
                                            <Button
                                                className={classes.plusOrMinusButton}
                                                variant="contained"
                                            // noted
                                            // onClick={() =>
                                            //     setErrorSolvers((prev) => [
                                            //         ...prev,
                                            //         { id: Date.now(), name: "", phone: "" }
                                            //     ])
                                            // }
                                            >
                                                +
                                            </Button>

                                            <Button
                                                className={classes.plusOrMinusButton}
                                                variant="contained"
                                            // onClick={() => {
                                            //     setErrorSolvers((prev) => {
                                            //         if (prev.length <= 1) return prev; // leave at least one field
                                            //         return prev.slice(0, prev.length - 1) // remove last
                                            //     })
                                            // }}
                                            >
                                                -
                                            </Button>
                                        </div>
                                    }
                                </div>
                            </div>


                            <div>
                                <Typography variant="h6" className={classes.text}>צוותים שמעורבים בתקלה ומי מכל צוות:</Typography>
                                <div>
                                    {teams.map((team) => (
                                        <div key={team}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox className={classes.checkbox_selected_teams}
                                                        checked={team in formData.selectedTeams}
                                                        onChange={() => toggle(team)}
                                                    />
                                                }
                                                label={team}
                                            />

                                            {team in formData.selectedTeams && (
                                                <div className={classes.fieldsTextAndFieldInOneLineContainer}>
                                                    <Typography variant="h6" className={classes.text}>שם/ות:</Typography>
                                                    <TextField
                                                        className={cx(classes.allFields, classes.personInfoFields)}
                                                        id="selectedTeamsNames"
                                                        type="text"
                                                        value={formData.selectedTeams[team]}
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
                                <TextField className={cx(classes.allFields, classes.errorDescriptionAndSolutionFields)}
                                    id="errorDescription" type="text"
                                    value={formData.errorDescription}
                                    onChange={(e) => handleChange("errorDescription", e.target.value)}
                                    disabled={!isEditing} required />
                            </div>

                            <div className={classes.times}>
                                <div>
                                    <Typography variant="h6" className={classes.text}>זמן גילוי:</Typography>
                                    <TextField className={cx(classes.allFields, classes.timesField)}
                                        id="discoveryTime" label="זמן גילוי"
                                        value={formData.discoveryTime}
                                        onChange={(e) => handleChange("discoveryTime", e.target.value)}
                                        disabled={!isEditing} required />
                                </div>
                                <div>
                                    <Typography variant="h6" className={classes.text}>זמן התחלה:</Typography>
                                    <TextField className={cx(classes.allFields, classes.timesField)}
                                        id="startTime" label="זמן התחלה"
                                        value={formData.startTime}
                                        onChange={(e) => handleChange("startTime", e.target.value)}
                                        disabled={!isEditing} required />
                                </div>
                                <div>
                                    <Typography variant="h6" className={classes.text}>זמן סיום:</Typography>
                                    <TextField className={cx(classes.allFields, classes.timesField)}
                                        id="endTime" label="זמן סיום"
                                        value={formData.endTime}
                                        onChange={(e) => handleChange("endTime", e.target.value)}
                                        disabled={!isEditing} required />
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
                                    {formData.chainOfEvents.map((event) => (
                                        <div className={classes.eventsTable} key={event.id}>
                                            <div>
                                                <TextField
                                                    className={cx(classes.allFields, classes.timesField)}
                                                    id="eventTime"
                                                    type="text"
                                                    label="זמן"
                                                    value={event.time}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            chainOfEvents: prev.chainOfEvents.map((p) =>
                                                                p.id === event.id
                                                                    ? { ...p, time: e.target.value }
                                                                    : p
                                                            )
                                                        }))
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
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            chainOfEvents: prev.chainOfEvents.map((p) =>
                                                                p.id === event.id
                                                                    ? { ...p, occurrence: e.target.value }
                                                                    : p
                                                            )
                                                        }))
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    {isEditing &&
                                        <div className={classes.plusOrMinusButtonContainer}>
                                            <Button
                                                className={classes.plusOrMinusButton}
                                                variant="contained"
                                                // noted
                                                // onClick={() =>
                                                //     setChainOfEvents((prev) => [
                                                //         ...prev,
                                                //         { id: Date.now(), time: "", occurrence: "" }
                                                //     ])
                                                // }
                                            >
                                                +
                                            </Button>

                                            <Button
                                                className={classes.plusOrMinusButton}
                                                variant="contained"
                                                // noted
                                                // onClick={() => {
                                                //     setChainOfEvents((prev) => {
                                                //         if (prev.length <= 1) return prev; // leave at least one field
                                                //         return prev.slice(0, prev.length - 1) // remove last
                                                //     })
                                                // }}
                                            >
                                                -
                                            </Button>
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>



                    <div>
                        <Typography variant="h4" className={cx(classes.text, classes.titleSubject)}>פתרון התקלה</Typography>
                        <div className={classes.errorSolutionPart}>
                            <div>
                                <Typography variant="h6" className={classes.text}>פתרון:</Typography>
                                <TextField className={cx(classes.allFields, classes.errorDescriptionAndSolutionFields)}
                                    id="errorSolution" type="text"
                                    value={formData.errorSolution}
                                    onChange={(e) => handleChange("errorSolution", e.target.value)}
                                    disabled={!isEditing} required />
                            </div>
                            <div className={classes.fieldsTextAndFieldInOneLineContainer}>
                                <Typography variant="h6" className={classes.text}>זמן שלקח לפתור את התקלה:</Typography>
                                <TextField className={cx(classes.allFields, classes.totalTimesField)}
                                    id="totalTime" type="text"
                                    value={formData.totalTime}
                                    onChange={(e) => handleChange("totalTime", e.target.value)}
                                    disabled={!isEditing} required />
                            </div>
                        </div>
                    </div>

                    <div>
                        <Typography variant="h4" className={cx(classes.text, classes.titleSubject)}>סיכום אירוע</Typography>
                        <div className={classes.sumerizingPart}>
                            <div>
                                <Typography variant="h6" className={classes.text}>כיצד נודע לנו על התקלה:</Typography>
                                <TextField className={cx(classes.allFields, classes.summaryAndConclusionFields)}
                                    id="howErrorWasFound" type="text"
                                    value={formData.howErrorWasFound}
                                    onChange={(e) => handleChange("howErrorWasFound", e.target.value)}
                                    disabled={!isEditing} required />
                            </div>
                            <div>
                                <Typography variant="h6" className={classes.text}>מה נפגע במערכת:</Typography>
                                <TextField className={cx(classes.allFields, classes.summaryAndConclusionFields)}
                                    id="whatWasDamagedDueError" type="text"
                                    value={formData.whatWasDamagedDueError}
                                    onChange={(e) => handleChange("whatWasDamagedDueError", e.target.value)}
                                    disabled={!isEditing} required />
                            </div>
                            <div>
                                <Typography variant="h6" className={classes.text}>מה גרם לתקלה:</Typography>
                                <TextField className={cx(classes.allFields, classes.summaryAndConclusionFields)}
                                    id="errorCause" type="text"
                                    value={formData.errorCause}
                                    onChange={(e) => handleChange("errorCause", e.target.value)}
                                    disabled={!isEditing} required />
                            </div>
                        </div>
                    </div>

                    <div>
                        <Typography variant="h4" className={cx(classes.text, classes.titleSubject)}>מסקנות להמשך</Typography>
                        <div className={classes.conclusionPart}>
                            <div>
                                <Typography variant="h6" className={classes.text}>מסקנות לגבי הניטור:</Typography>
                                <TextField className={cx(classes.allFields, classes.summaryAndConclusionFields)}
                                    id="monitoringConclusion" type="text"
                                    value={formData.monitoringConclusion}
                                    onChange={(e) => handleChange("monitoringConclusion", e.target.value)}
                                    disabled={!isEditing} required />
                            </div>
                            <div>
                                <Typography variant="h6" className={classes.text}>מסקנות לגבי ניהול התקלה:</Typography>
                                <TextField className={cx(classes.allFields, classes.summaryAndConclusionFields)}
                                    id="errorManagingConclusion" type="text"
                                    value={formData.errorManagingConclusion}
                                    onChange={(e) => handleChange("errorManagingConclusion", e.target.value)}
                                    disabled={!isEditing} required />
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
                                    label="סטטוס התחקיר"
                                    value={formData.status}
                                    onChange={(e) => handleChange("status", e.target.value)}
                                    disabled={!isEditing} required>
                                    <MenuItem value="בתהליך">עדיין לא</MenuItem>
                                    <MenuItem value="מוכן">סיימתי</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className={classes.additionalNotesPart}>
                        {formData.status === "בתהליך" && (
                            <div>
                                <Typography variant="h6" className={classes.text}>הערות נוספות:</Typography>
                                <TextField className={cx(classes.allFields, classes.summaryAndConclusionFields)}
                                    id="additionalNotes"
                                    placeholder="מה לא סיימת בתחקיר..."
                                    type="text"
                                    value={formData.additionalNotes}
                                    onChange={(e) => handleChange("additionalNotes", e.target.value)}
                                    disabled={!isEditing} required />
                            </div>
                        )}
                    </div>

                    {isEditing &&
                        <div className={classes.submitButtonContainer}>
                            <Link to="/recentDebriefings">
                                <Button className={cx(classes.submitButton, classes.text)}
                                    type="submit" variant="contained">שמירת שינויים</Button>
                            </Link>
                        </div>
                    }
                </form>

                {message && <p>{message}</p>}
            </div >
        </div >
    );
};

export default OpenedDebriefing;
