import { Typography } from "@mui/material";
import RecentDebriefingsList from "./recent_debriefings_list/RecentDebriefingList";
import useStyles from "./recentDebriefingsSectionStyles";
import type { RecentDebriefingsItem } from "../../../../interfaces/recentDebriefingsItem";

const AllRecentDebriefingsSection: React.FC = () => {
  const { classes, cx } = useStyles();

  const recentDebriefingsItemList: RecentDebriefingsItem[] = [
    {
      title: "תחקיר 1",
      status: "מוכן",
      system: "X",
      last_update_time: "29/01/2026 03:17",
      creation_time: "29/01/2026 03:17"
    },
    {
      title: "תחקיר 2",
      status: "בתהליך",
      system: "Y",
      last_update_time: "29/01/2026 02:17",
      creation_time: "29/01/2026 03:17"
    },
    {
      title: "תחקיר 3",
      status: "מוכן",
      system: "Z",
      last_update_time: "23/02/2025 11:53",
      creation_time: "01/07/2025 08:00"
    }
  ];

  return (
    <div>

      <div className={classes.tableHeader}>
        <Typography className={classes.text} variant="h6">פתח תחקיר</Typography>
        <Typography className={classes.text} variant="h6">שם תחקיר</Typography>
        <Typography className={classes.text} variant="h6">מערכת</Typography>
        <Typography className={classes.text} variant="h6">סטטוס</Typography>
        <Typography className={classes.text} variant="h6">זמן עדכון אחרון</Typography>
        <Typography className={classes.text} variant="h6">זמן יצירה</Typography>
      </div>

      <RecentDebriefingsList items={recentDebriefingsItemList} />

    </div>
  );
}

export default AllRecentDebriefingsSection;