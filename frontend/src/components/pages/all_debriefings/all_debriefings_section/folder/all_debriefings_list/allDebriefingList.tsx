import AllDebriefingsItem from "./all_debriefings_item/allDebriefingItem";

type ListProps = {
  items: string[];
};

const AllDebriefingsList: React.FC<ListProps> = ({ items }: ListProps) => {
  return (
    <div>
      {items.map((item) => (
        <AllDebriefingsItem key={item} name={item} />
      ))}
    </div>
  );
}

export default AllDebriefingsList;