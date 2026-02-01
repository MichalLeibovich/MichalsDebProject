import { Typography } from "@mui/material";
import type { status } from "../../../../../../interfaces/recentDebriefingsItem";
import useStyles from "./RecentDebriefingItemStyles";
import DescriptionIcon from '@mui/icons-material/Description';

type ItemProps = {
  title: string,
  status: status,
  system: string,
  last_update_time: string,
  creation_time: string;
};

const RecentDebriefingsItem: React.FC<ItemProps> = ({ title, status, system, last_update_time, creation_time }: ItemProps) => {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.row}>
      <DescriptionIcon />
      <Typography className={classes.text} variant="h6">{title}</Typography>
      <Typography className={classes.text} variant="h6">{system}</Typography>
      <Typography className={classes.text} variant="h6">{status}</Typography>
      <Typography className={classes.text} variant="h6">{last_update_time}</Typography>
      <Typography className={classes.text} variant="h6">{creation_time}</Typography>
    </div>
  )
}

export default RecentDebriefingsItem;