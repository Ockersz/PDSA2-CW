import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import React, { useState } from "react";
import Backdrop from "../../assests/gamesuitebg.png";
import Game from "../N_Queens/game";
import PredictValueGame from "../Predict-Value/game";
import RememberValueIndex from "../Remember_Value/game";
import ShortestPath from "../Shortest_Path/game2";
import GameTTT from "../Tic_Tac_Toe/game";
import Chart from "../Time_Charts/Chart";
import CustomAppBar from "./AppBar";
import DrawerList from "./DrawerList";
const Home = () => {
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState(null);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const selectComp = (component) => {
    setComponent(component);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar title="Game Suite" toggleDrawer={toggleDrawer(!open)} />
      <Box>
        {component ? (
          component === "/tic_tac_toe" ? (
            <GameTTT />
          ) : component === "/8_queens" ? (
            <Game />
          ) : component === "/remember_value_index" ? (
            <RememberValueIndex />
          ) : component === "/predict_value_index" ? (
            <PredictValueGame />
          ) : component === "/shortest_path" ? (
            <ShortestPath />
          ) : component === "/charts" ? (
            <Chart />
          ) : (
            <div>Invalid Component</div>
          )
        ) : (
          <div>
            <img
              src={Backdrop}
              alt="Game Suite"
              style={{ width: "100%", height: "100%" }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(255,255,255,0.8)",
                width: "100%",
                height: "30%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <h1>Welcome to Game Suite</h1>
                <h3>Click on the menu to select a game</h3>
                <br />
                <h3>PDSA CW - 1 </h3>
              </Box>
            </Box>
          </div>
        )}
      </Box>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList onClose={toggleDrawer(false)} selectComp={selectComp} />
      </Drawer>
    </Box>
  );
};

export default Home;
