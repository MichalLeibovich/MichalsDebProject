import { useState } from "react";
import type { RecentDebriefingsItem } from "../../../../interfaces/recentDebriefingsItem";
import useStyles from "./allDebriefingsSectionStyles";
import AllDebriefingsList from "./folder/all_debriefings_list/allDebriefingsList";
import Folder from "./folder/folder";

const AllDebriefingsSection: React.FC = () => {
  const { classes } = useStyles();

  const [butterflyEffectAllDebriefingsItemList, setButterflyEffectAllDebriefingsItemList] = useState<RecentDebriefingsItem[]>([]);
  const [gaussianAllDebriefingsItemList, setGaussianAllDebriefingsItemList] = useState<RecentDebriefingsItem[]>([]);
  const [harmonyAllDebriefingsItemList, setHarmonyAllDebriefingsItemList] = useState<RecentDebriefingsItem[]>([]);
  const [magenElyonAllDebriefingsItemList, setMagenElyonAllDebriefingsItemList] = useState<RecentDebriefingsItem[]>([]);
  const [switchAllDebriefingsItemList, setSwitchAllDebriefingsItemList] = useState<RecentDebriefingsItem[]>([]);
  const [supernovaAllDebriefingsItemList, setSupernovaAllDebriefingsItemList] = useState<RecentDebriefingsItem[]>([]);
  const [starlightAllDebriefingsItemList, setStarlightAllDebriefingsItemList] = useState<RecentDebriefingsItem[]>([]);

  // const folder1Items = ["תחקיר אפקטה 1", "תחקיר אפקטה 2", "תחקיר אפקטה 3"];
  // const folder2Items = ["תחקיר גאוסיין 1", "תחקיר גאוסיין 2"];
  // const folder3Items = ["תחקיר 1", "תחקיר 2", "תחקיר 3", "תחקיר 4", "תחקיר 5"];

  return (
    <div className={classes.foldersList}>

      {/* Folder 1 */}
      <Folder title="התחקירים באפקט הפרפר" setter={setButterflyEffectAllDebriefingsItemList}>
        <AllDebriefingsList items={butterflyEffectAllDebriefingsItemList} />
      </Folder>

      {/* Folder 2 */}
      <Folder title="התחקירים בגאוסיין" setter={setGaussianAllDebriefingsItemList}>
        <AllDebriefingsList items={gaussianAllDebriefingsItemList} />
      </Folder>

      {/* Folder 3 */}
      <Folder title="התחקירים בהרמוניה" setter={setHarmonyAllDebriefingsItemList}>
        <AllDebriefingsList items={harmonyAllDebriefingsItemList} />
      </Folder>

      {/* Folder 4 */}
      <Folder title="התחקירים במגן עליון" setter={setMagenElyonAllDebriefingsItemList}>
        <AllDebriefingsList items={magenElyonAllDebriefingsItemList} />
      </Folder>

      {/* Folder 5 */}
      <Folder title="התחקירים בסוויטץ'" setter={setSwitchAllDebriefingsItemList}>
        <AllDebriefingsList items={switchAllDebriefingsItemList} />
      </Folder>

      {/* Folder 6 */}
      <Folder title="התחקירים בסופרנובה" setter={setSupernovaAllDebriefingsItemList}>
        <AllDebriefingsList items={supernovaAllDebriefingsItemList} />
      </Folder>

      {/* Folder 7 */}
      <Folder title="התחקירים בסטארלייט" setter={setStarlightAllDebriefingsItemList}>
        <AllDebriefingsList items={starlightAllDebriefingsItemList} />
      </Folder>

    </div>
  );
}

export default AllDebriefingsSection;