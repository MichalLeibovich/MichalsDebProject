import RecentDebriefingsItem from "./recent_briefings_item/RecentDebriefingItem";

type ListProps = {
  items: string[];
};

const RecentDebriefingsList: React.FC<ListProps> = ({ items }: ListProps) => {
  return (
    <div>
      {items.map((item) => (
        <RecentDebriefingsItem key={item} name={item} />
      ))}
    </div>
  );
}

export default RecentDebriefingsList;