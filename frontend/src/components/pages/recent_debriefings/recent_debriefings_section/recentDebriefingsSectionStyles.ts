import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    refreshIcon: {
        height: "100px",
        width: "100px"
    },
    tableHeader: {
        display: "flex",
        backgroundColor: "#6F0F46", //#6F0F46
        borderRadius: "3px",
    },

    refreshIconContainer: {
        textAlign: "center"
    },

    text: {
        fontFamily: '"Noto Sans Hebrew", sans-serif',
    },

    openDebriefing: {
        width: "9%",
        textAlign: "center",
    },
    debriefingName: {
        width: "35%",
        textAlign: "center",
    },
    system: {
        width: "17%",
        textAlign: "center",
    },
    status: {
        width: "5%",
        textAlign: "center",
    },
    lastUpdateTime: {
        width: "17%",
        textAlign: "center",
    },
    creationTime: {
        width: "17%",
        textAlign: "center",
    },
}));

export default useStyles;