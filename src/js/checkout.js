import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

document.querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrderTotal.bind(myCheckout));

document.querySelector("#checkoutSubmit").addEventListener("click", (event) => {
  event.preventDefault();

  myCheckout.checkout();
});