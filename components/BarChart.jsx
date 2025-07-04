"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

// const options = {
 
//   elements: {
//     bar: {
//       borderWidth: 2,
//     },
//   },
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Chart.js Horizontal Bar Chart",
//     },
//   },
// };

function BarChart({ chartData }) {
  return <Bar data={chartData}  />;
}

export default BarChart;
