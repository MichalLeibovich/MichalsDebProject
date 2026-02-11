import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({

    tableHeader: {
        display: "flex",
        backgroundColor: "#6F0F46", //#6F0F46
        borderRadius: "3px",
    },

    folderStyles: {
        marginRight: "50px",
        marginTop: "4px"
    },

    text: {
        fontFamily: '"Noto Sans Hebrew", sans-serif',
    },

    refreshIcon: {
        marginRight: "10%",
        width: "30px",
        height: "30px"
    },

    openDebriefing: {
        width: "11%",
        textAlign: "center",

    },
    debriefingName: {
        width: "35%",
        textAlign: "center",
    },
    status: {
        width: "12%",
        textAlign: "center",
    },
    lastUpdateTime: {
        width: "21%",
        textAlign: "center",
    },
    creationTime: {
        width: "21%",
        textAlign: "center",
    },
}
));

export default useStyles;