const checkoutPageHTML = `
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

const checkoutPageListener = (activeTab) => {
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
};
