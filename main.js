//
//
//
let tweetButton = document.querySelector("#btn-tweet");
let getTitleName = document.querySelector(".input-title");
let getTweetDescipt = document.querySelector("#tweetDesc");
let getTweetContainer = document.querySelector(".tweetContainer");
let getTweetPrice = document.querySelector(".tw-input-txt3");
let tweetDesc = document.querySelector("#tweetDesc");
let wordCount = document.querySelector(".wordCount");
let products = localStorage.getItem("storeProducts")
  ? JSON.parse(localStorage.getItem("storeProducts"))
  : [];

function addProductToStorage(product) {
  let products;
  if (localStorage.getItem("storeProducts")) {
    products = JSON.parse(localStorage.getItem("storeProducts"));
    //update and add the new Product
    products.push(product);
  } else {
    products = [];
    products.push(product);
  }
  localStorage.setItem("storeProducts", JSON.stringify(products));
}

function addProduct(titleName, tweetDescipt, tweetPrice) {
  let products = [];
  const product = {
    id: products.length + 1,
    titleName,
    tweetDescipt,
    tweetPrice,
    date: new Date().toLocaleString().split(",")[0],
  };

  //memory data store
  products.push(product);
  console.log(product);
  //add product info to UI
  //add data to localStorage
  addProductToStorage(product);
  return showProductToUI(product);
}
function receiveInputs() {
  const titleName = getTitleName.value;
  const tweetDescipt = getTweetDescipt.value;
  const tweetPrice = getTweetPrice.value;
  return { titleName, tweetDescipt, tweetPrice };
}
function getFormData(tweetEvent) {
  tweetEvent.preventDefault();
  const { titleName, tweetDescipt, tweetPrice } = receiveInputs();
  console.log(titleName, tweetDescipt, tweetPrice);
  addProduct(titleName, tweetDescipt, tweetPrice);
}
//
//
function showProductToUI(productInfo) {
  console.log(productInfo);
  //Remove not found Product message on adding new Product

  //const { id, name, price } = productInfo;
  const elm = `<div class="tweet-list" data-productId="${productInfo.id}"> 
  <div class="tweetDate">Date:${productInfo.date}</div>
  <div class="utitlity">
    <a href=""><i class="icofont-ui-edit"></i></a>
   <i class="icofont-ui-delete delete-product"></i>
   
  </div>
  <h2> ${productInfo.titleName} </h2>
  <p>
  ${productInfo.tweetDescipt}
  </p>
  <p>
    <strong><span class="color-black">Price:</span></strong>${productInfo.tweetPrice}
  </p>
</div>`;

  getTweetContainer.insertAdjacentHTML("afterbegin", elm);
  //showMessage("Product Added SuccessFully");
}
//console.log(addProduct);

function showAllProductsToUI(products) {
  //clear Existing content form collectionElm/ul
  getTweetContainer.textContent = "";
  let liElms;

  liElms =
    products.length === 0
      ? '<p class="list-group-item collection-item not-found-product">NO Products to Show</p>'
      : "";
  //sorting product in descending order
  products.sort((a, b) => b.id - a.id);

  products.forEach((product) => {
    const { id, name, price } = product;
    liElms += `<div class="tweet-list" data-productId="${product.id}">
    <div class="tweetDate">Date:${product.date}</div>
    <div class="utitlity">
      <a href=""><i class="icofont-ui-edit"></i></a>
      <i class="icofont-ui-delete delete-product"></i>
      
    </div>
    <h2> ${product.titleName} </h2>
    <p>
    ${product.tweetDescipt}
    </p>
    <p>
      <strong><span class="color-black">Price:</span></strong>${product.tweetPrice}
    </p>
  </div>`;
  });
  getTweetContainer.insertAdjacentHTML("afterbegin", liElms);
}

function getProductId(evt) {
  const liElm = evt.target.parentElement.parentElement;
  const id = Number(liElm.getAttribute("data-productid"));
  return id;
}

function removeItem(id) {
  products = products.filter((product) => product.id !== id);
}

function removeItemFromUI(id) {
  document.querySelector(`[data-productid="${id}"]`).remove();
  showMessage("Product Deleted Successfully", "warning");
}

function removeProductFromStorage(id) {
  let products;
  products = JSON.parse(localStorage.getItem("storeProducts"));
  products = products.filter((product) => product.id !== id);
  localStorage.setItem("storeProducts", JSON.stringify(products));
}
tweetButton.addEventListener("click", getFormData);

function handleManipulateProduct(evt) {
  const id = getProductId(evt);

  if (evt.target.classList.contains("delete-product")) {
    //get the product Id
    //remove product from data store
    removeItem(id);
    //remove item form localStorage
    removeProductFromStorage(id);

    //remove product from UI
    removeItemFromUI(id);
  } else if (evt.target.classList.contains("edit-product")) {
    //finding the product
    const foundProduct = findProduct(id);
    console.log(foundProduct);
    //populating existing form in edit state
    populateEditForm(foundProduct);
  }
}
showAllProductsToUI(products);
getTweetContainer.addEventListener("click", handleManipulateProduct);

tweetDesc.addEventListener("input", function () {
  let tweetDescdata = tweetDesc.value.trim();
  wordCount.textContent = tweetDescdata
    .split(/\s+/)
    .filter((item) => item).length;

  let totalWord = tweetDescdata.split(/\s+/).filter((item) => item).length;

  if (totalWord > 10) {
    alert("you cross the limit");
    tweetDesc.setAttribute("disabled", "");
  }
});
