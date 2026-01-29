import RecentDebriefingsList from "./recent_debriefings_list/RecentDebriefingList";

const AllRecentDebriefingsSection: React.FC = () => {
  const folder1Items = ["Debrief 1", "Debrief 2", "Debrief 3"];

  return (
    <div>
      <h2>All Debriefings</h2>

      <RecentDebriefingsList items={folder1Items} />

    </div>
  );
}

export default AllRecentDebriefingsSection;