import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    wholePage: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#0F1027",
    },

    allPartsContainer: {
        display: "flex",
        // backgroundColor: "yellow",
        flexDirection: "column",
        gap: "5%",
        color: "white",
        fontFamily: '"Noto Sans Hebrew", sans-serif',
        width: "90%",
        marginTop: "20px"
    },

    filteringSortingSearchSection: {
        display: "flex",
        // backgroundColor: "pink",
        width: "100%",
        justifyContent: "space-between"
    },

    sortingSection: {
        display: "flex",
        gap: "2vw"
    },

    sortingButtons: {
        display: "flex",
        gap: "1vw"
    },

    filteringSection: {
    },

    button: {
        fontFamily: '"Noto Sans Hebrew", sans-serif',
        backgroundColor: "#6f0f4582",
        "&:hover": {
            backgroundColor: "#98306b7f",
        },
        // "&.active": {
        //     backgroundColor: "grey"
        // },
    },

    text: {
        fontFamily: '"Noto Sans Hebrew", sans-serif',
        textAlign: "center"
    }

}));

export default useStyles;