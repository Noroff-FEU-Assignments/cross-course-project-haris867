const checkoutContainer = document.querySelector(".checkout-summary");

function getAddedProducts() {
  const added = localStorage.getItem("added");

  if (added === null) {
    return [];
  } else {
    return JSON.parse(added);
  }

  console.log(added);
}

getAddedProducts();

const products = getAddedProducts();

console.log(products);

if (products.length === 0) {
  checkoutContainer.innerHTML = `<hr><p class="empty-cart">Your cart is empty</p><hr>`;
}

products.forEach((product) => {
  checkoutContainer.innerHTML += `<a href="productpage.html?id=${product.id}">
                                    <img src="${product.image}" alt="Product photo ${product.name}">
                                    </a>
        
                                    <p>${product.name}</p>
                                    <p>kr. ${product.price},-</p>

                                    
                                    <hr>`;
});

const totalPrice = document.querySelector(".subtotal__price");

const totalOfPrices = addPrices();

function addPrices() {
  return 999 * products.length;
}

totalPrice.innerHTML = totalOfPrices;

// Form validation

const errorMessage = document.querySelector(".error-message");

const firstNameError = document.querySelector(".first-name-error");
const firstNameInput = document.querySelector(".first-name-input");

const lastNameError = document.querySelector(".last-name-error");
const lastNameInput = document.querySelector(".last-name-input");

const countryError = document.querySelector(".country-error");
const countryInput = document.querySelector(".country-input");

const cityError = document.querySelector(".city-error");
const cityInput = document.querySelector(".city-input");

const addressError = document.querySelector(".address-error");
const addressInput = document.querySelector(".address-input");

const zipError = document.querySelector(".zip-error");
const zipInput = document.querySelector(".zip-input");

const emailError = document.querySelector(".email-error");
const emailInput = document.querySelector(".email-input");

const phoneError = document.querySelector(".phone-error");
const phoneInput = document.querySelector(".phone-input");

const successMessage = document.querySelector(".success-message");

const form = document.querySelector(".checkout-form");

function validateForm(event) {
  event.preventDefault();

  if (validateLength(firstNameInput.value, 0)) {
    firstNameError.style.display = "none";
  } else {
    firstNameError.style.display = "block";
  }

  if (validateLength(lastNameInput.value, 0)) {
    lastNameError.style.display = "none";
  } else {
    lastNameError.style.display = "block";
  }

  if (validateLength(countryInput.value, 3)) {
    countryError.style.display = "none";
  } else {
    countryError.style.display = "block";
  }

  if (validateLength(cityInput.value, 3)) {
    cityError.style.display = "none";
  } else {
    cityError.style.display = "block";
  }

  if (validateLength(addressInput.value, 5)) {
    addressError.style.display = "none";
  } else {
    addressError.style.display = "block";
  }
  if (validateLength(zipInput.value, 2)) {
    zipError.style.display = "none";
  } else {
    zipError.style.display = "block";
  }

  if (checkEmail(emailInput.value)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (validateLength(phoneInput.value, 5)) {
    phoneError.style.display = "none";
  } else {
    phoneError.style.display = "block";
  }

  if (
    validateLength(firstNameInput.value, 0) &&
    validateLength(lastNameInput.value, 0) &&
    validateLength(countryInput.value, 3) &&
    validateLength(cityInput.value, 3) &&
    validateLength(addressInput.value, 5) &&
    validateLength(zipInput.value, 2) &&
    validateLength(phoneInput.value, 5) &&
    checkEmail(emailInput.value)
  ) {
    successMessage.innerHTML = `<span>The form has been submitted!</span>`;
    form.reset();
  } else {
    successMessage.innerHTML = ``;
  }
}

form.addEventListener("submit", validateForm);

function validateLength(input, length) {
  if (input.trim().length > length) {
    return true;
  } else {
    return false;
  }
}

function checkEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const validEmail = regEx.test(email);
  return validEmail;
}
