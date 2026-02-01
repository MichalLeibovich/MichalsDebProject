import useStyles from "./allDebriefingsSectionStyles";
import AllDebriefingsList from "./folder/all_debriefings_list/allDebriefingsList";
import Folder from "./folder/folder";

const AllDebriefingsSection: React.FC = () => {
  const { classes, cx } = useStyles();

  const folder1Items = ["תחקיר אפקטה 1", "תחקיר אפקטה 2", "תחקיר אפקטה 3"];
  const folder2Items = ["תחקיר גאוסיין 1", "תחקיר גאוסיין 2"];
  const folder3Items = ["תחקיר 1", "תחקיר 2", "תחקיר 3", "תחקיר 4", "תחקיר 5"];


  return (
    <div className={classes.foldersList}>

      {/* Folder 1 */}
      <Folder title="התחקירים באפקט הפרפר">
          <AllDebriefingsList items={folder1Items} />
      </Folder>

      {/* Folder 2 */}
      <Folder title="התחקירים בגאוסיין">
        <AllDebriefingsList items={folder2Items} />
      </Folder>

      {/* Folder 3 */}
      <Folder title="התחקירים בהרמוניה">
        <AllDebriefingsList items={folder3Items} />
      </Folder>

      {/* Folder 4 */}
      <Folder title="התחקירים במגן עליון">
        <AllDebriefingsList items={folder3Items} />
      </Folder>

      {/* Folder 5 */}
      <Folder title="התחקירים בסוויטץ'">
        <AllDebriefingsList items={folder3Items} />
      </Folder>

      {/* Folder 6 */}
      <Folder title="התחקירים בסופרנובה">
        <AllDebriefingsList items={folder3Items} />
      </Folder>

      {/* Folder 7 */}
      <Folder title="התחקירים בסטארלייט">
        <AllDebriefingsList items={folder3Items} />
      </Folder>

    </div>
  );
}

export default AllDebriefingsSection;