
////////////////// HANDLES DELIVERY DATE CALCULATIONS AND RENDERING //////////////////////////
/**
 * @brief This function calculates the delivery date based on the number of days 
 * @param {number} days - The number of days until delivery
 * @return {string} - The formatted delivery date string
*/

function getShoppingCartDeliveryDate(days){

  const date = new Date();                            // Get the current date

  date.setDate(date.getDate() + days);                // Add the specified number of days to the current date

  return date.toLocaleDateString("en-US",{            // Format the date as a string in the format "Weekday, Month Day"
    weekday:"short",
    month:"short",
    day:"numeric"
  });

}
console.log(`Delivery Date: ${getShoppingCartDeliveryDate(2)}`);   //Get delivery date 2 days from now and log it to the console

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

function getShoppingCartTomorrow(){

  const date = new Date();                             // Get the current date
  date.setDate(date.getDate() + 1);                    // Add 1 day to the current date to get tomorrow's date
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

function renderShoppingCartShipping(product){

  const deliveryDate = getShoppingCartDeliveryDate(product.shipping.estimatedDelivery);
  //const deliveryDate = getShoppingCartDeliveryDate(2);
  const tomorrow = getShoppingCartTomorrow();

  let message1 = "";
  //let message2 = "";

  if(product.shipping.primeEligible){
    return message1 = `<span class="shopping-cart-free-delivery-container">FREE Prime Delivery</span> 
          <span class="shopping-cart-free-delivery">${tomorrow}</span>`;
  }
  else if(product.shipping.freeShipping){
    return message1 = `<span class="shopping-cart-free-delivery-container">FREE delivery</span> 
          <span class="shopping-cart-free-delivery">${deliveryDate}</span>`; 
  }
  else{
    return message1 = `<span class="shopping-cart-free-delivery-container">FREE delivery</span> 
          <span class="shopping-cart-free-delivery">${getShoppingCartDeliveryDate(7)}</span>`;
  }

}
//////////////////////////////////////////////////////////////////////////////////////////////

////////////////////// UPDATE THE TIMER FOR SHIPPING CUTOFF //////////////////////////////////
/**
 * @brief Updates the timer display based on the remaining time until the shipping cutoff
 *  
 */
function updateTimerShoppingCart(){

  const now = new Date();                         // Get the current date and time

  const cutoff = new Date();
  cutoff.setHours(18,0,0,0);                      //Set hours, setHours(hour, minutes, seconds, milliseconds) 5PM shipping cutoff

  let diff = cutoff - now;                        // Calculate the difference in milliseconds between the cutoff time and the current time 

  if(diff < 0){                                   // If the difference is negative, it means the cutoff time has passed for today
    return "Order tomorrow for next shipment";;
  }

  const hours = Math.floor(diff / (1000*60*60)); // Convert milliseconds to hours
  const mins = Math.floor((diff % (1000*60*60))/(1000*60)); // Calculate remaining minutes after accounting for hours

  return ` ${hours} hrs ${mins} mins`;

}

setInterval(updateTimerShoppingCart,60000);              // Update the timer every minutes
updateTimerShoppingCart();

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////// GENERATE SHOPPING CART DYNAMICALLY //////////////////////////////

let cart1 = JSON.parse(localStorage.getItem('cart1')) || [];

////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @brief This function store the cart. if the user signed in, it stores the cart to backend
 *        else it stores the cart to local storage
 */

async function storeCart() {

    console.log("storeCart called");

    const userId = localStorage.getItem("userId");

    console.log("userId:", userId);

    if (!userId) {

        console.log("No userId found");

        localStorage.setItem(
            "cart1",
            JSON.stringify(cart1)
        );

        return;
    }

    console.log("cart1 before PUT:", cart1);

    try {

        console.log("About to send PUT request");

        const response = await fetch(
            `http://localhost:4000/api/v1/cart/${userId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    items: cart1
                })
            }
        );

        console.log("PUT response received");

        const data = await response.json();
        
        console.log("Data from backend:");
        console.log(data);
        localStorage.setItem('cart1', JSON.stringify(data.cart.items));
        console.log(JSON.parse(localStorage.getItem('cart1')));

    } catch (error) {

        console.error(error);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////

function renderShoppingCart(){
    const shoppingCartHTML = document.querySelector('.shopping-cart-checkbox-img-itemName-price-container');
    let shoppingCartSummaryHTML = '';

    cart1.forEach(item => {
        let matchProduct = products.find(p => p.id === item.id);

        const iconTrashOrMinus = item.quantity > 1 ? 'bi-dash-lg' : 'bi-trash';
        const isCentZero = matchProduct.price.priceCents === 0 ? '0' : '';

        shoppingCartSummaryHTML += `
            <div class="Shopping-cart-first-item-section js-cart-item-${matchProduct.id}">
                                    <div class="Shopping-cart-first-item-container">
                                        <input type="checkbox" class="shopping-cart-checkbox" data-id="${item.id}" ${item.selected ? "checked" : ""}>
                                        <a href="${matchProduct.productPage}.html?id=${matchProduct.id}">
                                            <img src="${matchProduct.images.cartImageConfiramation}" alt="${matchProduct.brand}">
                                        </a>
                                        <div class="shopping-cart-item-name-delivery-option-button-container">
                                            <span class="shopping-cart-item-name">
                                                ${matchProduct.title.slice(0, 125)} ...
                                            </span>
                                            <div class="shopping-cart-free-delivery-order-within">
                                                ${renderShoppingCartShipping(matchProduct)}
                                                <span class="shopping-cart-order-within-container">Order within</span>
                                                <span class="shopping-cart-order-within">${updateTimerShoppingCart()}</span>
                                            </div>
                                            <a href="#">FREE Returns</a>
                                            <div class="shopping-cart-input-this-gift-container">
                                                <input type="checkbox" class="gift-checkbox">
                                                <span class="this-is-a-gift">This is a gift</span>
                                                <a href="#">Learn more</a>
                                            </div>
                                            <div class="add-to-cart-item-button">
                                                <div class="add-to-cart-delete-add js-add-to-cart-delete-add" data-id="${item.id}">
                                                    <button class="cart-action-btn" data-id="${item.id}">
                                                        <i class="bi ${iconTrashOrMinus}"></i>
                                                    </button>

                                                    <span class="add-to-cart-num-items">${item.quantity}</span>

                                                    <button class="add-to-cart-plus-sign" data-id="${item.id}">
                                                        <i class="bi bi-plus-lg"></i>
                                                    </button>
                                                </div>
                                                <span>|</span>
                                                <button class="shopping-cart-delete-button js-shopping-cart-delete-button-${item.id}" data-id="${item.id}">
                                                    Delete
                                                </button>
                                                <span>|</span>
                                                <button class="shopping-cart-safe-for-later-button js-shopping-cart-safe-for-later-button-${item.id}" data-id="${item.id}">
                                                     Save for later
                                                </button>
                                                <span>|</span>
                                                <button class="shopping-cart-share-button js-share-btn" data-id="${item.id}">
                                                     Share
                                                </button>
                                            </div>    
                                        </div>
                                    </div>
                                    <div class="shopping-cart-price-indollar">
                                        <span class="shopping-cart-dollar-sign"><i class="bi bi-currency-dollar"></i></span>
                                        <span class="shopping-cart-dollars-amount">${matchProduct.price.priceDollar}</span>
                                        <span class="shopping-cart-cents">${matchProduct.price.priceCents}${isCentZero}</span>
                                    </div>
                                </div>
                                <div class="shopping-cart-horizontal-line"></div>
                        
                                `;
    });

    shoppingCartHTML.innerHTML = shoppingCartSummaryHTML;
    attachCheckboxListeners();
    updateShoppingCartSummary();
}
renderShoppingCart();

/////////////////////////////////////////////////////////////////////////////////////////////////

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
function decreaseOrDeleteShoppingCartItem(){
    document.querySelector('.shopping-cart-checkbox-img-itemName-price-container')
    .addEventListener('click', (e) => {

        const button = e.target.closest('.cart-action-btn');
        if (!button) return;

        const id = button.dataset.id;
        const itemIndex = cart1.findIndex(item => item.id === id);

        if (itemIndex === -1) return;

        const item = cart1[itemIndex];

        if (item.quantity > 1) {
            // MINUS behavior
            item.quantity -= 1;
        } else {
            // DELETE behavior
            cart1 = cart1.filter(i => i.id !== id);
        }

        localStorage.setItem("cart1", JSON.stringify(cart1));
        storeCart();

        // Re-render everything
        renderShoppingCart();
        //updateShoppingCartSummary();
    });
}

decreaseOrDeleteShoppingCartItem();
               
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
function increaseItemNumberShoppingCart(){
    document.querySelector('.shopping-cart-checkbox-img-itemName-price-container')
    .addEventListener('click', (e) => {

        const plusBtn = e.target.closest('.add-to-cart-plus-sign');
        if (!plusBtn) return;

        const id = plusBtn.dataset.id;

        const item = cart1.find(p => p.id === id);
        if (!item) return;

        item.quantity += 1;

        localStorage.setItem("cart1", JSON.stringify(cart1));
        storeCart();

        // Re-render everything
        renderShoppingCart();
        //updateShoppingCartSummary();
    });
}

increaseItemNumberShoppingCart();
////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////// HANDLES SHOPPING CART BY CONSIDERING CHECK BOX ITEMS /////////////////////

function attachCheckboxListeners(){

    document.querySelector('.shopping-cart-checkbox-img-itemName-price-container')
    .addEventListener('change', (e) => {

        const checkbox = e.target.closest('.shopping-cart-checkbox');
        const cartItemId = checkbox.dataset.id;

        const matchProduct = cart1.find(p => p.id === cartItemId);

        if(matchProduct){
            matchProduct.selected = checkbox.checked;

            localStorage.setItem("cart1", JSON.stringify(cart1));
            storeCart();

            // UPDATE PRICE HERE
            updateShoppingCartSummary();
        }
    });

}

////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////// UPDATE SUBTOTAL AND TOTAL //////////////////////////////////////////

/**
 * @brief This section calculates the total quantity of items in the cart and the subtotal price, then
 *        updates localStorage and the displayed subtotal in the confirmation message.
 * @note The script iterates through the cart items, sums up the total quantity and calculates the subtotal
 *       by multiplying the quantity of each item by its price. It then updates localStorage with the new cart 
 *       quantity and subtotal, and updates the displayed subtotal in the confirmation message.
 * @param cartQuantity - The total quantity of items in the cart, retrieved from localStorage or initialized to 0.
 * @param subtotal - The total price of items in the cart, retrieved from localStorage or initialized to 0.
 * @param item - An item in the cart, containing product id and quantity, used to calculate the subtotal.
 * @param product - The product details corresponding to the cart item, including price, used to calculate the subtotal.
 */

function updateShoppingCartSummary() {
    let cartQuantity = 0;                  // reset every time. Total number of items in the cart
    let subtotal = 0;                      // amount for items checked in the cart
    let quantityItemSelected = 0;          // quantity of items checked in the cart
    let cartTotal = 0;                     // cart total amount
    let weeklyPay = 0;                     // payment in details (per week) 


    cart1.forEach(item => {
        cartQuantity += item.quantity;     // Cart total number of items

        const product = products.find(p => p.id === item.id);                     // find matching product to get price
        
        // Quantity and total foe items checked in the cart
        if (product && item.selected) {
            quantityItemSelected += item.quantity;
            subtotal += item.quantity * (product.price.currentPriceInCents / 100);
        }
        
        // Total amount of the cart
        if(product){
          cartTotal += item.quantity * (product.price.currentPriceInCents / 100);  
        }
    });

    // Calculate the price to pay per week (loan)
    weeklyPay = (subtotal / 4).toFixed(2);
    let formatedWeeklyPay = Math.floor(weeklyPay);
    let weekCents = (weeklyPay - Math.floor(weeklyPay)) * 100;
    let formatWeekCents = Math.round(weekCents);

    const weeklyDollar = document.querySelector('.shopping-cart-dollars-amount-weekly-payment');
    weeklyDollar.innerHTML = `${formatedWeeklyPay}`;
    document.querySelector('.shopping-cart-cents-weekly-payment').innerHTML = `${formatWeekCents}`;
    
    // store values
    localStorage.setItem("cartQuantity", cartQuantity);                 // Total quantity of items in the cart          
    localStorage.setItem("subtotal", subtotal);                         // subtotal of checked items
    localStorage.setItem("quantityItemSelected", quantityItemSelected); // quantity of checked items
    localStorage.setItem("cartTotal", cartTotal);                       // Cart total amount
    
    
    const formattedSubtotal = subtotal.toFixed(2);                      // format subtotal for checked items
    
    const formattedCartTotal =cartTotal.toFixed(2);                     //Total amount of the cart

    // Cart total amount on the bottom cart
    const cartTotalDOM = document.querySelector('.shopping-cart-bottom-subtotal');
    cartTotalDOM.innerHTML = `<i class="bi bi-currency-dollar"></i>${formattedCartTotal}`;

    
    
    // for the total number of items in the cart
    const numberBottomCartItems = document.querySelector('.shopping-cart-bottom-numItem');
    const itemText = cartQuantity === 1 ? "item" : "items";                                  // Handle singular vs plural for item(s)
    numberBottomCartItems.innerHTML = `Subtotal (${cartQuantity} ${itemText}):`;             // Update cart current quantity
    
    // For items with check mark in the cart
    const proceedToCheckoutPrice = document.querySelector('.shopping-cart-number-item');
    const itemPlurialOrSingular = quantityItemSelected === 1 ? "item" : "items";             // Handle singular vs plural for item(s)
    proceedToCheckoutPrice.innerHTML = `(${quantityItemSelected} ${itemPlurialOrSingular})`; // Update proceed to checkout button with current cart quantity

    const subtotalContainer = document.querySelectorAll('.shopping-cart-price');
    subtotalContainer.forEach(container => {
        container.innerHTML = `<i class="bi bi-currency-dollar"></i>${formattedSubtotal}`;
    });

    ///////////////////////// Cart Quantity Display in Header /////////////////////////////////////////////

    let cartNumberItems = Number(localStorage.getItem("cartQuantity")) || 0;                //Get current cart quantity from localStorage or initialize to 0 
    const cartNumberElement = document.querySelector('.js-cart-num-items');
    cartNumberElement.innerText = cartNumberItems;
    ///////////////////////////////////////////////////////////////////////////////////////////

}

updateShoppingCartSummary(); // Call function to update cart summary on page load

///////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////// GENERATE DYNAMICALLY MULTIPLE CAROUSELS ///////////////////////////////

function generateMultipleCarousel(){

    let matchesItem
    let itemAddedToCartId = localStorage.getItem("lastAddedProduct");

    if(itemAddedToCartId){
        matchesItem = products.find(p => p.id === itemAddedToCartId);
    }
    else{
        matchesItem = products.find(p => p.id === products[0].id);
    }

    const carousels = [
    { title: "Selected for you", filteredItems : products.filter(p => p.categories[1] === matchesItem.categories[1]) },
    { title: "Smart Watches", filteredItems : products.filter(p => p.categories[1] === "watches") },
    { title: "Top Rated", filteredItems : products.filter(p => p.rating.average >= 4.5) },
    { title: "laptos & Accesories", filteredItems : products.filter(p => p.categories[1] === "laptops") },
    { title: "tablets", filteredItems : products.filter(p => p.categories[1] === "tablets") }
    ];

    const CarouselTrack = document.querySelectorAll('.checkout-carousel-track');
    let HTMLSummary = "";

    CarouselTrack.forEach((carousel, index) => {

        // Create pages with 7 items each
        const itemsPerPage = 7;

        for (let i = 0; i < carousels[index].filteredItems.length; i += itemsPerPage) {
            const page = document.createElement("div");
            page.classList.add("checkout-carosel-page");

           carousels[index].filteredItems.slice(i, i + itemsPerPage).forEach(product => {

                HTMLSummary += `
                        <div class="checkout-carousel-img">
                            <a href="${product.productPage}.html?id=${product.id}">
                            <img src="${product.images.cartImageConfiramation}" alt="${product.brand}">
                            </a>
                            <span class="checkout-carousel-img-text">
                                <a href="${product.productPage}.html?id=${product.id}">
                                ${product.shortTitle}...
                                </a>
                            </span>
                            <span class="checkout-carousel-img-rating">   
                                <img src="images/bottom-carousel-images/star.png" alt="Star Rating">${product.rating.average}
                            </span>
                            <span class="checkout-amazon-choice">Amazon's choice</span>
                            <span class="checkout-carousel-img-price">$${product.price.currentPrice} ($0.23/fluid ounce)</span>
                            <span class="checkout-carousel-prime"><i class="bi bi-check-lg"></i>prime</span>
                        </div>`;
            
            });

            page.innerHTML = HTMLSummary;
            
            carousel.appendChild(page);
            HTMLSummary = "";                                     // Reset HTML summary for the next page
        }
    });
}

generateMultipleCarousel();


/////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////// HANDLES TOGETHER THE LAST TWO CAROUSELS IN THE BOTTOM PAGE ////////////////
/**
 * @brief Handles multiple checkout carousels independently
 */
document.querySelectorAll('.checkout-carousel-container').forEach(container => {

    const leftButton  = container.querySelector('.checkout-arrow.left');
    const rightButton = container.querySelector('.checkout-arrow.right');
    const track       = container.querySelector('.checkout-carousel-track');
    const pages       = container.querySelectorAll('.checkout-carosel-page');
    const carousel    = container.querySelector('.checkout-carousel');

    const currentPage = container.querySelector('.current-page');
    const totalPage   = container.querySelector('.total-pages');

    let currentIndex = 0;

    totalPage.innerHTML = pages.length;

    function getPageWidth() {
        return carousel.clientWidth;
    }

    function updateCarousel() {
        const pageWidth = getPageWidth();
        track.style.transform = `translateX(-${currentIndex * pageWidth}px)`;

        if (currentPage) {
            currentPage.innerHTML = currentIndex + 1;
        }

        leftButton.disabled  = currentIndex === 0;
        rightButton.disabled = currentIndex === pages.length - 1;
    }

    leftButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    rightButton.addEventListener('click', () => {
        if (currentIndex < pages.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Recalculate width on resize
    window.addEventListener('resize', updateCarousel);

    // Initialize
    updateCarousel();
});

////////////////////////////////////////////////////////////////////////////////////////

/////////////////// GENERATE DYNAMICALLY RELATED PRODUCTS SECTION //////////////////////

// Array of related products
let filteredRelatedProducts = [];
cart1.forEach(item => {
    const matchProduct = products.find(p => p.id === item.id);
    const matchItem = products.find(p => p.categories[1] === matchProduct.categories[1]);

    if(filteredRelatedProducts.length === 0){
        filteredRelatedProducts.push(matchItem);
    }else if(matchProduct.brand === matchItem.brand){
        filteredRelatedProducts.push(matchItem);
    }
    
});

function renderProductsRelated(productsList){

    const relatedProductsList = document.querySelector('.related-products-with-fast-delivery-section');
    let = relatedProductsHTML = '';

    productsList.forEach(item => {

        const isCentZero = item.price.priceCents === 0 ? '0' : '';

        relatedProductsHTML += `
                            <div class="image-item-name-star-price-delivery-container">
                                <a href="${item.productPage}.html?id=${item.id}">
                                    <img src="${item.images.cartImageConfiramation}" alt="image-alium">
                                </a>
                                <div class="item-name-star-price-delivery-container">
                                    <a href="#">${item.title.slice(0, 27)}...</a>
                                    <img src="images/star-2.png" alt="star">
                                    <div class="shopping-cart-price-in-dollar">
                                        <span class="shopping-cart-dollar-sign-related-products"><i class="bi bi-currency-dollar"></i></span>
                                        <span class="shopping-cart-dollars-amount-related-products">${item.price.priceDollar}</span>
                                        <span class="shopping-cart-cents-related-products">${item.price.priceCents}${isCentZero}</span>
                                    </div>
                                    
                                    <div class="prime-delivery-add-to-cart-button">
                                        <span class="shopping-cart-check-icon-prime"><i class="bi bi-check-lg"></i>prime</span>
                                        <div class="free-delivery-container">
                                            
                                            
                                            <span class="delivery-date-related-product">
                                                ${renderShoppingCartShipping(item)}
                                            </span>
                                        </div>
                                        <div class="shopping-cart-add-to-cart-button-container">
                                            <button class="shopping-cart-add-to-cart-button js-add-to-cart-btn" data-id="${item.id}">
                                                add to cart
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            `;

    });

    relatedProductsList.innerHTML = relatedProductsHTML;
}

renderProductsRelated(filteredRelatedProducts);

//////////////////////////////////////////////////////////////////////////////////////////////

////////////////////// ADD ITEM TO CART WHEN CLICKING ANY ADD TO CART BUTTON ///////////////////

/**
 * @brief This script handles the add to cart functionality on the pages with several add to cart buttons
 * @note When the "Add to Cart" button is clicked, the script retrieves the existing cart from localStorage 
 *       (or initializes an empty array if no cart exists), checks if the product being added already exists 
 *       in the cart, and either increments the quantity of the existing item or adds a new item to the cart. 
 *       The updated cart is then saved back to localStorage, and the user is redirected to the addToCart 
 *       confirmation page.
 */

function addToCartAllButtons(){
    const addToCartButton = document.querySelectorAll('.js-add-to-cart-btn');

    addToCartButton.forEach(button => {
        button.addEventListener('click', () => {
        let cart1 = JSON.parse(localStorage.getItem('cart1')) || [];     // Get existing cart or create empty array
        let id1 = button.dataset.id;
        console.log("The id is:", id1);
        let existingItem = cart1.find(item => item.id === id1);           // Check if product already exists
        if(existingItem){
            existingItem.quantity += 1;                                  // Increase quantity           
        } 
        else {
            cart1.unshift({                                              // Add new product to cart at the beginning
            id: id1,
            quantity: 1,
            selected: true
            });
    }
    
        localStorage.setItem("cart1", JSON.stringify(cart1));            // Save updated cart
        storeCart();
        
        window.location.href = "shoppingCart.html";                         // Redirect
        });
    });
    
}

addToCartAllButtons();

////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////// DELETE ITEM FROM THE SHOPPING CART ///////////////////////////////

/**
 * @brief This function delete items from the cart when pressing delete button
 */

function deleteItemShoppingCart() {

    document.querySelector('.shopping-cart-checkbox-img-itemName-price-container')
    .addEventListener('click', (e) => {

        const deleteButton = e.target.closest('.shopping-cart-delete-button');

        if (!deleteButton) return;

        const buttonId = deleteButton.dataset.id;

        const cartItemElement = document.querySelector(`.js-cart-item-${buttonId}`);
        
        if (!cartItemElement) {
            console.error(`Could not find cart item element for ID: ${buttonId}`);
            return;
        }

        // Start animation
        cartItemElement.classList.add('cart-removing');
        //cartItemElement.classList.add('cart-explode');

        // Wait for animation to finish
        setTimeout(() => {

            cart1 = cart1.filter( item => item.id !== buttonId);

            localStorage.setItem("cart1", JSON.stringify(cart1));
            storeCart();

            renderShoppingCart();

        }, 500);

    });

}

deleteItemShoppingCart();

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * This code display the user username on the navbar
 */

const userName = (localStorage.getItem('username'));  // Get user username

if(userName){
    document.querySelectorAll('.js-jean-get')
        .forEach(element => {
            element.innerHTML = userName;
        });       
}

///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @brief This code handles modal poup window whenclicking on share button
 */

const shareButton = document.querySelectorAll(".js-share-btn");

const overlay = document.querySelector(".js-share-overlay");      // 

const closeButton = document.querySelectorAll(".js-close-share");

const shareInput = document.querySelectorAll(".js-share-link");

const copyButton = document.querySelectorAll(".js-copy-link");

shareButton.forEach(sharebutton => {
    sharebutton.addEventListener("click", () => {

        let buttonId = sharebutton.dataset.id;

        let match = products.find(p => p.id === buttonId);

        //const url = window.location.href;
        const url = `${match.productPage}.html?id=${match.id}`;
        localStorage.setItem("url", JSON.stringify(url));

        shareInput.forEach(input => {
            input.value = url;
        });
        
        overlay.classList.add("show");
    });
});


closeButton.forEach(closebutton => {
    closebutton.addEventListener("click", () => {

        overlay.classList.remove("show");
    });

});

overlay.addEventListener("click", e => {

    if(e.target === overlay){
        overlay.classList.remove("show");
    }
});

document.addEventListener("click", async (e) => {

        const copyButton = e.target.closest(".js-copy-link");

        if (!copyButton) {
            return;
        }

        const shareInput = copyButton.closest(".share-link-container")
            .querySelector(".js-share-link");

        await navigator.clipboard.writeText(shareInput.value);

        copyButton.textContent = "Copied!";

        setTimeout(() => {

                copyButton.textContent = "Copy Link";

            }, 2000);
    }
);


/**
 * @brief This part of code open each link depending on which link the user clicked
 *        encodeURIComponent: converts special characters into a safe format
 */

//const url = encodeURIComponent(window.location.href);
let urlString = JSON.parse(localStorage.getItem('url'));
//console.log(urlString);
const url = encodeURIComponent(urlString);

document.querySelectorAll(".facebook").forEach(facebook => {
    facebook.addEventListener("click", () => {

        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
    });
});


document.querySelectorAll(".twitter").forEach(twitter => {
    twitter.addEventListener("click", () => {

        window.open(`https://twitter.com/intent/tweet?url=${url}`);
    });

});

document.querySelectorAll(".pinterest").forEach(pinterest => {
    pinterest.addEventListener("click", () => {

        window.open(`https://pinterest.com/pin/create/button/?url=${url}`);
    });
});


document.querySelectorAll(".email").forEach(email => {
    email.addEventListener("click", () => {

        window.location.href = `mailto:?subject=Check out this product&body=${window.location.href}`;
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////

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


