import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    wholeHomeContainer: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#0F1027"
    },


    allPartsContainer: {
        marginTop: "40px",
        display: "flex",
        // backgroundColor: "yellow",
        flexDirection: "column",
        gap: "20vh",
        color: "white"
    },


    buttonsContainer: {
        display: "flex",
        gap: "50px",
        // backgroundColor: "rgb(23, 29, 195)"
    },

    icon: {
        fontSize: "50px"
    },
    text: {
        fontFamily: '"Noto Sans Hebrew", sans-serif',
        fontSize: "22px",
        textAlign: "center",
    },

    leftButtonsContainer: {
        display: "flex",
        gap: "20px",
        // backgroundColor: "rgb(23, 29, 195)"
    },

    pagesButton: {
        display: "flex",
        flexDirection: "column",
        borderRadius: "30px",
        color: "white",
        fontFamily: '"Noto Sans Hebrew", sans-serif',
        height: "170px",
        width: "170px",
        fontSize: "22px",
        textAlign: "center",
        backgroundColor: "#6F0F46",
        boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.45)",
        "&:hover": {
            color: "white",
            boxShadow: "inset 0 0 25px rgba(0, 0, 0, 0.6)",
        },
        // "& ,fading-border-element": {
        //     "&,fading-shadow-element": {
        //         boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.52)" /* Fades a black shadow outwards */
        //     }
        // }
    }

}));

export default useStyles;