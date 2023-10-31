import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Tooltip, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { useUserState } from "../../context/context";

const settings = ["Profile", "Account", "Dashboard", "Logout"];
const menuItems = ["Home", "Explore", "Wishlist", "Lending Library"];
const backgroundImageFile = "TopBanner.png";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(
    "" || null
  );
  const [userAvi, setUserAvi] = useState<string>("" || null);
  const { user } = useUserState();
  const rawUserPicture = user?.picture;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    const fileNames = [backgroundImageFile, rawUserPicture].join(",");
    fetch(`/api/AWS/signedURL?fileNames=${fileNames}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        if ("urls" in data) {
          if (data.urls.length >= 2) {
            setBackgroundImageUrl(data.urls[0]);
            setUserAvi(data.urls[1]);
          } else {
            console.error("Not enough URLs in response");
          }
        } else if ("url" in data) {
          console.log("Received a single URL:", data.url);
        } else if ("message" in data) {
          // data is of type ErrorMessage
          console.error("Error:", data.message);
        }
      })
      .catch(console.error); // Log errors to the console
  });
  return (
    <AppBar
      position='sticky'
      sx={{
        width: "100%",
        height: "150px",
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          onClick={handleOpenNavMenu}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          sx={{ mt: "45px" }}
          id='menu-appbar'
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          {menuItems.map((item) => (
            <MenuItem key={item} onClick={handleCloseNavMenu}>
              <Typography textAlign='center'>{item}</Typography>
            </MenuItem>
          ))}
        </Menu>
        <Box />
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title='Open settings'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt='Remy Sharp' src={userAvi} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign='center'>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
