import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function () {
  // console.log("Finished loading...");
  update();
});

document.querySelector("form").addEventListener("submit", async function (event) {
  event.preventDefault();
  // console.log("Button get clicked");

  const button = event.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if(document.getElementById("input-amount").value.length){
    await dbank.topUp(inputAmount);
  }
  if(document.getElementById("withdrawal-amount").value.length){
    await dbank.withdrawal(outputAmount);
  }

  await dbank.compound();

  update();

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  button.removeAttribute("disabled", true);

});

async function update(){
  const currentAmount = (await dbank.checkBalance());
  document.getElementById("value").innerText = currentAmount.toFixed(2);
}