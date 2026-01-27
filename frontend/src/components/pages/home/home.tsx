import { Button } from "@mui/material";
import useStyles from "./homeStyles";
import { NavLink } from 'react-router-dom';


const Home: React.FC = () => {
    const { classes, cx } = useStyles();
    return(
        <div className={classes.wholeHomeContainer}>
            <div>
                <Button className={classes.pagesButton} component={NavLink} to="/allDebriefings">כל התחקירים</Button>
                <Button className={classes.pagesButton} component={NavLink} to="/recentDebriefings">תחקירים אחרונים</Button>
            </div>
            
        </div>
    )
}

export default Home;