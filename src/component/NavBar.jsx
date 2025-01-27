import {AppBar, Button, Link, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import React from "react";

function NavBar() {

    const {t, i18n} = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        setAnchorEl(null);
    };
    return (

        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1}}>
                    <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
                        MindForge
                    </Link>
                </Typography>
                <Button color="">
                    <Link href="/login" style={{textDecoration: 'none', color: 'white'}}>
                        {t('login')}
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link href="/registration" style={{textDecoration: 'none', color: 'white'}}>
                        {t('register')}
                    </Link>
                </Button>
                <Button
                    color="inherit"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                    {t('language')}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
                    <MenuItem onClick={() => handleLanguageChange('ru')}>Русский</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;
