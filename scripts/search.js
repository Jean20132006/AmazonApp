/////////////////// The CODE HERE HANDLES MOST FUNCTIONNALITIES IN THE CART //////////////

let cart1 = JSON.parse(localStorage.getItem("cart1")) || [];                 // Get cart from localStorage or initialize as empty array

//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// SEARCH IN THE SEARCH BAR CODE ///////////////////////////////////

/**
 * @brief when you click on the search button, we get the value and redirect to search.html
 */

/*const searchButton = document.querySelector(".js-search-btn");

searchButton.addEventListener("click", () => {

        const searchText = document.querySelector(".js-search-input").value;

        window.location.href = `search.html?q=${encodeURIComponent(searchText)}`;

    }
);*/


/////////////////////////////////////////////////////////////////////////////////////////
/**
 * @brief Search on Enter Key
 */

/*const searchInput = document.querySelector(".js-search-input");

searchInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            let searchText = searchInput.value;

            window.location.href = `search.html?q=${encodeURIComponent(searchText)}`;

            
        }
    }
);*/

//////////////////////////////////////// GET PARAM ////////////////////////////////////////

const params = new URLSearchParams( window.location.search);

const query = params.get("q");

const results = searchProducts(query);

console.log(results);

renderProducts(results);

////////////////////////////////////////////////////////////////////////////////////////////
function renderProducts(searchResults){
    const productsContainer = document.querySelector('.js-search-products-section');

    const itemsPerRow = 5;

    let productsHTML = '';

    for (let i = 0; i < searchResults.length; i += itemsPerRow){

        const rowDiv = document.createElement('div');
        rowDiv.classList.add('search-products-container');

        searchResults.slice(i, i + itemsPerRow).forEach(product => {

            productsHTML += `
                
                            <div class="image-name-star-price-container">
                                    <div class="card__image-wrap">
                                       <a href="${product.productPage}.html?id=${product.id}">
                                           <img class="main-image" src="${product.images.main}" alt="${product.brand}">
                                        </a>
                                    </div>
                                    <div class="name-star-price-container">
                                    <span class="brand">${product.brand}</span>
                                    <span class="search-item-name">
                                        <a href="${product.productPage}.html?id=${product.id}">
                                            ${product.title.slice(0, 75)}...
                                        </a>
                                    </span>
                                    <div class="search-star-rating-review2">
                                        <span class="search-advert-rating">${product.rating.average}</span>
                                        <img src="images/star-2.png" alt="Star Rating">
                                        <span class="search-advert-review">${product.rating.totalReviews}</span>
                                    </div>
                                    
                                    <div class="search-prime-delivery-date">
                                        <span class="search-check-icon-prime"><i class="bi bi-check-lg"></i>prime</span>
                                        <div class="search-delivery-date">
                                            <span class="search-delivery">FREE delivery</span>
                                            <span class="search-delivery">Tomorrow</span>
                                        </div>
                                    </div>
                                    <div class="footer">
                                       <div class="shopping-cart-price-indollar">
                                            <span class="shopping-cart-dollar-sign"><i class="bi bi-currency-dollar"></i></span>
                                            <span class="shopping-cart-dollars-amount">${product.price.priceDollar}</span>
                                            <span class="shopping-cart-cents">${product.price.priceCents}</span>
                                        </div>
                                        <div class="add-to-cart-button">
                                            <a href="#product">
                                                <button class="add-to-cart-carousel-add-to-cart-button js-add-to-cart-btn"  data-id="${product.id}">
                                                    Add to Cart
                                                </button>
                                           </a>
                                       </div>
                                    </div>
                                    </div>
                                </div>
                                `;

        });

        rowDiv.innerHTML = productsHTML;
        productsContainer.appendChild(rowDiv);
        productsHTML = '';

    }
}


///////////////////////////////////////////////////////////////////////////////////////
/**
 * This code render random colors for each product
 */
document.querySelectorAll('.name-star-price-container').forEach(box => {

    const color1 =
        `hsl(${Math.random() * 360}, 100%, 60%)`;

    const color2 =
        `hsl(${Math.random() * 360}, 100%, 60%)`;

    const color3 =
        `hsl(${Math.random() * 360}, 100%, 60%)`;

    box.style.background = `
        conic-gradient(
            from 0deg,
            ${color1},
            ${color2},
            ${color3},
            ${color1}
        )
    `;
});
///////////////////////////////////////////////////////////////////////////////////////
/*document.querySelectorAll('.card__image-wrap')
  .forEach((image, index) => {
       image.style.background = `${results[index].variants[0].color}`;
       
  });*/



////////////////////////////////////////////////////////////////////////////////////////
/**
 * @brief This function searches the user input words that match either the title, brand
 *        or categories in the array of products
 * @param searchText is the user input
 * @param {String} searchableText contains words to compare with user input 
 *        trim()  remove whitespace from the beginning and end of a string.
 *        join() method combines all elements of an array into a single string
 *        split() method converts a string to an array
 * @returns 
 */

function searchProducts(searchText) {

    const keywords =
        searchText
            .toLowerCase()
            .trim()
            .split(" ")
            .map(normalizeWord);

    return products.filter(product => {

            const searchableText =
                `
                ${product.title}
                ${product.brand}
                ${product.categories.join(" ")}
                `
                .toLowerCase();

            return keywords.some(keyword => searchableText.includes(keyword));
        }
    );
}

////////////////////////////////////////////////////////////////////////////////////////
/**
 * @brief This function converts plurals to singulars before searching
 *        This is a common problem in search engines called stemming or lemmatization.
 */

function normalizeWord(word) {

    word = word.toLowerCase();

    if (word.endsWith("ies")) {
        return word.slice(0, -3) + "y";
    }

    if (word.endsWith("es")) {
        return word.slice(0, -2);
    }

    if (word.endsWith("s")) {
        return word.slice(0, -1);
    }

    return word;
}
////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

const advertsection = document.querySelector('.js-search-advertissement-section');
let advertissementHTML = '';

advertissementHTML += `
          
                       <video autoplay muted playsinline loop class="search-advert-video">
                            <source src="${results[0].videos.advertisement}" type="video/mp4">
                        </video>
                        <a href="${results[0].productPage}.html?id=${results[0].id}">
                        <div class="search-advert-img-text-container">
                            <img class="advert-image" src="${results[0].videos.advertisementVideosImages[0]}" alt="image"> 
                            <span class="search-advert-text">
                                ${results[0].title.slice(0, 120)}
                            </span>
                            <div class="search-star-rating-review">
                                <span class="search-advert-rating">${results[0].rating.average}</span>
                                <img src="images/star-2.png" alt="Star Rating">
                                <span class="search-advert-review">${results[0].rating.totalReviews}</span>
                            </div>
                        </div> 
                        </a> 
                        `;

advertsection.innerHTML = advertissementHTML;

////////////////////////////////////////////////////////////////////////////////////////

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
        //storeCart();
        //localStorage.setItem("lastAddedProduct", id);                    // Save last added product (for confirmation page)
        window.location.href = "addToCart.html";                         // Redirect
        });
    });
    
}

//addToCartAllButtons();

////////////////////////////////////////////////////////////////////////////////////////////




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

        localStorage.setItem("cart1", JSON.stringify(cart1));

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

//////////////////////////////////////////////////////////////////////////////////////////////
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
    
    ///////////////////////// Cart Quantity Display in Header ////////////////////////////////////

    let cartNumberItems = Number(localStorage.getItem("cartQuantity")) || 0;                 //Get current cart quantity from localStorage or initialize to 0 
    const cartNumberElement = document.querySelector('.js-cart-num-items');
    cartNumberElement.innerText = cartNumberItems;
    //////////////////////////////////////////////////////////////////////////////////////////////

}

updateCartSummary(); // Call function to update cart summary on page load

//////////////////////////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////////////////////



