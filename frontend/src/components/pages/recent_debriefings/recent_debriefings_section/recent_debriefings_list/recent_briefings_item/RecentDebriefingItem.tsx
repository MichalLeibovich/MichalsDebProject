type ItemProps = {
  name: string;
};

const RecentDebriefingsItem: React.FC<ItemProps> = ({ name }: ItemProps) => {
  return <div>{name}</div>;
}

export default RecentDebriefingsItem;