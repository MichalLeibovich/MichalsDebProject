import axios from "axios";
import { useState, type ReactNode } from "react";
import type { RecentDebriefingsItem } from "../../../../../interfaces/recentDebriefingsItem";
import { Typography } from "@mui/material";
import useStyles from "./folderStyles";
import RefreshIcon from '@mui/icons-material/Refresh';

type FolderProps = {
  title: string;
  // listLength: number;
  setter: React.Dispatch<React.SetStateAction<RecentDebriefingsItem[]>>
  children: ReactNode;
};

const Folder: React.FC<FolderProps> = ({ title, setter, children }) => {
  const { classes, cx } = useStyles();
  const [open, setOpen] = useState(false);
  const [listLength, setListLength] = useState(-1);

  const getDebriefingSystem = () => {
    if (title === "התחקירים בגאוסיין") return "גאוסיין"
    else {
      if (title === "התחקירים בהרמוניה") return "הרמוניה"
      else {
        if (title === "התחקירים במגן עליון") return "מגן עליון"
        else {
          if (title === "התחקירים בסוויטץ'") return "מגן עליון"
          else {
            if (title === "התחקירים בסופרנובה") return "סופרנובה"
            else {
              if (title === "התחקירים בסטארלייט") return "סטארלייט"
            }
          }
        }
      }
    }
    return "";
  }

  const fetchDebriefingsByTitle = async () => {
    const system = getDebriefingSystem();

    try {
      const res = await axios.get(
        "http://localhost:3001/api/all_debriefings",
        { params: { system } }
      );
      setter(res.data);
      // listLength = res.data.length;
      setListLength(res.data.length)
    }
    catch (err) {
      console.error(err);
    }
  };

  console.log(listLength);
  return (
    <div>
      <div onClick={() => {
        setOpen(!open);
        fetchDebriefingsByTitle();
      }}
        style={{ display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none" }}
      >
        <span style={{ width: 16 }}>{open ? "▾" : "▸"}</span>
        <span>{title}</span>
      </div>

      {open && listLength > 0 &&
        <div style={{ marginLeft: 24, marginTop: 4 }}>
          {<div className={classes.tableHeader}>
            <Typography className={cx(classes.text, classes.openDebriefing)} variant="h6">פתח תחקיר</Typography>
            <Typography className={cx(classes.text, classes.debriefingName)} variant="h6">שם תחקיר</Typography>
            <Typography className={cx(classes.text, classes.status)} variant="h6">סטטוס</Typography>
            <Typography className={cx(classes.text, classes.lastUpdateTime)} variant="h6">זמן עדכון אחרון</Typography>
            <Typography className={cx(classes.text, classes.creationTime)} variant="h6">זמן יצירה</Typography>
          </div>}
          {children}
        </div>}

      {open && listLength === 0 &&
        <div style={{ marginLeft: 24, marginTop: 4 }}>
          <Typography className={classes.text} variant="h6">אין תחקירים</Typography>
        </div>
      }

      {open && listLength === -1 && <RefreshIcon/>}
    </div>
  );
};

export default Folder;
