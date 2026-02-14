import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    row: {
        display: "flex",
        backgroundColor: "#6f0f4582", //#6F0F46
        borderRadius: "3px",
        width: "100%",
        alignItems: "center",
        "&:hover": {
            backgroundColor: "#98306b7f", //#6F0F46
        }
    },
    text: {
        // fontFamily: '"Noto Sans Hebrew", sans-serif',
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    },

    openDebriefing: {
        textAlign: "center",
        width: "11%",
        cursor: "pointer",
        "&:hover": {
            color: "#6F0F46", //#6F0F46
        }
        // backgroundColor: "green"

    },
    debriefingName: {
        width: "35%",
        textAlign: "center",
        // backgroundColor: "blue"

    },
    status: {
        width: "12%",
        textAlign: "center",
        // backgroundColor: "red"

    },
    lastUpdateTime: {
        width: "21%",
        textAlign: "center",
        // backgroundColor: "salmon"
    },
    creationTime: {
        width: "21%",
        textAlign: "center",
        // backgroundColor: "red"

    },

}));

export default useStyles;