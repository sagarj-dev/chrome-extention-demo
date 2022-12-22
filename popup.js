async function getCurrentURL() {
  let query = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(query);

  return tab;
}

document.addEventListener("DOMContentLoaded", async () => {
  let activeTab = await getCurrentURL();
  console.log(activeTab.url);
  let body = document.getElementsByClassName("container")[0];
  switch (activeTab.url) {
    case "https://www.saucedemo.com/":
      body.innerHTML = '<button class="btn btn-primary">Login</button>';
      break;

    case "https://www.saucedemo.com/inventory.html":
      body.innerHTML = `
      <div class="productpage">
      <input
        type="number"
        class="form-control"
        id="addToCartInput"
        placeholder="Add Product Number"
      />
      <div class="productpageButtons">
        <button class="btn btn-primary" id="addToCartBtn">Add to cart</button>
        <button class="btn btn-danger" id="goToCheckout">Checkout</button>
      </div>
          `;
      document.getElementById("addToCartBtn").addEventListener("click", () => {
        const value = document.getElementById("addToCartInput").value;
        chrome.tabs.sendMessage(activeTab.id, {
          type: "addToCartInput",
          value: value,
        });
      });
      document.getElementById("goToCheckout").addEventListener("click", () => {
        chrome.tabs.sendMessage(activeTab.id, {
          type: "goToCheckout",
        });
        window.close();
      });
      break;
    case "https://www.saucedemo.com/checkout-step-one.html":
      body.innerHTML = `
      <div class="checkoutPage">
      <input
        type="text"
        class="form-control"
        id="firstName"
        placeholder="First Name"
      />
      <input
        type="text"
        class="form-control"
        id="lastName"
        placeholder="Last Name"
      />
      <input
        type="text"
        class="form-control"
        id="zipCode"
        placeholder="Zip Code"
      />
        <button class="btn btn-primary" id="finishCheckoutButton">Checkout</button>
      </div>
          `;
      document
        .getElementById("finishCheckoutButton")
        .addEventListener("click", () => {
          const firstName = document.getElementById("firstName").value;
          const lastName = document.getElementById("lastName").value;
          const zipCode = document.getElementById("zipCode").value;
          chrome.tabs.sendMessage(activeTab.id, {
            type: "checkout",
            value: { firstName, lastName, zipCode },
          });
          window.close();
        });
      break;

    default:
      break;
  }
});
