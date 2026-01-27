import useStyles from './AppStyles'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/header/header';
import Home from './components/pages/home/home';
import AllDebriefings from './components/pages/all_debriefings/allDebriefing';
import RecentDebriefings from './components/pages/recent_debriefings/recentDebriefings';
import NewDebriefing from './components/pages/new_debriefing/newDebriefing';
import MyAccount from './components/pages/my_account/myAccount';

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
          <Route path="/myAccount" element={<MyAccount />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
