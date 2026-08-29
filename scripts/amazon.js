let cart1 = [];
/**
 * @brief :This function checks for user authentication on page load. 
 * If the user is not authenticated, it redirects them to the sign-in page. 
 * If authenticated, it fetches the user's profile data from the server.
 * @note This function runs once the DOM content is fully loaded.
 */
document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/sign_in.html";
        //window.location.href = "amazon.html";
        return;
    }

    const response = await fetch("http://localhost:4000/api/v1/users/profile", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        // token invalid or expired
        localStorage.removeItem("token");
        window.location.href = "/sign_in.html";
        //window.location.href = "amazon.html";
        return;
    }

    const data = await response.json();

    //console.log(data);
});

///////////////////////////////////////////////////////////////////////////////////////////////////
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

        if (!response.ok) {

            console.log(
                "No cart found for user."
            );

            return;
        }


        const data = await response.json();

        console.log("cart has been loaded:");
        console.log(data.cart.items);

        //return data.cart.items || [];
        return data.cart.items;

    } catch (error) {

        console.error(
            "Error loading cart:",
            error
        );
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////


document.addEventListener(
    "DOMContentLoaded",
    async () => {

        cart1 = await loadCart();
       
        localStorage.setItem("cart1", JSON.stringify(cart1));            // Save updated cart
        
    }
);

////////////////////////////////// SLIDESHOW FUNCTIONALITY ///////////////////////////////
/**
 * @brief :This function handles the slideshow functionality 
 * including next/previous slide navigation, auto-sliding, 
 * and video play/pause controls.*/

// Select all slides
const slides = document.querySelectorAll('.slide');

// Buttons
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

// Current slide index
let currentIndex = 0;

// Auto slide interval (5 seconds)
let autoSlide = setInterval(nextSlide, 5000);

// Show slide by index
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');

    // If slide is a video, pause it
    if (slide.tagName === 'VIDEO') {
      slide.pause();
      slide.currentTime = 0;
    }
  });

  const activeSlide = slides[index];
  activeSlide.classList.add('active');

  // If active slide is a video, play it
  if (activeSlide.tagName === 'VIDEO') {
    activeSlide.play();
  }
}

// Move to next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

// Move to previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

// Button event listeners
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoSlide();
});

// Reset auto slideshow after manual click
function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, 5000);
}
/*function to toggle play/pause on video slides */
const video = document.getElementById("video");
const playPauseBtn = document.getElementById("playPauseBtn");
const muteBtn = document.getElementById("muteBtn");

// Play / Pause
playPauseBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
  } else {
    video.pause();
    playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
  }
});

// Mute / Unmute
muteBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  if(video.muted){
    muteBtn.innerHTML = '<img src="images/volume-mute.png" alt="Muted">';
  } else {
    muteBtn.innerHTML = '<img src="images/volume-up.png" alt="Unmuted">';
  }
});

// Reset play icon when video ends
video.addEventListener("ended", () => {
  playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
});

/////////////////////////////// ADDING ITEMS DYNAMICALLY IN SCROLL CAROUSELS ////////////////////////////

/**
 * @brief This code render scrollable carousel on the home page
 */


let matchItem
let itemClickedID = localStorage.getItem("id");


if(itemClickedID){
  matchItem = products.find(p => p.id === itemClickedID);
}
else{
  matchItem = products.find(p => p.id === products[0].id);
}

let matchClickedItemArray = products.filter(p => p.categories[1] === matchItem.categories[1]);

//Best Sellers in Beauty & Personal Care

const carousels = [
    {
        title: "Selected for you",
        //products: products.slice(0, 20)
        products: matchClickedItemArray
    },
    {
        title: "Best Sellers in Electronics",
        products: products.slice(15, 30)
    },
    {
        title: "Recommended For You",
        products: products.slice(30, 45)
    },
    {
        title: "Clothes & Deals",
        products: products.slice(45, 60)
    },
    {
        title: "Home Essentials",
        products: products.slice(60, 72)
    },
    {
        title: "Recommended For You",
        products: products.slice(30, 45)
    },
    {
        title: "Top Fashion Deals",
        products: products.slice(50, 70)
    }
];

let carouselHTML = '';
document.querySelectorAll('.carousel-section').forEach((carousel, index) => {

    carouselHTML += `
              
                    <div class="leftpage-section"></div>
                    <div class="carousel">
                        <div class="carousel-title">
                            <span>${carousels[index].title}</span>
                        </div>
                        <div class="carousel-track">

                            <button class="arrow left">&#10094;</button>
                            `;
                            
    carousels[index].products.forEach(item => {

      carouselHTML += `
            
                   <a class="a-link-normal" href="${item.productPage}.html?id=${item.id}">
                      <img src="${item.images.cartImageConfiramation}" alt="${item.brand}">
                   </a>
                `;

    });

    carouselHTML += `
           
                  <button class="arrow right">&#10095;</button>
                  </div>   
              </div>
              <div class="rightpage-section"></div>`;


    carousel.innerHTML = carouselHTML;
    carouselHTML = "";


});


///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// GENERATE DYNAMICALLY MULTIPLE SCROLLABLE CAROUSELS ///////////////////////////////

function generateMultipleCarousel(){
    const carousels = [
    { title: "Selected for you", filteredItems : products.filter(p => p.categories[1] === matchItem.categories[1]) },
    { title: "Beverages", filteredItems : products.filter(p => p.categories[1] === "beverages") },
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
///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// NAVIGATE SCROLL CAROUSEL ///////////////////////////////////////
/**
 * @brief :This function handles the carousel functionality 
 * including next/previous item navigation.
 * @note Handles carousel functionality per carousel instance
 */

document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const leftBtn = carousel.querySelector('.arrow.left');
  const rightBtn = carousel.querySelector('.arrow.right');
  const scrollAmount = 300;
  const tolerance = 2;

  function updateArrows() {
    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    leftBtn.disabled = track.scrollLeft <= tolerance;
    rightBtn.disabled = track.scrollLeft >= maxScrollLeft - tolerance;
  }

  leftBtn.addEventListener('click', e => {
    e.preventDefault(); // Prevent the link from opening the href or url
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', e => {
    e.preventDefault(); // Prevent the link from opening the href or url
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  track.addEventListener('scroll', updateArrows);
  window.addEventListener('load', updateArrows);
  window.addEventListener('resize', updateArrows);
});

//////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////////////////////////////////

function HomepageCartQuantity(){
    let cartQuantity = 0;   // reset every time
    let cart1 = JSON.parse(localStorage.getItem('cart1')) || [];
    
    cart1.forEach(item => {
        cartQuantity += item.quantity;
    });
    
    // store values
    localStorage.setItem("cartQuantity", cartQuantity);
}

HomepageCartQuantity();

///////////////////////// Cart Quantity Display in Header /////////////////////////////////////////////
function HomePageCartNumberItems(){
  let cartNumber = Number(localStorage.getItem("cartQuantity")) || 0; //Get current cart quantity from localStorage or initialize to 0 
  const cartNumberElement = document.querySelector('.js-cart-num-items');
  cartNumberElement.innerText = cartNumber;
}

HomePageCartNumberItems();
//////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////// GENERATE DYNAMICALLY ROW OF SQUARES IMAGES///////////////////////////////
/**
 * @brief This code generates dynamically The row of square images
 * @code: {JavaScript}
 *        {products.filter(p => p.categories.includes("jewelry")).slice(0, 4)}
 *         includes() is a JavaScript method that checks whether an array contains a specific value.
 *         It returns true if the specific value is included in the array and the product is store
 * 
 */
//////////////////// GENERATE DYNAMICALLY THE FIRST ROW OF SQUARES IMAGES ///////////////////
function generateFirstRowSquareImages() {
    const sections = [
        {
            title: "Selected for you",
            linkText: "Shop Selected for you",
           // products: products.filter(p => p.categories[1] === matchItem.categories[1]).slice(0, 4)
            products: [
            ...products.filter(p => p.categories.includes("shirts")).slice(0, 2),

            ...products.filter(p => p.categories.includes("dresses")).slice(0, 2)
            ]
        },

        {
            title: "Shop Beaauty & Skincare Picks",
            linkText: "Skincare on Amazon",
            products: [
            ...products.filter(p => p.categories.includes("watches")).slice(0, 2),

            ...products.filter(p => p.categories.includes("tablets")).slice(0, 2)
            ]
        },

        {
            title: "Deals on Tech",
            linkText: "all tech deals",
            products: [
            ...products.filter(p => p.categories.includes("computers")).slice(0, 1),
            ...products.filter(p => p.categories.includes("tablets")).slice(0, 1),
            ...products.filter(p => p.categories.includes("watches")).slice(0, 1),
            ...products.filter(p => p.categories.includes("watches")).slice(0, 1)
            ]
        },

        {
            title: "Trending Watches",
            linkText: "See all watches",
            products: products.filter(p => p.categories.includes("watches")).slice(0, 4)
        }
    ];

    const rowElement = document.querySelectorAll('.js-first-row-container');
    const squareElement = document.querySelector('.title-four-picture-container');

    let squareHTML = '';

    rowElement.forEach(square => {
        for(let i = 0; i < 4; ++i){
            
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('title-four-picture-container');

            squareHTML += `<span>${sections[i].title}</span>
                        <div class="first-square-container">
                                <div class="first-square-first-column">
                                    <a class="a-link-dolce-gabana" href="${sections[i].products[0].productPage}.html?id=${sections[i].products[0].id}">
                                        <img class="container1-img" src="${sections[i].products[0].images.cartImageConfiramation}" alt="${sections[i].products[0].brand}">
                                    </a>
                                    <div class="chanel">${sections[i].products[0].brand}</div>
                                    <a class="a-link-dolce-gabana" href="${sections[i].products[1].productPage}.html?id=${sections[i].products[1].id}">
                                        <img class="container1-img" src="${sections[i].products[1].images.cartImageConfiramation}" alt="${sections[i].products[1].brand}">
                                    </a>
                                    <div class="chanel">${sections[i].products[1].brand}</div>   
                                </div>
                            
                                <div class="first-square-first-column">
                                    <a class="a-link-dolce-gabana" href="${sections[i].products[2].productPage}.html?id=${sections[i].products[2].id}">
                                        <img class="container1-img" src="${sections[i].products[2].images.cartImageConfiramation}" alt="${sections[i].products[2].brand}">
                                    </a>
                                    <div class="chanel">${sections[i].products[2].brand}</div>
                                    <a class="a-link-dolce-gabana" href="${sections[i].products[3].productPage}.html?id=${sections[i].products[3].id}">
                                        <img class="container1-img" src="${sections[i].products[3].images.cartImageConfiramation}" alt="${sections[i].products[3].brand}">
                                    </a>
                                    <div class="chanel">${sections[i].products[3].brand}</div>   
                                </div>
                        </div>
                        <a href="#jewerly">Shop ${sections[i].title}</a> 
                    `;


            squareDiv.innerHTML = squareHTML;
            square.appendChild(squareDiv);
            squareHTML = '';    
        }

    });
}

generateFirstRowSquareImages();

////////////////////////////////////////////////////////////////////////////////////////////

//////////////////// GENERATE THE SECOND AND THIRD ROW OF SQUARES IMAGES ////////////////////

function generateRowSquareImages() {
    const sections = [
        {
            title: "Keep Shopping for",
            linkText: "Shop Shirts & Dress",
            //products: products.filter(p => p.categories[1] === matchItem.categories[1]).slice(0, 4)
            products: [
            ...products.filter(p => p.categories.includes("shirts")).slice(0, 2),

            ...products.filter(p => p.categories.includes("dresses")).slice(0, 2)
            ]
        },

        {
            title: "Shop Watches & Tablets Picks",
            linkText: "Shop Saks on Amazon",
            products: [
            ...products.filter(p => p.categories.includes("watches")).slice(0, 2),

            ...products.filter(p => p.categories.includes("tablets")).slice(0, 2)
            ]
        },

        {
            title: "Deals on Tech",
            linkText: "Shop all tech deals",
            products: [
            ...products.filter(p => p.categories.includes("computers")).slice(0, 1),
            ...products.filter(p => p.categories.includes("tablets")).slice(0, 1),
            ...products.filter(p => p.categories.includes("watches")).slice(0, 1),
            ...products.filter(p => p.categories.includes("watches")).slice(0, 1)
            ]
        },

        {
            title: "Trending Watches",
            linkText: "See all watches",
            products: products.filter(p => p.categories.includes("watches")).slice(0, 4)
        }
    ];

    const rowElement = document.querySelectorAll('.js-row-container');
    const squareElement = document.querySelector('.title-four-picture-container');

    let squareHTML = '';

    rowElement.forEach(square => {
        for(let i = 0; i < 4; ++i){
            
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('title-four-picture-container');

            squareHTML += `<span>${sections[i].title}</span>
                        <div class="first-square-container">
                                <div class="first-square-first-column">
                                    <a class="a-link-dolce-gabana" href="${sections[i].products[0].productPage}.html?id=${sections[i].products[0].id}">
                                        <img class="container1-img" src="${sections[i].products[0].images.cartImageConfiramation}" alt="${sections[i].products[0].brand}">
                                    </a>
                                    <div class="chanel">${sections[i].products[0].brand}</div>
                                    <a class="a-link-dolce-gabana" href="${sections[i].products[1].productPage}.html?id=${sections[i].products[1].id}">
                                        <img class="container1-img" src="${sections[i].products[1].images.cartImageConfiramation}" alt="${sections[i].products[1].brand}">
                                    </a>
                                    <div class="chanel">${sections[i].products[1].brand}</div>   
                                </div>
                            
                                <div class="first-square-first-column">
                                    <a class="a-link-dolce-gabana" href="${sections[i].products[2].productPage}.html?id=${sections[i].products[2].id}">
                                        <img class="container1-img" src="${sections[i].products[2].images.cartImageConfiramation}" alt="${sections[i].products[2].brand}">
                                    </a>
                                    <div class="chanel">${sections[i].products[2].brand}</div>
                                    <a class="a-link-dolce-gabana" href="${sections[i].products[3].productPage}.html?id=${sections[i].products[3].id}">
                                        <img class="container1-img" src="${sections[i].products[3].images.cartImageConfiramation}" alt="${sections[i].products[3].brand}">
                                    </a>
                                    <div class="chanel">${sections[i].products[3].brand}</div>   
                                </div>
                        </div>
                        <a href="#jewerly">Shop ${sections[i].title}</a> 
                    `;


            squareDiv.innerHTML = squareHTML;
            square.appendChild(squareDiv);
            squareHTML = '';    
        }

    });
}

generateRowSquareImages();

////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// TRANSLATE TEXT ON THE WEBSITE /////////////////////////////////////////////
/**
 * @brief :This function handles the translation of text on the website based on the selected language.
 * @note It uses a JSON file containing translations for different languages.
 */

const languages = {

    en: {

        cart: "Cart",
        returns: "Returns",
        orders: "Orders",
        hello: "Hello,",
        sign_in: "Sign in",
        account_lists: "Account & Lists",
        deliver_to: "Deliver to ",
        you: "you",
        update_location: "Update location",
        all: "All",
        search_in: "Search in",
        search: "Search on Amazon",
        amazon_haul: "Amazon Haul",
        prime: "Prime",
        pharmacy: "Pharmacy",
        customer_service: "Customer Service",
        music: "Music",
        amazon_home: "Amazon Home",
        sports_outdoors: "Sports & Outdoors",
        fashion: "Fashion",
        toys_games: "Toys & Games",
        medical_care: "Medical Care",
        amazon_basics: "Amazon Basics",
        best_sellers: "Best Sellers",
        books: "Books",
        new_releases: "New Releases",
        registry: "Registry",
    },

    es: {

        cart: "Carrito",
        returns: "Devoluciones",
        orders: "Pedidos",
        hello: "Hola,",
        sign_in: "Iniciar sesión",
        account_lists: "Cuenta y Listas",
        deliver_to: "Entregar a ",
        you: "tú",
        update_location: "Actualizar ubicación",
        all: "Todo",
        search_in: "Buscar en",
        search: "Buscar en Amazon",
        amazon_haul: "Amazon Haul",
        prime: "Prime",
        pharmacy: "Farmacia",
        customer_service: "Servicio al Cliente",
        music: "Música",
        amazon_home: "Amazon Hogar",
        sports_outdoors: "Deportes y Aire Libre",
        fashion: "Moda",
        toys_games: "Juguetes y Juegos",
        medical_care: "Cuidado Médico",
        amazon_basics: "Amazon Básico",
        best_sellers: "Más Vendidos",
        books: "Libros",
        new_releases: "Nuevos Lanzamientos",
        registry: "Registro"
    },

    fr: {
        cart: "Panier",
        returns: "Retours",
        orders: "Commandes",
        hello: "Bonjour,",
        sign_in: "Connectez-vous",
        account_lists: "Compte et Listes",
        deliver_to: "Livrer à ",
        you: "vous",
        update_location: "destination",
        all: "Tout",
        search_in: "Chercher dans",
        search: "Chercher sur Amazon",
        amazon_haul: "Amazon Haul",
        prime: "Prime",
        pharmacy: "Pharmacie",
        customer_service: "Service Client",
        music: "Musique",
        amazon_home: "Amazon Maison",
        sports_outdoors: "Sports et Plein Air",
        fashion: "Mode",
        toys_games: "Jouets et Jeux",
        medical_care: "Soins Médicaux",
        amazon_basics: "Amazon Basique",
        best_sellers: "Meilleures Ventes",
        books: "Livres",
        new_releases: "Nouveautés",
        registry: "Registre"

    }
};

// Change language function

function changeLanguage(language){

    const dictionary = languages[language];

    // Text

    document.querySelectorAll("[data-i18n]").forEach(element=>{

        const key = element.dataset.i18n;

        if(dictionary[key]){

            element.textContent = dictionary[key];

        }

    });

    // Placeholder

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element=>{

        const key = element.dataset.i18nPlaceholder;

        if(dictionary[key]){

            element.placeholder = dictionary[key];

        }

    });

    localStorage.setItem("language",language);

}

// Radio buttons events
const radios = document.querySelectorAll("input[name='language']");

radios.forEach(radio=>{

    radio.addEventListener("change",()=>{

        changeLanguage(radio.value);

    });

});

// Restore language on page load
const savedLanguage = localStorage.getItem("language") || "en";

changeLanguage(savedLanguage);

document.querySelector(

`input[value="${savedLanguage}"]`

).checked = true;
///////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////// PLAY VIDEO ONLY IF VIDEO IS VISIBLE IN THE VIEWPORT ////////////////////////////////////////////

const carouselVideos = document.querySelectorAll(".video-carousel");

const videoObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const video = entry.target;

      if (entry.isIntersecting) {
        video.muted = true;
        video.play().catch(error => {
          console.warn("Video autoplay blocked:", error);
        });
      } else {
        video.pause();
      }
    });
  },
  {
    threshold: 0.6
  }
);

carouselVideos.forEach(video => {
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  videoObserver.observe(video);
});

//////////////////////////////////////////////////////////////////////////////////////

/////////////////////////// NAVIGATE THE COLORED CAROUSEL /////////////////////////////
/**
 * @brief :This function handles the carousel functionality 
 * including next/previous item navigation.
 * @note Handles carousel functionality per carousel instance
 */

document.querySelectorAll('.carousel-square').forEach(carousel => {
  const trackSquareCarousel = carousel.querySelector('.carousel-square-track');
  const leftBtnSquareCarousel = carousel.querySelector('.arrow-square.left-square');
  const rightBtnSquareCarousel = carousel.querySelector('.arrow-square.right-square');
  const scrollAmountSquareCarousel = 300;
  const toleranceSquareCarousel = 2;

  function navigateCarousel() {
    const maxScrollLeft = trackSquareCarousel.scrollWidth - trackSquareCarousel.clientWidth;

    leftBtnSquareCarousel.disabled = trackSquareCarousel.scrollLeft <= toleranceSquareCarousel;
    rightBtnSquareCarousel.disabled = trackSquareCarousel.scrollLeft >= maxScrollLeft - toleranceSquareCarousel;
  }

  leftBtnSquareCarousel.addEventListener('click', e => {
    e.preventDefault(); // Prevent the link from opening the href or url
    trackSquareCarousel.scrollBy({ left: -scrollAmountSquareCarousel, behavior: 'smooth' });
  });

  rightBtnSquareCarousel.addEventListener('click', e => {
    e.preventDefault(); // Prevent the link from opening the href or url
    trackSquareCarousel.scrollBy({ left: scrollAmountSquareCarousel, behavior: 'smooth' });
  });

  trackSquareCarousel.addEventListener('scroll', navigateCarousel);
  window.addEventListener('load', navigateCarousel);
  window.addEventListener('resize', navigateCarousel);
});

///////////////////////////////////////////////////////////////////////////////////


// First colored row of squares images

const firstRowSlides = [
  {
    type: "video",
    href: "search.html?q=clothing",
    smallTitle: "Trending now",
    boldTitle: "Shop the summer color edit",
    video: "images/men-shoes/shop-summer-video.mp4",
    poster: "images/men-shoes/shop-summer.jpg"
  },

  {
    type: "video",
    href: "#",
    smallTitle: "New releases",
    boldTitle: "World's smallest smart ring",
    video: "images/men-shoes/ring.mp4",
    poster: "images/men-shoes/ring-img.jpg"
  },

  {
    type: "products",
    href: "#",
    smallTitle: "Spend less on college tech",
    boldTitle: "Laptops starting at $200",

    // Select four products from the products array.
    category: "computers",

    // Optional image behind the four product images.
    poster: "images/men-shoes/computer.jpg"
  },

  {
    type: "video",
    href: "#",
    primeTitle: "Buy a new car, get a $1,000 gift card*",
    primeSubtitle: "Prime members exclusive",
    logo: "images/men-shoes/amazon-autos.png",
    disclaimer:
      "*Amazon.com gift card. Select areas. Terms apply.",
    video: "images/men-shoes/car.mp4",
    poster: "images/men-shoes/car-poster.jpg"
  },

  {
    type: "video",
    href: "#",
    smallTitle: "College must-haves",
    boldTitle: "Shop our 29+ water bottles",
    video: "images/men-shoes/water-bottle.mp4",
    poster: "images/men-shoes/stanley.jpg"
  },

  {
    type: "products",
    href: "#",
    boldTitle: "Top 100+ first apartment finds",
    titleClass: "image-title-bold-prime",
    category: "shirts",
    poster: "images/men-shoes/tv.jpg"
  },

  {
    type: "products",
    href: "#",
    smallTitle: "Premium brands",
    boldTitle: "Shop summer finds under $100",
    category: "clothing",
    poster: "images/men-shoes/Summer.jpg"
  },

  {
    type: "image",
    href: "#",
    smallTitle: "Spend less every day",
    boldTitle: "Shop summer favorites under $50",
    image: "images/men-shoes/stanley.jpg",
    imageAlt: "Summer favorites"
  }
];

const secondRowSlides = [
  {
    type: "video",
    href: "#",
    smallTitle: "Trending now",
    boldTitle: "Shop the summer color edit",
    video: "images/men-shoes/kid-water-bottle-video.mp4",
    poster: "images/men-shoes/kid-water-bottle.jpg"
  },

  {
    type: "products",
    href: "#",
    smallTitle: "Shop & Save",
    boldTitle: "Deals on Amazon Devices",

    // Select four products from the products array.
    category: "computers",

    // Optional image behind the four product images.
    poster: "images/men-shoes/amazon_devices.jpg"
  },

  {
    type: "video",
    href: "#",
    smallTitle: "Shop deals on clothes & more",
    boldTitle: "Ready-fit under $50",
    video: "images/men-shoes/college-fit.mp4",
    poster: "images/men-shoes/college-fit-poster.jpg"
  },

  {
    type: "products",
    href: "#",
    boldTitle: "Top 100+ first apartment finds",
    titleClass: "image-title-bold-prime",
    category: "shirts",
    poster: "images/men-shoes/tv.jpg"
  },

  {
    type: "products",
    href: "#",
    smallTitle: "Premium brands",
    boldTitle: "Shop summer finds under $100",
    category: "clothing",
    poster: "images/men-shoes/Summer.jpg"
  },

  {
    type: "image",
    href: "#",
    smallTitle: "Spend less every day",
    boldTitle: "Shop summer favorites under $50",
    image: "images/men-shoes/stanley.jpg",
    imageAlt: "Summer favorites"
  }
];

const thirdRowSlides = [
  {
    type: "video",
    href: "#",
    smallTitle: "Trending now",
    boldTitle: "Shop the summer color edit",
    video: "images/men-shoes/shop-summer-video.mp4",
    poster: "images/men-shoes/shop-summer.jpg"
  },

  {
    type: "video",
    href: "#",
    smallTitle: "New releases",
    boldTitle: "World's smallest smart ring",
    video: "images/men-shoes/ring.mp4",
    poster: "images/men-shoes/ring-img.jpg"
  },

  {
    type: "products",
    href: "#",
    smallTitle: "Spend less on college tech",
    boldTitle: "Laptops starting at $200",

    // Select four products from the products array.
    category: "computers",

    // Optional image behind the four product images.
    poster: "images/men-shoes/computer.jpg"
  },

  {
    type: "video",
    href: "#",
    primeTitle: "Buy a new car, get a $1,000 gift card*",
    primeSubtitle: "Prime members exclusive",
    logo: "images/men-shoes/amazon-autos.png",
    disclaimer:
      "*Amazon.com gift card. Select areas. Terms apply.",
    video: "images/men-shoes/car.mp4",
    poster: "images/men-shoes/car-poster.jpg"
  },

  {
    type: "video",
    href: "#",
    smallTitle: "College must-haves",
    boldTitle: "Shop our 29+ water bottles",
    video: "images/men-shoes/water-bottle.mp4",
    poster: "images/men-shoes/stanley.jpg"
  },

  {
    type: "products",
    href: "#",
    boldTitle: "Top 100+ first apartment finds",
    titleClass: "image-title-bold-prime",
    category: "shirts",
    poster: "images/men-shoes/tv.jpg"
  },

  {
    type: "products",
    href: "#",
    smallTitle: "Premium brands",
    boldTitle: "Shop summer finds under $100",
    category: "clothing",
    poster: "images/men-shoes/Summer.jpg"
  },

  {
    type: "image",
    href: "#",
    smallTitle: "Spend less every day",
    boldTitle: "Shop summer favorites under $50",
    image: "images/men-shoes/stanley.jpg",
    imageAlt: "Summer favorites"
  }
];

/*Reusable carousel function*/

function renderDynamicCarousel(trackSelector, slides, products) {
  const carouselTrack = document.querySelector(trackSelector);

  if (!carouselTrack) {
    console.warn(`Carousel not found: ${trackSelector}`);
    return;
  }

  const leftArrow = carouselTrack.querySelector(".left-square");
  const rightArrow = carouselTrack.querySelector(".right-square");

  function getProductImage(product) {
    return product?.images?.main || "images/placeholder.jpg";
  }

  function getProductUrl(product) {
    return `${product.productPage}.html?id=${encodeURIComponent(product.id)}`;
  }

  function getProductsByCategory(category, count = 4) {
    if (!category) {
      return products.slice(0, count);
    }

    return products
      .filter(product =>
        product.categories?.some(productCategory =>
          productCategory.toLowerCase() === category.toLowerCase()
        )
      )
      .slice(0, count);
  }

  function getProductsByIds(productIds = []) {
    return productIds
      .map(id => products.find(product => product.id === id))
      .filter(Boolean)
      .slice(0, 4);
  }

  function createProductRow(rowProducts) {
    return `
      <div class="two-items-container">
        ${rowProducts.map(product => `
          <div class="two-item-img">
            <a
              href="${getProductUrl(product)}"
              aria-label="${product.shortTitle || product.title}"
            >
              <img
                src="${getProductImage(product)}"
                alt="${product.shortTitle || product.title}"
                loading="lazy"
              >
            </a>
          </div>
        `).join("")}
      </div>
    `;
  }

  function createFourProductImages(slide) {
    let selectedProducts;

    if (Array.isArray(slide.productIds)) {
      selectedProducts = getProductsByIds(slide.productIds);
    } else {
      selectedProducts = getProductsByCategory(slide.category, 4);
    }

    if (!selectedProducts.length) {
      return `
        <div class="four-items-container">
          <p>No matching products found.</p>
        </div>
      `;
    }

    return `
      <div class="four-items-container">
        ${createProductRow(selectedProducts.slice(0, 2))}
        ${createProductRow(selectedProducts.slice(2, 4))}
      </div>
    `;
  }

  function createTitle(slide) {
    return `
      <div class="text-square-carousel">
        ${
          slide.smallTitle
            ? `<span class="image-title-small">${slide.smallTitle}</span>`
            : ""
        }

        ${
          slide.boldTitle
            ? `<span class="${slide.titleClass || "image-title-bold"}">
                ${slide.boldTitle}
              </span>`
            : ""
        }
      </div>
    `;
  }

  function createVideoSlide(slide) {
    return `
      <a
        class="a-link-normal carousel-generated-slide"
        href="${slide.href || "#"}"
      >
        <div class="image-carousel-square">
          ${createTitle(slide)}

          <video
            class="video-carousel"
            muted
            autoplay
            loop
            playsinline
            preload="metadata"
            poster="${slide.poster || ""}"
          >
            <source src="${slide.video}" type="video/mp4">
          </video>
        </div>
      </a>
    `;
  }

  function createImageSlide(slide) {
    return `
      <a
        class="a-link-normal carousel-generated-slide"
        href="${slide.href || "#"}"
      >
        <div class="image-carousel-square">
          ${createTitle(slide)}

          <img
            class="poster-img"
            src="${slide.image}"
            alt="${slide.imageAlt || slide.boldTitle || "Promotion"}"
            loading="lazy"
          >
        </div>
      </a>
    `;
  }

  function createProductsSlide(slide) {
    return `
      <div class="a-link-normal carousel-generated-slide">
        <div class="image-carousel-square">
          ${createTitle(slide)}

          ${
            slide.poster
              ? `
                <img
                  class="poster-img"
                  src="${slide.poster}"
                  alt="${slide.boldTitle || "Product collection"}"
                  loading="lazy"
                >
              `
              : ""
          }

          ${createFourProductImages(slide)}
        </div>
      </div>
    `;
  }

  function createSlide(slide) {
    switch (slide.type) {
      case "video":
        return createVideoSlide(slide);

      case "image":
        return createImageSlide(slide);

      case "products":
        return createProductsSlide(slide);

      default:
        console.warn("Unknown slide type:", slide.type);
        return "";
    }
  }

  const slidesMarkup = slides.map(createSlide).join("");

  carouselTrack.innerHTML = "";

  if (leftArrow) {
    carouselTrack.appendChild(leftArrow);
  }

  carouselTrack.insertAdjacentHTML("beforeend", slidesMarkup);

  if (rightArrow) {
    carouselTrack.appendChild(rightArrow);
  }
}


renderDynamicCarousel(
  ".js-carousel-row-1",
  firstRowSlides,
  products
);

renderDynamicCarousel(
  ".js-carousel-row-2",
  secondRowSlides,
  products
);

renderDynamicCarousel(
  ".js-carousel-row-3",
  thirdRowSlides,
  products
);