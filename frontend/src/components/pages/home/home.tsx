import { Button, Typography } from "@mui/material";
import useStyles from "./homeStyles";
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const Home: React.FC = () => {
    const { classes, cx } = useStyles();
    return (
        <div className={classes.wholeHomeContainer}>
            <div className={classes.allPartsContainer}>
                <Typography variant="h3" className={classes.text}>שלום User<br/>מה ברצונך לעשות?</Typography>

                <div className={classes.buttonsContainer}>
                    <Button className={classes.pagesButton} component={NavLink} to="/newDebriefing">
                        <AddIcon className={classes.icon}/>
                        <Typography variant="h5" className={classes.text}>תחקיר חדש</Typography>
                    </Button>

                    <div className={classes.leftButtonsContainer}>
                        <Button className={classes.pagesButton} component={NavLink} to="/allDebriefings">כל התחקירים</Button>
                        <Button className={classes.pagesButton} component={NavLink} to="/recentDebriefings">תחקירים אחרונים</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;