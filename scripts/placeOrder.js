
////////////////// HANDLES DELIVERY DATE CALCULATIONS AND RENDERING //////////////////////////
/**
 * @brief This function calculates the delivery date based on the number of days 
 * @param {number} days - The number of days until delivery
 * @return {string} - The formatted delivery date string
*/

function getPlaceOrderDeliveryDate(days){

  const date = new Date();                            // Get the current date

  date.setDate(date.getDate() + days);                // Add the specified number of days to the current date

  return date.toLocaleDateString("en-US",{            // Format the date as a string in the format "Weekday, Month Day"
    weekday:"long",
    month:"short",
    day:"numeric"
  });

}
console.log(`Delivery Date: ${getPlaceOrderDeliveryDate(2)}`);   //Get delivery date 2 days from now and log it to the console

/**
 *  @brief This function calculates tomorrow's date and formats it as a string in the format "Weekday, Month Day"
 *  @note The getTomorrow function calculates tomorrow's date by creating a new Date object for 
 *       the current date, adding one day to it using setDate, and then formatting the result as 
 *       a string in the format "Weekday, Month Day" using toLocaleDateString. This function is 
 *       used to display the estimated delivery date for Prime eligible products and the fastest 
 *       delivery option on the checkout page.
 *  @return {string} - The formatted date string for tomorrow's date
 *  
 */

function getPlaceOrderTomorrow(){

    const date = new Date();                             // Get the current date
    date.setDate(date.getDate() + 1);                    // Add 1 day to the current date to get tomorrow's date
    // Format the date as a string in the format "Weekday, Month Day" and return it
    return date.toLocaleDateString("en-US",{
        weekday:"long",
        month:"short",
        day:"numeric"
    });

}

function getPlaceOrderAfterFourDays(){

    const date = new Date();                             // Get the current date
    date.setDate(date.getDate() + 4);                    // Add 1 day to the current date to get tomorrow's date
    // Format the date as a string in the format "Weekday, Month Day" and return it
    return date.toLocaleDateString("en-US",{
        weekday:"short",
        month:"short",
        day:"numeric"
    });

}

/**
 * 
 * @brief This function renders the shipping information on the checkout page based on the product's shipping details 
 */

function renderPlaceOrderShipping(product){

    const deliveryDate = getPlaceOrderDeliveryDate(product.shipping.estimatedDelivery);
    //const deliveryDate = getShoppingCartDeliveryDate(2);
    const tomorrow = getPlaceOrderTomorrow();

    let message1 = "";
    //let message2 = "";

    if(product.shipping.primeEligible){
        return message1 = `${tomorrow}`;
    }
    else if(product.shipping.freeShipping){
        return message1 = `${deliveryDate}</span>`; 
    }
    else{
        return message1 = `${getPlaceOrderDeliveryDate(7)}`;
    }

}
//////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @brief This function generates dynamically the items to proceed checkout
 */

let cart1 = JSON.parse(localStorage.getItem('cart1'));

////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @brief This function load the cart from backend if the user signed in. Otherwise, it loads it from 
 *        localStorage
 */
async function loadCart() {

    const userId = localStorage.getItem("userId");

    if (!userId) {

        return (JSON.parse(localStorage.getItem("cart1")) || []);
    }

    try {

        const response = await fetch(`http://localhost:4000/api/v1/cart/${userId}`);

        const data = await response.json();

        return data.cart.items || [];
        console.log("cart has been loaded:");
        console.log(data.cart.items);

    } catch (error) {

        console.error(
            "Error loading cart:",
            error
        );

        return [];
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////

/*let cart1 = [];
document.addEventListener(
    "DOMContentLoaded",
    async () => {

        cart1 = await loadCart();

        //renderShoppingCart();
    }
);*/

////////////////////////////////////////////////////////////////////////////////////////////////////



let cart = cart1.filter(p => p.selected === true);
localStorage.setItem('cart', JSON.stringify(cart));

function renderOrder(){
    const proceedCheckoutItem = document.querySelector('.place-order-first-item-container');

    let proceedCheckoutHTML = '';
    let matchingItem;

   
    cart.forEach(item => {

        matchingItem = products.find(p => p.id == item.id);

        const TrashOrMinus = item.quantity > 1 ? 'bi-dash-lg' : 'bi-trash';
        const isCentZero = matchingItem.price.priceCents === 0 ? '0' : '';

        proceedCheckoutHTML += `
                        
                        <div class="arraving-container">
                            <span class="place-order-arriving">Arriving </span>
                            <span class="arriving-day-container">${renderPlaceOrderShipping(matchingItem)} - ${getPlaceOrderAfterFourDays()}</span>
                        </div>

                        <div class="product-delivery-date">
                            <div class="image-item-name-price-container">
                                <div class="image-minus-plus-button-container">
                                    <a href="${matchingItem.productPage}.html?id=${matchingItem.id}">
                                        <img src="${matchingItem.images.cartImageConfiramation}" alt="${matchingItem.brand}">
                                    </a>
                                    <div class="place-order-button-gift-options">
                                        <div class="add-to-cart-delete-add">
                                            <button class="cart-action-btn" data-id="${matchingItem.id}">
                                                <i class="bi ${TrashOrMinus}"></i>
                                            </button>

                                            <span class="add-to-cart-num-items">${item.quantity}</span>

                                            <button class="add-to-cart-plus-sign" data-id="${matchingItem.id}">
                                                <i class="bi bi-plus-lg"></i>
                                            </button>
                                        </div>
                                        <span class="gift-option-place-order">Gift options not available</span>
                                    </div>
                                </div>
                                <div class="item-name-price-place-order">
                                    <span class="name-place-order">
                                        ${matchingItem.title}
                                    </span>
                                    <span class="bought-place-order">100+ bought in past month</span>
                                    <span class="price-place-order-cart">
                                        <i class="bi bi-currency-dollar"></i>${matchingItem.price.currentPrice}${isCentZero}
                                    </span>
                                    <span class="shopping-cart-check-icon-prime"><i class="bi bi-check-lg"></i>prime</span>
                                    <a href="#disclaimer">Disclaimers</a>
                                </div>
                            </div>

                            <div class="radio-input-delivery-date">
                                <div class="radio-first-interval-date">
                                    <div>
                                        <input type="radio" class="radio-input-place-order" checked>
                                    </div>
                                    <span class="delivery-date">${renderPlaceOrderShipping(matchingItem)} - ${getPlaceOrderAfterFourDays()}</span>
                                </div>
                                <span class="delivery-options-free">FREE</span>
                            </div>
                        </div>
                    `;
    });

    proceedCheckoutItem.innerHTML = proceedCheckoutHTML;
    updatePlaceOderSummary();                                // update payment
}

renderOrder();

///////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////// DECREASE NUMBER OF THE SAME ITEM OR DELETE IT //////////////////////////////
/**
 * @brief This section uses event delegation to handle click events for both delete and minus buttons in the 
 *        cart summary.
 * @note Instead of adding individual event listeners to each button, this approach adds a single event listener 
 *       to the parent container of the cart items. When a click event occurs, it checks if the clicked element is 
 *       a delete or minus button and performs the corresponding action (deleting the item or decrementing the quantity)
 *       while updating localStorage and re-rendering the cart summary.
 * @param document.querySelector('.js-add-to-cart-corbeille-cart')
 *        -parent container element that holds all buttons for the cart items.
 * @param e - is the event object, It contains information about the click (where it happened, which element was clicked, etc.) 
 *       for identifying the cart item.
 * 
 * @code {JavaScript} 
 *       .addEventListener('click', (e) => { ... }); //Listen for ANY click inside it
 * @code {JavaScript} 
 *      const button = e.target.closest('.cart-action-btn'); // Find the actual button that was clicked
 *                                                              (even if user clicked icon inside it)
 */

//Select parent container and add event listener for both delete and minus buttons using event delegation
function decreaseOrDeletePlaceOrderItem(){
    document.querySelector('.place-order-first-item-full-row')
    .addEventListener('click', (e) => {

        const button = e.target.closest('.cart-action-btn');
        if (!button) return;

        const id = button.dataset.id;
        const itemIndex = cart.findIndex(item => item.id === id);

        if (itemIndex === -1) return;

        const item = cart[itemIndex];

        if (item.quantity > 1) {
            // MINUS behavior
            item.quantity -= 1;
        } else {
            // DELETE behavior
            cart = cart.filter(i => i.id !== id);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        // Re-render everything
        renderOrder();
        
    });
}

decreaseOrDeletePlaceOrderItem();
               
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////// INCREASE THE NUMBER FOR A GIVEN ITEM //////////////////////////////////
/**
 * @brief This section uses event delegation to handle click events for the plus button in the cart summary.
 * @note Similar to the previous section, this approach adds a single event listener to the parent container of the cart items. When a click event occurs, it checks if the clicked element is a plus button and increments the quantity of the corresponding cart item, updates localStorage, and re-renders the cart summary.
 * @param document.querySelector('.js-add-to-cart-corbeille-cart')
 *       -parent container element that holds all buttons for the cart items.
 * @param e - is the event object, It contains information about the click (where it happened, which element was clicked, etc.) 
 *       for identifying the cart item.
 * @code {JavaScript} 
 *       .addEventListener('click', (e) => { ... }); //Listen for ANY click inside it
 * @code {JavaScript} 
 *      const plusBtn = e.target.closest('.add-to-cart-plus-sign'); // Find the actual plus button that was clicked
 *                                                              (even if user clicked icon inside it)
 */
function increaseItemNumberPlaceOrder(){
    document.querySelector('.place-order-first-item-full-row')
    .addEventListener('click', (e) => {

        const plusBtn = e.target.closest('.add-to-cart-plus-sign');
        if (!plusBtn) return;

        const id = plusBtn.dataset.id;

        const item = cart.find(p => p.id === id);
        if (!item) return;

        item.quantity += 1;

        localStorage.setItem("cart", JSON.stringify(cart));

        // Re-render everything
        renderOrder();
        
    });
}

increaseItemNumberPlaceOrder();
////////////////////////////////////////////////////////////////////////////////////////////////

function updatePlaceOderSummary(){
    
    let total = 0;                                                // amount for items checked in the cart
    let numberItems = 0;                                          // Number of items in the cart
    let taxes = 0;                                                // taxes
    let payment = 0;                                              // Amount after taxes

    cart.forEach(item => {
        
        numberItems += 1;

        const product = products.find(p => p.id === item.id);     // find matching product to get price
        
        // Total amount of the cart
        if(product){
          total += item.quantity * (product.price.currentPriceInCents / 100);
          taxes += item.quantity * ((product.price.currentPriceInCents * 3) / 10000);  // 3% each item
        }
    });

    
    payment = total + taxes;
    
    // store values         
    localStorage.setItem("total", total);                         // total of checked items
    localStorage.setItem("numberItems", numberItems);             // proceed checkout number items
    localStorage.setItem("taxes", taxes);                         // taxes
    localStorage.setItem("payment", payment);
    
    const formattedTotal = total.toFixed(2);                      // format total for checked items
    const formattedTaxes = taxes.toFixed(2);
    const formattedPayment = payment.toFixed(2);

    // Cart total amount on the bottom cart
    const totalBeforeTax = document.querySelector('.js-place-order-price');
    totalBeforeTax.innerHTML = `<i class="bi bi-currency-dollar"></i>${formattedTotal}`;

    // Taxes
    const taxElement = document.querySelector('.place-order-estimated-tax-price');
    taxElement.innerHTML = `<i class="bi bi-currency-dollar"></i>${formattedTaxes}`;
    
    // Final Payment
    const cartTotalElement = document.querySelectorAll('.js-place-order-total-price');
    cartTotalElement.forEach(element => {
        element.innerHTML = `<i class="bi bi-currency-dollar"></i>${formattedPayment}`;
    });
    
    
    // Total number of items in the cart during proceed to checkout
    const numberOfItems = document.querySelector('.place-order-number-items');
    const itemText = numberItems === 1 ? "item" : "items";                            // Handle singular vs plural for item(s)
    numberOfItems.innerHTML = `${itemText}(${numberItems} ):`;                                  // Update cart current quantity
    
    ///////////////////////// Cart Quantity Display in Header /////////////////////////////////////////////

    let cartNumberItems = Number(localStorage.getItem("cartQuantity")) || 0;                //Get current cart quantity from localStorage or initialize to 0 
    const cartNumberElement = document.querySelector('.js-cart-num-items');
    cartNumberElement.innerText = cartNumberItems;
    ///////////////////////////////////////////////////////////////////////////////////////////
}

updatePlaceOderSummary();

///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @brief This code post the order to the backend
 */

let yourPayment = Number(localStorage.getItem("payment"));       // Get total payment
let formatYourPayment = yourPayment.toFixed(2);                  // Format total payment

const userId = localStorage.getItem("userId");                   // Get user ID


//const placeOrderButtons = document.querySelectorAll('.js-place-order-button');
const placeOrderButtons = document.querySelectorAll('.js-close-btn');
placeOrderButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const response = await fetch(
                `http://localhost:4000/api/v1/orders/${userId}`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        items: cart,
                        totalAmount: formatYourPayment
                    })
                }
            );

            const data = await response.json();

            const orderID = data.orderId;
            const order = data.order;

            // Store values in local storage
            localStorage.setItem("orderID", JSON.stringify(orderID));
            localStorage.setItem("order", JSON.stringify(order));

            window.location.href = 'yourOrderDetails.html';

    });
});

/////////////////////////////////////////////////////////////////////////////////////////
/**
 * @brief This code handles order confirmation  
 */

const triggerBtn = document.querySelectorAll('.js-place-order-button');
const modal = document.getElementById('successModal');
const closeBtn = document.getElementById('closeBtn');

triggerBtn.forEach(button => {
    button.addEventListener('click', () => {
       modal.classList.add('is-active');
    });
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('is-active');
});
/////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// SEARCH IN THE SEARCH BAR CODE ///////////////////////////////////

/**
 * @brief when you click on the search button, we get the value and redirect to search.html
 */

const searchButton = document.querySelector(".js-search-btn");

searchButton.addEventListener("click", () => {

        const searchText = document.querySelector(".js-search-input").value;

        window.location.href = `search.html?q=${encodeURIComponent(searchText)}`;

    }
);


/////////////////////////////////////////////////////////////////////////////////////////
/**
 * @brief Search on Enter Key
 */

const searchInput = document.querySelector(".js-search-input");

searchInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            let searchText = searchInput.value;

            window.location.href = `search.html?q=${encodeURIComponent(searchText)}`;

            
        }
    }
);

//////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Frentend for api send email
 */

/*await fetch(
    "http://localhost:4000/api/v1/email/send-order-email",
    {

        method: "POST",

        headers: {
            "Content-Type":
                "application/json"
        },

        body: JSON.stringify({

            email:
                localStorage.getItem(
                    "userEmail"
                ),

            username:
                localStorage.getItem(
                    "username"
                ),

            orderId:
                data.order._id,

            totalAmount:
                orderTotal
        })
    }
);*/