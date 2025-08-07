import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

import dayjs from "dayjs"; // optional, for better date handling

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SkillProgressChart = ({ type, skillData }) => {
  if (!skillData) return null;

  const labels = skillData.subtopics.map((sub) => sub.title);

  const extractDay = (date) => (date ? dayjs(date).date() : null);

  const data = {
    labels,
    datasets: [
      {
        label: "Created",
        data: skillData.subtopics.map((s) => extractDay(s.createdAt)),
        backgroundColor: "#facc15",
        borderColor: "#facc15",
        fill: type === "area",
      },
      {
        label: "Started",
        data: skillData.subtopics.map((s) => extractDay(s.startedAt)),
        backgroundColor: "#3b82f6",
        borderColor: "#3b82f6",
        fill: type === "area",
      },
      {
        label: "Completed",
        data: skillData.subtopics.map((s) => extractDay(s.completedAt)),
        backgroundColor: "#22c55e",
        borderColor: "#22c55e",
        fill: type === "area",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#fff" },
      },
      title: {
        display: true,
        text: `${skillData.name} Subtopic Progress Timeline`,
        color: "#fff",
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "#334155" },
      },
      y: {
        title: {
          display: true,
          text: "Day of the Month",
          color: "#fff",
        },
        ticks: {
          color: "#fff",
          precision: 0,
        },
        beginAtZero: true,
        grid: { color: "#334155" },
      },
    },
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl max-w-4xl mx-auto">
      {type === "line" || type === "area" ? (
        <Line data={data} options={options} />
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default SkillProgressChart;
