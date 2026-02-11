import { Button, Typography } from "@mui/material";
import useStyles from "./homeStyles";
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";

const Home: React.FC = () => {
    const { classes, cx } = useStyles();
    const [username, setUsername] = useState("");

    useEffect(() => {
        setUsername("NOC-OUT")
    }, []);

    return (
        <div className={classes.wholeHomeContainer}>
            <div className={classes.allPartsContainer}>
                <Typography variant="h3" className={cx(classes.text, classes.textHello)}>שלום {username}<br />מה ברצונך לעשות?</Typography>

                <div className={classes.buttonsContainer}>
                    <Button className={classes.pagesButton} component={NavLink} to="/newDebriefing">
                        <AddIcon className={classes.icon} />
                        <Typography variant="h5" className={classes.text}>צור תחקיר חדש</Typography>
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