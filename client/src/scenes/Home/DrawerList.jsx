// DrawerList.js
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const DrawerList = ({ onClose, selectComp }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: 300 }} role="presentation" onClick={onClose}>
      <Box
        width={1}
        height={5 / 10}
        colo
        sx={{
          backgroundColor: "#2196f3",
          display: "flex",
          alignItems: "center",
        }}
      ></Box>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, marginTop: 2, marginLeft: 2 }}
      >
        Games List
      </Typography>
      <Divider />
      <List>
        {[
          { label: "8 Queens", path: "/8_queens" },
          { label: "Tic Tac Toe", path: "/tic_tac_toe" },
          { label: "Remember Value Index", path: "/remember_value_index" },
          { label: "Predict Value Index", path: "/predict_value_index" },
          { label: "Shortest Path", path: "/shortest_path" },
          { label: "Charts", path: "/charts" },
        ].map((text, index) => (
          <ListItem key={text.label} disablePadding>
            <ListItemButton
              onClick={() => {
                selectComp(text.path);
              }}
            >
              <ListItemIcon>
                <SportsEsportsIcon />
              </ListItemIcon>
              <ListItemText primary={text.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DrawerList;
