import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    wholePage: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#0F1027"
    },

    allPartsContainer: {
        display: "flex",
        // backgroundColor: "yellow",
        flexDirection: "column",
        gap: "15%",
        color: "white",
        fontFamily: '"Noto Sans Hebrew", sans-serif',
        width: "80%",
        marginTop: "20px"
    },

}));

export default useStyles;