import AllDebriefingsItem from "./all_debriefings_item/allDebriefingItem";
import useStyles from "./allDebriefingsListStyles";

type ListProps = {
  items: string[];
};

const AllDebriefingsList: React.FC<ListProps> = ({ items }: ListProps) => {
    const { classes, cx } = useStyles();

  return (
    <div  className={classes.debriefingsList}>
      {items.map((item) => (
        <AllDebriefingsItem key={item} name={item} />
      ))}
    </div>
  );
}

export default AllDebriefingsList;