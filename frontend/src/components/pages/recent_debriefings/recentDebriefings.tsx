import { Button, Typography } from "@mui/material";
import RecentDebriefingsSection from "./recent_debriefings_section/recentDebriefingsSection";
import useStyles from "./recentDebriefingsStyles";

const RecentDebriefings: React.FC = () => {
    const { classes, cx } = useStyles();
    return (
        <div className={classes.wholePage}>
            <div className={classes.allPartsContainer}>
                <Typography className={classes.text} variant="h4">תחקירים אחרונים</Typography>
                <div className={classes.filteringSortingSearchSection}>
                    <div className={classes.sortingSection}>
                        <Typography className={classes.text} variant="h6">מיון לפי:</Typography>
                        <div className={classes.sortingButtons}>
                            <Button className={classes.button} variant="contained">זמן עדכון אחרון</Button>
                            <Button className={classes.button} variant="contained">זמן יצירה</Button>
                        </div>
                    </div>
                    <div className={classes.filteringSection}>
                        <Button className={classes.button} variant="contained">סינון לפי תהליכים בתהליך</Button>
                    </div>
                    <div>
                        <Button variant="contained">חיפוש- בהמשך</Button>
                    </div>
                </div>
                <RecentDebriefingsSection />
            </div>
        </div>
    )
}

export default RecentDebriefings;