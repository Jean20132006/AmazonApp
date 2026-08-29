//let cart1 = [];
let cart1 = JSON.parse(localStorage.getItem("cart1")) || [];                 // Get cart from localStorage or initialize as empty array
/**
 * @brief This script generates the checkoutout page content dynamically based on the product data
 *@note  window.location.search returns everything after the ?
 @param {object} params - An instance of URLSearchParams that parses the query parameters from the current page URL, allowing access to specific parameters such as "id" to identify the product being viewed
 @param {string} id - The unique identifier for the product, extracted from the URL query parameters
 @param {Object} matchingProduct - The product object that matches the extracted id, used to populate the checkout page with relevant information
 -window.location represents page URL
 -URLSearchParams is a built-in JavaScript object that parses query parameters from a URL
 -params.get("id") This retrieves the value of a specific parameter.
*/
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const matchingProduct = products.find(product => product.id === id);

localStorage.setItem("id", id);         // Store id

if (matchingProduct) {
  const title = document.querySelector('.name-section');                              // product name
  const mainImage  = document.querySelector('.js-image-section');                     // main product image
  const imageGallery = document.querySelectorAll('.js-radio-button');                 // image gallery 
  const reviewImages = document.querySelectorAll('.js-checkout-carousel-review-img'); // review images in review carousel
  const productVideo1 = document.getElementById('product-video2');                    // product video element
  const productVideo2 = document.getElementById('product-video');                     // product video element
  const manifacturerFirstRow = document.querySelector('.js-manufacturer-first-row');  // manufacturer first row image
  const proteinImage = document.querySelector('.js-protein');                         // protein image in manufacturer section
  const firstImageSecondRow = document.querySelector('.js-manufacturer-second-row-container'); // first image in manufacturer second row
  const thirdRowImage = document.querySelectorAll('.js-max');                          // images in manufacturer third row
  const shortTitle = document.querySelector('.js-short-title');                        // short title element in manufacturer third row
  const fourthRowImage = document.querySelector('.js-manufacturer-fourth-row-container'); // fourth row image in manufacturer section
  const productPriceDollar = document.querySelectorAll('.dollars-amount');              // product price in dollars
  const productPriceCent = document.querySelectorAll('.cents');                         // product price in cents
  const pricePerUnit = document.querySelectorAll('.price-per-ounce');                   // price per unit
  const advertVideo = document.querySelectorAll('.js-sponsored-video');                 // advert video element
  const productDescription = document.querySelector('.js-product-description');         // product description element
  //const advertImage = document.querySelectorAll('.js-advert-img');                      // advert image element
  const selectFlavorButtons = document.querySelectorAll('.js-btton-flavour');           // flavour selection buttons
  const selectSizeButtons = document.querySelectorAll('.js-size-button');               // size selection buttons
  const flavorName =document.getElementById('chocolate');                               // flavor name element in size selection section 
  const imageOrText1 = document.querySelector('.js-image-or-text1');                   // image or text element in manufacturer section
  const imageOrText2 = document.querySelector('.js-image-or-text2');                   // image or text element in manufacturer section
  const firsrowManufacturer = document.querySelector('.manufacturer-section'); // first row in manufacturer section
  const secondRowManufacturer = document.querySelector('.manufacturer-second-row-section'); // second row in manufacturer section
  const thirdRowManufacturer = document.querySelector('.manufacturer-third-row-section'); // third row in manufacturer section
  const fourthRowManufacturer = document.querySelector('.manufacturer-fourth-row-section'); // fourth row in manufacturer section
  const imageForVideoAdvertisement = document.querySelectorAll('.js-image-for-video-advertisement'); // image for video advertisement in manufacturer section
  const textForVideoAdvertisement = document.querySelectorAll('.js-text-for-video-advertisement'); // text for video advertisement in manufacturer section
  const priceOnAdvertVideo = document.querySelectorAll('.clearence');                             // price on advert video
  const listPriceOnAdvertVideo = document.querySelectorAll('.old-price');                          // list price on advert video
  const ingredientsButton = document.querySelector('.ingredients'); // ingredients dropdown button
  //const clothesComputerBigCarouselBackground = document.querySelector('.checkout-carousel-clothes-computers-track'); // background for clothes and computers carousel
  //const bigCarouselSquareText = document.querySelectorAll('.title-four-picture-container-name');      // text in big carousel for clothes and computers
  const productDescriptionTitle = document.querySelector('.js-product-decription-title');             // product description title element
  const visitStore = document.querySelectorAll('.js-visit-store');                                    // visit store element after the title in checkout page
  const rating = document.querySelectorAll('.js-rating');                                             // rating element in checkout page
  const fourthBigCarouselTitle = document.querySelectorAll('.big-image-clothes-computers-text'); // title for fourth big carousel picture in clothes and computers section
  const productClientRating = document.querySelectorAll('.js-checkout-carousel-client-rating-img'); // Product video carousel images

  ///////////////////////////////////////////////////////////////////////////////

  const isCentZero = matchingProduct.price.priceCents === 0 ? '0' : ''; // utility. helps to display two zero if cent = 0
  //const clothesComputersCarouselImages = document.querySelectorAll('.container1-img'); // images in clothes and computers carousel
  //const clothesComputerBigImages = document.querySelectorAll('.js-clothes-computers-image-container'); // big images in clothes and computers carousel
  
  if(matchingProduct.categories[0] === "electronics" || matchingProduct.categories[0] === "clothing") {
    firsrowManufacturer.style.display = "none";
    secondRowManufacturer.style.display = "none";
    thirdRowManufacturer.style.display = "none";
    fourthRowManufacturer.style.display = "none";
    ingredientsButton.style.display = "none";
    productDescriptionTitle.style.display = "none";
    //clothesComputerBigCarouselBackground.style.backgroundImage = `url('${matchingProduct.backgroundImage}')`;

  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  title.textContent = matchingProduct.title;

  mainImage.src = matchingProduct.images.main;

  imageGallery.forEach((img, index) => {
    img.src = matchingProduct.images.gallery[index];
  });

  reviewImages.forEach((reviewImage, index) => {
    reviewImage.src = matchingProduct.images.reviews[index];
  });

  productClientRating.forEach((img, index) => {
    img.src = matchingProduct.videos.galleryVideosImages[index];
  });

  productVideo1.src = matchingProduct.videos.galleryVideos[0];
  
  manifacturerFirstRow.src = matchingProduct.manifacturer.image1;
  proteinImage.src = matchingProduct.manifacturer.image2;
  firstImageSecondRow.src = matchingProduct.manifacturer.image3;
  thirdRowImage.forEach((img, index) => {
    img.src= matchingProduct.manifacturer.thirdRowImages[index];
  });

  shortTitle.textContent = matchingProduct.brand;

  fourthRowImage.src = matchingProduct.manifacturer.fourthRowImage;

  productPriceDollar.forEach((element) => {
    element.textContent = matchingProduct.price.priceDollar;
  });
  productPriceCent.forEach((element) => {
    element.innerHTML = `${matchingProduct.price.priceCents}${isCentZero}`;
  });
  
  if(matchingProduct.categories[0] === "drink"){
        pricePerUnit.forEach((element) => {
            element.textContent = `$${matchingProduct.price.pricePerUnit} / ounce`;
        });
   }

  advertVideo.forEach((video) => {
    video.src = matchingProduct.videos.advertisement;
  });

  productDescription.textContent = matchingProduct.description;

    selectFlavorButtons.forEach((button, index) => {
    button.textContent = matchingProduct.variants[index].flavor;
  });

  selectSizeButtons.forEach((button, index) => {
    button.textContent = `${matchingProduct.variants[index].size} (${matchingProduct.variants[index].pack})`;
  });

  flavorName.textContent = matchingProduct.variants[0].flavor;
     
    if(matchingProduct.id === "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"){

        imageOrText1.innerHTML = `<span class="title-shake">Power Core High Protein Shake</span>
                <span class="champion">Champion Your Recovery</span>
                <span class="text-second-row">
                    Core Power High Protein Shakes are a delicious post-workout 
                    protein shake. Made with 100% real, lactose free, ultra-filtered 
                    milk and without any added protein powders, Core Power is a delicious 
                    source of nutrition to help you build muscle and recover after 
                    exercise, so you're prepared for your next workout. 
                </span>
                <div class="list">
                    <ul>
                        <li>High Quality Protein</li>
                        <li>Protein to Build Muscles and Electrolytes to Help Hydrate</li>
                        <li>Ready to Drink Protein Shake</li>
                        <li>Made from Ultra-filtered Milk</li>
                        <li>Lactose Free</li>
                    </ul>
                </div>
            `;
        imageOrText2.innerHTML = `<img src="images/fairlife.jpg" alt="fairlife">
                <div class="fairlife-text">
                    <span>We believe in better</span><br> care for the people we nourish, animals that provides 
                    us with milk, and the planet we live on. At fairlife we're on a mission to 
                    nourish the modern world with great tasting, better-for-you products, but 
                    our purpose extends beyond what's in our bottles. We go the extra mile to
                    provide better care for the people we nourish, animals that provides us with milk, 
                    and the planet we live on.
                </div>
            `;

    }else{
        imageOrText1.innerHTML = `<img src="${matchingProduct.manifacturer.image2}" alt="manufacturer">`;
        imageOrText2.innerHTML = `<img class="image-or-text" src="${matchingProduct.manifacturer.image3}" alt="manufacturer">`;
    }

    /*clothesComputersCarouselImages.forEach((img, index) => {
        img.src = matchingProduct.manifacturer.clothesComputerImages[index];
    });*/

    imageForVideoAdvertisement.forEach((img, index) => {
        img.src = matchingProduct.videos.advertisementVideosImages[index];
    });
    
    textForVideoAdvertisement.forEach((element) => {
        element.textContent = matchingProduct.videos.advertisementVideosText;
    });
    priceOnAdvertVideo.forEach(element => {
        element.textContent = `-${matchingProduct.price.discountPercent}% $${((matchingProduct.price.currentPriceInCents - ((matchingProduct.price.currentPriceInCents * matchingProduct.price.discountPercent) / 100)) / 100).toFixed(2)}`;
    });

    listPriceOnAdvertVideo.forEach(element => {
        element.textContent = `$${(matchingProduct.price.currentPriceInCents / 100).toFixed(2)}`;
    });

    /*bigCarouselSquareText.forEach(element => {
        element.textContent = matchingProduct.shortTitle;
    });*/

    visitStore.forEach(element => {
        element.innerHTML = `<a href="#visit">Visit the ${matchingProduct.brand} Store</a>`;
    });

    rating.forEach(element => {
        element.textContent = matchingProduct.rating.average;
    });

    fourthBigCarouselTitle.forEach(element => {
        element.textContent = `${matchingProduct.fourthBigCarouselTitle}`;
    });
    renderShipping(matchingProduct);
    document.querySelector(".js-delivery-day").innerHTML = `
                        FREE delivery 
                        <span class="delivery-date">
                           ${getDeliveryDate(matchingProduct.shipping.estimatedDelivery)}
                        </span>`;
    document.getElementById("advert-free-delivery").innerHTML = `
                                    ${getDeliveryDate(matchingProduct.shipping.estimatedDelivery)}`; 

} else {
  document.body.innerHTML = "Product not found";
}
//////////////////////////////////////////////////////////////////////////////////////////////

////////////////// HANDLES DELIVERY DATE CALCULATIONS AND RENDERING //////////////////////////
/**
 * @brief This function calculates the delivery date based on the number of days 
 * @param {number} days - The number of days until delivery
 * @return {string} - The formatted delivery date string
*/

function getDeliveryDate(days){

  const date = new Date();                            // Get the current date

  date.setDate(date.getDate() + days);                // Add the specified number of days to the current date

  return date.toLocaleDateString("en-US",{            // Format the date as a string in the format "Weekday, Month Day"
    weekday:"long",
    month:"long",
    day:"numeric"
  });

}
console.log(`Delivery Date: ${getDeliveryDate(2)}`);   //Get delivery date 2 days from now and log it to the console

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

function getTomorrow(){

  const date = new Date();                             // Get the current date
  date.setDate(date.getDate() + 1);                    // Add 1 day to the current date to get tomorrow's date
  // Format the date as a string in the format "Weekday, Month Day" and return it
  return date.toLocaleDateString("en-US",{
    weekday:"long",
    month:"long",
    day:"numeric"
  });

}

/**
 * 
 * @brief This function renders the shipping information on the checkout page based on the product's shipping details 
 */

function renderShipping(product){

  const deliveryDate = getDeliveryDate(product.shipping.estimatedDelivery);
  const tomorrow = getTomorrow();

  let message1 = "";
  let message2 = "";

  if(product.shipping.primeEligible){
     message2 = `<span class="prime">FREE Prime delivery <span class="delivery-date">${tomorrow}</span></span>`;
  }

  if(product.shipping.freeShipping){
    message1 = `FREE delivery <span class="delivery-date">${deliveryDate}</span>`; 
  }
  else{
    /*message1 = `Delivery ${deliveryDate}`;*/
    message1 = `FREE delivery <span class="delivery-date">${getDeliveryDate(7)}</span>`;
  }

  /*document.querySelector(".js-delivery-day").innerHTML = message1;*/
  document.querySelector('.js-prime-delivery-date').innerHTML = message2;

  /*document.querySelector(".js-fastest-delivery").innerHTML =
  `<span class="fastest">Or fastest delivery ${tomorrow}</span>`;*/

}
//////////////////////////////////////////////////////////////////////////////////////////////

////////////////////// UPDATE THE TIMER FOR SHIPPING CUTOFF //////////////////////////////////
/**
 * @brief Updates the timer display based on the remaining time until the shipping cutoff
 *  
 */
function updateTimer(){

  const now = new Date();                         // Get the current date and time

  const cutoff = new Date();
  cutoff.setHours(18,0,0,0);                      //Set hours, setHours(hour, minutes, seconds, milliseconds) 5PM shipping cutoff

  let diff = cutoff - now;                        // Calculate the difference in milliseconds between the cutoff time and the current time 

  if(diff < 0){                                   // If the difference is negative, it means the cutoff time has passed for today
    document.querySelector(".time").innerHTML =
      "Order tomorrow for next shipment";
    return;
  }

  const hours = Math.floor(diff / (1000*60*60)); // Convert milliseconds to hours
  const mins = Math.floor((diff % (1000*60*60))/(1000*60)); // Calculate remaining minutes after accounting for hours

  document.querySelector(".time").innerHTML = ` ${hours} hrs ${mins} mins`;

}

setInterval(updateTimer,60000);              // Update the timer every minutes
updateTimer();

///////////////////////////////////////////////////////////////////////////////////////////

/////// HANDLES DROP DOWN FUNCTIONALITY FOR INGREDIENTS AND ABOUT THIS ITEM SECTIONS /////
 /** 
  * @brief Script to handle drop down functionality for Ingredients section or Product Details
  *        in checkout page
  * @param {HTMLElement} downButton - The dropdown button element
  * @param {HTMLElement} ingredientsSection - The section to show/hide content
 */
const downButton = document.querySelector('.down-button');
const ingredientsSection = document.querySelector('.empty-div');

downButton.addEventListener('click', () => {
    if(downButton.classList.contains('down-button')){
        ingredientsSection.innerHTML= `Filtered Lowfat Grade A Milk,
        Alkalized Cocoa, Contains Less Than 1% of: Honey, Natural Flavors, 
        Maltodextrin, Sodium Polyphosphate, Lactase Enzyme, Acesulfame Potassium, 
        Sucralose, Carrageenan, Vitamin A Palmitate, 
        Vitamin D3.`;
        downButton.innerHTML= `<i class="bi bi-chevron-up"></i>`;
        downButton.classList.replace('down-button', 'up-button');
    }
    else{
        ingredientsSection.innerHTML= ``;
        downButton.innerHTML= `<i class="bi bi-chevron-down"></i>`;
        downButton.classList.replace('up-button', 'down-button');
    }
});
/////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////
/** 
 * @brief This Script handle the About this item drop down
 * @param {HTMLElement} downButton2 - The dropdown button element
 * @param {HTMLElement} aboutSection - The section to show/hide content
 */
const downButton2 = document.querySelector('.down-button2');
const aboutSection= document.querySelector('.empty-div2');
downButton2.addEventListener('click', () =>{
    if(downButton2.classList.contains('down-button2')){
        aboutSection.innerHTML= `${toggleAboutSection(matchingProduct)}`;
        downButton2.innerHTML= `<i class="bi bi-chevron-up"></i>`;
        downButton2.classList.replace('down-button2', 'up-button2');
    }
    else{
        aboutSection.innerHTML= ``;
        downButton2.innerHTML= `<i class="bi bi-chevron-down"></i>`;
        downButton2.classList.replace('up-button2', 'down-button2');
    }
});
////////////////////////////////////////////////////////////////////////////////////////

//////////////////// FUNCTION TO TOGGLE ABOUT THIS ITEM SECTION CONTENT ////////////////

function toggleAboutSection(matchProduct) {
    const aboutContent = document.querySelector('.empty-div2');
    const ulContainer = document.createElement('ul');
    matchProduct.about.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        ulContainer.appendChild(listItem);
    });
    return ulContainer.outerHTML; // Return the HTML string of the unordered list that include <ul> tag
}
//////////////////////////////////////////////////////////////////////////////////////////

/////////////////////// GENERATE DYNAMICALLY MULTIPLE CAROUSELS ////////////////////////////////////



function generateMultipleCarouselCheckout(){
    const carousels = [
    { title: "Products related to this item", filteredItems : products.filter(p => p.categories[1] === matchingProduct.categories[1]) },
    { title: "Top Rated", filteredItems : products.filter(p => p.rating.average >= 4.5) },
    { title: "Beverages", filteredItems : products.filter(p => p.categories[1] === "drink") },
    { title: "Smart Watches", filteredItems : products.filter(p => p.categories[1] === "watches") },
    { title: "tablets & Computers", filteredItems : products.filter(p => p.categories[1] === "tablets") }
    ];

    // Title
    document.querySelectorAll('.js-title-container').forEach((element, index) => {
        if (carousels[index]) {
            element.innerHTML =carousels[index].title;
        }
    });


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

generateMultipleCarouselCheckout();
///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////// HANDLES CAROUSEL REVIEW FUNCTIONALITY ////////////////////////////

/**
 * @brief This script handles carousel review functionality
 */
let leftButtonReview = document.querySelector('.checkout-arrow-review.left-review');
let rightButtonReview = document.querySelector('.checkout-arrow-review.right-review');
let trackReview = document.querySelector('.checkout-carousel-review-track');
let currentPageReview = document.querySelector('.current-page-review');
let totalPageReview = document.querySelector('.total-pages-review');
let pagesReview = document.querySelectorAll('.checkout-carosel-review-page');
totalPageReview.innerHTML = pagesReview.length;

let currentIndexReview = 0;
let pageWidthReview = document.querySelector('.checkout-carousel-review').clientWidth;

function updateCarouselReview(){

    trackReview.style.transform = `translateX(-${currentIndexReview * pageWidthReview}px)`;
    currentPageReview.innerHTML = currentIndexReview + 1;
    if(currentIndexReview === 0){
        leftButtonReview.disabled = true;
    }
    else{
        leftButtonReview.disabled = false;
    }
    if(currentIndexReview === pagesReview.length - 1){
        rightButtonReview.disabled = true;
    }
    else{
        rightButtonReview.disabled = false;
    }
}
leftButtonReview.addEventListener('click', () => {
    if(currentIndexReview > 0){
        currentIndexReview--;
        updateCarouselReview();
    }
});
rightButtonReview.addEventListener('click', () => {
    if(currentIndexReview < pagesReview.length - 1){
        currentIndexReview++;
        updateCarouselReview();
    }
});

updateCarouselReview();         // Initialize carousel state

/////////////////////////////////////////////////////////////////////////////////////////////

///////////////////// HANDLES MULTIPLE CHECKOUT CAROUSELS INDEPENDENTLY /////////////////////
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



/////////////////////////// HANDLES PROGRESS BAR FUNCTIONALITY ////////////////////////////
/**
 * @brief This script handles progress bar functionality
 */

window.addEventListener('DOMContentLoaded', () => {
    const progressBar1 = document.querySelector('.progress-bar-fill-1');
    const progressBar2 = document.querySelector('.progress-bar-fill-2');
    const progressBar3 = document.querySelector('.progress-bar-fill-3');
    const progressBar4 = document.querySelector('.progress-bar-fill-4');
    const progressBar5 = document.querySelector('.progress-bar-fill-5');

    progressBar1.style.width = 83 + '%';
    progressBar2.style.width = 19 + '%';
    progressBar3.style.width = 13 + '%';
    progressBar4.style.width = 1 + '%';
    progressBar5.style.width = 4 + '%';
});
/////////////////////////////////////////////////////////////////////////////////////////////

////////////////// CUSTOMER REVIEWS AND RATINGS DROP DOWN FUNCTIONALITY /////////////////////
/**
 * @brief This script handles the customer reviews and ratings drop down
 * @param {HTMLElement} customerReviewsButton - The dropdown button element
 * @param {HTMLElement} customerReviewSection - The section to show/hide content
 */
const customerReviewsButton = document.querySelector('.How-customer-reviews-and-ratings-work');
const customerReviewSection = document.querySelector('.How-customer-reviews-and-ratings-work-text-expand');
customerReviewsButton.addEventListener('click', () => {
    if(customerReviewsButton.classList.contains('How-customer-reviews-and-ratings-work')){
        customerReviewSection.innerHTML= `Customer Reviews, including Product Star Ratings 
            help customers to learn more about the product and decide whether it is the right product for them.
            To calculate the overall star rating and percentage breakdown by star, we don't use a simple average. 
            Instead, our system considers things like how recent a review is and if the reviewer bought the item 
            on Amazon. It also analyzed reviews to verify trustworthiness.
        `;
        customerReviewsButton.innerHTML= `<i class="bi bi-chevron-up"></i>`;
        customerReviewsButton.classList.replace('How-customer-reviews-and-ratings-work', 'How-customer-reviews-and-ratings-work-up');
    }
    else if(customerReviewsButton.classList.contains('How-customer-reviews-and-ratings-work-up')){
        customerReviewSection.innerHTML = '';
        customerReviewsButton.innerHTML = `<i class="bi bi-chevron-down"></i>`;
        customerReviewsButton.classList.replace('How-customer-reviews-and-ratings-work-up', 'How-customer-reviews-and-ratings-work');
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////

//////////////////// DISPLAY GALLERY IMAGES NEXT TO MAIN IMAGE IN CHECKOUT ////////////////////

const galleryImages = document.querySelector('.radio-button-section');
matchingProduct.images.gallery.forEach((item, index) => {

    const radioButton = document.createElement('button');
    radioButton.classList.add('radio-button');

    const galleryImg = document.createElement('img');
    galleryImg.classList.add('js-radio-button');
    galleryImg.src = `${matchingProduct.images.gallery[index]}`;

    radioButton.appendChild(galleryImg);
    galleryImages.appendChild(radioButton);
});

////////////////////////// CUSTOMERS SAY SECTION CODE /////////////////////////////////////////
/**
 * @brief This function display the text message on Customer Say section
 * @param {*} matchProduct is matching product
 */
function customerSay(matchProduct){
    const customerSay = document.querySelector('.say-rating');
    customerSay.innerHTML = `${matchProduct.reviews[0].comment}`;
}

customerSay(matchingProduct);

//////////////////////////// SELECT TO LEARN MORE /////////////////////////////////////////////

function selectToLearMore(matchProduct){
    const selectToLearnMore = document.querySelector('.select-to-learn-more-content');
    const lineNumberOfButtons = Math.ceil(matchProduct.manifacturer.selectMore.length / 4); // Calculate the number of lines needed for the buttons (4 buttons per line)
    let selectToLearnMoreHTML = '';

    for(let i = 0; i < matchProduct.manifacturer.selectMore.length; i += 4){

        const buttonsForLine = document.createElement('div');
        buttonsForLine.classList.add('select-to-learn-more-content-container');

        matchProduct.manifacturer.selectMore.slice(i, i + 4).forEach((item) => {
        selectToLearnMoreHTML += `<button class="select-to-learn-more-button">
                                <span><i class="bi bi-check2"></i></span>
                                <span >${item}</span>
                                <span  class="taste">|</span>
                            </button>`;
        });
        buttonsForLine.innerHTML = selectToLearnMoreHTML;
        selectToLearnMore.appendChild(buttonsForLine);
        selectToLearnMoreHTML = ''; // Reset HTML string for the next line of buttons

    }
}
selectToLearMore(matchingProduct);

///////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// CUSTOMERS' COMMENT ///////////////////////////////////

function customerComment(matchProduct){

    const customerSays = document.querySelector('.comment-Nate');
    const commentTitle = document.querySelector('.js-review-stars');
    const commenterName = document.querySelector('.commenter-name');
    commenterName.innerHTML = matchProduct.reviews[1].user;
    commentTitle.innerHTML = `${matchProduct.reviews[1].title}`;
    customerSays.innerHTML = `${matchProduct.reviews[1].comment}`;
}

customerComment(matchingProduct);

//////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// ADD TO CART FUNCTIONALITY ////////////////////////////////////

/////////////////////////////// ADD ITEM TO THE CART ////////////////////////////////////////

/**
 * @brief This script handles the add to cart functionality on the checkout page
 * @note When the "Add to Cart" button is clicked, the script retrieves the existing cart from localStorage 
 *       (or initializes an empty array if no cart exists), checks if the product being added already exists 
 *       in the cart, and either increments the quantity of the existing item or adds a new item to the cart. 
 *       The updated cart is then saved back to localStorage, and the user is redirected to the addToCart 
 *       confirmation page.
 */

async function addToCart() {

    const addToCartButton = document.querySelector('.js-add-to-cart-btn');

    addToCartButton.addEventListener("click", async () => {

            const existingItem = cart1.find(item => item.id === id);

            if (existingItem) {

                existingItem.quantity += 1;                                   // Increase quantity 

            } else {

                cart1.unshift({                                               // Add new product to cart at the beginning
                    id: id,
                    quantity: 1,
                    selected: true
                });
            }

            await storeCart();
            localStorage.setItem("cart1", JSON.stringify(cart1));            // Save updated cart
    
            localStorage.setItem("lastAddedProduct", id);                    // Save last added product (for confirmation page)
            window.location.href = "addToCart.html";                         // Redirect

        }
    );


    /*emailjs.send(
    "service_id",
    "template_id",
    {
        user_name: "Jean",
        user_email: "jeanerictsanga8@example.com",
        message: "Hello"
    },
    "public_key"
    )
    .then(() => {
        console.log("Email sent");
    });*/
}

addToCart();

///////////////////////// CART QUANTITY DISPLAY IN HEADER /////////////////////////////////////////////
function cartNumberItems(){
    let CheckoutCartNumberItems = Number(localStorage.getItem("cartQuantity")) || 0; //Get current cart quantity from localStorage or initialize to 0 
    const cartNumberElement = document.querySelector('.js-cart-num-items');
    cartNumberElement.innerText = CheckoutCartNumberItems;
}

cartNumberItems();

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

//////////////////////// END OF CART FUNCTIONALITIES ////////////////////////////////////////


///////////// THIS PART HANDLES ELECTRONICS AND CLOTHING SPECIFIC FUNCTIONALITIES///////////////

/**
 * @brief This if statement handles the functionalities that are in electronics and clothing
 *        products only. 
 *        It checks if the product belongs to either category and then executes the code block 
 *        that contains functionalities specific to those categories, such as hiding certain 
 *        sections, setting background images, and initializing carousels for clothes and computers.
 */
if(matchingProduct.categories[0] === "electronics" || matchingProduct.categories[0] === "clothing") {

    /////////////////////// DISPLAY THE COLOR NAME ON THE CHECKOUT PAGE /////////////////////////////
    const colorName= document.getElementById('chocolate');
    colorName.innerHTML = ` ${matchingProduct.variants[0].color}`;
    ////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////// CHOOSE ITEMS COLOR & IN THE CAROUSEL CODE /////////////////////////////////

    /**
     * @brief This script  dynamically carousel to choose color functionality in checkout page
     * @note The carousel displays color options in a paginated format, allowing users to navigate through different color choices 
     *       for the product. Each page of the carousel contains a set number of color options, and users can click 
     *       on the left and right arrows to navigate between pages. The carousel dynamically generates its content based 
     *       on the available color options for the product.
     */

    const itemsPerColumn = 3;                                                      // Number of items to display in each column
    const columnsPerPage = 6;                                                      // Number of columns to display in each page

    const track = document.querySelector(".checkout-carousel-color-track");        // The container element where the carousel pages will be added
    
    // Get the arry of identical products but the different color
    const filteredMatchBrand = products.filter(p => p.brand === matchingProduct.brand);
    const itemExists = filteredMatchBrand.find(p => p.id === matchingProduct.id);
    if (itemExists) {
        const index = filteredMatchBrand.findIndex(p => p.id === matchingProduct.id);
        if(index != 0){
            filteredMatchBrand.splice(index, 1);         // remove one element at position index
            filteredMatchBrand.unshift(matchingProduct); // Add the main product at the beginning of the array

        }    
    }

    function generateCarousel(items) {

        if(items.length > 1){

            track.innerHTML = "";                                                        // Clear previous content

            const totalPages = Math.ceil(items.length / (itemsPerColumn * columnsPerPage)); // Calculate total number of pages needed based on items and layout

            for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
                const pageDiv = document.createElement("div");                                // Create a new page container
                pageDiv.classList.add("checkout-carosel-color-page");                         // Add class for styling

                for (let colIndex = 0; colIndex < columnsPerPage; colIndex++) {
                const columnDiv = document.createElement("div");                            // Create a new column container
                columnDiv.classList.add("column-color");                                    // Add class for styling

                // Calculate start index of items for this column
                const startIndex = pageIndex * itemsPerColumn * columnsPerPage + colIndex * itemsPerColumn; 
                const endIndex = startIndex + itemsPerColumn;

                items.slice(startIndex, endIndex).forEach(item => {                         // Loop through items for this column and create buttons
                    const link = document.createElement("a");
                    link.href = `${item.productPage}.html?id=${item.id}`;
                    const button = document.createElement("button");
                    button.classList.add("item-color");
                    button.dataset.id = item.id;
                    // Set button content with image and price information
                    button.innerHTML = `
                    <img src="${item.images.main}" alt="color option ${item.id}">                  
                    <div class="item-color-horizontal-line"></div>
                    <div class="item-color-price">$${item.price.currentPrice}</div>
                    <div class="item-color-listprice">${listPrice(item)}</div>
                    `;
                    link.appendChild(button)
                    columnDiv.appendChild(link);                                            // Add button to the column container
                });

                pageDiv.appendChild(columnDiv);                                             // Add column to the page container
                }

                track.appendChild(pageDiv);                                                   // Add page to the carousel track
            }
            //displayMainImage(items);                                                        // Call function to handle main image update when color option is selected
        }
        else{
            document.querySelector('.current-page-color').style.display = "none";
            document.querySelector('.total-pages-color').style.display = "none";
        }
    }

    //generateCarousel(matchingProduct.colorItems);                                     // Generate the carousel with the color options for the current product
    generateCarousel(filteredMatchBrand); 

    /////////////////////////////////////////////////////////////////////////////////////

    /////// HANDLES DROP DOWN FUNCTIONALITY FOR PRODUCTS DETAILS IN CHECKOUT PAGES  /////
 /** 
  * @brief Script to handle drop down functionality for Product Details
  *        in checkout page for electronics
  * @param {HTMLElement} downButton3 - The dropdown button element
  * @param {HTMLElement} productDetailsSection - The section to show/hide content
 */
const downButton3 = document.querySelector('.down-button3');
const productDetailsSection = document.querySelector('.empty-div3');
let productDetailsHTLM = "";

downButton3.addEventListener('click', () => {
    if(downButton3.classList.contains('down-button3')){
        matchingProduct.productDetails.forEach(details => {
            productDetailsHTLM += `${details}<br>`;

        });
        productDetailsSection.innerHTML = productDetailsHTLM;
        downButton3.innerHTML= `<i class="bi bi-chevron-up"></i>`;
        downButton3.classList.replace('down-button3', 'up-button3');
    }
    else{
        productDetailsSection.innerHTML= ``;
        downButton3.innerHTML= `<i class="bi bi-chevron-down"></i>`;
        downButton3.classList.replace('up-button3', 'down-button3');
    }
});
/////////////////////////////////////////////////////////////////////////////////////////

    
    ///////////////// FUNCTION UTILITY TO FIND THE LIST PRICE //////////////////////////
    /**
     * @brief Calculate list price if discount is not 0 else print nothing
     * @param {object} item 
     * @returns oldPrice
     */
    function listPrice(item){
        //let oldPrice = item.price.discountPercent != 0 ? ((item.price.currentPriceInCents + (item.price.currentPriceInCents * item.price.discountPercent / 100)) / 100).toFixed(2) : '';
        let oldPrice = item.price.discountPercent != 0 ? `$${((item.price.currentPriceInCents +
        (item.price.currentPriceInCents * item.price.discountPercent / 100)) / 100).toFixed(2)}` : '';

        return oldPrice;
    }
    ////////////////////////////////////////////////////////////////////////////////////

    /////////////////NAVIGATION FOR COLOR CAROUSEL IN CHECKOUT PAGE//////////////////////
    /**
         * @brief This script handles carousel to choose color functionality in checkout page
         * @note this script the page navigation. It updates the carousel's position based on the current 
         * page index and enables/disables navigation buttons accordingly.
         */
        let leftButtonColor = document.querySelector('.checkout-arrow-color.left');
        let rightButtonColor = document.querySelector('.checkout-arrow-color.right');
        let trackColor = document.querySelector('.checkout-carousel-color-track');
        let currentPageColor = document.querySelector('.current-page-color');
        let totalPageColor = document.querySelector('.total-pages-color');
        let pagesColor = document.querySelectorAll('.checkout-carosel-color-page');
        totalPageColor.innerHTML = pagesColor.length;

        let currentIndexColor = 0;
        let pageWidthColor = document.querySelector('.checkout-carousel-color').clientWidth;
        function updateCarouselColor(){
            trackColor.style.transform = `translateX(-${currentIndexColor * pageWidthColor}px)`;
            currentPageColor.innerHTML = currentIndexColor + 1;
            if(currentIndexColor === 0){
                leftButtonColor.disabled = true;
            }
            else{
                leftButtonColor.disabled = false;
            }
            if(currentIndexColor === pagesColor.length - 1){
                rightButtonColor.disabled = true;
            }
            else{
                rightButtonColor.disabled = false;
            }
        }
        leftButtonColor.addEventListener('click', () => {
            if(currentIndexColor > 0){
                currentIndexColor--;
                updateCarouselColor();
            }
        });
        rightButtonColor.addEventListener('click', () => {
            if(currentIndexColor < pagesColor.length - 1){
                currentIndexColor++;
                updateCarouselColor();
            }
        });

        updateCarouselColor();         // Initialize carousel state

    /////////////////////////////////////////////////////////////////////////////////////////

    ///// MAIN IMAGE UPDATE WHEN CLICKING ON COLOR OPTIONS IN CHECKOUT PAGE ////////////////

    /**
     * @brief This function handles the functionality of changing the main image on checkout page
     *        when clicking on the color options in checkout page
     * @note Instead of adding individual event listeners to each button, this approach adds a 
     *       single event listener 
     *       to the parent container of the cart items. When a click event occurs, it gets the 
     *       id of the clicked button and updates the main image accordingly. This method is more 
     *       efficient and scalable, especially when dealing with a large number of buttons or dynamically 
     *       generated content.
     * @param document.querySelector('.js-add-to-cart-corbeille-cart')
     *        -parent container element that holds all buttons for the cart items.
     * @param e - is the event object, It contains information about the click (where it happened, which element was clicked, etc.) 
     *       for identifying the cart item.
     * 
     * @code {JavaScript} 
     *       .addEventListener('click', (e) => { ... }); //Listen for ANY click inside a container.
     * @code {JavaScript} 
     *      const button = e.target.closest('.cart-action-btn'); // Find the actual button that was clicked
     *                                                              (even if user clicked icon inside it)
     */

    function displayMainImage(matchProduct){
        const buttonSelectItem = document.querySelectorAll('.item-color');
        const mainImage2 = document.querySelector('.js-image-section');
        const track = document.querySelector(".checkout-carousel-color-track");
        track.addEventListener('mouseover', (e) => {
            const button = e.target.closest('.item-color');
            if(button){
                let buttonId = button.dataset.id;
                mainImage2.src = `${matchProduct[buttonId - 1].img}`;
                buttonSelectItem.forEach((btn) => {
                    btn.style.border = "1px solid grey";
                    btn.style.borderRadius = "5px";
                });
                button.style.border = "2px solid blue";
            }
        });
    }
    //displayMainImage(matchingProduct);

    //////////////////////////////////////////////////////////////////

    /////// ITEMS SIZE BUTTONS FOR CLOTHES ITEMS IN CHECKOUT PAGE //////////

    /**
     * @brief This function generates dynamically the list of size buttons for clothes items
     * @param {*} matchProduct is the matching product 
     */

    function GenerateItemSize(matchProduct){
        const selectButtonSize = document.querySelector('.items-size')
        const allButtons = document.querySelector('.items-size-buttons');
        let numBttonPerRow = 7;
        let numButtons = matchProduct.size.length;
        let numberOfDiv = Math.ceil(numButtons/numBttonPerRow);
        let j = 0;
        if(matchProduct.size.length < 7){
            numBttonPerRow = matchProduct.size.length;
        }
        else{
            numBttonPerRow = 7;
        }

        for(let i = 0; i < numberOfDiv; ++i){
            let rowDiv = document.createElement("div");
            rowDiv.classList.add("items-size-buttons");
            let startIndex = i * numBttonPerRow;
            let endIndex = (i + 1) * numBttonPerRow;

            (matchProduct.size).slice(startIndex, endIndex).forEach((element) => {
                let button = document.createElement("button");
                button.classList.add("item-size-btton");
                button.innerHTML = `${matchProduct.size[j]}`;
                j = j + 1;
                button.dataset.id = j;                                    // set the id for each button
                rowDiv.appendChild(button);
            });

            selectButtonSize.appendChild(rowDiv);
        }
    }
    
    if(matchingProduct.categories[0] === "clothing"){
        GenerateItemSize(matchingProduct);
    }

    /////////////////////////////////////////////////////////////////////////////////////

    //////////////////// BIG CAROUSEL WITH SQUARE FOR CLOTHES AND COMPUTERS  ////////////////////////
    
function bigCarouselGenerator(matchProduct){

    const bigCarouselTrack = document.querySelector('.checkout-carousel-clothes-computers-track');

    bigCarouselTrack.style.backgroundImage = `url('${matchProduct.backgroundImage}')`;
    
    let filteredImages = products.filter(p => p.brand === matchProduct.brand); // Filter products

    filteredImages = filteredImages.slice(0, 16);                              // Limit to 16 items max
    
    bigCarouselTrack.innerHTML = '';                                           // Clear previous carousel

    const itemsPerPage = 8;
    const itemsPerSquare = 4;

    // LOOP THROUGH PAGES
    for (let i = 0; i < filteredImages.length; i += itemsPerPage) {

        const bigCarouselPage = document.createElement('div');                 // Create page

        bigCarouselPage.classList.add('checkout-carosel-clothes-computers-page');

        const currentPageItems = filteredImages.slice(i, i + itemsPerPage);     // Get current page items (8 max)

        // LOOP THROUGH SQUARES
        for (let j = 0; j < currentPageItems.length; j += itemsPerSquare) {

            const squareContainer = document.createElement('div');             // Create square container
            squareContainer.classList.add('square-itemname-container');

            const squareItems = currentPageItems.slice(j, j + itemsPerSquare); // Get 4 items for current square
            const firstSquare = document.createElement('div');                 // Main square

            firstSquare.classList.add('first-square-container');

            // FIRST COLUMN
            const firstColumnLink = document.createElement('a');
            firstColumnLink.classList.add('a-link-dolce-gabana');

            firstColumnLink.href =
                `${squareItems[0]?.productPage}.html?id=${squareItems[0]?.id}`;

            const firstColumn = document.createElement('div');

            firstColumn.classList.add('first-square-first-column');

            // SECOND COLUMN
            const secondColumnLink = document.createElement('a');
            secondColumnLink.classList.add('a-link-dolce-gabana');

            secondColumnLink.href =
                `${squareItems[2]?.productPage}.html?id=${squareItems[2]?.id}`;

            const secondColumn = document.createElement('div');
            secondColumn.classList.add('first-square-second-column');

            // ADD IMAGES
            squareItems.forEach((item, index) => {
                
                const image = document.createElement('img');
                image.classList.add('container1-img');

                if(item.categories[1] != "leggings"){
                image.src = item.images.cartImageConfiramation;
                }
                else{
                    image.src = item.images.gallery[0];
                }
                image.alt = item.brand;

                // First 2 images → first column
                if (index < 2) {
                    firstColumn.appendChild(image);

                } else {
                    secondColumn.appendChild(image);
                }
            
            });

            firstColumnLink.appendChild(firstColumn);       // Append columns to links
            secondColumnLink.appendChild(secondColumn);           
            firstSquare.appendChild(firstColumnLink);       // Append links to square
            firstSquare.appendChild(secondColumnLink);

            const nameLinkContainer = document.createElement('div');  // Create a div for link
            nameLinkContainer.classList.add('name-link-container');

            const title = document.createElement('div');              // Title

            title.classList.add('title-four-picture-container-name');
            title.textContent = squareItems[0]?.brand;

            const storeLinkContainer = document.createElement('div'); // Store Link Container
            storeLinkContainer.classList.add('title-four-picture-container-link');

            const storeLink = document.createElement('a');            // Store Link
            storeLink.href = '#';
            storeLink.textContent = 'Visit the store';
            storeLinkContainer.appendChild(storeLink);

            nameLinkContainer.appendChild(title);                     // Append title/link
            nameLinkContainer.appendChild(storeLinkContainer);
            squareContainer.appendChild(firstSquare);                 // Append square content
            squareContainer.appendChild(nameLinkContainer);
            bigCarouselPage.appendChild(squareContainer);             // Append square to page
        }

        bigCarouselTrack.appendChild(bigCarouselPage);                // Append page to track
    }    

}

bigCarouselGenerator(matchingProduct);

////////////////////////////////////////////////////////////////////////////////////

//////////////////////// NAVIGATION OF BIG CAROUSEL IN ELECTRONICS AND CLOTHING////////////////////////////////////////////

    /**
     * @brief This script handles Big carousel functionality in checkoutClothesComputer page only for 
     * clothing and computer products
     */
    let leftButtonBigCarousel = document.querySelector('.checkout-arrow-clothes-computers.left');
    let rightButtonBigCarousel = document.querySelector('.checkout-arrow-clothes-computers.right');
    let trackBigCarousel = document.querySelector('.checkout-carousel-clothes-computers-track');
    let currentPageBigCarousel = document.querySelector('.current-page-clothes-computers');
    let totalPageBigCarousel = document.querySelector('.total-pages-clothes-computers');
    let pagesBigCarousel = document.querySelectorAll('.checkout-carosel-clothes-computers-page');
    totalPageBigCarousel.innerHTML = pagesBigCarousel.length;

    let currentIndexBigCarousel = 0;
    let pageWidthBigCarousel = document.querySelector('.checkout-carousel-clothes-computers').clientWidth;
    function updateCarouselBigCarousel(){
        trackBigCarousel.style.transform = `translateX(-${currentIndexBigCarousel * pageWidthBigCarousel}px)`;
        currentPageBigCarousel.innerHTML = currentIndexBigCarousel + 1;
        if(currentIndexBigCarousel === 0){
            leftButtonBigCarousel.disabled = true;
        }
        else{
            leftButtonBigCarousel.disabled = false;
        }
        if(currentIndexBigCarousel === pagesBigCarousel.length - 1){
            rightButtonBigCarousel.disabled = true;
        }
        else{
            rightButtonBigCarousel.disabled = false;
        }
    }
    leftButtonBigCarousel.addEventListener('click', () => {
        if(currentIndexBigCarousel > 0){
            currentIndexBigCarousel--;
            updateCarouselBigCarousel();
        }
    });
    rightButtonBigCarousel.addEventListener('click', () => {
        if(currentIndexBigCarousel < pagesBigCarousel.length - 1){
            currentIndexBigCarousel++;
            updateCarouselBigCarousel();
        }
    });
    
    updateCarouselBigCarousel();         // Initialize carousel state
    

    ////////////////////////////////////////////////////////////////////////////////////////////////

    //////// GENERATE BIG IMAGES FOR CLOTHES AND COMPUTERS IN CHECKOUT PAGE ////////////

    /**
     * This function generates dynamically big images in clothes and computers checkout pages
     * @param {*} matchProduct: matchingProduct 
     */
    function bigImageGenerator(matchProduct){
        const bigImageContainer = document.querySelector('.clothes-computers-image-container');
        let imageArrayLength = matchProduct.manifacturer.bigImages.length;

        for (let i = 0; i < imageArrayLength; ++i) {

            const img = document.createElement('img');                         // Create image
            img.classList.add('js-clothes-computers-image-container');         // Add class
            img.src = matchProduct.manifacturer.bigImages[i];                  // Set image source
            img.alt = `${matchProduct.brand}`;                                 // add alt

            bigImageContainer.appendChild(img);                                // Append image into container
        }
    }

    bigImageGenerator(matchingProduct);                                         // Call the function 

}

/////////////////////////END OF ELECTRONICS AND  CLOTHING SPECIFIC CODE ////////////////////////////



/////////////// PRODUCT DETAILS SECTION IN CHECKOUT PAGE FOR ALL PAGES ////////////////

/**
 * @brief This script handles the product details section in checkout page for all pages
 * @note This script dynamically generates the product details section in the checkout page 
 *       for all pages. It iterates through the list of product details and creates a new div 
 *       element for each detail, which is then appended to the product details container in the HTML. This allows for a dynamic and flexible way to display product information based on the specific details of each product.
 */
function generateProductDetails(matchProduct){
    const productDetailsList = document.querySelectorAll('.product-details-container'); // product details list element

    productDetailsList.forEach(element => {
        matchProduct.productDetails.forEach(detail => {
            const detailItem = document.createElement('div');
            detailItem.classList.add('product');
            detailItem.innerHTML = detail;
            element.appendChild(detailItem);
        });
    });
    //return productDetailsList[0].outerHTML; 
}

generateProductDetails(matchingProduct);


////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////// GENERATE DYNAMICALLY CAROUSELS FOR PRODUCTS VIDEOS /////////////////////////////////////

const carouselsVideo = [
  { title: "PRODUCT VIDEOS", filter: p => p.categories[1] === matchingProduct.categories[1] },
];

// Generate carousel HTML for each category
carouselsVideo.forEach(carousel => {
  const filteredProducts = products.filter(carousel.filter);
  //const filteredProducts = products.filter(p => p.categories[1] === matchingProduct.categories[1]);

  renderCarousel(carousel.title, filteredProducts);
});

// Function to render a carousel given a title and list of products
function renderCarousel(title, items) {

    const clientRatingCarouselTrack = document.querySelector('.checkout-carousel-client-rating-track');
    let HTMLSummary = "";

    // Create pages with 3 items each
    const itemsPerPage = 3;

    for (let i = 0; i < items.length; i += itemsPerPage) {
        const page = document.createElement("div");
        page.classList.add("checkout-carosel-client-rating-page");

        items.slice(i, i + itemsPerPage).forEach(product => {
            HTMLSummary += `
                                <div class="checkout-carousel-client-rating-img">
                                    <img class="js-checkout-carousel-client-rating-img" src="${product.images.cartImageConfiramation}" alt="${product.brand}">
                                    <a href="${product.productPage}.html?id=${product.id}">
                                        <div class="checkout-carousel-client-rating-text">
                                            <span class="checkout-carousel-client-rating-text">
                                                ${product.shortTitle}...
                                            </span>
                                            <div class="carousel-img-reviews">
                                                <img src="images/bottom-carousel-images/star.png" alt="Star Rating">
                                                <span class="carousel-reviews">${product.rating.totalReviews}</span>
                                            </div>
                                            <div class="price-indollar">
                                                <span class="dollar-sign">$</span>
                                                <span class="dollars-amount">${product.price.priceDollar}</span>
                                                <span class="cents">${product.price.priceCents}</span>
                                                <span class="price-per-ounce"></span>
                                            </div>
                                        </div>
                                    </a>
                                </div>  
                                `;
        
        });

        page.innerHTML = HTMLSummary;
        clientRatingCarouselTrack.appendChild(page);
        HTMLSummary = "";                                     // Reset HTML summary for the next page
    }
}

//////////// CAROUSELS FOR PRODUCT VIDEO and PRODUCT VIDEO RATING BY CLIENTS ///////////
/**
 * @brief This script handles carousel for product video rating by clients functionality
 */
let leftButtonClientRating = document.querySelector('.checkout-arrow-client-rating.left-client-rating');
let rightButtonClientRating = document.querySelector('.checkout-arrow-client-rating.right-client-rating');
let trackClientRating = document.querySelector('.checkout-carousel-client-rating-track');
let currentPageClientRating = document.querySelector('.current-page-client-rating');
let totalPageClientRating = document.querySelector('.total-pages-client-rating');
let pagesClientRating = document.querySelectorAll('.checkout-carosel-client-rating-page');
/*totalPageClientRating.innerHTML = pagesClientRating.length;*/

let currentIndexClientRating = 0;
let pageWidthClientRating = document.querySelector('.checkout-carousel-client-rating').clientWidth;

function updateCarouselClientRating(){

    trackClientRating.style.transform = `translateX(-${currentIndexClientRating * pageWidthClientRating}px)`;
    /*currentPageClientRating.innerHTML = currentIndexClientRating + 1;*/
    if(currentIndexClientRating === 0){
        leftButtonClientRating.disabled = true;
    }
    else{
        leftButtonClientRating.disabled = false;
    }
    if(currentIndexClientRating === pagesClientRating.length - 1){
        rightButtonClientRating.disabled = true;
    }
    else{
        rightButtonClientRating.disabled = false;
    }
}
leftButtonClientRating.addEventListener('click', () => {
    if(currentIndexClientRating > 0){
        currentIndexClientRating--;
        updateCarouselClientRating();
    }
});
rightButtonClientRating.addEventListener('click', () => {
    if(currentIndexClientRating < pagesClientRating.length - 1){
        currentIndexClientRating++;
        updateCarouselClientRating();
    }
});

updateCarouselClientRating();         // Initialize carousel state

///////////////////////////////////////////////////////////////////////////////////////

/////////////////////// GENERATE DYNAMICALLY THE VIDEO FOR THIS PRODUCT ///////////////

/**
 * @brief This function handles the functionality of generating dynamically the video for this 
 *        product section in checkout page
 * @note This script filters the products based on the category of the matching product and 
 *       generates a carousel of videos related to the product being viewed. It creates HTML 
 *       elements for each video and appends them to the designated section in the checkout page, 
 *       allowing users to view videos that are relevant to the product they are purchasing.
 */
function renderVideoCarouselClientRating(matchItem){

    const filteredProductsVideo = products.filter(p => p.categories [1] === matchItem.categories[1]);
    const videoForThisProduct = document.querySelector('.video-for-this-product');

    let HTMLSummaryVideo = "";
    filteredProductsVideo.forEach(product => {
        HTMLSummaryVideo += `<div class="product-video">
                        <video id="product-video" controls >
                            <source src="${product.videos.galleryVideos[0]}" type="video/mp4">
                        </video>
                        <span class="product-video-text">
                            ${product.shortTitle}
                        </span>
                    </div>`;
    });

    videoForThisProduct.innerHTML += HTMLSummaryVideo;
}

renderVideoCarouselClientRating(matchingProduct);

////////////////////////////////////////////////////////////////////////////////////////////

///////////// GENERATE DYNAMICALLY FREQUENTLY BOUGHT TOGETHER SECTION IN CHECKOUT PAGE /////

function renderFrequentlyBoughtTogether(matchProduct){
    const filteredBoughtTogether = products.filter(p => p.categories[1] === matchProduct.categories[1]);
    const itemExists = filteredBoughtTogether.find(p => p.id === matchProduct.id);
    if (itemExists) {
        const index = filteredBoughtTogether.findIndex(p => p.id === matchProduct.id);
        if(index != 0){
            filteredBoughtTogether.splice(index, 1);
            filteredBoughtTogether.unshift(matchProduct); // Add the main product at the beginning of the array

        }    
    }

    const frequentlyBoughtTogether = document.querySelector('.products-totalPrice');
    let totalPrice = 0;

    if (filteredBoughtTogether.length > 3) {
        filteredBoughtTogether.length = 3; // Limit to 3 products
    }
    let HTMLSummaryBoughtTogether = "";
    filteredBoughtTogether.forEach((product, index) => {
        totalPrice += Number(product.price.currentPriceInCents);
        HTMLSummaryBoughtTogether += `
                    <a href="${product.productPage}.html?id=${product.id}">
                        <div class="first-image">
                            <img src="${product.images.cartImageConfiramation}" alt="${product.brand}}">
                            <i class="bi bi-check-square-fill"></i>
                            <div class="frequently-title-price">
                                <span>${product.shortTitle}</span>
                                <span class="frequently-price">$${product.price.currentPrice} ${displayPricePerOunce(product)}</span>
                            </div>
                        </div>
                    </a>
                    `;
                    if(index < filteredBoughtTogether.length - 1){
                        HTMLSummaryBoughtTogether += `<div class="plus-sign">+</div>`;
                    }
    });
    let text = filteredBoughtTogether.length > 1 ? `Add all ${filteredBoughtTogether.length} to cart` : `Add to cart`;
    HTMLSummaryBoughtTogether += `
                    <div class="totalprice">
                        <span>Total price: 
                            <span class="total-price-container">$${(totalPrice / 100).toFixed(2)}</span>
                        </span>
                        <button class="add-all-3-to-cart">${text}</button>
                    </div>`;
    frequentlyBoughtTogether.innerHTML = HTMLSummaryBoughtTogether;
}

renderFrequentlyBoughtTogether(matchingProduct);

//////////////////// UTILITY FUNCTION TO DISPLAY PRICE PER OUNCE ////////////////////////////
function displayPricePerOunce(matchProduct){
    let fluidOunce = matchProduct.categories[0] === "drink" ? `(${matchProduct.price.pricePerUnit}/fluid ounce)` : "";
    return fluidOunce;
}

////////////////////////////////////////////////////////////////////////////////////////////

/////// GENERATE DYNAMICALLY THE VIDEO CAROUSEL FOR SIMILAR PRODUCT IN CHECKOUT PAGE ///////

/**
 * @brief This function generates dynamically the video carousel for similar products in checkout page
 * @param {*} matchProduct is the matching product for which we want to generate the video carousel 
 *          for similar products
 * @note This function filters the products based on the category of the matching product and 
 *       generates a carousel of videos related to similar products. It creates HTML elements for 
 *       each video and appends them to the designated section in the checkout page, allowing users 
 *       to view videos that are relevant to products similar to the one they are purchasing. 
 */

function renderVideoCarouselForSimilarProducts(matchProduct){
    const carouselVideostrack = document.querySelector('.checkout-carousel-video-track');
    const videosPerPage = 3;
    const filteredItemsVideo = products.filter(p => p.categories[1] === matchProduct.categories[1]);
    const filteredItemsLength = filteredItemsVideo.length; 

    let HTMLSummaryVideoCarousel = "";
    let control;

    for(let i = 0; i < filteredItemsLength; i += videosPerPage){
        const pageDiv = document.createElement("div");
        pageDiv.classList.add("checkout-carosel-video-page");

        filteredItemsVideo.slice(i, i + videosPerPage).forEach((video, index) => {
            
            control = index == 0 ? "autoplay muted playsinline loop" : "controls";
             
            HTMLSummaryVideoCarousel += `
                        <div class="checkout-carousel-vid">
                            <video ${control} class="js-checkout-carousel-vid">
                                <source src="${video.videos.galleryVideos[0]}" type="video/mp4">
                            </video>
                            <a href="${video.productPage}.html?id=${video.id}">
                                <div class="sponsored-text-video">
                                    <img class="js-sponsored-text-video" src="${video.videos.galleryVideosImages[0]}" alt="${video.brand}">
                                    <div class="text-garden">
                                        <span>
                                            ${video.shortTitle}...<br>
                                        </span> 
                                        <span class="clearence">
                                        -${video.price.discountPercent}% $${video.price.currentPrice}
                                        </span> 
                                        <span class="old-price">$${((video.price.currentPriceInCents + (video.price.currentPriceInCents * video.price.discountPercent / 100)) / 100).toFixed(2)}</span>
                                        <span class="sponsored-prime"><i class="bi bi-check-lg"></i>prime</span>
                                    </div>
                                </div>
                            </a>   
                        </div>`;
        });
        pageDiv.innerHTML = HTMLSummaryVideoCarousel;
        carouselVideostrack.appendChild(pageDiv);
        HTMLSummaryVideoCarousel = "";                        // Reset HTML summary for the next page
    }
}

renderVideoCarouselForSimilarProducts(matchingProduct);

///////////////////////// HANDLES VIDEO CAROUSEL NAVIGATION ////////////////////////////
/**
 * @brief This script handles carousel video functionality
 */
let leftButtonVideo = document.querySelector('.checkout-arrow-video.left-video');
let rightButtonVideo = document.querySelector('.checkout-arrow-video.right-video');
let trackVideo = document.querySelector('.checkout-carousel-video-track');
let currentPageVideo = document.querySelector('.current-video-page');
let totalPageVideo = document.querySelector('.total-video-pages');
let pagesVideo = document.querySelectorAll('.checkout-carosel-video-page');
totalPageVideo.innerHTML = pagesVideo.length;
let currentIndexVideo = 0;
let pageWidthVideo = document.querySelector('.checkout-carousel-video').clientWidth;

function updateCarouselVideo(){
    trackVideo.style.transform = `translateX(-${currentIndexVideo * pageWidthVideo}px)`;
    currentPageVideo.innerHTML = currentIndexVideo + 1;
    if(currentIndexVideo === 0){
        leftButtonVideo.disabled = true;
    }
    else{
        leftButtonVideo.disabled = false;
    }
    if(currentIndexVideo === pagesVideo.length - 1){
        rightButtonVideo.disabled = true;
    }
    else{
        rightButtonVideo.disabled = false;
    }
}
leftButtonVideo.addEventListener('click', () => {
    if(currentIndexVideo > 0){
        currentIndexVideo--;
        updateCarouselVideo();
    }
});
rightButtonVideo.addEventListener('click', () => {
    if(currentIndexVideo < pagesVideo.length - 1){
        currentIndexVideo++;
        updateCarouselVideo();
    }
});
// Initialize carousel state
updateCarouselVideo();

////////////////////////////////////// HANDLES ADVERTISSMENT IMAGES ///////////////////////////

function topAdvertImage(){
    let randomIndex = Math.floor(Math.random() * products.length);
    const topAvertImage = document.querySelector('.advertissement');
    topAvertImage.innerHTML = `
                            <img src="${products[randomIndex].images.cartImageConfiramation}" alt="${products[randomIndex].brand}">
                            <div class="advertissement-text">
                                <div class="product-text">
                                    <span>${products[randomIndex].shortTitle}...
                                    </span>
                                </div>
                                <div class="star-price-container">
                                    <div class="star-rating">
                                        <img src="images/bottom-carousel-images/star.png" alt="Star Rating">
                                        <span>${products[randomIndex].rating.totalReviews}</span>
                                    </div>
                                    <span>|</span>
                                    <span class="price">$${products[randomIndex].price.currentPrice}</span>
                                    <span class="check-prime"><i class="bi bi-check-lg"></i>prime</span>
                                </div>
                                <div class="shop-now">
                                    <a href="${products[randomIndex].productPage}.html?id=${products[randomIndex].id}">Shop now ></a>
                                </div>
                            </div>
                            `;

                        //topAvertImage.style.backgroundColor = "green";  
}
topAdvertImage();
///////////////////////////////////////////////////////////////////////////////////////////////
function lastImageAdvert(){

    const sponsoredText = document.querySelector('.sponsored-imgAdvert');
    const lastImageAdvert = document.querySelector('.checkout-corePower-last-advert1');
    let randomIndex = Math.floor(Math.random() * products.length);

    if(products[randomIndex].images.advertisementImages2.length === 1){
        products[randomIndex].images.advertisementImages2.forEach(img => {
            const imgAdvertDiv = document.createElement('div');
            imgAdvertDiv.classList.add('core-power-advertissement');

            const link = document.createElement('a');
            link.href = `${products[randomIndex].productPage}.html?id=${products[randomIndex].id}`;
            
            const imgAdvert = document.createElement('img');
            imgAdvert.classList.add('js-advert-img');
            imgAdvert.src = products[randomIndex].images.advertisementImages2[0]; 
            imgAdvert.alt= products[randomIndex].brand;
            
            link.appendChild(imgAdvert);
            imgAdvertDiv.appendChild(link);
            lastImageAdvert.appendChild(imgAdvertDiv);
        
        });
    }
    else{
        sponsoredText.style.display = "none";
    }
}

lastImageAdvert();

////////////////////////////////////////////////////////////////////////////////////////////

function firstImageAdvert(){

    const sponsoredText1 = document.querySelector('.sponsored-imgAdvert1');
    const firstImageAdvert = document.querySelector('.advertissement-section1');
    let randomIndex = Math.floor(Math.random() * products.length);

    if(products[randomIndex].images.advertisementImages1.length === 1){
        products[randomIndex].images.advertisementImages1.forEach(img => {
            const imgAdvertDiv = document.createElement('div');
            imgAdvertDiv.classList.add('advertissement-container');

            const link = document.createElement('a');
            link.href = `${products[randomIndex].productPage}.html?id=${products[randomIndex].id}`;
            
            const imgAdvert = document.createElement('img');
            imgAdvert.classList.add('js-advert-img');
            imgAdvert.src = products[randomIndex].images.advertisementImages1[0]; 
            imgAdvert.alt= products[randomIndex].brand;
            
           link.appendChild(imgAdvert);
            imgAdvertDiv.appendChild(link);
            firstImageAdvert.appendChild(imgAdvertDiv);
            
        });
    }
    else{
        sponsoredText1.style.display = "none";

    }
}
firstImageAdvert();

///////////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////

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













