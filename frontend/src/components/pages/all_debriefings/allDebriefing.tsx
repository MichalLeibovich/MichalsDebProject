import { Typography } from "@mui/material";
import AllDebriefingsSection from "./all_debriefings_section/allDebriefingsSection";
import useStyles from "./allDebriefingStyles";

const AllDebriefings: React.FC = () => {
    const { classes, cx } = useStyles();

    return (

        <div className={classes.wholePage}>
            <div className={classes.allPartsContainer}>
                <Typography className={classes.text} variant="h4">כל התחקירים</Typography>
                <AllDebriefingsSection />
            </div>
        </div>
    );
}

export default AllDebriefings;