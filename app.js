function safeNum(v) {
  let n = Number(v);
  if (isNaN(n)) return 0;
  return n;
}

function getRegime(ma, obv) {
  if (ma === "up" && obv === "up") return "TREND_UP";
  if (ma === "down" && obv === "down") return "RISK_OFF";
  if (ma === "flat") return "RANGE";
  return "MIXED";
}

function getScore(rsi, mfi, ma, obv) {
  let score = 50; // base

  // Trend
  if (ma === "up") score += 15;
  if (ma === "down") score -= 15;

  // OBV (very important)
  if (obv === "up") score += 20;
  if (obv === "down") score -= 20;

  // RSI (momentum)
  if (rsi >= 50 && rsi <= 65) score += 10;
  if (rsi > 70) score -= 10;
  if (rsi < 40) score -= 10;

  // MFI (flow pressure)
  if (mfi > 60) score += 10;
  if (mfi < 40) score -= 10;

  return Math.max(0, Math.min(100, score));
}

function getConflict(ma, obv, rsi) {
  let c = 0;

  if (ma === "up" && obv === "down") c++;
  if (ma === "down" && obv === "up") c++;
  if (rsi > 70 && obv === "down") c++;

  return c;
}

function getPosition(score, account) {
  let risk = account * 0.01;

  let factor = 1;

  if (score < 60) factor = 0;
  else if (score < 75) factor = 0.5;
  else if (score < 85) factor = 1;
  else factor = 1.2;

  return risk * factor;
}

function run() {

  let rsi = safeNum(document.getElementById("rsi").value);
  let mfi = safeNum(document.getElementById("mfi").value);
  let ma = document.getElementById("maSlope").value;
  let obv = document.getElementById("obvSlope").value;
  let account = safeNum(document.getElementById("account").value);

  let regime = getRegime(ma, obv);
  let score = getScore(rsi, mfi, ma, obv);
  let conflict = getConflict(ma, obv, rsi);
  let position = getPosition(score, account);

  let trade = score >= 60 && conflict < 2;

  document.getElementById("output").innerText =
`REGIME: ${regime}
SCORE: ${score}
CONFLICT: ${conflict}
TRADE: ${trade ? "YES" : "NO"}
POSITION SIZE: ${position.toFixed(2)}`;
}
