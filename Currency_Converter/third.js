// let BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let BASE_URL = " https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const count=document.querySelectorAll(".count select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for (code in countryList){
//     console.log(code,countryList[code]);
// }

for(let select of count){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }


    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
});
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let url =`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = url;
};

// btn.addEventListener("click", async (evt) => {
//     alert('ok')
    // evt.preventDefault();
    // let amount = document.querySelector(".amount input");
    // let amtval = amount.value;
    // if (amtval === "" || amtval < 1){
    //     amtval = 1;
    //     amount.value = "1";
    // }

    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    // let response = await fetch(URL);
    // let data = await response.json();
    // let rate = data[toCurr.value.toLowerCase()];

    // let finalamount = amtval * rate;
    // alert(finalamount)
    // msg.innerText = 'ram';


// });

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1){
        amtval = 1;
        amount.value = "1";
    }

    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    // let rate = data[toCurr.value.toLowerCase()];
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalamount = amtval * rate;
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
  });

