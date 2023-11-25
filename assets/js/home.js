// API fetch
const apiUrl = 'https://dummyjson.com/products';
const productRow = document.getElementsByClassName('row')[0]; // Use [0] to get the first element
const filterSelect = document.getElementById('category');

// Fetch data from the API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Iterate over each product and create HTML elements
        const products = data.products;

        // Fetch unique product categories
        const categories = getUniqueCategories(products);

        // Function to fetch unique product categories
        function getUniqueCategories(products) {
            const categories = new Set();
            products.forEach(product => {
                categories.add(product.brand);
            });
            return ['all', ...categories]; // Add 'all' as the default option
        }

        // Call the populateFilterDropdown function
        populateFilterDropdown(categories);

        // Function to populate filter dropdown with categories
        function populateFilterDropdown(categories) {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category === 'all' ? 'All Brands' : category;
                filterSelect.appendChild(option);
            });
        }


        products.forEach(product => {
            const productLink = document.createElement('a');
            productLink.classList.add('card-link');

            const insideOfCard = document.createElement('div');
            insideOfCard.classList.add('col-4', 'card');

            const randomIndex = Math.floor(Math.random() * product.images.length);

            // Get the randomly selected image URL
            const selectedImageUrl = product.images[randomIndex];
            
            // Create the structure for the product card (customize as needed)
            insideOfCard.innerHTML = `
            <a data-id="${product.id}">
                <div class="img-part">
                    <p class="discount">-${product.discountPercentage}%</p>
                    <div class="images">
                        <img src="${selectedImageUrl}" class="open-hovered" alt="">
                    </div>
                    <i class="fa-regular fa-heart open-hovered heart"></i>
                    <div class="options-part">
                        <i class="fa-solid fa-cart-arrow-down addToCart"></i>
                        <span>Add to cart</span>
                    </div>
                </div>
                <div class="text-part">
                    <p class="mini-detail brand-part">${product.brand}</p>
                    <span class='title-part'>${product.title}</span>
                    <div class='costs'>
                        <p class="discounted-cost">$ ${(product.price * (100-product.discountPercentage) / 100).toFixed(2)}</p>
                        <p class="cost">$ ${product.price}</p>
                    </div>
                    <div class="stars">
                        <i class="fa-solid fa-star" style="color: #fcb941;"></i>
                        <i class="fa-solid fa-star" style="color: #fcb941;"></i>
                        <i class="fa-solid fa-star" style="color: #fcb941;"></i>
                        <i class="fa-solid fa-star" style="color: #fcb941;"></i>
                        <i class="fa-solid fa-star" style="color: #cccccc;"></i>
                    </div>
                    <p class="reviews">( 2 Reviews )</p>
                </div>
            </a>
            `;

            // Append the product card to the row
            productLink.appendChild(insideOfCard);
            productRow.appendChild(productLink);
        });

        // Initialize pagination and search
        const productsContainer = document.querySelector("#all .products .row");
        const paginationContainer = document.querySelector(".pagination ul");
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
        const productsPerPage = 6;
        let allProducts = Array.from(productsContainer.querySelectorAll('.card-link'));
        let currentPage = 1;

        // Calculate the number of pages
        const totalPages = Math.ceil(allProducts.length / productsPerPage);

        // Create pagination buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement("li");
            pageItem.classList.add("page-item");
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
        nextBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (currentPage < totalPages) {
                showPage(currentPage + 1);
            }
        });

        prevBtn.addEventListener("click", function () {
            e.preventDefault();
            if (currentPage > 1) {
                showPage(currentPage - 1);
            }
        });

        // Event listener for search input
        const searchInput = document.getElementById('search');
        searchInput.addEventListener('keyup', function () {
            const searchTerm = searchInput.value.trim().toLowerCase();
            filterProducts(searchTerm);
        });

        // Event listener for category filter
        filterSelect.addEventListener('change', function () {
            const selectedCategory = filterSelect.value;
            filterProductsByCategory(selectedCategory);
        });


        // Function to filter products based on search term
        function filterProducts(searchTerm) {
            allProducts.forEach(product => {
                const titleElement = product.querySelector('.text-part .title-part');
                const title = titleElement.textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            });

            // Reset pagination and show the first page
            currentPage = 1;
            updatePagination();
        }

        // Function to filter products based on selected category
        function filterProductsByCategory(selectedCategory) {
            allProducts.forEach(product => {
                const categoryElement = product.querySelector('.text-part .brand-part');
                const category = categoryElement.textContent.trim();
                if (selectedCategory === 'all' || category === selectedCategory) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            });

            // Reset pagination and show the first page
            currentPage = 1;
            updatePagination();
        }

        // Function to show a specific page
        function showPage(pageNumber) {
            // Hide all products
            allProducts.forEach(product => {
                product.style.display = "none";
            });

            // Calculate the index range for the current page
            const startIndex = (pageNumber - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;

            // Display products for the current page
            for (let i = startIndex; i < endIndex && i < allProducts.length; i++) {
                allProducts[i].style.display = "block";
            }

            // Update active state in pagination
            updateActivePage(pageNumber);
        }

        // Function to update active state in pagination
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

        // Function to update Next and Previous button states
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
    })
    .catch(error => {
        console.error('Fetch error happened:', error);
    });