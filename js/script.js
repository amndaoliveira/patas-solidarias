document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const themeToggleButton = document.getElementById("themeToggle");
  let impactChartInstance = null;

  // Função para alternar o menu mobile
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", () => {
      const isHidden = mobileMenu.style.display === "none" || mobileMenu.style.display === "";
      mobileMenu.style.display = isHidden ? "block" : "none";
    });
  }

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Obrigado pelo seu contato! Mensagem enviada com sucesso.");
      form.reset();
    });
  }

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      themeToggleButton.textContent = "☀️";
    } else {
      document.documentElement.classList.remove("dark");
      themeToggleButton.textContent = "🌙";
    }
  };

  window.toggleTheme = () => {
    const currentTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
    applyTheme(currentTheme);
    renderChart();
  };

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
  
  const chartData = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
    data: [850, 1100, 980, 1500, 1320, 1750],
  };

  const totalDonated = chartData.data.reduce((acc, value) => acc + value, 0);
  const totalDonatedEl = document.getElementById("total-donated");
  if (totalDonatedEl) {
    totalDonatedEl.innerText = `${(totalDonated / 1000).toFixed(1)}K kg`;
  }
  
  function getChartOptions() {
    const isDarkMode = document.documentElement.classList.contains("dark");
    const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)";
    const textColor = isDarkMode ? "#f9fafb" : "#374151";
    const barColor = isDarkMode ? "rgba(251, 191, 36, 0.7)" : "rgba(245, 158, 11, 0.6)";
    const barBorderColor = isDarkMode ? "#fbbf24" : "#d97706";

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `${context.dataset.label}: ${context.parsed.y} kg`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            callback: (value) => value + " kg",
          },
        },
        x: {
          grid: { display: false },
          ticks: { color: textColor },
        },
      },
      datasets: [{
        label: "Doações (kg)",
        data: chartData.data,
        backgroundColor: barColor,
        borderColor: barBorderColor,
        borderWidth: 1,
        borderRadius: 4,
      }],
    };
  }

  function renderChart() {
    const ctx = document.getElementById("impactChart");
    if (!ctx) return;

    if (impactChartInstance) {
      impactChartInstance.destroy();
    }

    const options = getChartOptions();
    impactChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartData.labels,
        datasets: options.datasets,
      },
      options: options,
    });
  }

  renderChart();
});

// Função para copiar a chave PIX
function copyPixKey() {
  const pixKeyElement = document.getElementById("pix-key");
  const textToCopy = pixKeyElement.innerText;
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert("Chave PIX copiada!");
  }).catch((err) => {
    console.error("Erro ao copiar a chave PIX: ", err);
  });
}