import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../auth/context";
import { logout } from "../../../shared/logout";

const pages = ["Crear cuenta", "Iniciar sesión"];
const settings = ["Perfil", "Cerrar sesión"];

const Header = () => {
  const logo = "https://res.cloudinary.com/dreso9ye9/image/upload/v1701465116/logoNaranjaNeg_rd1s1x.png";

  const { userData , setUserData, setIsLogged, setFavorites} = AuthContext();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    if (page === "Crear cuenta") {
      navigate("/signup");
    }
    if (page === "Iniciar sesión") {
      navigate("/signin");
    }
    setAnchorElNav(null);
  };

  const handleLogout = (setUserData, setIsLogged, setFavorites) => {
    Swal.fire({
      title: "¡Hasta luego! Esperamos verte pronto 😊",
      icon: "success",
    });
    logout(setUserData, setIsLogged, setFavorites);
    navigate("/");
  };

  //Manejo del menu del user
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    if (
      setting === "Perfil" &&
      userData.rol?.some(x => x.name === "USER")
    ) {
      //console.log(userData);
      navigate("/userprofile");
    }
    if (
      setting === "Perfil" &&
      userData.rol?.some(x => x.name === "ADMIN")
    ) {
      //console.log(userData);
      navigate("/admin");
    }
    if (setting === "Cerrar sesión") {
      handleLogout({setUserData, setIsLogged, setFavorites});
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container
        maxWidth="xxl"
        sx={{
          padding: "0px",
          margin: "0px",
          backgroundColor: "#1F2E7B",
          height: "120px",
        }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            sx={{
              display: "flex",
              color: "inherit",
              fontSize: 12,
              alignItems: "end",
            }}
          >
            <Link to="/">
              <img src={logo} style={{ height: "100px" }} />
            </Link>

            <div style={{ display: "block" }}>
              <h1>
                canchas<span style={{ color: "#FF914D", margin: 0 }}>365</span>
              </h1>
              <span>¿Qué deporte jugamos hoy? </span>
            </div>
          </Typography>

          {userData ? (
            <Box
              sx={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                marginRight: 2,
              }}
            >
              <Tooltip title="Ver perfil">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ background: "#FF914D" }}>
                    {userData?.name[0].toUpperCase() + userData?.lastname[0].toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
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
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  mx: "50px",
                  justifyContent: "flex-end",
                }}
              >
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handleCloseNavMenu(page)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  keepMounted
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                    alignContent: "rigth",
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
