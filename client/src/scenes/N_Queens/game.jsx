import { Button, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import ChessBoard from "../common-components/chess-board";

const Game = () => {
  const [n, setN] = useState(8);
  const [input, setInput] = useState(n);
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
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <TextField
              id="standard-basic"
              label={
                isNaN(input)
                  ? "Invalid Input"
                  : input === ""
                  ? "Empty Input"
                  : "Enter Queens"
              }
              variant="standard"
              defaultValue="8"
              error={isNaN(input) || input === ""}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{ textAlign: "center", "& input": { textAlign: "center" } }} // Centering input text
            />

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button onClick={() => setN(parseInt(input))} variant="outlined">
                Start
              </Button>
              <Button
                onClick={() => {
                  setN(8);
                  setInput(8);
                }}
                variant="outlined"
                color="warning"
              >
                Reset
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gridColumn={"span 3"}
          borderRadius={2}
        >
          <ChessBoard bordsize={n} />
        </Box>
      </Box>
    </Box>
  );
};

export default Game;
