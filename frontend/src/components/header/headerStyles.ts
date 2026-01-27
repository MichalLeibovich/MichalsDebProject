import { makeStyles } from "tss-react/mui";
import "@fontsource/noto-sans-hebrew/700.css"; // specific weight

const useStyles = makeStyles()(() => ({
    headerContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1%"
    },
    rightSideContainer: {
        display: "flex",
        gap: "5%",
        width: "30%"
    },
    myAccountButton: {
        fontFamily: '"Noto Sans Hebrew", sans-serif',
        color: "rgba(83, 83, 83, 1)",
        backgroundColor: "rgba(251, 245, 225, 1)",
        borderRadius: "20px",
        fontSize: "14px",
        width: "100px"  
    },
    rightSideContainerIcons: {
        display: "flex",
        gap: "10px"
    },
    shoppingCart: {
        color: "rgba(83, 83, 83, 1)",
        width: "35px",
        height: "35px"
    },
    logo: {
        width: "50px",
        height: "50px",
        marginLeft: "10px"
    },
    headerTitlesContainer: {
        width: "40%",
        height: "100%",
        gap: "20px",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    button: {
        width: "100%",
        fontFamily: '"Noto Sans Hebrew", sans-serif',
        color: "black",
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
            backgroundColor: "white",
            borderBottom: "3px solid white",
            //transitionDuration: "0.2s"
        },
        "&.active": {
            borderBottom: "3px solid black", // active state stays
        }
    },
}));

export default useStyles;