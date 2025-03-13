let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    name: "Beige Sofa",
    tag: "Sofa-1",
    price: 1099,
    inCart: 0,
  },
  {
    name: "Navy Sofa",
    tag: "Sofa-2",
    price: 1599,
    inCart: 0,
  },
  {
    name: "Leather Sofa",
    tag: "Sofa-3",
    price: 1699,
    inCart: 0,
  },
  {
    name: "Brown Sofa",
    tag: "Sofa-4",
    price: 1699,
    inCart: 0,
  },
  {
    name: "Grey Sofa",
    tag: "Sofa-5",
    price: 1599,
    inCart: 0,
  },
  {
    name: "White Sofa",
    tag: "Sofa-6",
    price: 1299,
    inCart: 0,
  },
  {
    name: "Orange Sofa",
    tag: "Sofa-7",
    price: 1399,
    inCart: 0,
  },
  {
    name: "Pink Sofa",
    tag: "Sofa-8",
    price: 1099,
    inCart: 0,
  },
  {
    name: "Coffee Sofa",
    tag: "Sofa-9",
    price: 1299,
    inCart: 0,
  },
  {
    name: "Dark Sofa",
    tag: "Sofa-10",
    price: 1299,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".pCache");
  let cartCost = localStorage.getItem("totalCost");
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
<div class="product">
    <ion-icon name="close-circle"></ion-icon>
    <img src="./img/${item.tag}.jpg">
    <span>${item.name}</span>
</div>
<div class="pPrice">$${item.price}.00</div>
<div class="pQuantity">
<ion-icon class="decrease" name="arrow-back-circle"></ion-icon>
<span>${item.inCart}</span>
<ion-icon class="increase" name="arrow-forward-circle"></ion-icon>
</div>
<div class="pTotal">
$${item.inCart * item.price}.00
</div>
`;
    });

    productContainer.innerHTML += `
    <div class="basketTotalContainer">
    <h4 class="basketTotalTitle">
    Basket Total
    </h4>
    <h4 class="basketTotal">
    $${cartCost}.00
    </h4>
    `;
  }
}

onLoadCartNumbers();
displayCart();
