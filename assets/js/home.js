////Pagination
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