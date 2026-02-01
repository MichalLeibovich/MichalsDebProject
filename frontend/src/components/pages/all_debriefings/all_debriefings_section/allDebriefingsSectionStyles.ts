import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    foldersList: {
        fontSize: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    }
}));

export default useStyles;