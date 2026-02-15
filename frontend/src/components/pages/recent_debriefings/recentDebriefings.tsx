import { Button, Typography } from "@mui/material";
import RecentDebriefingsSection from "./recent_debriefings_section/recentDebriefingsSection";
import useStyles from "./recentDebriefingsStyles";
import { useState } from "react";
import { useAtom } from "jotai";
import { sortAtom } from "../../../atoms/sort_atom";
import { filterAtom } from "../../../atoms/filter_atom";

const RecentDebriefings: React.FC = () => {
    const { classes, cx } = useStyles();
    // const [activeButton, setActiveButton] = useState("recentUpdate");

    const [, setSort] = useAtom(sortAtom);
    const [, setFilter] = useAtom(filterAtom);

    return (
        <div className={classes.wholePage}>
            <div className={classes.allPartsContainer}>
                <Typography className={classes.text} variant="h4">תחקירים אחרונים</Typography>
                <div className={classes.filteringSortingSearchSection}>
                    <div className={classes.sortingSection}>
                        <Typography className={classes.text} variant="h6">מיון לפי:</Typography>
                        <div className={classes.sortingButtons}>
                            <Button onClick={() => setSort("lastUpdateTime")} className={classes.button} variant="contained">זמן עדכון אחרון - ברירת מחדל</Button>
                            <Button onClick={() => setSort("creationTime")} className={classes.button} variant="contained">זמן יצירה</Button>
                        </div>
                    </div>
                    <div className={classes.filteringSection}>
                        <Typography className={classes.text} variant="h6">סינון לפי:</Typography>
                        <div className={classes.sortingButtons}>
                            <Button onClick={() => setFilter("בתהליך")} className={classes.button} variant="contained">תחקירים בתהליך</Button>
                            <Button onClick={() => setFilter("ללא")} className={classes.button} variant="contained">כל התחקירים</Button>
                        </div>
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