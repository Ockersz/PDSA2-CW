import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import ChessBoard from "../common-components/chess-board";

const Game = () => {
  const [n, setN] = useState(8);
  return (
    <Box p={1}>
      <Box display={"grid"} gridTemplateColumns="repeat(4, 1fr)" gap={1}>
        <Box
          gridColumn={"span 1"}
          height={"90vh"}
          sx={{ backgroundColor: "green" }}
          borderRadius={2}
        >
          <Button onClick={() => setN(n + 1)}> Test</Button>
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
