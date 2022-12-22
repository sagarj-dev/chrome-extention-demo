(() => {
  console.log("Login script loaded");
  function reactJSSetValue(elm, value) {
    elm.value = value;
    elm.defaultValue = value;
    elm.dispatchEvent(
      new Event("input", { bubbles: true, target: elm, data: value })
    );
  }
  const usernameField = document.getElementById("user-name");
  reactJSSetValue(usernameField, "standard_user");
  const passwordField = document.getElementById("password");
  reactJSSetValue(passwordField, "secret_sauce");
  const loginButton = document.getElementById("login-button");

  loginButton.click();

  //////////////////////////////////////
  ///// FOR INVENTORY PAGE ACTIONS ////
  ////////////////////////////////////

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    console.log("msg received");

    const { type, value } = obj;

    if (type === "addToCartInput") {
      document.querySelectorAll(".inventory_item button")[value - 1].click();
    }
    if (type === "goToCheckout") {
      document.getElementsByClassName("shopping_cart_link")[0].click();
      document.getElementById("checkout").click();
    }
    if (type === "checkout") {
      reactJSSetValue(document.getElementById("first-name"), value.firstName);
      reactJSSetValue(document.getElementById("last-name"), value.lastName);
      reactJSSetValue(document.getElementById("postal-code"), value.zipCode);

      // document.getElementsByClassName("shopping_cart_link")[0].click();
      document.getElementById("continue").click();
      document.getElementById("finish").click();
    }
  });
})();
