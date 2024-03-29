import {
  Backdrop,
  Box,
  Button,
  Fade,
  LinearProgress,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Swal from "sweetalert2";

const RememberValueIndex = () => {
  const [sortedArray, setSortedArray] = useState([]);
  const [shortenedArray, setShortenedArray] = useState([]);
  const [timesTaken, setTimesTaken] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedValue, setDisplayedValue] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerKey, setTimerKey] = useState(Date.now());
  const [randomValue, setRandomValue] = useState(0);
  const [randomAnswer, setRandomAnswer] = useState(0);
  const [randomValue2, setRandomValue2] = useState(0);
  const [randomAnswer2, setRandomAnswer2] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  async function startGame() {
    await axios
      .get("rememberValueIndex/startgame")
      .then((res) => {
        setSortedArray(res.data.sortedArray);
        setShortenedArray(res.data.sortedArray.slice(0, 20));
        setTimesTaken(res.data.timesTaken);
      })
      .catch((err) => {});
  }

  useLayoutEffect(() => {
    startGame();
  }, []);

  const start = async () => {
    await startGame();
    setIsGameStarted(true);
    displayNextValue(0);
  };

  const displayNextValue = (index) => {
    if (index < shortenedArray.length) {
      const id = setTimeout(() => {
        setDisplayedValue(shortenedArray[index]);
        setCurrentIndex(index);
        displayNextValue(index + 1);
        setIsPlaying(true);
        setTimerKey(Date.now()); // Reset timer
      }, 2000);
      setTimeoutId(id);
    } else {
      setIsPlaying(false);
      setIsGameStarted(false);
      setDisplayedValue(null);
      //Timer ends
      console.log("Timer ends");
      askQuestion();
    }
  };

  const askQuestion = () => {
    //get a random value from the array
    setRandomValue(shortenedArray[Math.floor(Math.random() * 20)]);
    setRandomValue2(shortenedArray[Math.floor(Math.random() * 20)]);
    handleOpen();
  };

  const checkAnswer = () => {
    if (
      randomAnswer === shortenedArray.indexOf(randomValue) &&
      randomAnswer2 === shortenedArray.indexOf(randomValue2)
    ) {
      Swal.fire({
        icon: "success",
        title: "Correct!",
        text: "You got it right!",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Incorrect!",
        text: "You got it wrong!",
      });
    }

    setRandomAnswer(0);
    setRandomAnswer2(0);
    setRandomValue(0);
    setRandomValue2(0);
  };

  const stop = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setIsGameStarted(false);
      setDisplayedValue(null);
    }
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
              <CountdownCircleTimer
                key={timerKey}
                isPlaying={isPlaying}
                duration={2}
                colors={["#00308F", "#0066b2", "#007FFF", "#00FFFF"]}
                colorsTime={[2, 1.6, 0.6, 0]}
                size={70}
                strokeWidth={7}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              fontSize={20}
              gridColumn={"span 4"}
            >
              <Box width={"100%"}>
                <LinearProgress
                  variant="determinate"
                  color="primary"
                  value={((currentIndex + 1) / 20) * 100}
                  sx={{ height: 12, borderRadius: 10 }}
                />
              </Box>
            </Box>
          </Box>

          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            fontSize={40}
            gridRow={"span 4"}
          >
            {displayedValue}
          </Box>
        </Box>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Which index was these values in?
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Where was {randomValue} in the array?
              <br />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={randomAnswer}
                label="Answer 1"
                sx={{ mt: 2, width: 200 }}
                onChange={(e) => setRandomAnswer(e.target.value)}
              >
                <MenuItem value={0}>Zero - 0</MenuItem>
                <MenuItem value={1}>One - 1</MenuItem>
                <MenuItem value={2}>Two - 2</MenuItem>
                <MenuItem value={3}>Three - 3</MenuItem>
                <MenuItem value={4}>Four - 4</MenuItem>
                <MenuItem value={5}>Five - 5</MenuItem>
                <MenuItem value={6}>Six - 6</MenuItem>
                <MenuItem value={7}>Seven - 7</MenuItem>
                <MenuItem value={8}>Eight - 8</MenuItem>
                <MenuItem value={9}>Nine - 9</MenuItem>
                <MenuItem value={10}>Ten - 10</MenuItem>
                <MenuItem value={11}>Eleven - 11</MenuItem>
                <MenuItem value={12}>Twelve - 12</MenuItem>
                <MenuItem value={13}>Thirteen - 13</MenuItem>
                <MenuItem value={14}>Fourteen - 14</MenuItem>
                <MenuItem value={15}>Fifteen - 15</MenuItem>
                <MenuItem value={16}>Sixteen - 16</MenuItem>
                <MenuItem value={17}>Seventeen - 17</MenuItem>
                <MenuItem value={18}>Eighteen - 18</MenuItem>
                <MenuItem value={19}>Nineteen - 19</MenuItem>
              </Select>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Where was {randomValue2} in the array?
              <br />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={randomAnswer2}
                sx={{ mt: 2, width: 200 }}
                label="Answer 2"
                onChange={(e) => setRandomAnswer2(e.target.value)}
              >
                <MenuItem value={0}>Zero - 0</MenuItem>
                <MenuItem value={1}>One - 1</MenuItem>
                <MenuItem value={2}>Two - 2</MenuItem>
                <MenuItem value={3}>Three - 3</MenuItem>
                <MenuItem value={4}>Four - 4</MenuItem>
                <MenuItem value={5}>Five - 5</MenuItem>
                <MenuItem value={6}>Six - 6</MenuItem>
                <MenuItem value={7}>Seven - 7</MenuItem>
                <MenuItem value={8}>Eight - 8</MenuItem>
                <MenuItem value={9}>Nine - 9</MenuItem>
                <MenuItem value={10}>Ten - 10</MenuItem>
                <MenuItem value={11}>Eleven - 11</MenuItem>
                <MenuItem value={12}>Twelve - 12</MenuItem>
                <MenuItem value={13}>Thirteen - 13</MenuItem>
                <MenuItem value={14}>Fourteen - 14</MenuItem>
                <MenuItem value={15}>Fifteen - 15</MenuItem>
                <MenuItem value={16}>Sixteen - 16</MenuItem>
                <MenuItem value={17}>Seventeen - 17</MenuItem>
                <MenuItem value={18}>Eighteen - 18</MenuItem>
                <MenuItem value={19}>Nineteen - 19</MenuItem>
              </Select>
            </Typography>

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => {
                handleClose();
                checkAnswer();
              }}
            >
              Confirm
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default RememberValueIndex;
