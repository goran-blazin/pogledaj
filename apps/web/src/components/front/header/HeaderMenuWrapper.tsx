import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
// import { Slide, useScrollTrigger } from "@mui/material";
import { AccountCircle, ArrowBackIos, NotificationsNoneRounded, TheatersOutlined } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import namedRoutes from "../../../routes";

function HeaderMenuWrapper() {
  // const trigger = useScrollTrigger({
  //   threshold: 80
  // });

  const navigate = useNavigate();
  const location = useLocation();

  function goToHome() {
    navigate(namedRoutes.home, { replace: true });
  }

  function goBack() {
    navigate(-1);
  }

  return (
    // <Slide appear={false} direction={"down"} in={!trigger}>
    <AppBar color="primary" position={"relative"} elevation={0}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Box
          display="flex"
          flex={"1 auto"}
          justifyContent={"flex-start"}
          visibility={location.pathname === namedRoutes.home ? "hidden" : "visible"}
        >
          <IconButton
            onClick={goBack}
          >
            <ArrowBackIos
              htmlColor={"#a4a4a4"}
            />
          </IconButton>
          <IconButton
            sx={{
              visibility: "hidden"
            }}
          >
            <ArrowBackIos />
          </IconButton>
        </Box>
        <Box display="flex"
             flex={"1 auto"}
             justifyContent={"center"}
             alignItems={"center"}
             onClick={goToHome}
        >
          <TheatersOutlined
            color="inherit"
          />
          <Typography
            variant="h6"
            component="h1"
          >
            pogledaj
          </Typography>
        </Box>
        <Box display="flex"
             flex={"1 auto"}
             justifyContent={"flex-end"}
        >
          <IconButton
            color="inherit"
          >
            <NotificationsNoneRounded />
          </IconButton>
          <IconButton
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    // </Slide>
  );
}

export default HeaderMenuWrapper;