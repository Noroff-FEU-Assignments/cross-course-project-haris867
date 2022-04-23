// API call

const url = "https://haris13.site/RainyDays/wp-json/wc/store/products";
const productsContainer = document.querySelector(".featured");

async function getProducts(url) {
  const response = await fetch(url);
  const products = await response.json();
  products.forEach(function (product) {
    productsContainer.innerHTML += `<div class="featured-product" data-id="${product.id}">
                                      <a href="productpage.html?id=${product.id}">
                                      <img src="${product.images[0].src}" alt="Photo of person wearing ${product.name}">
                                      <div class="product-text">
                                      <p class="product-text__name"><b>${product.name}</b></p>
                                      <p class="product-text__price">kr. ${product.prices.price},-</p>
                                      </div>
                                      </a>
                                      <div class="featured-buttons">
                                      <div class="buy-button">
                                      <a href="black.html"><button class="product-buy">Buy</button></a>
                                      </div>

                                      <div class="cart-button">
                                      <button class="product-cart">Add to cart</button>
                                      </div>
                                      </div>
                                      </div>`;
  });
  const cartButton = document.querySelectorAll(".cart-button button");
  const featured = document.querySelectorAll(".featured-product");
  const cartButtonDiv = document.querySelectorAll(".product-cart");
  const cartIcon = document.querySelector(".cart-icon i");
  const cart = document.querySelector(".cart");
  const cartContainer = document.querySelector(".cart-container");
  const cartText = document.querySelector(".added");

  cartButtonDiv.innerHTML = "Add to cart";

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
}

try {
  getProducts(url);
} catch (error) {
  productsContainer.innerHTML = "An error has occurred";
}

// Search function

const searchButton = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");

searchButton.onclick = function () {
  console.log(searchInput);

  const searchUrl = url + `?search=${searchInput.value}`;
  productsContainer.innerHTML = "";
  getProducts(searchUrl);
};

searchInput.onkeyup = function (event) {
  console.log(event);
  if (event.keyCode === 13) {
    searchButton.click();
  }
};

// Category filters

const categories = document.querySelectorAll(".radio-buttons");

categories.forEach(function (category) {
  category.onclick = function (event) {
    let newUrl;
    const category = event.target.value;
    newUrl = url + `?category=${category}`;
    productsContainer.innerHTML = "";
    getProducts(newUrl);
  };
});

// Sort by price

const sorter = document.querySelector(".dropdown select");
const sortedUrl = url + `?orderby=price`;

console.log(sortedUrl);

async function getSortedData(url) {
  const result = await fetch(url);
  const data = await result.json();
  const reversedArray = data.reverse();

  function sortByLowest() {
    reversedArray.forEach(function (product) {
      productsContainer.innerHTML += `<div class="featured-product" data-id="${product.id}">
                                      <a href="productpage.html?id=${product.id}">
                                      <img src="${product.images[0].src}" alt="Photo of person wearing ${product.name}">
                                      <div class="product-text">
                                      <p class="product-text__name"><b>${product.name}</b></p>
                                      <p class="product-text__price">kr. ${product.prices.price},-</p>
                                      </div>
                                      </a>
                                      <div class="featured-buttons">
                                      <div class="buy-button">
                                      <a href="black.html"><button class="product-buy">Buy</button></a>
                                      </div>

                                      <div class="cart-button">
                                      <button class="product-cart">Add to cart</button>
                                      </div>
                                      </div>
                                      </div>`;
    });
  }
  sortByLowest();
}

sorter.onchange = function (event) {
  if (event.target.value === "Price - high to low") {
    productsContainer.innerHTML = "";
    getProducts(sortedUrl);
  } else if (event.target.value === "Price - low to high") {
    productsContainer.innerHTML = "";
    getSortedData(sortedUrl);
  }
};

// Cart
