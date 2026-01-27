import useStyles from './AppStyles'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './component/header/header';
import Home from './component/pages/home/home';
import AllDebriefings from './component/pages/all_debriefings/allDebriefing';
import RecentDebriefings from './component/pages/recent_debriefings/recentDebriefings';
import NewDebriefing from './component/pages/new_debriefing/newDebriefing';

const App: React.FC = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allDebriefings" element={<AllDebriefings />} />
          <Route path="/recentDebriefings" element={<RecentDebriefings />} />
          <Route path="/newDebriefing" element={<NewDebriefing />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
