/*Script to handle "See All" (on the amburger tooltip) button functionality in the navigation bar */

let button = document.querySelector('.button-see-all');
let remainingItems = document.querySelector('.remaining-links');
button.addEventListener('click', () => {
       if(button.classList.contains('button-see-all')){
              remainingItems.innerHTML= `<a href="#appliances"><li>Appliances</li></a>
                                <a href="#arts-crafts"><li>Arts & Crafts</li></a>
                                <a href="#automotive-parts-accessories"><li>Automotive Parts & Accessories</li></a>
                                <a href="#baby"><li>Baby</li></a>
                                <a href="#beauty-personal-care"><li>Beauty & Personal Care</li></a>
                                <a href="#books"><li>Books</li></a>
                                <a href="#cds-vinyl"><li>CDs & Vinyl</li></a>
                                <a href="#cell-phones-accessories"><li>Cell Phones & Accessories</li></a>
                                <a href="#clothing-shoes-jewelry"><li>Clothing, Shoes & Jewelry</li></a>
                                <a href="#collectibles-fine-art"><li>Collectibles & Fine Art</li></a>
                                <a href="#computers-accessories"><li>Computers & Accessories</li></a>
              `;
              button.innerHTML= `<span>See Less</span><i class="bi bi-chevron-up"></i>`;
              button.classList.replace('button-see-all', 'button-see-less');
              /*button.remove();*/       // Remove the "See All" button after clicking.
              

       }
       else if(button.classList.contains('button-see-less')){
              remainingItems.innerHTML= ``;
              button.innerHTML= `<span>See All</span><i class="bi bi-chevron-down"></i>`;
              button.classList.replace('button-see-less', 'button-see-all');
       }


       
});
/*let button_see_less = document.createElement('button');
button_see_less.innerHTML= `<span>See Less</span><i class="bi bi-chevron-up"></i>`;
document.body.appendChild(button_see_less);
button_see_less.classList.add('button-see-less');
button_see_less.addEventListener('click', () => {
       remainingItems.innerHTML= ``;
      let button_see_all = document.createElement('button');
       button_see_all.innerHTML= `<span>See All</span><i class="bi bi-chevron-down"></i>`;
       document.body.appendChild(button_see_all);
       button_see_all.classList.add('button-see-all');
       button_see_less.remove();        // Remove the "See Less" button after clicking.
});*/



////////////////////////////////////////////////////////////////////////////////////////////////////