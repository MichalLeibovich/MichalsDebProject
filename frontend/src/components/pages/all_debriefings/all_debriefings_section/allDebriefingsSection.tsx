import AllDebriefingsList from "./folder/all_debriefings_list/allDebriefingList";
import Folder from "./folder/folder";

const AllDebriefingsSection: React.FC = () => {
  const folder1Items = ["Debrief 1", "Debrief 2", "Debrief 3"];
  const folder2Items = ["Debrief A", "Debrief B"];

  return (
    <div>
      <h2>All Debriefings</h2>

      {/* Folder 1 */}
      <Folder title="Folder 1">
        <AllDebriefingsList items={folder1Items} />
      </Folder>

      {/* Folder 2 */}
      <Folder title="Folder 2">
        <AllDebriefingsList items={folder2Items} />
      </Folder>

      <p>Other content below</p>
    </div>
  );
}

export default AllDebriefingsSection;