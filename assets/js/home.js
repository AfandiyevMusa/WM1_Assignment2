// /// API fetch
// const apiUrl = 'https://dummyjson.com/products';
// const productRow = document.getElementsByClassName('row');

// // Fetch data from the API
// fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//         // Iterate over each product and create HTML elements
//         const products = data.products;

//         products.forEach(product => {
//             const productLink = document.createElement('a');
//             productLink.classList.add('card-link');

//             const insideOfCard = document.createElement('div');
//             insideOfCard.classList.add('col-4', 'card');

//             // Create the structure for the product card (customize as needed)
//             insideOfCard.innerHTML = `
//             <div class="img-part">
//                 <p class="discount">-${product.discountPercentage}%</p>
//                 <div class="images">
//                     <img src="./assets/imgs/featured1-hover.jpeg" class="open-hovered" alt="">
//                 </div>
//                 <i class="fa-regular fa-heart open-hovered heart"></i>
//                 <div class="options-part">
//                     <i class="fa-solid fa-cart-arrow-down addToCart"></i>
//                     <span>Add to cart</span>
//                 </div>
//             </div>
//             <div class="text-part">
//                 <p class="mini-detail">${product.brand}</p>
//                 <span>${product.title}</span>
//                 <p class="cost">$ ${product.price}</p>
//                 <div class="stars">
//                     <i class="fa-solid fa-star" style="color: #fcb941;"></i>
//                     <i class="fa-solid fa-star" style="color: #fcb941;"></i>
//                     <i class="fa-solid fa-star" style="color: #fcb941;"></i>
//                     <i class="fa-solid fa-star" style="color: #fcb941;"></i>
//                     <i class="fa-solid fa-star" style="color: #cccccc;"></i>
//                 </div>
//                 <p class="reviews">( 2 Reviews )</p>
//             </div>
//             `;

//             // Append the product card to the row
//             productLink.appendChild(insideOfCard);
//             productRow.appendChild(productLink);
//         });
//     })
//     .catch(error => {
//         console.error('Fetch error happened:', error);
//     });



const apiUrl = 'https://dummyjson.com/products';
const productRow = document.getElementsByClassName('row')[0]; // Use [0] to get the first element

// Fetch data from the API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Iterate over each product and create HTML elements
        const products = data.products;

        products.forEach(product => {
            const productLink = document.createElement('a');
            productLink.classList.add('card-link');

            const insideOfCard = document.createElement('div');
            insideOfCard.classList.add('col-4', 'card');

            // Create the structure for the product card (customize as needed)
            insideOfCard.innerHTML = `
            <div class="img-part">
                <p class="discount">-${product.discountPercentage}%</p>
                <div class="images">
                    <img src="./assets/imgs/featured1-hover.jpeg" class="open-hovered" alt="">
                </div>
                <i class="fa-regular fa-heart open-hovered heart"></i>
                <div class="options-part">
                    <i class="fa-solid fa-cart-arrow-down addToCart"></i>
                    <span>Add to cart</span>
                </div>
            </div>
            <div class="text-part">
                <p class="mini-detail">${product.brand}</p>
                <span>${product.title}</span>
                <p class="cost">$ ${product.price}</p>
                <div class="stars">
                    <i class="fa-solid fa-star" style="color: #fcb941;"></i>
                    <i class="fa-solid fa-star" style="color: #fcb941;"></i>
                    <i class="fa-solid fa-star" style="color: #fcb941;"></i>
                    <i class="fa-solid fa-star" style="color: #fcb941;"></i>
                    <i class="fa-solid fa-star" style="color: #cccccc;"></i>
                </div>
                <p class="reviews">( 2 Reviews )</p>
            </div>
            `;

            // Append the product card to the row
            productLink.appendChild(insideOfCard);
            productRow.appendChild(productLink);
        });
    })
    .catch(error => {
        console.error('Fetch error happened:', error);
    });












/// Pagination
const productsContainer = document.querySelector("#all .products .row");
const paginationContainer = document.querySelector(".pagination ul");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const productsPerPage = 6;
const products = Array.from(productsContainer.querySelectorAll('.card-link'));
let currentPage = 1;

// Calculate the number of pages
const totalPages = Math.ceil(products.length / productsPerPage);

// Create pagination buttons
for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement("li");
    pageItem.classList.add("page-item");
    // pageItem.id = "links";
    const pageLink = document.createElement("a");
    pageLink.classList.add("page-link");
    pageLink.textContent = i;
    pageLink.addEventListener("click", function () {
        showPage(i);
    });
    pageItem.appendChild(pageLink);
    paginationContainer.insertBefore(pageItem, nextBtn);
}

// Show the first page by default
showPage(1);

// Event listeners for Next and Previous buttons
nextBtn.addEventListener("click", function () {
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }
});

prevBtn.addEventListener("click", function () {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
});

function showPage(pageNumber) {
    // Hide all products
    products.forEach(product => {
        product.style.display = "none";
    });

    // Calculate the index range for the current page
    const startIndex = (pageNumber - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Display products for the current page
    for (let i = startIndex; i < endIndex && i < products.length; i++) {
        products[i].style.display = "block";
    }

    // Update active state in pagination
    updateActivePage(pageNumber);
}

function updateActivePage(activePage) {
    const pageLinks = document.querySelectorAll(".pagination .page-link");
    pageLinks.forEach((link, index) => {
        link.parentNode.classList.remove("active");
        if (index === activePage) {
            link.parentNode.classList.add("active");
        }
    });

    // Update current page
    currentPage = activePage;

    // Update Next and Previous button states
    updateButtonStates();
}

function updateButtonStates() {
    if (currentPage === 1) {
        prevBtn.classList.add("disabled");
    } else {
        prevBtn.classList.remove("disabled");
    }

    if (currentPage === totalPages) {
        nextBtn.classList.add("disabled");
    } else {
        nextBtn.classList.remove("disabled");
    }
}