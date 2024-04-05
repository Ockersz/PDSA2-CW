import { Box } from "@mui/material";
import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [sortingTimes, setSortingTimes] = useState();
  const [searchingTimes, setSearchingTimes] = useState();
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("rememberValueIndex/getlasttime");
      setSortingTimes(res.data);
    }

    async function fetchData2() {
      const res = await axios.get("predictValueIndex/getTimes");
      setSearchingTimes(res.data);
    }
    fetchData();
    fetchData2();
  }, []);

  //   {
  //     "_id": "66103dff8f42e4beb6a149c4",
  //     "bubbleSortTime": 169.8889,
  //     "insertionSortTime": 17.4877,
  //     "mergeSortTime": 9.0753,
  //     "quickSortTime": 51.3237,
  //     "radixSortTime": 1.1737,
  //     "shellSortTime": 5.9224,
  //     "timSortTime": 1.2222,
  //     "date": "2024-04-05T18:07:59.365Z",
  //     "__v": 0
  // }

  //   {
  //     "_id": "661069323550a800ad0a326d",
  //     "binarySearch": 0.0615,
  //     "jumpSearch": 0.0295,
  //     "exponentialSearch": 0.0212,
  //     "fibonacciSearch": 0.0493,
  //     "date": "2024-04-05T21:12:18.513Z",
  //     "__v": 0
  // }

  return (
    <Box p={1}>
      <h3>Sorting Times</h3>
      <Box>
        <Bar
          data={{
            labels: [
              "Bubble Sort",
              "Insertion Sort",
              "Merge Sort",
              "Quick Sort",
              "Radix Sort",
              "Shell Sort",
              "Tim Sort",
            ],
            datasets: [
              {
                label: "Time (ms)",
                data: [
                  sortingTimes?.bubbleSortTime,
                  sortingTimes?.insertionSortTime,
                  sortingTimes?.mergeSortTime,
                  sortingTimes?.quickSortTime,
                  sortingTimes?.radixSortTime,
                  sortingTimes?.shellSortTime,
                  sortingTimes?.timSortTime,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </Box>
      <Box mt={2}>
        <h3>Searching Times</h3>
        <Box>
          <Bar
            data={{
              labels: [
                "Binary Search",
                "Jump Search",
                "Exponential Search",
                "Fibonacci Search",
              ],
              datasets: [
                {
                  label: "Time (ms)",
                  data: [
                    searchingTimes?.binarySearch,
                    searchingTimes?.jumpSearch,
                    searchingTimes?.exponentialSearch,
                    searchingTimes?.fibonacciSearch,
                  ],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            height={400}
            width={600}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Chart;
