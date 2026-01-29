import type { RecentDebriefingsItem as RecentDebriefingsItemType} from "../../../../../interfaces/recentDebriefingsItem";
import RecentDebriefingsItem from "./recent_briefings_item/RecentDebriefingItem";

type ListProps = {
  items: RecentDebriefingsItemType[];
};

const RecentDebriefingsList: React.FC<ListProps> = ({ items }: ListProps) => {
  return (
    <div>
      {items.map((item) => (
        <RecentDebriefingsItem key={item.creation_time} title={item.title} status={item.status} system={item.system}
        last_update_time={item.last_update_time} creation_time={item.creation_time}/>
      ))}
    </div>
  );
}

export default RecentDebriefingsList;