import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    wholePageContainer: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#0F1027",
        fontFamily: '"Noto Sans Hebrew", sans-serif',
    },

    allPartsContainer: {
        display: "flex",
        backgroundColor: "#6f0f4567",
        flexDirection: "column",
        width: "50%",
        minWidth: "400px",
        // gap: "15%",
        color: "white",
        "& ,fading-border-element": {
            "&,fading-shadow-element": {
                boxShadow: "0 0 20px 5px rgba(0, 0, 0, 0.5)" /* Fades a black shadow outwards */
            }
        },
        marginBottom: "50px",
        marginTop: "50px",
        borderRadius: "30px"
    },

    viewersMode: {
        display: "flex",
        gap: "10px",
        padding: "10px",
        alignItems: "center"
    },
    clickEdit: {
        cursor: "pointer",
        backgroundColor: "#6f0f45c7",
        width: "30px",
        height: "30px",
        borderRadius: "30px",
        padding: "10px",
        "& ,fading-border-element": {
            "&,fading-shadow-element": {
                boxShadow: "0 0 30px 5px rgba(0, 0, 0, 0.5)" /* Fades a black shadow outwards */
            }
        },
    },




    text: {
        fontFamily: '"Noto Sans Hebrew", sans-serif',
    },
    fieldsTitle: {
        fontSize: "20px",
        // color: "yellow"
    },
    // regularSizedFields: {
    //     minWidth: "30%",
    //     maxWidth: "60%",
    // },

    allFields: {
        "& .MuiOutlinedInput-root": {
            backgroundColor: "#6f0f4556",
            borderRadius: "12px",

            // default border
            "& fieldset": {
                borderColor: "#6f0f4556", // dark grey
            },

            // hover border
            "&:hover fieldset": {
                borderColor: "#6f0f4556",
            },

            // focused border
            "&.Mui-focused fieldset": {
                borderColor: "#6f0f45ab",
                borderWidth: "2px",
            },

            // input text
            "& input": {
                color: "white",
                padding: "10px 14px", // adjust top/bottom padding
            },
        },

        /* ===== LABEL ===== */
        "& .MuiInputLabel-root": {
            color: "#95748C",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            transformOrigin: "center",
            pointerEvents: "none",
            transition: "0.2s ease",
        },

        /* label when focused */
        "& .MuiInputLabel-root.Mui-focused": {
            // color: "#95748C",
        },

        /* label when it shrinks (typing / value exists) */
        "& .MuiInputLabel-root.MuiInputLabel-shrink": {
            top: 0,
            transform: "translate(-50%, -6px)",
            fontSize: "12px",
        },

        /* hide required asterisk */
        "& .MuiInputLabel-asterisk": {
            display: "none",
        },

        // ✅ When disabled
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "white", // important for disabled inputs
        },
    },

    fieldsTextAndFieldInOneLineContainer: {
        display: "flex",
        alignItems: "center",
        gap: "7px"
    },

    titleSubject: {
        marginTop: "50px",
        marginBottom: "20px",
        textAlign: "center",
        backgroundColor: "#6f0f45c7"
    },




    titleNewDebriefing: {
        textAlign: "center",
        marginBottom: "30px",
        marginTop: "20px"
    },

    // החלק של הכותרת
    titleField: {
        minWidth: "33vw",
        fontSize: "25px",
        "& .MuiOutlinedInput-root": {
            "& input": {
                textAlign: "center",  // horizontal center
            },
        }
    },
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px"
    },

    // החלק של הפרטים הכלליים
    generalInfoWholePart: {
        display: "flex",
        justifyContent: "center"
    },
    generalInfoPart: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    personInfoFields: {
        minWidth: "200px"
    },
    datePickerField: {
        width: "220px",
        color: "white",                    // text color
        fontFamily: '"Noto Sans Hebrew", sans-serif',
        backgroundColor: "#6f0f4556",      // background of the field

        /* outline / border */
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6f0f4556",
        },

        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6f0f45ab",
        },

        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6f0f45ab",
        },

        /* input text */
        "& .MuiOutlinedInput-input": {
            padding: "10px 14px",
            textAlign: "center",
            color: "white",
            fontFamily: '"Noto Sans Hebrew", sans-serif',
        },

        /* label */
        "& .MuiInputLabel-root": {
            color: "#6f0f45ab",
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#6f0f45ab",
        },
        "& .MuiInputLabel-root.MuiInputLabel-shrink": {
            color: "#a26a8bab",
            fontFamily: '"Noto Sans Hebrew", sans-serif',
        },

        // "&.MuiPickersInputBase-root-MuiPickersOutlinedInput-root.Mui":{
        //     color: "white",
        // },

        /* calendar icon */
        "& .MuiSvgIcon-root": {
            color: "white",
        },
        "& .MuiPickersSectionList-root": {
            color: "white",
        },
    },


    // החלק של הגורמים המשתתפים
    peopleInvolved: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px"
    },
    errorDealersTextField: {
        minWidth: "300px"
    },
    generalInfoErrorSelversAndDescoverers: {
        display: "flex",
        gap: "130px"
    },
    errorSolverOrDiscoverer: {
        textAlign: "center",
        marginBottom: "10px"
    },
    plusOrMinusButtonContainer: {
        display: "flex",
        gap: "10px"
    },
    plusOrMinusButton: {
        borderRadius: "30px",
        fontSize: "20px",
        backgroundColor: "#6f0f45ce",
        "&.MuiButton-contained": {
            minWidth: "50px"
        }
    },
    checkbox_selected_teams: {
        color: "#6f0f457b",
        "&.MuiCheckbox-root.Mui-checked": {
            color: "#6f0f457b !important",
        }
    },



    // החלק של תיאור התקלה
    errorDescribing: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
    },
    errorDescriptionAndSolutionFields: {
        width: "35vw",
        "& .MuiOutlinedInput-root": {
            height: "15vh",          // total field height
            alignItems: "flex-start", // text starts at top
        },
    },
    // החלק של הזמנים
    times: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px"
    },
    timesField: {
        width: "7vw",

        /* ===== INPUT ===== */
        "& .MuiOutlinedInput-root": {
            "& input": {
                textAlign: "center",
            },

            "&.Mui-focused fieldset": {
                /* optional border styling */
            },
        },
    },


    // החלק של פירוט התקלה
    errorElaboration: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
    },
    titleChainOfEvents: {
        textAlign: "center",
        marginBottom: "20px"
    },
    eventsTableHeader: {
        display: "flex",
        marginRight: "7%",
        gap: "42%",
        marginBottom: "10px"
    },
    eventsTable: {
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        marginBottom: "16px"
    },
    occurrenceField: {
        minWidth: "35vw",
        "& .MuiOutlinedInput-root": {
            height: "15vh",          // total field height
            alignItems: "flex-start", // text starts at top
        },
        "& .MuiInputLabel-root": {
            color: "#95748C",
            left: "92%",
            top: "18%",
            transform: "translate(-50%, -50%)",
            transformOrigin: "center",
            pointerEvents: "none",
            transition: "0.2s ease",
        },
    },




    // החלק של פתרון התקלה
    errorSolutionPart: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
    },
    totalTimesField: {
        /* ===== INPUT ===== */
        "& .MuiOutlinedInput-root": {
            "& input": {
                textAlign: "center",
            },
        },
    },


    // החלק של סיכום האירוע
    sumerizingPart: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
    },
    summaryAndConclusionFields: {
        minWidth: "35vw",
        "& .MuiOutlinedInput-root": {
            height: "10vh",          // total field height
            alignItems: "flex-start", // text starts at top
        },
        "& .MuiInputLabel-root": {
            color: "#95748C",
            left: "92%",
            top: "18%",
            transform: "translate(-50%, -50%)",
            transformOrigin: "center",
            pointerEvents: "none",
            transition: "0.2s ease",
        },
    },


    // החלק של מסקנות התקלה
    conclusionPart: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
    },


    // החלק של הסטטוס
    debriefingStatusPart: {
        marginTop: "50px",
        display: "flex",
        justifyContent: "center",
    },

    selectField: {
        color: "white",              // text color
        fontFamily: '"Noto Sans Hebrew", sans-serif',
        backgroundColor: "#6f0f4556", // background color of input box

        /* target the outlined input inside Select */
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6f0f4556",
        },

        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6f0f45ab",
        },

        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6f0f45ab",
        },

        /* text alignment inside the select */
        "& .MuiSelect-select": {
            padding: "10px 14px",
            textAlign: "center",
        },

        /* dropdown arrow color */
        "& .MuiSelect-icon": {
            color: "white",
        },

        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "white", // important for disabled inputs
        },
    },


    // החלק של ההערות הנוספות
    additionalNotesPart: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "50px",
    },



    // כפתור ההגשה
    submitButtonContainer: {
        display: "flex",
        justifyContent: "center",

    },
    submitButton: {
        backgroundColor: "#6f0f45",
        fontSize: "20px",
        borderRadius: "7px",
        width: "200px",
        height: "50px",
        marginBottom: "50px",
    }





}));

export default useStyles;