import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import "./GraphBoard.scss";

const data = [
  {
    name: "20/6",
    wallStreet: 4000,
    telAviv: 2400,
  },
  {
    name: "21/6",
    wallStreet: 3000,
    telAviv: 1398,
  },
  {
    name: "22/6",
    wallStreet: 2000,
    telAviv: 9800,
  },
  {
    name: "23/6",
    wallStreet: 2780,
    telAviv: 3908,
  },
  {
    name: "24/6",
    wallStreet: 1890,
    telAviv: 4800,
  },
  {
    name: "25/6",
    wallStreet: 2390,
    telAviv: 3800,
  },
  {
    name: "26/6",
    wallStreet: 3490,
    telAviv: 4300,
  },
];

const GraphBoard = () => {
  return (
    <div className="content-container graph-board">
      <h2>Holdings</h2>
      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="telAviv"
              stroke="#bb86fc"
              name="Tel Aviv"
            />
            <Line
              type="monotone"
              dataKey="wallStreet"
              stroke="#03dac5"
              name="Wall Street"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphBoard;
