import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import TicTacToeBoard from "../common-components/tic-tac-toe-board";

const GameTTT = () => {
  return (
    <Box p={1}>
      <Box display={"grid"} gridTemplateColumns="repeat(4, 1fr)" gap={1}>
        <Box
          gridColumn={"span 1"}
          height={"90vh"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={2}
          sx={{
            backgroundColor: "#f3f4f6",
            boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)",
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                window.location.reload();
              }}
            >
              Start
            </Button>
            <Button
              variant="outlined"
              color="warning"
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset
            </Button>
          </Stack>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gridColumn={"span 3"}
          borderRadius={2}
          height={"90vh"}
        >
          <TicTacToeBoard />
        </Box>
      </Box>
    </Box>
  );
};

export default GameTTT;
