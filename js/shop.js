//checkout modal 
let checkoutModal = document.querySelector('.checkout-modal');

// Select all cart items
const cartItems = document.querySelectorAll('.cart-item');
const checkoutBtn = document.querySelector('.checkout-btn');  // Select the checkout button
const placeOrderBtn = document.querySelector('.place-order-btn');

// Function to update total price and items
function updateCartSummary() {
  let totalItems = 0;
  let totalPrice = 0;

  cartItems.forEach(item => {
    const quantityInput = item.querySelector('.quantity-input');
    const price = parseFloat(item.querySelector('.price').getAttribute('data-price'));
    const itemTotal = item.querySelector('.item-total');

    const quantity = parseInt(quantityInput.value);
    const currentTotal = price * quantity;

    // Update item total price
    itemTotal.textContent = currentTotal.toFixed(2);

    // Update cart summary
    totalItems += quantity;
    totalPrice += currentTotal;
  });

  document.getElementById('total-items').textContent = totalItems;
  document.getElementById('total-price').textContent = totalPrice.toFixed(2);

  // Disable checkout button if total price is zero
  if (totalPrice === 0) {
    checkoutBtn.disabled = true;
  } else {
    checkoutBtn.disabled = false;
  }
}

// Increase/Decrease Quantity
cartItems.forEach(item => {
  const decreaseBtn = item.querySelector('.decrease');
  const increaseBtn = item.querySelector('.increase');
  const quantityInput = item.querySelector('.quantity-input');

  // Increase button
  increaseBtn.addEventListener('click', () => {
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
    updateCartSummary();
  });

  // Decrease button
  decreaseBtn.addEventListener('click', () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 0) {
      quantityInput.value = quantity - 1;
    }
    updateCartSummary();
  });
});

// Initial cart summary calculation
updateCartSummary();

checkoutBtn.addEventListener('click', function() {
  checkoutModal.style.display = "flex";
})

//checkout
let addressInput = document.querySelector('.address-input'),
addressReview = document.querySelector('.address-review'),
emailInput = document.querySelector('.email-input'),
emailReview = document.querySelector('.email-review'),
phoneInput = document.querySelector('.phone-input'),
phoneReview = document.querySelector('.phone-review'),
deliveryReview = document.querySelector('.delivery-review'),
cardReview = document.querySelector('.card-review');

//delivery
function deliveryType(x) {
  if (x == 'instant') {
    deliveryReview.innerHTML = "Instant delivery - arriving in 30 - 60 mins"
  } else {
    deliveryReview.innerHTML = "Standard delivery - arriving within 24 hrs of order"
  }
}
//card number 
function getLastFourDigits(input) {
    // Convert input to a string and slice the last 4 characters
  let lastFour = input.toString().slice(-4);
    return lastFour;
}

function returnLastFourDigits() {
  let inputValue = document.getElementById('card-number').value;
  let lastFourDigits = getLastFourDigits(inputValue);
  cardReview.innerHTML = lastFourDigits;
}


// Function to show the respective section
function showSection(section) {
  // Hide all sections
  document.getElementById('shipping-section').classList.add('hidden');
  document.getElementById('payment-section').classList.add('hidden');
  document.getElementById('review-section').classList.add('hidden');

  // Remove active class from all progress bar items
  document.getElementById('shipping-progress').classList.remove('active');
  document.getElementById('payment-progress').classList.remove('active');
  document.getElementById('review-progress').classList.remove('active');

  // Show the selected section and mark it as active in the progress bar
  if (section === 'shipping') {
    document.getElementById('shipping-section').classList.remove('hidden');
    document.getElementById('shipping-progress').classList.add('active');
  } else if (section === 'payment') {
    document.getElementById('payment-section').classList.remove('hidden');
    document.getElementById('payment-progress').classList.add('active');
  } else if (section === 'review') {
    document.getElementById('review-section').classList.remove('hidden');
    document.getElementById('review-progress').classList.add('active');
  }
  updateUserInput()
}

// Go to Payment Section
function goToPayment() {
  showSection('payment');
}

// Go to Review Section
function goToReview() {
  showSection('review');
  updateUserInput()
}

function getItemsQuantity() {
  let AllQuantityInput = document.querySelectorAll('.quantity-input');
  let itemTotalAll = document.querySelectorAll('.item-total');
  let quantities = document.querySelectorAll('.item-quantity');
  let prices = document.querySelectorAll('.item-price');
  
   quantities[0].innerHTML = `x ${AllQuantityInput[0].value}`;
    prices[0].innerHTML = `₦${itemTotalAll[0].innerHTML}`; 
  quantities[1].innerHTML = `x ${AllQuantityInput[1].value}`;
    prices[1].innerHTML = `₦${itemTotalAll[1].innerHTML}`;
  quantities[2].innerHTML = `x ${AllQuantityInput[2].value}`;
    prices[2].innerHTML = `₦${itemTotalAll[2].innerHTML}`;
  quantities[3].innerHTML = `x ${AllQuantityInput[3].value}`;
    prices[3].innerHTML = `₦${itemTotalAll[3].innerHTML}`;
  document.querySelector('.subtotal').innerHTML = `₦${document.getElementById('total-price').innerHTML}`;
  document.querySelector('.all-total').innerHTML = `₦${Number(document.getElementById('total-price').innerHTML) + 500}.00`;
}

function removeNonPurchased() {
    // Select all order items
    const orderItems = document.querySelectorAll('.order-item');
    
    orderItems.forEach(item => {
        // Get the quantity element
        const quantityElement = item.querySelector('.item-quantity');
        
        // Get the value of the quantity and convert it to a number
        const quantity = quantityElement.textContent;
        
        // Check if the quantity is 0
        if (quantity == 'x 0') {
            // Hide the order item if the quantity is 0
            item.style.display = 'none';
        } else {
            // Show the order item if the quantity is greater than 0 (optional in case it was previously hidden)
            item.style.display = 'flex'; // or 'flex' depending on your layout
        }
    });
  }
  
function updateUserInput() {
  addressReview.innerHTML = addressInput.value;
  emailReview.innerHTML = emailInput.value;
  phoneReview.innerHTML = phoneInput.value;
  returnLastFourDigits();
  getItemsQuantity();
  removeNonPurchased();
  
  let missingNotice = document.querySelector('.missing-notice');
let agreeTerms = document.getElementById('agree-terms');

if (addressInput.value == '' || emailInput == '' || phoneInput == '' || cardReview.innerHTML == '' || !agreeTerms.checked) {
  missingNotice.style.display = 'block';
  placeOrderBtn.disabled = true;
} else {
  missingNotice.style.display = 'none';
  placeOrderBtn.disabled = false;
}

}

// Simulate Place Order Action
function placeOrder() {
  alert('Your order has been placed successfully!');
  document.location = "index.html"
}
