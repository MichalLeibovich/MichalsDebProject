import { makeStyles } from "tss-react/mui";
import "@fontsource/noto-sans-hebrew/700.css"; // specific weight

const useStyles = makeStyles()(() => ({
    headerContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "black"
    },


    rightSideContainer: {
        display: "flex",
        marginRight: "5px"
    },
    myAccountButton: {
        fontFamily: '"Noto Sans Hebrew", sans-serif',
        color: "white",
        backgroundColor: "#6F0F46",
        borderRadius: "20px",
        fontSize: "14px",
        width: "100px",
        "&:hover": {
            backgroundColor: "#550b35",
            color: "white",
        },
    },


    headerTitlesContainer: {
        width: "35%",
        height: "100%",
        // gap: "20px",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    button: {
        width: "100%",
        fontFamily: '"Noto Sans Hebrew", sans-serif',
        color: "white",
        padding: "13px",
        fontSize: "14px",
        fontWeight: "bold",
        borderBottom: "3px solid transparent",
        transition: "background-color 0.25s ease, border-color 0.25s ease", // smooth transition
        borderTop: "3px solid transparent",
        "& , MuiButtonBase-root": {
            borderRadius: "0px"
        },
        // hide touch ripple element (extra safety)
        "& .MuiTouchRipple-root": {
            display: "none !important",
        },

        "&:hover": {
            backgroundColor: "rgb(58, 58, 58)",
            borderBottom: "3px solid black",
            color: "white"
            //transitionDuration: "0.2s"
        },
        "&.active": {
            borderBottom: "3px solid white", // active state stays
        }
    },


    logo: {
        width: "50px",
        height: "50px",
        marginLeft: "10px"
    },
}));

export default useStyles;