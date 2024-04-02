import CloseIcon from "@mui/icons-material/Close";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import { default as React, useEffect, useLayoutEffect, useState } from "react";
import Swal from "sweetalert2";

const GameTTT = () => {
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
                axios
                  .post("ticTacToe/createboard")
                  .then((res) => {
                    setBoard(res.data);
                  })
                  .catch((err) => {});
                setIsGameOver(false);
                setWinningCords([]);
              }}
              disabled={!isGameOver}
            >
              Start
            </Button>
            <Button
              variant="outlined"
              color="warning"
              onClick={() => {
                axios
                  .post("ticTacToe/createboard")
                  .then((res) => {
                    setBoard(res.data);
                  })
                  .catch((err) => {});
                setIsGameOver(false);
                setWinningCords([]);
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
                            if (res.data.winner === "O") {
                              axios
                                .post("ticTacToe/saveSolution", {
                                  board: board,
                                  player: localStorage.getItem("username"),
                                })
                                .then(() => {
                                  console.log("Score updated");
                                })
                                .catch(() => {
                                  console.log("Score not updated");
                                });
                            }
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
        </Box>
      </Box>
    </Box>
  );
};

export default GameTTT;
