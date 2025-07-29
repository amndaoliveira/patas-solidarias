document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", () => {
      const isHidden =
        mobileMenu.style.display === "none" || mobileMenu.style.display === "";
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

  const chartData = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
    data: [850, 1100, 980, 1500, 1320, 1750],
  };

  const totalDonated = chartData.data.reduce((acc, value) => acc + value, 0);
  document.getElementById("total-donated").innerText = `${(
    totalDonated / 1000
  ).toFixed(1)}K kg`;

  const ctx = document.getElementById("impactChart");
  if (ctx) {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: "Doações (kg)",
            data: chartData.data,
            backgroundColor: "rgba(245, 158, 11, 0.6)",
            borderColor: "rgba(245, 158, 11, 1)",
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.parsed.y} kg`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "rgba(0, 0, 0, 0.05)" },
            ticks: {
              callback: function (value) {
                return value + " kg";
              },
            },
          },
          x: { grid: { display: false } },
        },
      },
    });
  }
});

function copyPixKey() {
  const pixKeyElement = document.getElementById("pix-key");
  const textToCopy = pixKeyElement.innerText;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      showFeedbackMessage();
    })
    .catch((err) => {
      console.error("Erro ao copiar a chave PIX: ", err);
    });
}

function showFeedbackMessage() {
  const feedbackMessage = document.getElementById("feedback-message");
  feedbackMessage.style.opacity = "1";
  feedbackMessage.style.transform = "translateY(0)";
  setTimeout(() => {
    feedbackMessage.style.opacity = "0";
    feedbackMessage.style.transform = "translateY(2.5rem)";
  }, 3000);
}

const checkbox = document.getElementById("toggle-theme");

const temaSalvo = localStorage.getItem("tema");
if (temaSalvo === "escuro") {
  document.body.classList.add("dark");
  checkbox.checked = true;
}

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    document.body.classList.add("dark");
    localStorage.setItem("tema", "escuro");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("tema", "claro");
  }
});
