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

// ===============================
// REAL-TIME DASHBOARD ENGINE
// ===============================

// LIVE STATS
const revenueEl = document.querySelector(".stat-card h3");
const userEl = document.querySelectorAll(".stat-card h3")[1];
const salesEl = document.querySelectorAll(".stat-card h3")[2];
const perfEl = document.querySelectorAll(".stat-card h3")[3];

function randomChange(base, variance) {
  return Math.floor(base + (Math.random() - 0.5) * variance);
}

setInterval(() => {
  // simulate real-time KPI updates
  revenueEl.textContent = `$${randomChange(48920, 2000)}`;
  userEl.textContent = `${randomChange(12400, 300)}K`;
  salesEl.textContent = `${randomChange(3240, 120)}`;
  perfEl.textContent = `${randomChange(89, 5)}%`;

  addActivity("Live system update received");
}, 3000);

// ===============================
// LIVE ACTIVITY FEED
// ===============================

const activityContainer = document.querySelector(".widget .activity-item").parentElement;

function addActivity(text) {
  const item = document.createElement("div");
  item.className = "activity-item";

  item.innerHTML = `
    <div class="dot"></div>
    <p>${text}</p>
  `;

  activityContainer.prepend(item);

  // keep only latest 5 items
  if (activityContainer.children.length > 5) {
    activityContainer.removeChild(activityContainer.lastChild);
  }
}

// initial fake stream
setInterval(() => {
  const logs = [
    "New user signed up",
    "Payment processed",
    "Server sync completed",
    "Analytics updated",
    "New order received"
  ];

  const randomLog = logs[Math.floor(Math.random() * logs.length)];
  addActivity(randomLog);

}, 4000);

// ===============================
// LIVE CHART UPDATES
// ===============================

const lineChart = Chart.getChart("lineChart");

setInterval(() => {
  if (!lineChart) return;

  lineChart.data.datasets[0].data.shift();
  lineChart.data.datasets[0].data.push(Math.floor(Math.random() * 50 + 10));

  lineChart.update();
}, 2500);

// ===============================
// NOTIFICATION SYSTEM
// ===============================

function showToast(message) {
  const toast = document.createElement("div");

  toast.style.position = "fixed";
  toast.style.top = "20px";
  toast.style.right = "20px";
  toast.style.background = "#4f46e5";
  toast.style.color = "#fff";
  toast.style.padding = "12px 18px";
  toast.style.borderRadius = "12px";
  toast.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
  toast.style.zIndex = "9999";
  toast.style.animation = "fadeIn 0.3s ease";

  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// trigger notifications
setInterval(() => {
  const messages = [
    "New user joined dashboard",
    "Revenue updated",
    "System sync completed",
    "New transaction detected"
  ];

  showToast(messages[Math.floor(Math.random() * messages.length)]);
}, 7000);

// ===============================
// ADD CSS ANIMATION (inject)
// ===============================

const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");

navItems.forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    // remove active from all menu items
    navItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const target = item.getAttribute("data-page");

    // hide all pages
    pages.forEach(page => page.classList.remove("active"));

    // show selected page
    document.getElementById(target + "Page").classList.add("active");

    // close sidebar on mobile
    sidebar.classList.remove("show");
  });
});
