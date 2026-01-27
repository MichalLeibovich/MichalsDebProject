import { Button } from '@mui/material'
import useStyles from './headerStyles';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    const { classes } = useStyles();

    return (
        <header className={classes.headerContainer}>
            <div className={classes.rightSideContainer}>
                <Button className={classes.myAccountButton} component={NavLink} to="/myAccount" end>לחשבון שלי</Button>
            </div>

            <div className={classes.headerTitlesContainer}>
                <Button className={classes.button} component={NavLink} to="/" end>עמוד הבית</Button>
                <Button className={classes.button} component={NavLink} to="/allDebriefings">כל התחקירים</Button>
                <Button className={classes.button} component={NavLink} to="/recentDebriefings">תחקירים אחרונים</Button>

            </div>
            <Link to="/">
                <img className={classes.logo} src="src/assets/smiling_cat.png" alt="pizza_logo.png"
                    width="750px" height="750px" />
            </Link>
        </header>
    )
}

export default Header;