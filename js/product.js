const queryString = document.location.search;
const parameters = new URLSearchParams(queryString);
const id = parameters.get("id");
const productContainer = document.querySelector(".product-container");

const url = "https://haris13.site/RainyDays/wp-json/wc/store/products/" + id;

async function getProduct(url) {
  const response = await fetch(url);
  const product = await response.json();
  console.log(product);

  productContainer.innerHTML = `<h1 id="yellow-text">${product.name}</h1>
                                <div class="image-container">
                                <img src="${product.images[0].src}" alt="Product photo ${product.name}"/>
                                <div class="product-text">
                                <p>S / M / L</p>
                                <p>kr. ${product.prices.price},-</p>
                                </div>
                                </div>
                                <div class="buynow-cta">
                                <a href="checkoutyellow.html"> Buy now</a>
                                <p class="buynow-cta__text">Free shipping</p>
                                </div>

                                <section class="textbox">
                                    <h2>Description</h2>
                                    ${product.description}
                                    ${product.short_description}
                                </section>`;
}
getProduct(url);
