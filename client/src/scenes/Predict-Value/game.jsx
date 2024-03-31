import { Box, Button, Stack } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const PredictValueGame = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [sortedArray, setSortedArray] = useState([]);
  const [randomNumber, setRandomNumber] = useState(0);
  const [indexOptions, setIndexOptions] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const start = async () => {
    setIsGameStarted(true);
    await axios
      .get("predictValueIndex/predict")
      .then((res) => {
        setSortedArray(res.data.array);
        setRandomNumber(res.data.findVal);
        const searchResults = res.data.searchResults;
        const correctIndex = searchResults.find(
          (result) => result.algorithm === "Binary Search"
        ).index;
        setCorrectIndex(correctIndex);
        const randomIndexes = [
          correctIndex,
          ...getRandomIndexes(correctIndex, 5000),
        ];
        setIndexOptions(shuffle(randomIndexes));
      })
      .catch((err) => {});
  };

  const stop = async () => {
    setIsGameStarted(false);
    setSortedArray([]);
    setIndexOptions([]);
    setRandomNumber(0);
  };

  const getRandomIndexes = (correctIndex, arrayLength) => {
    const indexes = [];
    while (indexes.length < 3) {
      const index = Math.floor(Math.random() * arrayLength);
      if (index !== correctIndex && !indexes.includes(index)) {
        indexes.push(index);
      }
    }
    return indexes;
  };

  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

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
              onClick={start}
              disabled={isGameStarted}
            >
              Start
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={stop}
              disabled={!isGameStarted}
            >
              Stop
            </Button>
          </Stack>
        </Box>

        <Box
          gridColumn={"span 3"}
          borderRadius={2}
          height={"90vh"}
          display={"grid"}
          gridTemplateRows="repeat(5, 1fr)"
        >
          <Box display={"grid"} gridTemplateColumns="repeat(5, 1fr)" gap={1}>
            <Box
              gridColumn={"span 1"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <span>Value:</span>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              fontSize={20}
              gridColumn={"span 4"}
            >
              <span>{randomNumber}</span>
            </Box>
          </Box>

          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            fontSize={40}
            gridRow={"span 4"}
          >
            {indexOptions.map((option, index) => (
              <Button
                key={index}
                variant="contained"
                color="primary"
                sx={{ margin: 1 }}
                onClick={() => {
                  //check if the selected index is the correct one
                  if (option === correctIndex) {
                    Swal.fire({
                      title: "Correct!",
                      icon: "success",
                    });
                  } else {
                    Swal.fire({
                      title: "Incorrect!",
                      icon: "error",
                    });
                  }
                }}
              >
                {option}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PredictValueGame;
