import { Typography } from "@mui/material";
import RecentDebriefingsList from "./recent_debriefings_list/RecentDebriefingList";
import useStyles from "./recentDebriefingsSectionStyles";
import type { RecentDebriefingsItem } from "../../../../interfaces/recentDebriefingsItem";
import { useEffect, useState } from "react";
import axios from "axios";
import RefreshIcon from '@mui/icons-material/Refresh';
import { sortAtom } from "../../../../atoms/sort_atom";
import { filterAtom } from "../../../../atoms/filter_atom";
import { useAtomValue } from "jotai";

const AllRecentDebriefingsSection: React.FC = () => {
  const { classes, cx } = useStyles();
  const [recentDebriefingsItemList, setRecentDebriefingsItemList] = useState<RecentDebriefingsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const sortValue = useAtomValue(sortAtom);
  const filterValue = useAtomValue(filterAtom);

  // const recentDebriefingsItemList: RecentDebriefingsItem[] = [
  //   {
  //     title: "תחקיר 1",
  //     status: "מוכן",
  //     system: "X",
  //     last_update_time: "29/01/2026 03:17",
  //     creation_time: "29/01/2026 03:17"
  //   },
  //   {
  //     title: "תחקיר 2",
  //     status: "בתהליך",
  //     system: "Y",
  //     last_update_time: "29/01/2026 02:17",
  //     creation_time: "29/01/2026 03:17"
  //   },
  //   {
  //     title: "תחקיר 3",
  //     status: "מוכן",
  //     system: "Z",
  //     last_update_time: "23/02/2025 11:53",
  //     creation_time: "01/07/2025 08:00"
  //   }
  // ];


  useEffect(() => {
    axios.get("http://localhost:3001/api/recent_debriefings", {
    params: {
      sortValue,
      filterValue
    }
  })
    // { params: { sort } }
    .then(res => {
      console.log(res.data);
      setRecentDebriefingsItemList(res.data);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
}, [sortValue, filterValue]);


return (
  <div>
    {isLoading &&
      <div className={classes.refreshIconContainer}>
        <RefreshIcon className={classes.refreshIcon} />
      </div>}

    {!isLoading && recentDebriefingsItemList.length === 0 &&
      <Typography className={classes.text} variant="h6">אין תחקירים</Typography>
    }

    {!isLoading && <div>
      <div className={classes.tableHeader}>
        <Typography className={cx(classes.text, classes.openDebriefing)} variant="h6">פתח תחקיר</Typography>
        <Typography className={cx(classes.text, classes.debriefingName)} variant="h6">שם תחקיר</Typography>
        <Typography className={cx(classes.text, classes.system)} variant="h6">מערכת</Typography>
        <Typography className={cx(classes.text, classes.status)} variant="h6">סטטוס</Typography>
        <Typography className={cx(classes.text, classes.lastUpdateTime)} variant="h6">זמן עדכון אחרון</Typography>
        <Typography className={cx(classes.text, classes.creationTime)} variant="h6">זמן יצירה</Typography>
      </div>

      <RecentDebriefingsList items={recentDebriefingsItemList} />
    </div>
    }

  </div>
);
}

export default AllRecentDebriefingsSection;