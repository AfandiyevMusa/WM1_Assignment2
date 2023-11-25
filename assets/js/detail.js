// product detail page js

document.addEventListener('DOMContentLoaded', function () {
    // Retrieve product data from localStorage
    const storedProductData = localStorage.getItem('selectedProduct');

    if (storedProductData) {
        const productData = JSON.parse(storedProductData);

        // Populate the slots on the product detail page
        document.querySelector('.image').src = getProductImageUrl(productData.id); // Replace with the actual function to get the image URL
        document.querySelector('.title').textContent = productData.title;
        document.querySelector('.brand').textContent = productData.brand;
        document.querySelector('.cost').textContent = productData.cost;

        // Clear the stored product data in localStorage
        localStorage.removeItem('selectedProduct');
    }
});

// Function to get the product image URL based on the product ID (replace with your logic)
function getProductImageUrl(productId) {
    // Replace this with your logic to fetch the image URL based on the product ID
    // For now, return a placeholder URL
    return 'path/to/placeholder-image.jpg';
}
