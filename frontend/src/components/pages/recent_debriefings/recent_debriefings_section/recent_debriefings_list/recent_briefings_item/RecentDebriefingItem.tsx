import { Typography } from "@mui/material";
import type { status } from "../../../../../../interfaces/recentDebriefingsItem";
import useStyles from "./RecentDebriefingItemStyles";
import DescriptionIcon from '@mui/icons-material/Description';
import dayjs from "dayjs";

type ItemProps = {
  id: number,
  title: string,
  status: status,
  system: string,
  last_update_time: string,
  creation_time: string;
};

const RecentDebriefingsItem: React.FC<ItemProps> = ({ id, title, status, system, last_update_time, creation_time }: ItemProps) => {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.row}>
      <div className={classes.openDebriefing} onClick={() => window.open(`/openedDebriefing/${id}`, "_blank")}>
        <DescriptionIcon />
      </div>
      <Typography className={cx(classes.text, classes.debriefingName)} variant="h6">{title}</Typography>
      <Typography className={cx(classes.text, classes.system)} variant="h6">{system}</Typography>
      <Typography className={cx(classes.text, classes.status)} variant="h6">{status}</Typography>
      <Typography className={cx(classes.text, classes.lastUpdateTime)} variant="h6">{dayjs(last_update_time).format("HH:mm DD-MM-YYYY")}</Typography>
      <Typography className={cx(classes.text, classes.creationTime)} variant="h6">{dayjs(creation_time).format("HH:mm DD-MM-YYYY")}</Typography>
    </div>
  )
}

export default RecentDebriefingsItem;