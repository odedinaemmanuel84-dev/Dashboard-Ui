// script.js

// SIDEBAR TOGGLE

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

// open/close sidebar
menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

// close sidebar when clicking outside (mobile UX)
document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 992 &&
    !sidebar.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    sidebar.classList.remove("show");
  }
});

// THEME TOGGLE

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  const icon = themeToggle.querySelector("i");

  if(document.body.classList.contains("light-mode")){
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
});

// CHARTS

const lineCtx = document.getElementById("lineChart");

new Chart(lineCtx, {
  type: "line",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul"
    ],
    datasets: [{
      label: "Revenue",
      data: [12,19,15,25,22,30,40],
      borderColor: "#4f46e5",
      backgroundColor: "rgba(79,70,229,0.2)",
      tension: 0.4,
      fill: true,
      pointRadius: 4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#9ca3af"
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: "#9ca3af"
        },
        grid: {
          color: "rgba(255,255,255,0.05)"
        }
      },
      x: {
        ticks: {
          color: "#9ca3af"
        },
        grid: {
          display: false
        }
      }
    }
  }
});

const doughnutCtx = document.getElementById("doughnutChart");

new Chart(doughnutCtx, {
  type: "doughnut",
  data: {
    labels: [
      "Social",
      "Direct",
      "Email",
      "Organic"
    ],
    datasets: [{
      data: [35,25,20,20],
      backgroundColor: [
        "#4f46e5",
        "#3b82f6",
        "#8b5cf6",
        "#10b981"
      ],
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#9ca3af"
        }
      }
    }
  }
});
