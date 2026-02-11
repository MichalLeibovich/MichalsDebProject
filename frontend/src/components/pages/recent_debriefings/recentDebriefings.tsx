import { Typography } from "@mui/material";
import RecentDebriefingsSection from "./recent_debriefings_section/recentDebriefingsSection";
import useStyles from "./recentDebriefingsStyles";

const RecentDebriefings: React.FC = () => {
    const { classes, cx } = useStyles();
    return (
        <div className={classes.wholePage}>
            <div className={classes.allPartsContainer}>
                <Typography className={classes.text} variant="h4">תחקירים אחרונים</Typography>
                <RecentDebriefingsSection />
            </div>
        </div>
    )
}

export default RecentDebriefings;