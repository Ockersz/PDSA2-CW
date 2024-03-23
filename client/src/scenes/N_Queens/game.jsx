import Box from "@mui/material/Box";
import React, { useState } from "react";
import ChessBoard from "../common-components/chess-board";

const Game = () => {
  const [n, setN] = useState(8);
  const [board, setBoard] = useState(null);
  const [userSolution, setUserSolution] = useState(null);

  const createGame = async () => {};

  const submitAnswer = async () => {};

  const submitAnswers = async () => {};

  return (
    <Box p={1}>
      <Box display={"grid"} gridTemplateColumns="repeat(4, 1fr)" gap={1}>
        <Box
          gridColumn={"span 1"}
          height={"90vh"}
          sx={{ backgroundColor: "green" }}
          borderRadius={2}
        >
          {" "}
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gridColumn={"span 3"}
          borderRadius={2}
        >
          <ChessBoard board={board} />
        </Box>
      </Box>
    </Box>
  );
};

export default Game;
