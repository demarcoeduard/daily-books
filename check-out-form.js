let containerItems = document.getElementById('list-container');
let totalEl = document.getElementById('total');
let orderBtn = document.getElementById('order');
let form = document.getElementById('form');

let items = JSON.parse(localStorage.getItem('products'));
let total = 0;

items.forEach(item => {
  containerItems.innerHTML += `
    <div class="item-container">
      <img src="${item.image}">
      <p>x ${item.count}</p>
      <p>${item.price} $</p>
    </div>
  `
  total += +item.price;
})

totalEl.innerHTML = `${total} $`

orderBtn.addEventListener('click', (e) => {
  if (form.checkValidity()) {
    e.preventDefault();
    window.location.href = 'thank-you.html';
  } else {
    alert('Please fill out all required fields.')
  }
})