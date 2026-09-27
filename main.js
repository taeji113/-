const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

const amountInput = document.querySelector("#amount");
const fromCurrency = document.querySelector("#from-currency");
const toCurrency = document.querySelector("#to-currency");
const convertButton = document.querySelector("#convert-button");
const swapButton = document.querySelector("#swap-btn");
const result = document.querySelector("#result");

async function convertCurrency() {
  const amount = Number(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amountInput.value || !Number.isFinite(amount) || amount < 0) {
    result.textContent = "금액을 입력하세요.";
    return;
  }

  result.textContent = "환율을 불러오는 중입니다.";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("환율 정보를 불러오지 못했습니다.");
    }

    const data = await response.json();
    const fromRate = from === "USD" ? 1 : data.rates[from];
    const toRate = to === "USD" ? 1 : data.rates[to];
    const convertedAmount = amount * (toRate / fromRate);

    result.textContent = `${amount.toLocaleString()} ${from} = ${convertedAmount.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })} ${to}`;
  } catch (error) {
    result.textContent = "환율 정보를 불러오지 못했습니다.";
  }
}

convertButton.addEventListener("click", convertCurrency);

swapButton.addEventListener("click", () => {
  const currentFrom = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = currentFrom;

  if (amountInput.value) {
    convertCurrency();
  }
});
