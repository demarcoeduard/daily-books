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
    let name = document.getElementById('first-name').value;
    let email = document.getElementById('email').value;
    let serviceID = "service_1bpot8w";
    let templateID = "template_0auvtdf";

    let templateParams = {
      to_name: name,
      to_email: email,
      from_name: 'Daily Books',
      message: 'Thank you for your purchase! Your order will arive as soon as posible!',
    }

    emailjs.send(serviceID, templateID, templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
   }, function(error) {
      console.log('FAILED...', error);
   });
    e.preventDefault();
    window.location.href = 'thank-you.html';
  } else {
    alert('Please fill out all required fields.')
  }
})