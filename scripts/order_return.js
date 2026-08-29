
/////////////////////// GENERATE DYNAMICALLY THE TWO BOTTOM CAROUSELS ///////////////////////////////


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


////////////////////////////////////////////////////////////////////////////////////////////

let cart1 = JSON.parse(localStorage.getItem('cart1')) || [];

///////////////////////// Cart Quantity Display in Header /////////////////////////////////////////////

    let cartNumberItems = Number(localStorage.getItem("cartQuantity")) || 0;                //Get current cart quantity from localStorage or initialize to 0 
    const cartNumberElement = document.querySelector('.js-cart-num-items');
    cartNumberElement.innerText = cartNumberItems;
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @brief This function return the due date
 */
/*function getDate(){

  const date = new Date();                            // Get the current date
 //date.setDate(date.getDate() + days);                // Add the specified number of days to the current date

  return date.toLocaleDateString("en-US",{            // Format the date as a string in the format "Weekday, Month Day"
    weekday:"short",
    month:"short",
    day:"numeric"
  });

}*/

function getReturnDueDate(){

  const date = new Date();                            // Get the current date
 date.setMonth(date.getMonth() + 1);                  // Add the specified number of months to the current month

  return date.toLocaleDateString("en-US",{            // Format the date as a string in the format "Weekday, Month Day"
    weekday:"short",
    month:"short",
    day:"numeric"
  });

}

//////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @brief This code fetch orders from backend
 */
let orderRoaster;
document.addEventListener('DOMContentLoaded', async () => {

    const userId = localStorage.getItem("userId");                   // Get user ID

    const period = document.getElementById('order-period').value;

    let from;
    let to = new Date();

    if (period === "1month") {

        from = new Date();
        from.setMonth(from.getMonth() - 1);

    } 
    else if (period === "3months") {

        from = new Date();
        from.setMonth(
            from.getMonth() - 3);

    } 
    else if (period === "2026") {

        from = new Date("2026-01-01");

        to = new Date("2026-12-31");
    }

    const response = await fetch(
            `http://localhost:4000/api/v1/orders/${userId}?from=${from.toISOString()}&to=${to.toISOString()}`
        );

    const data = await response.json();

    orderRoaster = data.orders;
    localStorage.setItem('orderRoaster', JSON.stringify(orderRoaster));

    document.querySelector('.js-number-of-orders').innerHTML = orderRoaster.length;

    /*console.log("List of orders:");
    console.log(orderRoaster);
    console.log(orderRoaster[0].createdAt);*/ 

});

function renderOrder(){

    const username = (localStorage.getItem('username')).toUpperCase();  // Get user username
    orderRoaster = JSON.parse(localStorage.getItem('orderRoaster'));
    
    let orderRoasterElement;
    let headerElement;
    const orderSection = document.querySelector('.order-roaster-section');

    let orderHTML = '';
    let orderHeaderHTML = '';
    let orderSummaryHTML = '';
    let orderContainer;

    orderRoaster.forEach(order => {

        // Get create date and format it
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

        orderRoasterElement = document.createElement('div');
        orderRoasterElement.classList.add('order-roaster-container');

        headerElement = document.createElement('div');
        headerElement.classList.add('header-alexa-button-container');

        orderContainer = document.createElement('div');
        orderContainer.classList.add('order-return-first-sample');

        orderHeaderHTML += `
                    
                                <div class="oder-return-header">
                                    <div class="the-three-first-one">
                                        <div class="order-return-placed">
                                            <span class="order-placed">ORDER PLACED</span>
                                            <span class="order-return-placed-date">${formattedDate}</span>
                                        </div>
                                        <div class="order-return-placed">
                                            <span class="order-placed">TOTAL</span>
                                            <span class="order-return-placed-date">$${order.totalAmount}</span>
                                        </div>
                                        <div class="order-return-placed">
                                            <span class="order-placed">Ship to</span>
                                            <span class="order-return-name">${username}</span>
                                        </div>
                                    </div>
                                    <div class="order-return-placed">
                                        <div class="order-return-placed-order-number">
                                            <span class="order-placed">Order #:</span>
                                            <span class="order-placed">${order._id}</span>
                                        </div>
                                        <div class="view-order-invoice">
                                            <a href="yourOrderDetails.html">View order details</a>
                                            <span class="separator-line">|</span>
                                            <a href="#view-invoice">View in voice</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="alexa-button">
                                    <button class="alexa-button-container">
                                        <img src="images/alexa.png" alt="alexa logo" class="alexa-logo">
                                        <span class="alexa-button-text">Ask Alexa about this order</span>
                                    </button>
                                </div>
                                <div class="after-alexa-separator-line"></div>
                                `; 

        order.items.forEach(item => {
            matchingProduct = products.find(p => p.id === item.id);

            orderHTML += `
                
                                <div class="deliverydate-item-image-buttons-section">
                                    <div class="delivery-item-image-section">
                                        <div class="order-return-delivery-date-message">
                                            <div class="order-return-delivery-container">
                                                <span class="order-return-delivery">Delivered</span>
                                                <span class="order-return-delivery">May 2026</span>
                                            </div>
                                            <span class="order-return-message">
                                                Your package was left in front of your door or porch 
                                            </span>
                                        </div>
                                        <div class="image-item-name-buy-again-button">
                                            <a href="${matchingProduct.productPage}.html?id=${matchingProduct.id}">
                                                <img src="${matchingProduct.images.cartImageConfiramation}" alt="image">
                                            </a>
                                            <div class="item-name-buy-again-button">
                                                <a href="${matchingProduct.productPage}.html?id=${matchingProduct.id}" class="order-return-item-name">
                                                    ${matchingProduct.title}...
                                                </a>
                                                <div>
                                                    <span class="return-or-replace">Return or replace item eligible through</span>
                                                    <span class="return-or-replace">${getReturnDueDate()}</span>
                                                </div>
                                                <button class="order-return-buy-again-button js-add-to-cart-btn" data-id="${matchingProduct.id}">
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
                                        <button class="order-return-track-package color" data-id="${matchingProduct.id}">
                                            Track package
                                        </button>
                                        <button class="order-return-track-package" data-id="${matchingProduct.id}">
                                            Return or Replace items
                                        </button>
                                        <button class="order-return-track-package" data-id="${matchingProduct.id}">
                                            Share gift receipts
                                        </button>
                                    </div>
                                </div>
                                `;


        });

        headerElement.innerHTML = orderHeaderHTML; 
        orderContainer.innerHTML = orderHTML;
        orderRoasterElement.appendChild(headerElement);
        orderRoasterElement.appendChild(orderContainer);
        orderSection.appendChild(orderRoasterElement); 
        orderHTML = '';
        orderHeaderHTML = '';
        
    });
} 

renderOrder();

///////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// STORE CART IN THE BACKEND /////////////////////////////////////////
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
        //let cart1 = JSON.parse(localStorage.getItem('cart1')) || [];     // Get existing cart or create empty array
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




