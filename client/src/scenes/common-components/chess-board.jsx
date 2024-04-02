import LightbulbIcon from "@mui/icons-material/Lightbulb";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { Button, Stack, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import Swal from "sweetalert2";
import InValQueen from "../../assests/crowinvalid.png";
import Queen from "../../assests/crown.png";
import { numberToLetter } from "../../helper-functions/helper-functions";

const ChessBoard = ({ bordsize }) => {
  const [board, setBoard] = useState([[]]);
  const [isHint, setIsHint] = useState(false);
  const [hints, setHints] = useState([]);
  const [maxQueens, setMaxQueens] = useState(0);

  const onUserInput = async (row, col) => {
    if (maxQueens === bordsize && board[row][col] === 0) {
      Swal.fire({
        title: "Error",
        text: "You have already placed all the queens",
        icon: "warning",
        confirmButtonText: "Cool",
      });
      return;
    }

    hints.forEach((hint) => {
      if (hint.cord.row === row && hint.cord.col === col) {
        hints.splice(hints.indexOf(hint), 1);
      }
    });

    await axios
      .post("eightQueens/placequeen", {
        hints,
        board,
        row,
        col,
      })
      .then((res) => {
        setHints(res.data.hints);
        setBoard(res.data.board);
        setMaxQueens(
          res.data.board.flat().filter((queen) => queen === 1).length
        );
      })
      .catch((err) => {});
  };

  const onanswerSubmit = async () => {
    if (maxQueens !== bordsize) {
      Swal.fire({
        title: "Error",
        text: "You have not placed all the queens",
        icon: "warning",
        confirmButtonText: "Cool",
      });
      return;
    }

    await axios
      .post("eightQueens/checksolution", {
        board,
      })
      .then((res) => {
        if (res.data) {
          Swal.fire({
            title: "Correct Answer",
            text: "You have successfully solved the puzzle",
            icon: "success",
            confirmButtonText: "Cool",
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            title: "Incorrect Answer",
            text: "You have not solved the puzzle",
            icon: "error",
            confirmButtonText: "Try Again",
          }).then(() => {
            window.location.reload();
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "question",
          confirmButtonText: "Try Again",
        }).then(() => {
          window.location.reload();
        });
      });
  };

  useLayoutEffect(() => {
    async function createBoard() {
      await axios
        .post("eightQueens/createboard", {
          size: bordsize,
        })
        .then((res) => {
          setBoard(res.data);
        })
        .catch((err) => {});
    }
    createBoard();
    setMaxQueens(0);
  }, [bordsize]);

  return (
    <Box>
      <Box mb={1} display={"flex"} justifyContent={"end"} alignItems={"center"}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <IconButton
            aria-label="hints"
            color={isHint ? "warning" : "primary"}
            onClick={() => setIsHint(!isHint)}
          >
            {isHint ? <TipsAndUpdatesIcon /> : <LightbulbIcon />}
          </IconButton>
          <IconButton
            aria-label="restart"
            color={"primary"}
            onClick={() => {
              axios
                .post("eightQueens/createboard", {
                  size: bordsize,
                })
                .then((res) => {
                  setBoard(res.data);
                })
                .catch((err) => {});
            }}
          >
            <RestartAltIcon />
          </IconButton>
        </Stack>
      </Box>
      <Box
        display={"grid"}
        gridTemplateColumns={`repeat(${board.length}, 1fr)`}
        gap={0.25}
      >
        {board.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <Tooltip
              title={
                isHint
                  ? hints
                      .filter(
                        (hint) =>
                          hint.cause.row === rowIndex &&
                          hint.cause.col === colIndex
                      )
                      .map((hint) => hint.message)
                      .join(" and ")
                  : ""
              }
              key={rowIndex + "-" + colIndex}
            >
              <Box
                id={numberToLetter(rowIndex) + colIndex}
                key={`${rowIndex + 1}-${colIndex}`}
                width={"60px"}
                height={"60px"}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  backgroundColor:
                    (rowIndex + colIndex) % 2 === 0 ? "#f3f4f6" : "#5d5d5d",
                }}
                onClick={() => onUserInput(rowIndex, colIndex)}
              >
                {board[rowIndex][colIndex] === 1 ? (
                  <img
                    src={
                      hints.some(
                        (hint) =>
                          hint.cord.row === rowIndex &&
                          hint.cord.col === colIndex
                      ) && isHint
                        ? InValQueen
                        : Queen
                    }
                    alt={"Queen"}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                ) : null}
              </Box>
            </Tooltip>
          ))
        )}
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={1}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => onanswerSubmit()}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ChessBoard;
