import type { AllDebriefingsItem as AllDebriefingsItemType } from "../../../../../../interfaces/allDebriefingsItem";
import AllDebriefingsItem from "./all_debriefings_item/allDebriefingItem";
import useStyles from "./allDebriefingsListStyles";

type ListProps = {
  items: AllDebriefingsItemType[];
};

const AllDebriefingsList: React.FC<ListProps> = ({ items }: ListProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.debriefingsList}>
      {items.map((item) => (
        <AllDebriefingsItem key={item.created_at} id={item.id} title={item.title} status={item.status}
          last_update_time={item.updated_at} creation_time={item.created_at} />
      ))}
    </div>
  );
}

export default AllDebriefingsList;