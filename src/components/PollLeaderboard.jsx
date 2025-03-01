import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PollLeaderboard = ({ pollData }) => {
  // Prepare data for the bar chart
  const chartData = {
    labels: pollData ? Object.keys(pollData.options) : [],
    datasets: [
      {
        label: "Votes",
        data: pollData ? Object.values(pollData.options).map((option) => option.count) : [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"], // Custom colors
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <h2>Leaderboard</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: "#000", // Color of option names
                font: {
                  size: 16,
                },
              },
            },
            y: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 16,
                },
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
              labels: {
                font: {
                  size: 16,
                },
              },
            },
            title: {
              display: true,
              text: "Poll Results",
              font: {
                size: 20,
              },
            },
          },
          elements: {
            bar: {
              barThickness: 50, // Increase bar thickness
            },
          },
          categoryPercentage: 0.8, // Increase bar width
        }}
      />
    </div>
  );
};

export default PollLeaderboard;