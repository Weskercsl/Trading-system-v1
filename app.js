function getScore(input) {
  let score = 0;

  if (input.maSlope === "up") score += 20;
  if (input.maSlope === "down") score -= 20;

  if (input.rsi >= 50 && input.rsi <= 65) score += 15;
  if (input.rsi > 70) score -= 10;
  if (input.rsi < 40) score -= 10;

  if (input.obvSlope === "up") score += 25;
  if (input.obvSlope === "down") score -= 25;

  if (input.mfi > 60) score += 10;
  if (input.mfi < 40) score -= 10;

  return score;
}

function getRegime(input) {
  if (input.maSlope === "flat") return "Range";
  if (input.maSlope === "up" && input.obvSlope === "up") return "Trend";
  if (input.maSlope === "down") return "Risk-off";
  return "Mixed";
}

function run() {
  const input = {
    rsi: Number(document.getElementById("rsi").value),
    mfi: Number(document.getElementById("mfi").value),
    maSlope: document.getElementById("maSlope").value,
    obvSlope: document.getElementById("obvSlope").value
  };

  const score = getScore(input);
  const regime = getRegime(input);

  let trade = score >= 60;

  document.getElementById("output").innerText =
    `Regime: ${regime}\nScore: ${score}\nTrade: ${trade}`;
}
