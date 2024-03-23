import LightbulbIcon from "@mui/icons-material/Lightbulb";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import Queen from "../../assests/crown.png";
import { numberToLetter } from "../../helper-functions/helper-functions";

const ChessBoard = ({ bordsize }) => {
  const [board, setBoard] = useState([[]]);
  const [isHint, setIsHint] = useState(false);

  const onUserInput = async (row, col) => {
    await axios
      .post("http://localhost:3000/api/eightQueens/placequeen", {
        board,
        row,
        col,
      })
      .then((res) => {
        setBoard(res.data.board);
      })
      .catch((err) => {});
  };

  const onanswerSubmit = async () => {
    console.log("Hint");
  };

  useLayoutEffect(() => {
    async function createBoard() {
      await axios
        .post("http://localhost:3000/api/eightQueens/createboard", { size: 8 })
        .then((res) => {
          console.log(1);
          setBoard(res.data);
        })
        .catch((err) => {});
    }
    createBoard();
  }, []);

  return (
    <Box>
      <Box mb={1} display={"flex"} justifyContent={"end"} alignItems={"center"}>
        <IconButton
          aria-label="hints"
          color={isHint ? "warning" : "primary"}
          onClick={() => setIsHint(!isHint)}
        >
          {isHint ? <TipsAndUpdatesIcon /> : <LightbulbIcon />}
        </IconButton>
      </Box>
      <Box
        display={"grid"}
        gridTemplateColumns={`repeat(${board.length}, 1fr)`}
        gap={0.25}
      >
        {board.map((row, rowIndex) =>
          row.map((col, colIndex) => (
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
                  src={Queen}
                  alt={"Queen"}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              ) : null}
            </Box>
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
