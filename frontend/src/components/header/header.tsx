import { Button } from '@mui/material'
import useStyles from './headerStyles';
import { Link, NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header: React.FC = () => {
    const { classes } = useStyles();

    return (
        <header className={classes.headerContainer}>
            <div className={classes.rightSideContainer}>
                <div className={classes.rightSideContainerIcons}>
                    <Button className={classes.myAccountButton} component={NavLink} to="/myAccount" end>לחשבון שלי</Button>
                    <Link to="/shoppingCart">
                        <ShoppingCartIcon className={classes.shoppingCart} />
                    </Link>
                </div>
            </div>

            <div className={classes.headerTitlesContainer}>
                <Button className={classes.button} component={NavLink} to="/" end>עמוד הבית</Button>
                <Button className={classes.button} component={NavLink} to="/about">אודות</Button>
                <Button className={classes.button} component={NavLink} to="/menu">
                    חנות
                    {/* <ArrowDropDownIcon /> */}
                </Button>
                <Button className={classes.button} component={NavLink} to="/reviews" end>ביקורות</Button>
                <Button className={classes.button} component={NavLink} to="/contact">צור קשר</Button>
            </div>
            <Link to="/">
                <img className={classes.logo} src="src/assets/knitting_logo.png" alt="pizza_logo.png"
                    width="750px" height="750px" />
            </Link>
        </header>
    )
}

export default Header;