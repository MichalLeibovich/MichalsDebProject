import { Button, Typography } from "@mui/material";
import RecentDebriefingsSection from "./recent_debriefings_section/recentDebriefingsSection";
import useStyles from "./recentDebriefingsStyles";
import { useState } from "react";

const RecentDebriefings: React.FC = () => {
    const { classes, cx } = useStyles();
    // const [activeButton, setActiveButton] = useState("recentUpdate");

    return (
        <div className={classes.wholePage}>
            <div className={classes.allPartsContainer}>
                <Typography className={classes.text} variant="h4">תחקירים אחרונים</Typography>
                <div className={classes.filteringSortingSearchSection}>
                    <div className={classes.sortingSection}>
                        <Typography className={classes.text} variant="h6">מיון לפי:</Typography>
                        <div className={classes.sortingButtons}>
                            <Button className={classes.button} variant="contained">זמן עדכון אחרון - ברירת מחדל</Button>
                            <Button className={classes.button} variant="contained">זמן יצירה</Button>
                        </div>
                    </div>
                    <div className={classes.filteringSection}>
                        <Button className={classes.button} variant="contained">סינון לפי תהליכים בתהליך</Button>
                    </div>
                    <div>
                        <Button style={{ backgroundColor: "#87466b87" }} variant="contained">חיפוש- בהמשך</Button>
                    </div>
                </div>
                <RecentDebriefingsSection />
            </div>
        </div>
    )
}

export default RecentDebriefings;