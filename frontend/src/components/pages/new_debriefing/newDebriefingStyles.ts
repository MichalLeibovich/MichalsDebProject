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
        // gap: "15%",
        color: "white",
        "& ,fading-border-element": {
            "&,fading-shadow-element": {
                boxShadow: "0 0 20px 5px rgba(0, 0, 0, 0.5)" /* Fades a black shadow outwards */
            }
        },
        marginBottom: "50px",
        borderRadius: "30px"
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
        maxWidth: "320px",
        minWidth: "220px",

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



    personInfoFields: {
    },




    titleNewDebriefing: {
        textAlign: "center",
        marginBottom: "30px"
    },

    // החלק של הכותרת
    titleField: {
        // width: "100%",
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


    // החלק של הגורמים המשתתפים
    peopleInvolved: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px"
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



    // החלק של תיאור התקלה
    errorDescribing: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
    },
    errorDescriptionField: {
        width: "100%",
        height: "20%"
    },
    // החלק של הזמנים
    times: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px"
    },
    timesField: {
        width: "110px",
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
        // marginRight: "5%",
        marginRight: "20%",
        // gap: "50%"
        gap: "50%"
    },
    eventsTable: {
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        marginBottom: "16px"
    },



    // החלק של פתרון התקלה
    errorSolutionPart: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
    },


    // החלק של סיכום האירוע
    sumerizingPart: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
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
        marginBottom: "50px"
    },



    // כפתור ההגשה
    submitButtonContainer: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "30px",

    },
    submitButton: {
        backgroundColor: "#6f0f45",
        fontSize: "20px",
        borderRadius: "7px",
        width: "200px",
        height: "50px"
    }





}));

export default useStyles;