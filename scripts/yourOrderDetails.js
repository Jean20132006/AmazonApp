
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


////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////// ADD TO CART CODE ///////////////////////////////////

let cart1 = JSON.parse(localStorage.getItem("cart1")) || [];                 // Get cart from localStorage or initialize as empty array


/////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @brief This function generates the HTML for the cart.
 * @returns HTML string representing the cart summary, including product image, price, quantity,
 *          and buttons for deleting or adding more items.
 * @note The script iterates through the cart items, finds the corresponding product details, 
 *       and constructs the HTML for each item in the cart summary. It also adds event listeners for 
 *       the delete and plus buttons to handle cart updates.
 * @param cartItem - An item in the cart, containing product id and quantity.
 * @param matchProduct - The product details corresponding to the cart item, including images and price.
 * @param cartSummaryHTML - A string that accumulates the HTML for the cart summary, 
 *                          which is then injected into the DOM.
 */


function renderCart() {
    let cartSummaryHTML = "";

    cart1.forEach(cartItem => {
        const matchProduct = products.find(p => p.id === cartItem.id);

        if (!matchProduct) return;

        const iconClass = cartItem.quantity > 1 ? 'bi-dash-lg' : 'bi-trash';

        cartSummaryHTML += `
        <div class="add-to-cart-corbeille-image-button add-to-cart-corbeille-image-button-${cartItem.id}">
            <div class="add-to-cart-corbeille-image">
                <img src="${matchProduct.images.cartImageConfiramation}">
                <span class="add-to-cart-corbeille-item-price">$${(matchProduct.price.currentPriceInCents / 100).toFixed(2)}</span>
            </div>
            
            <div class="add-to-cart-item-button">
                <div class="add-to-cart-delete-add">
                    <button class="cart-action-btn" data-id="${cartItem.id}">
                        <i class="bi ${iconClass}"></i>
                    </button>

                    <span class="add-to-cart-num-items">${cartItem.quantity}</span>

                    <button class="add-to-cart-plus-sign" data-id="${cartItem.id}">
                        <i class="bi bi-plus-lg"></i>
                    </button>
                </div>
            </div>    
        </div>
        `;
    });

    document.querySelector('.js-add-to-cart-corbeille-cart').innerHTML = cartSummaryHTML;
}

renderCart(); // Initial render of cart summary

//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// STORE THE CART IN THE BACKEND ///////////////////////////////////
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
function decreaseOrDeleteItem(){
    document.querySelector('.js-add-to-cart-corbeille-cart')
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
            cart1 = cart1.filter(p => p.id !== id);
        }

        localStorage.setItem("cart1", JSON.stringify(cart1));
        storeCart();

        // Re-render everything
        renderCart();
        updateCartSummary();
    });
}

decreaseOrDeleteItem();

///////////////////////////////////////////////////////////////////////////////////////////////

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
function increaseItemNumber(){
    document.querySelector('.js-add-to-cart-corbeille-cart')
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
        renderCart();
        updateCartSummary();
    });
}

increaseItemNumber();

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

function updateCartSummary() {
    let cartQuantity = 0;   // reset every time
    let subtotal = 0;

    cart1.forEach(item => {
        cartQuantity += item.quantity;

        const product = products.find(p => p.id === item.id);                                // find matching product to get price

        if (product) {
            subtotal += item.quantity * (product.price.currentPriceInCents / 100);
        }
    });
    
    // store values
    localStorage.setItem("cartQuantity", cartQuantity);
    localStorage.setItem("subtotal", subtotal);

    const formattedSubtotal = subtotal.toFixed(2);                                           // format subtotal to 2 decimal places
    const subtotalContainer = document.querySelectorAll('.js-add-to-cart-subtotal');
    subtotalContainer.forEach(container => {
        container.innerHTML = `$${formattedSubtotal}`;
    });
    /*const proceedToCheckoutButton = document.querySelector('.js-proceed-to-checkout-button');
    const itemText = cartQuantity === 1 ? "item" : "items";                                  // Handle singular vs plural for item(s)
    proceedToCheckoutButton.innerHTML = `Proceed to checkout (${cartQuantity} ${itemText})`;*/ // Update proceed to checkout button with current cart quantity

    ///////////////////////// Cart Quantity Display in Header /////////////////////////////////////////////

    let cartNumberItems = Number(localStorage.getItem("cartQuantity")) || 0;                //Get current cart quantity from localStorage or initialize to 0 
    const cartNumberElement = document.querySelector('.js-cart-num-items');
    cartNumberElement.innerText = cartNumberItems;
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

}

updateCartSummary(); // Call function to update cart summary on page load

/////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @brief This function return the due date
 */
function getDate(){

  const date = new Date();                            // Get the current date
 //date.setDate(date.getDate() + days);                // Add the specified number of days to the current date

  return date.toLocaleDateString("en-US",{            // Format the date as a string in the format "Weekday, Month Day"
    weekday:"short",
    month:"short",
    day:"numeric"
  });

}

function getReturnDueDate(){

  const date = new Date();                            // Get the current date
 date.setMonth(date.getMonth() + 1);                  // Add the specified number of months to the current month

  return date.toLocaleDateString("en-US",{            // Format the date as a string in the format "Weekday, Month Day"
    weekday:"short",
    month:"short",
    day:"numeric"
  });

}

/////////////////////////////////////////////////////////////////////////////////////////////////////

 // Get values        
    
    const total = (Number(localStorage.getItem("total"))).toFixed(2);
    const taxes = (Number(localStorage.getItem("taxes"))).toFixed(2);
    const payment = (Number(localStorage.getItem("payment"))).toFixed(2);
    const orderID = JSON.parse(localStorage.getItem("orderID"));
    const order = JSON.parse(localStorage.getItem("order"));
    //console.log(order);
      
    const userName = (localStorage.getItem('username')).toUpperCase();  // Get user username

    document.querySelectorAll('.js-ship-name')
        .forEach(element => {
            element.innerHTML = `${userName}`;
        });

    document.querySelectorAll('.js-order-number')
       .forEach(element => {
            element.innerHTML = `${orderID}`;                            // order number
       });
    
    document.querySelectorAll('.js-date')
        .forEach(element => {
            element.innerHTML = `${getDate()}`                           // Date you placed the order
    });
    
    document.querySelectorAll('.js-item-subtotal-price-order')
        .forEach(element => {
            element.innerHTML = `${total}`;                               // Total before taxes
        });
        
    document.querySelector('.js-taxes-order').innerHTML = `${taxes}`;

    document.querySelectorAll('.js-grand-total-price')
        .forEach(element => {
            element.innerHTML = `${payment}`;
    });
    

///////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @brief This function generates dynamically the order
 */
function renderOrderDetails(){
    const orderElement = document.querySelector('.js-order-return-first-sample');

    let orderHTMLSummary = '';

     const createdAt = order.createdAt;

        const formattedDate = new Date(createdAt)
            .toLocaleDateString(
                "en-US",
                {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            );

    order.items.forEach(item => {

        const matchingItem = products.find(p => p.id === item.id);

        orderHTMLSummary += `
                        <div class="deliverydate-item-image-buttons-section">
                                <div class="delivery-item-image-section">
                                    <div class="order-return-delivery-date-message">
                                    <div class="order-return-delivery-container">
                                            <span class="order-return-delivery">Order Placed</span>
                                            <span class="current-order-date">${formattedDate}</span>
                                        </div>
                                        <span class="order-return-message">
                                            Your package was left in front of your door or porch 
                                        </span>
                                    </div>
                                    <div class="image-item-name-buy-again-button">
                                        <a href="${matchingItem.productPage}.html?id=${matchingItem.id}">
                                            <img src="${matchingItem.images.cartImageConfiramation}" alt="${matchingItem.brand}">
                                        </a>
                                        <div class="item-name-buy-again-button">
                                            <a href="${matchingItem.productPage}.html?id=${matchingItem.id}" class="order-return-item-name">
                                                ${matchingItem.title}...
                                            </a>
                                            <div class="return-or-replace-container">
                                                <span class="return-or-replace">Return or replace item eligible through</span>
                                                <span>${getReturnDueDate()}</span>
                                            </div>
                                            <button class="order-return-buy-again-button" data-id="${matchingItem.id}">
                                                <div class="sub-save-cart">
                                                    <i class="bi bi-arrow-repeat"></i>
                                                    <i class="bi bi-cart4"></i>
                                                </div>
                                                <span>Buy it again</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="buttons-section">
                                    <button class="order-return-track-package color" data-id="${matchingItem.id}">
                                    Track package
                                    </button>
                                    <button class="order-return-track-package" data-id="${matchingItem.id}">
                                    Return or Replace items
                                    </button>
                                    <button class="order-return-track-package" data-id="${matchingItem.id}">
                                    Share gift receipts
                                    </button>

                                </div>
                            </div>
                                `;

    });

    orderElement.innerHTML = orderHTMLSummary;
}

renderOrderDetails();
//////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * This code display the user username on the navbar
 */

//const userName = (localStorage.getItem('username'));  // Get user username

if(userName){
    document.querySelectorAll('.js-jean-get')
        .forEach(element => {
            element.innerHTML = userName;
        });       
}

////////////////////////////////////////////////////////////////////////////////////////

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






