const dropdowns = document.querySelectorAll(".dropdown select");
const BASE_URL =
  " https://v6.exchangerate-api.com/v6/dd337baec30f759fd5faadbe/latest";
let msg=document.querySelector(".msg p");
let btn = document.querySelector("form button");
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault(); // prevent the form from being submitted
    getExchangeRate();
  });
  

const getExchangeRate = async () => {

  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  let amount = document.querySelector(".amount input");
  let fromCurrency = fromCurr.value;
  let toCurrency = toCurr.value;
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/dd337baec30f759fd5faadbe/latest/${fromCurrency}`
  );
  const data = await response.json();
  const conversionRate = data.conversion_rates[toCurrency];
    const convertedAmout = (conversionRate * amtval);
  
    msg.innerHTML= `${amount.value} ${fromCurrency} = ${convertedAmout} ${toCurrency}`;
    
};
window.addEventListener("load", () => {
  getExchangeRate();
});
