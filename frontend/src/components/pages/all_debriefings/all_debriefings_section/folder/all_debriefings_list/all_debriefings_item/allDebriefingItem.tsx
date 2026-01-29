type ItemProps = {
  name: string;
};

const AllDebriefingsItem: React.FC<ItemProps> = ({ name }: ItemProps) => {
  return <div>{name}</div>;
}

export default AllDebriefingsItem;