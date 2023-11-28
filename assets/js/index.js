const apiUrl = 'https://dummyjson.com/products';
const productRow = document.getElementsByClassName('row')[0]; // Use [0] to get the first element
const filterSelect = document.getElementById('category');

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const products = data.products;

        const categories = getUniqueCategories(products);

        function getUniqueCategories(products) {
            const categories = new Set();
            products.forEach(product => {
                categories.add(product.category);
            });
            return ['all', ...categories];
        }

        populateFilterDropdown(categories);

        function populateFilterDropdown(categories) {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category === 'all' ? 'All Categories' : category;
                filterSelect.appendChild(option);
            });
        }

        products.forEach(product => {
            const insideOfCard = document.createElement('a');
            insideOfCard.classList.add('card-link');

            const randomIndex = Math.floor(Math.random() * product.images.length);
            const selectedImageUrl = product.images[randomIndex];

            insideOfCard.innerHTML = `
            <div data-id="${product.id}" class='col-4 card'>
                <div class="img-part">
                    <p class="discount">-${product.discountPercentage}%</p>
                    <div class="images">
                        <img style='display: none; ' src="${product.images}" class="all-images" alt="">
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
                        <p class="discounted-cost">$ ${(product.price * (100 - product.discountPercentage) / 100).toFixed(2)}</p>
                        <p class="cost">$ ${product.price}</p>
                    </div>
                    <p style="display: none;" class="mini-detail product-desc">${product.description}</p>
                    <div class="stars">
                        <i class="fa-solid fa-star" style="color: #fcb941;"></i>
                        <i class="fa-solid fa-star" style="color: #fcb941;"></i>
                        <i class="fa-solid fa-star" style="color: #fcb941;"></i>
                        <i class="fa-solid fa-star" style="color: #fcb941;"></i>
                        <i class="fa-solid fa-star" style="color: #cccccc;"></i>
                    </div>
                    <p class="stock">Stock: ${product.stock}</p>
                    <div class='category'>
                        <h6 class="category-name">Category: </h6>
                        <h6 class="category-part">${product.category}</h6>
                    </div>
                </div>
            </div>
            `;

            productRow.appendChild(insideOfCard);
        });

        // Pagination
        const productsContainer = document.querySelector("#all .products .row");
        const paginationContainer = document.querySelector(".pagination ul");
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
        const productsPerPage = 6;
        let allProducts = Array.from(productsContainer.querySelectorAll('.card-link'));
        let currentPage = 1;

        const totalPages = Math.ceil(allProducts.length / productsPerPage);

        // Creating pagination buttons
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

        showPage(1);

        // Next button functionality
        nextBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (currentPage < totalPages) {
                showPage(currentPage + 1);
            }
        });

        // Previous button functionality
        prevBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (currentPage > 1) {
                showPage(currentPage - 1);
            }
        });

        // Search area
        const searchInput = document.getElementById('search');
        searchInput.addEventListener('keyup', function () {
            const searchTerm = searchInput.value.trim().toLowerCase();
            const selectedCategory = filterSelect.value; // Get the selected category
            filterProducts(searchTerm, selectedCategory);
        });

        // Filter products based on search
        function filterProducts(searchTerm, selectedCategory) {
            allProducts.forEach(product => {
                const titleElement = product.querySelector('.text-part .title-part');
                const title = titleElement.textContent.toLowerCase();
                const categoryElement = product.querySelector('.text-part .category-part');
                const category = categoryElement.textContent.trim().toLowerCase();

                const titleMatches = title.includes(searchTerm) || searchTerm === '';
                const categoryMatches = selectedCategory === 'all' || category === selectedCategory;

                if (titleMatches && categoryMatches) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            });

            currentPage = 1;
            updatePagination();
        }

        // Category filter
        filterSelect.addEventListener('change', function () {
            const selectedCategory = filterSelect.value;
            filterProductsByCategory(selectedCategory);
        });

        // Filter products based on category that we selected
        function filterProductsByCategory(selectedCategory) {
            allProducts.forEach(product => {
                const categoryElement = product.querySelector('.text-part .category-part');
                const category = categoryElement.textContent.trim();
                if (selectedCategory === 'all' || category === selectedCategory) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            });

            currentPage = 1;
            updatePagination();
        }

        // Showing specific page
        function showPage(pageNumber) {
            allProducts.forEach(product => {
                product.style.display = "none";
            });

            const startIndex = (pageNumber - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;

            for (let i = startIndex; i < endIndex && i < allProducts.length; i++) {
                allProducts[i].style.display = "block";
            }

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

            currentPage = activePage;

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

        // Sending datas to local storage for product detail
        allProducts.forEach(product => {
            product.addEventListener('click', function (event) {
                event.preventDefault();

                const productId = product.querySelector('.card').getAttribute('data-id');
                const productTitle = product.querySelector('.text-part .title-part').textContent;
                const productBrand = product.querySelector('.text-part .brand-part').textContent;

                const productCostRaw = product.querySelector('.text-part .cost').textContent;
                const productCost = productCostRaw.substring(2, productCostRaw.length);
                const productImage = product.querySelector('.img-part .images img').getAttribute('src');

                const productAllImages = product.querySelector('.all-images').getAttribute('src');

                const productDiscountDetail = product.querySelector('.img-part .discount').textContent;
                const productDiscount = productDiscountDetail.substring(1, productDiscountDetail.length - 1);

                const stock = product.querySelector('.stock').textContent;
                const productStock = stock.substring(7, stock.length);

                const category = product.querySelector('.category-part').textContent;

                const description = product.querySelector('.product-desc').textContent;

                const productData = {
                    id: productId,
                    title: productTitle,
                    brand: productBrand,
                    cost: productCost,
                    discount: productDiscount,
                    image: productImage,
                    allImages: productAllImages,
                    stock: productStock,
                    description: description,
                    category: category
                };

                console.log(productData);
                localStorage.setItem('selectedProduct', JSON.stringify(productData));

                window.location.href = 'detail.html';
            });
        });
    })
    .catch(error => {
        console.error('Fetch error happened:', error);
    });