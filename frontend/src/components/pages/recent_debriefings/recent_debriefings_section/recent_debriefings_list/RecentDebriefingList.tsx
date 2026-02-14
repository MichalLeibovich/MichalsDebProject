import type { RecentDebriefingsItem as RecentDebriefingsItemType } from "../../../../../interfaces/recentDebriefingsItem";
import RecentDebriefingsItem from "./recent_briefings_item/RecentDebriefingItem";
import useStyles from "./RecentDebriefingListStyles";

type ListProps = {
  items: RecentDebriefingsItemType[];
};

const RecentDebriefingsList: React.FC<ListProps> = ({ items }: ListProps) => {
  const {classes} = useStyles();
  return (
    <div className={classes.list}>
      {items.map((item) => (
        <RecentDebriefingsItem key={item.id} id={item.id} title={item.title} status={item.status} system={item.system}
          last_update_time={item.updated_at} creation_time={item.created_at} />
      ))}
    </div>
  );
}

export default RecentDebriefingsList;