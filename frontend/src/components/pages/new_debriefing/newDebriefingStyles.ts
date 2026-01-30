import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    wholePageContainer: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        width: "100%",
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
        }
    },

    text: {
        fontFamily: '"Noto Sans Hebrew", sans-serif',
    },
    fieldsText: {
        fontSize: "20px"
    },
    regularSizedFields: {
        minWidth: "30%",
        maxWidth: "60%",
    },
    allFields: {

        "& .MuiOutlinedInput-root": {
            backgroundColor: "red",
            borderRadius: "12px",

            // default border
            "& fieldset": {
                borderColor: "#555", // dark grey
            },

            // hover border
            "&:hover fieldset": {
                borderColor: "#333",
            },

            // focused border
            "&.Mui-focused fieldset": {
                borderColor: "#000",
                borderWidth: "2px",
            },

            // input text
            "& input": {
                color: "white",
                padding: "10px 14px", // adjust top/bottom padding
                textAlign: "center",  // horizontal center
            },
        },
        width: "100%",
        maxWidth: "320px",
        minWidth: "220px",
    },


    fieldsTextAndFieldInOneLineContainer: {
        display: "flex",
        alignItems: "center",
        gap: "7px"
    },



    times: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px"
    },
    timesField: {
        width: "110px",
        "&.MuiInputBase-input": {
            textAlign: "center"
        }
    }


}));

export default useStyles;