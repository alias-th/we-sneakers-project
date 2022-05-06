// card product
// dummy data
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const dummyProducts = [
  {
    image: "../images/product-1.jpg",
    title: "Vans-1",
    price: 3000,
    inCart: 0,
  },
  {
    image: "../images/product-2.jpg",
    title: "Vans-2",
    price: 3500,
    inCart: 0,
  },
  {
    image: "../images/product-3.jpg",
    title: "New Balance-1",
    price: 3200,
    inCart: 0,
  },
  {
    image: "../images/product-4.jpg",
    title: "New Balance-2",
    price: 3700,
    inCart: 0,
  },
  {
    image: "../images/product-5.jpg",
    title: "Nike-1",
    price: 4000,
    inCart: 0,
  },
  {
    image: "../images/product-6.jpg",
    title: "Nike-2",
    price: 4000,
    inCart: 0,
  },
  {
    image: "../images/product-7.jpg",
    title: "Nike-3",
    price: 4500,
    inCart: 0,
  },
  {
    image: "../images/product-8.jpg",
    title: "Converse-1",
    price: 4300,
    inCart: 0,
  },
  {
    image: "../images/product-9.jpg",
    title: "New Balance-3",
    price: 4100,
    inCart: 0,
  },
  {
    image: "../images/product-10.jpg",
    title: "Vans-3",
    price: 2000,
    inCart: 0,
  },
];

// Add product list to page
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
dummyProducts.forEach((card) => {
  // จับ DOM
  const cardContainer = document.getElementById("card-container");
  // if contain cardContainer do this
  if (cardContainer) {
    // create cardDiv (div)
    const cardDiv = document.createElement("div");
    // add class
    cardDiv.classList.add("col-lg-3");
    cardDiv.classList.add("col-md-4");
    cardDiv.classList.add("col-sm-6");
    cardDiv.classList.add("col-xs-12");
    // add content each product
    cardDiv.innerHTML = `       
    <div class="card" style="min-width: 15rem;
    min-height:29rem;">
    <img
    src="${card.image}"
    class="card-img-top  img-card"
    alt="..."
    />
    <div class="card-body d-flex flex-column justify-content-between" >
    <h5 class="card-title">${card.title}</h5>
    <p class="card-text">
    Some quick example text to build on the card title and
    make up the bulk of the card's content.
    </p>
    <p class="card-text">${card.price} บาท</p>
    <div class="d-flex justify-content-between">
    <a href="./product-details.html" class="btn btn-light">ดูรายละเอียด</a>
    <button class="btn btn-dark add-cart">เพิ่มลงตะกร้า</button>
    </div>
    </div>
    </div>
    `;
    // add div to container
    cardContainer.appendChild(cardDiv);
  } else {
    // if not contain cardContainer return this function
    return;
  }
});

// shopping-cart
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// select all class the add-cart
const addToCartBtn = document.querySelectorAll(".add-cart");
// console.log(addToCartBtn); -> NodeList

// loop i = 0 if i < addToCartBtn.length do i++
for (let i = 0; i < addToCartBtn.length; i++) {
  // add event to each addToCartBtn
  addToCartBtn[i].addEventListener("click", () => {
    addCartNumbers(dummyProducts[i]);
    totalCost(dummyProducts[i]);
  });
}

// load cartNumbers in local storage when come to page first time
function loadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart-number").textContent = productNumbers;
  } else {
    return;
  }
}

function addCartNumbers(product) {
  // console.log(product); -> each product that is clicked
  // get cartNumbers in local storage and parse to int
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  // if have productNumbers in local storage
  if (productNumbers) {
    // set productNumbers + 1 when  the addToCartBtn is clicked
    localStorage.setItem("cartNumbers", productNumbers + 1);
    // add textContent to DOM
    document.querySelector(".cart-number").textContent = productNumbers + 1;
  } else {
    // if NOT have productNumbers in local storage
    // set cartNumbers = 1
    localStorage.setItem("cartNumbers", 1);
    // add textContent to DOM
    document.querySelector(".cart-number").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  // get productsInCart
  let cartItems = localStorage.getItem("productsInCart");
  // parse to obj
  cartItems = JSON.parse(cartItems);
  // if have cartItems
  if (cartItems) {
    // cartItems[product.title] not equal undefined
    if (cartItems[product.title] === undefined) {
      cartItems = {
        // copy previous cartItems(obj)
        ...cartItems,
        // set new product
        [product.title]: product,
      };
    }
    // increase inCart
    cartItems[product.title].inCart += 1;
  } else {
    // if not have cartItems
    // set inCart
    product.inCart = 1;
    // set cartItems
    cartItems = {
      [product.title]: product,
    };
  }

  // set productsInCart to local storage -> obj to json
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  // get totalCost
  let cartCost = localStorage.getItem("totalCost");
  // if have cartCost
  if (cartCost) {
    // parse to int
    cartCost = parseInt(cartCost);
    // set totalCost to local storage
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    // if not have totalCost set to local storage
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  //  get productsInCart
  let cartItems = localStorage.getItem("productsInCart");
  //  parse to obj
  cartItems = JSON.parse(cartItems);
  // select DOM
  const cartContainer = document.querySelector(".cart-container");
  // if have
  if (cartItems && cartContainer) {
    // console.log(cartItems);
    // parse obj to array[{obj},{obj}]
    const cartItemsArray = Object.values(cartItems);
    cartItemsArray.forEach((product) => {
      // create div
      const productDiv = document.createElement("div");
      // add class
      productDiv.classList.add("row");
      productDiv.classList.add("mb-4");
      productDiv.classList.add("d-flex");
      productDiv.classList.add("justify-content-between");
      productDiv.classList.add("align-items-center");
      // add html
      productDiv.innerHTML = `<div class="col-md-2 col-lg-2 col-xl-2">
      <img
        src=${product.image}
        class="img-fluid rounded-3"
        alt="Cotton T-shirt"
      />
    </div>
    <div class="col-md-3 col-lg-3 col-xl-3">
      <h6 class="text-muted">Sneaker</h6>
      <h6 class="text-black mb-0">${product.title}</h6>
    </div>
    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
      <button
        class="btn btn-link px-2 decrease"
        onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
      >
        <i class="fas fa-minus"></i>
      </button>

      <input
        id="form1"
        min="0"
        name="quantity"
        value="${product.inCart}"
        type="number"
        class="form-control form-control-sm"
      />

      <button
        class="btn btn-link px-2 increase"
        onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
      >
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
      <h6 class="mb-0"> ${product.price} บาท</h6>
    </div>
    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
      <a href="#!" class="text-muted"
        ><i class="fas fa-times"></i
      ></a>
    </div>
    <hr class="my-4" />
      `;

      // add to container
      cartContainer.appendChild(productDiv);
    });

    // update total price and total items in cart page
    updateUI();
  }
}

// first time come to page
displayCart();
loadCartNumbers();

// increase and decrease items
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const increase = document.querySelectorAll(".increase");
const decrease = document.querySelectorAll(".decrease");

// helper function
function updateUI() {
  // get DOM
  const totalCost = localStorage.getItem("totalCost");
  const totalItems = document.querySelector(".total-items");
  const totalPrices = document.querySelector(".total-prices");
  const cartNumbers = document.querySelector(".cart-number");

  let totalItemsValue = 0;
  // get productsInCart
  let productsInCart = localStorage.getItem("productsInCart");
  // parse to obj
  productsInCart = JSON.parse(productsInCart);
  // parse to array
  productsInCart = Object.values(productsInCart);
  // loop over array
  productsInCart.forEach((item) => {
    //  +=
    totalItemsValue += item.inCart;
  });

  // add text
  cartNumbers.textContent = totalItemsValue;
  totalItems.textContent = `${totalItemsValue} ชิ้น`;
  totalPrices.textContent = `${totalCost} บาท`;
}

function decreaseTotalCost(product) {
  // get totalCost and cartNumbers
  let cartCost = localStorage.getItem("totalCost");
  let cartNumbers = localStorage.getItem("cartNumbers");
  // decrease cartNumber when btn is clicked
  cartNumbers--;

  // if have totalCost
  if (cartCost) {
    cartCost = parseInt(cartCost);
    // set new totalCost
    localStorage.setItem("totalCost", cartCost - product.price);
  }

  // if inCart < 0
  if (product.inCart < 1) {
    //  get productsInCart
    let productsInCart = localStorage.getItem("productsInCart");
    // parse to array
    productsInCart = JSON.parse(productsInCart);
    productsInCart = Object.values(productsInCart);
    // filter and set to local storage
    const newProduct = productsInCart.filter((item) => {
      // console.log(item.title);
      return item.title !== product.title;
    });

    localStorage.setItem("productsInCart", JSON.stringify(newProduct));
    // reload in order to display()
    window.location.reload();
  }
  // set cartNumbers
  localStorage.setItem("cartNumbers", cartNumbers);
}

// loop over increase btn
for (let i = 0; i < increase.length; i++) {
  // add event
  increase[i].addEventListener("click", () => {
    // get product
    let productsInCart = localStorage.getItem("productsInCart");
    // get cartNumber
    let cartNumbers = localStorage.getItem("cartNumbers");
    // parse to array
    productsInCart = JSON.parse(productsInCart);
    productsInCart = Object.values(productsInCart);
    // set total price
    totalCost(productsInCart[i]);
    // increase inCart
    productsInCart[i].inCart++;
    // increase cartNumbers
    cartNumbers++;
    // set to localStorage
    localStorage.setItem("cartNumbers", cartNumbers);
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
    // update text in cart page
    updateUI();
  });
}

// loop over decrease btn
for (let i = 0; i < decrease.length; i++) {
  // add event
  decrease[i].addEventListener("click", () => {
    // get and parse to array
    let productsInCart = localStorage.getItem("productsInCart");
    productsInCart = JSON.parse(productsInCart);
    productsInCart = Object.values(productsInCart);
    // decrease inCart
    productsInCart[i].inCart--;
    // if inCart > 0
    if (productsInCart[i].inCart > 0) {
      // set item to local storage
      localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
    }

    decreaseTotalCost(productsInCart[i]);
    updateUI();
  });
}
