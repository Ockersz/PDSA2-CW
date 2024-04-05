import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Chart = () => {
  const [sortingTimes, setSortingTimes] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("rememberValueIndex/getlasttime");
      setSortingTimes(res.data);
    }
    fetchData();
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

  return (
    <Box>
      <h1>Sorting Times</h1>
    </Box>
  );
};

export default Chart;
