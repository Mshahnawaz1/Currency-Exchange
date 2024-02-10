
const BASE_URL =
"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")
const reverse = document.querySelector(".reverse")

document.addEventListener('DOMContentLoaded', () => {
    updateExchange();
    fillOptions();

    // calculate the value for selected Curr
    btn.addEventListener('click' , (evt) =>{
        evt.preventDefault();
        updateExchange()    
    })
    
    // reverse the exchange countries
    reverse.addEventListener('click',() =>{
        let tmp = fromCurr.value
        fromCurr.value = toCurr.value
        toCurr.value = tmp

        updateFlag(fromCurr)
        updateFlag(toCurr)
    })
})

function fillOptions(){
    for (let select of dropdown){
      for (r in countryList){
        // console.log(r, countryList[r]);
        let newOption = document.createElement("option");
        // newOption.innerHTML = `<p>${r} <img class="option-flag" src="https://flagsapi.com/${countryList[r]}/flat/64.png"> </p>`
        newOption.innerText = r;
        
        if(select.name === "from" && r === "USD"){
            newOption.selected = "selected"
        }
        else if (select.name === "to" && r === "INR"){
            newOption.selected = "selected"
        } 
        select.append(newOption)
      }
        select.addEventListener("change", (evt) => {
            updateFlag(evt.target)
        });
    }
}

const updateFlag = (element) => {
    let currCode = element.value;
    console.log(currCode,countryList[currCode])
    let newlink = `https://flagsapi.com/${countryList[currCode]}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newlink;
}


// update the exchange value
const updateExchange =async ()=>{
    let amount = document.querySelector(".amount input");
    let amt = amount.value;
    console.log(amt)
    if(amt === "" || amt < 1 ){
        amt= 1;
        console.log("hello")
    }
    let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate= data[toCurr.value.toLowerCase()]
    console.log(rate)

    let totalAmount = (amt*rate).toFixed(2);
    msg.innerText = `${amt} ${fromCurr.value} is ${totalAmount} ${toCurr.value} `

}
