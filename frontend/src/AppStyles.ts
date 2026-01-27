import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
    root: {
        margin: 0,
        width: "100vw",
        // width: "98.5vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
    },

}));

export default useStyles;