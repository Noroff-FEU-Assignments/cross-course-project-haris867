const cartButton = document.querySelectorAll(".cart-button button");
const featured = document.querySelectorAll(".featured-product");
const cartButtonDiv = document.querySelectorAll(".product-cart");
const cartIcon = document.querySelector(".cart-icon i");
const cart = document.querySelector(".cart");
const cartContainer = document.querySelector(".cart-container");
const cartText = document.querySelector(".added");

cartButton.innerHTML = "Add to cart";

cartButton.forEach((button) => {
  button.addEventListener("click", handleClick);
});

function handleClick() {
  if (this.innerHTML === "Add to cart") {
    this.innerHTML = "Added to cart";
    this.style.padding = "5px 19px";
  } else {
    this.innerHTML = "Add to cart";
    this.style.padding = "5px 27px";
  }

  const id = this.parentElement.parentElement.parentElement.dataset.id;

  const currentCart = getAddedProducts();

  const alreadyAdded = currentCart.find(function (add) {
    return add.id === id;
  });

  const newCart = currentCart.filter((fav) => fav.id !== id);

  if (!alreadyAdded) {
    const thisProduct = { id };

    currentCart.push(thisProduct);

    addToCart(currentCart);
  } else {
    addToCart(newCart);
  }

  this.classList.toggle = "added";
}

function getAddedProducts() {
  const added = localStorage.getItem("added");

  if (added === null) {
    return [];
  } else {
    return JSON.parse(added);
  }

  console.log(added);
}

function addToCart(added) {
  localStorage.setItem("added", JSON.stringify(added));
}

cartIcon.onclick = function () {
  if (cart.style.display === "none") {
    cart.style.display = "block";
  } else {
    cart.style.display = "none";
  }
};
