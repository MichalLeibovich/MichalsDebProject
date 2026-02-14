import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    list: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        marginTop: "5px"
    }

}));

export default useStyles;