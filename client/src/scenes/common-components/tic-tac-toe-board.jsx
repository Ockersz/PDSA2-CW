import CloseIcon from "@mui/icons-material/Close";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Swal from "sweetalert2";
const TicTacToeBoard = () => {
  const [board, setBoard] = useState([[]]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [winningCords, setWinningCords] = useState([]);

  useLayoutEffect(() => {
    async function createBoard() {
      await axios
        .post("ticTacToe/createboard")
        .then((res) => {
          setBoard(res.data);
        })
        .catch((err) => {});
    }
    createBoard();
    setIsGameOver(false);
    setWinningCords([]);
  }, []);

  useEffect(() => {
    if (isGameOver) {
      Swal.fire({
        title: "Game Over",
        text: "Game Over",
        icon: "warning",
        confirmButtonText: "Cool",
        footer:
          winner === "X"
            ? "Computer Wins"
            : winner === "O"
            ? "Player Wins"
            : "Draw",
      });
    }
  }, [isGameOver, winner]);
  return (
    <Box>
      <Box>
        {board.map((row, i) => (
          <Box key={i} display="flex">
            {row.map((cell, j) => (
              <Box
                key={j}
                width={100}
                height={100}
                display="flex"
                justifyContent="center"
                alignItems="center"
                border="1px solid black"
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: "#f3f4f6",
                  },
                }}
                onClick={() => {
                  if (isGameOver) {
                    return;
                  }
                  axios
                    .post("ticTacToe/makemove", {
                      board: board,
                      row: i,
                      col: j,
                    })
                    .then((res) => {
                      setBoard(res.data.board);
                      setIsGameOver(res.data.gameOver);
                      setWinner(res.data.winner);
                    })
                    .catch((err) => {});
                }}
              >
                {cell === "O" ? (
                  <PanoramaFishEyeIcon
                    color="primary"
                    sx={{
                      fontSize: 50,
                    }}
                  />
                ) : cell === "X" ? (
                  <CloseIcon
                    color="error"
                    sx={{
                      fontSize: 50,
                    }}
                  />
                ) : (
                  ""
                )}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TicTacToeBoard;
