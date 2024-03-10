let logo = document.getElementById('logo');
let hero = document.getElementById('hero');
let exploreBtn = document.getElementById('explore-btn');
let cardsList = document.getElementById('cards');
let info = document.querySelector('.info');
let cartIcon = document.querySelector('.fa-cart-shopping');
let cartContainer = document.getElementById('cart-container');
let closeBtn = document.getElementById('close-btn');
let checkOutBtn = document.getElementById('checkout-btn');
let cartCount = document.getElementById('cart-count');
let cartItems = document.getElementById('cart-items');

logo.addEventListener('click', () => {
  hero.scrollIntoView()
})

exploreBtn.addEventListener('click', () => {
  cardsList.scrollIntoView()
});

let books = [];

function displayBooks() {
  fetch('books.json')
  .then(response => response.json())
  .then(data => {
    books = data;
    data.forEach(book => {
      cardsList.innerHTML += `
      <div class="card" data-id="${book.id}">
        <img src="${book.image}">
        <p>${book.name}</p>
        <p>${book.author}</p>
        <div class="card-bottom">
          <p>${book.price} $</p>
          <button class="addCart">Add to cart</button>
        </div>
        <div class="info">
          <p class="info-btn">i</p>
          <p class="info-text">${book.info}.</p>
        </div>
      </div>
      `
    })
  })
}

displayBooks();

cardsList.addEventListener('click', (event) => {
  let positionClick = event.target;

  if (positionClick.classList.contains('addCart')) {
    let currentCount = +cartCount.innerHTML;
    cartCount.innerHTML = currentCount += 1;

    let productId = positionClick.parentElement.parentElement.dataset.id;
    let existingItem = cartItems.querySelector(`.item-container[data-id="${productId}"]`);
    let selectedBook = books.find(book => book.id == productId);

    if (existingItem) {
      let quantityElement = existingItem.querySelector(`.count-container p`);
      let currentQuantity = +quantityElement.innerHTML;
      currentQuantity += 1;
      quantityElement.innerHTML = currentQuantity;

      let priceElement = existingItem.querySelector(`.item-price`);
      let newPrice = selectedBook.price * currentQuantity;
      priceElement.innerHTML = `${newPrice} $`; 
    } else {
      cartItems.innerHTML += `
      <div class="item-container" data-id="${productId}">
        <img src="${selectedBook.image}" alt="">
        <p class="item-price">${selectedBook.price} $</p>
          <div class="count-container">
            <i class="fa-solid fa-chevron-left"></i>
            <p>1</p>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
      </div>
    `
    }
  } else if (positionClick.classList.contains('info')) {
    positionClick.classList.toggle('info-hover');
  }
})

cartIcon.addEventListener('click', () => {
  cartContainer.classList.toggle('invisible');
})

closeBtn.addEventListener('click', () => {
  cartContainer.classList.toggle('invisible');
})

cartItems.addEventListener('click', (event) => {
  let positionClick = event.target;
  
  if (positionClick.classList.contains('fa-chevron-right')) {
    let currentCount = +cartCount.innerHTML;
    cartCount.innerHTML = currentCount + 1;

    let productId = positionClick.parentElement.parentElement.dataset.id;
    let selectedItem = cartItems.querySelector(`.item-container[data-id="${productId}"]`);
    let selectedBook = books.find(book => book.id == productId);

    let countItem = selectedItem.querySelector('.count-container p');
    let itemCount = +countItem.innerHTML;
    let newCount = itemCount + 1;
    countItem.innerHTML = newCount;

    let priceElement = selectedItem.querySelector('.item-price');
    let newPrice = selectedBook.price * newCount;
    priceElement.innerHTML = `${newPrice} $`;
  } else if (positionClick.classList.contains('fa-chevron-left')) {
    let currentCount = +cartCount.innerHTML;
    let newCartCount = currentCount - 1;
    cartCount.innerHTML = newCartCount;

    let productId = positionClick.parentElement.parentElement.dataset.id;
    let selectedItem = cartItems.querySelector(`.item-container[data-id="${productId}"]`);

    let countItem = selectedItem.querySelector('.count-container p');
    let itemCount = +countItem.innerHTML;
    let newCount = itemCount - 1;

    if (newCount === 0) {
      selectedItem.classList = 'invisible';
    } else {
      countItem.innerHTML = newCount;
  
      let selectedBook = books.find(book => book.id == productId);
      let priceElement = selectedItem.querySelector('.item-price');
      let currentPrice = +priceElement.innerHTML.replace(/\D/g, '');
      let newPrice = currentPrice - selectedBook.price;
      priceElement.innerHTML = `${newPrice} $`;
    }
  }
})

checkOutBtn.addEventListener('click', () => {
  let items = [];

  for (let i = 1; i <= 6; i++) {
    let selectedItem = cartItems.querySelector(`.item-container[data-id="${i}"]`);

    if (selectedItem) {
      let image = selectedItem.querySelector('img').src;
      let count = selectedItem.querySelector('.count-container p').innerHTML;
      let price = selectedItem.querySelector('.item-price').innerHTML.replace(/\D/g, '');
      items.push({image: image, count: count, price: price});
    }
  }
  localStorage.setItem('products', JSON.stringify(items));

  if (items.length == 0) {
    alert('Please select a least one item before check out.');
  } else {
    window.location.href = 'check-out-form.html';
  }
})