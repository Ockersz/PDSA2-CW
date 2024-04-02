import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import React, { useState } from "react";
import Game from "../N_Queens/game";
import PredictValueGame from "../Predict-Value/game";
import RememberValueIndex from "../Remember_Value/game";
import ShortestPath from "../Shortest_Path/game2";
import GameTTT from "../Tic_Tac_Toe/game";
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
          ) : (
            <div>Invalid Component</div>
          )
        ) : (
          <div>Welcome to Game Suite</div>
        )}
      </Box>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList onClose={toggleDrawer(false)} selectComp={selectComp} />
      </Drawer>
    </Box>
  );
};

export default Home;
