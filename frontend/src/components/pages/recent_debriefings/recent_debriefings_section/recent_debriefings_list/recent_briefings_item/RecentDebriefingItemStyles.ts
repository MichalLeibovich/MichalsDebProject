import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    row: {
        display: "flex",
        backgroundColor: "#6f0f4582", //#6F0F46
        borderRadius: "3px",
        justifyContent: "space-around",
        marginTop: "4px"
    }

}));

export default useStyles;