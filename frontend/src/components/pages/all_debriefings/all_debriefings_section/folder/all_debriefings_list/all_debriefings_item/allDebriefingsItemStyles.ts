import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    row: {
        display: "flex",
        backgroundColor: "#6f0f4582", //#6F0F46
        borderRadius: "3px",
        marginTop: "4px",
        width: "100%"
    },
    text: {
        fontFamily: '"Noto Sans Hebrew", sans-serif',
    },

    openDebriefing: {
        width: "9%",
        textAlign: "center",
        // backgroundColor: "green"

    },
    debriefingName: {
        width: "35%",
        textAlign: "center",
        // backgroundColor: "blue"

    },
    system: {
        width: "17%",
        textAlign: "center",
        // backgroundColor: "pink"

    },
    status: {
        width: "5%",
        textAlign: "center",
        // backgroundColor: "red"

    },
    lastUpdateTime: {
        width: "17%",
        textAlign: "center",
        // backgroundColor: "salmon"
    },
    creationTime: {
        width: "17%",
        textAlign: "center",
        // backgroundColor: "red"

    },

}));

export default useStyles;