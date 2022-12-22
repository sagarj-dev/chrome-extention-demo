const ProductPageHTML = `
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

const productpageListeners = (activeTab) => {
  document.getElementById("addToCartBtn")?.addEventListener("click", () => {
    const value = document.getElementById("addToCartInput").value;
    chrome.tabs.sendMessage(activeTab.id, {
      type: "addToCartInput",
      value: value,
    });
  });
  document.getElementById("goToCheckout")?.addEventListener("click", () => {
    chrome.tabs.sendMessage(activeTab.id, {
      type: "goToCheckout",
    });
    window.close();
  });
};
