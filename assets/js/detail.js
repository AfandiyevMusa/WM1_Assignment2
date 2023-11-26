
const productInfo = JSON.parse(localStorage.getItem('selectedProduct'));

const productAll = document.querySelector('#product-info .container .all');

const cardRow = document.createElement('div');
cardRow.classList.add('row');

const allImagesArray = productInfo.allImages.split(',');

const imagesHTML = allImagesArray.map((image, index) => `
    <img src="${image}" alt="" class="${index === 0 ? 'active first' : ''}">
`).join('');

cardRow.innerHTML = `
    <div class="col-sm-12 col-md-6 col-lg-6">
        <div class="back">
            <a href="./home.html">
                <i class="fa-solid fa-house"></i>
            </a>
        </div>
        <div class="left">
            <div class="left-p order-last">
                ${imagesHTML}
            </div>
            <div class="right-p order-lg-last">
                <div class="zoomArea">
                    <img id="NZoomImg" data-NZoomscale="1.5" src="${allImagesArray[0]}"
                        alt="Product Image">
                </div>
            </div>
        </div>
    </div>

    <div class="col-sm-12 col-md-6 col-lg-6">
        <div class="right">
            <div class="text">
                <h4 class="title">${productInfo.title}</h4>
                <div class="stars">
                    <i class="fa-solid fa-star" style="color: #cc9967;"></i>
                    <i class="fa-solid fa-star" style="color: #cc9967;"></i>
                    <i class="fa-solid fa-star" style="color: #cc9967;"></i>
                    <i class="fa-solid fa-star" style="color: #cc9967;"></i>
                    <i class="fa-solid fa-star" style="color: #cccccc;"></i>
                </div>
                <p class="stock">Stock: ${productInfo.stock}</p>
                <div class="costs">
                    <h3>$ ${(productInfo.cost * (100 - productInfo.discount) / 100).toFixed(2)}</h3>
                    <h2>$ ${productInfo.cost}</h2>
                </div>
                <span>${productInfo.description}</span>
                <div class="color">
                    <h6>Color: </h6>
                    <div class="circle">
                        <button style="background-color: #cc9967;"></button>
                        <button style="background-color: #9966cc;"></button>
                        <button style="background-color: #3399cc;"></button>
                    </div>
                </div>
                <div class="qty">
                    <h6>Qty: </h6>
                    <div class="quantity">
                        <i class="fa-solid fa-minus minus"></i>
                        <input type="number" class="input text-center" min="1" max="10000"
                            value="1">
                        <i class="fa-solid fa-plus plus"></i>
                    </div>
                </div>
                <div class="options">
                    <div class="add-cart">
                        <span><i class="fa-solid fa-cart-plus"></i>Add to Cart</span>
                    </div>
                    <div class="add-wishlist">
                        <span><i class="fa-regular fa-heart"></i>Add to Wishlist</span>
                    </div>
                </div>
                <div class="categories">
                    <p>Brand: </p>
                    <span>${productInfo.brand} </span>
                </div>
                <div class="categories">
                    <p>Categories: </p>
                    <span>${productInfo.category} </span>
                </div>
                <div class="share">
                    <p>Share: </p>
                    <i class="fa-brands fa-facebook-f"></i>
                    <i class="fa-brands fa-twitter"></i>
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-pinterest"></i>
                </div>
            </div>
        </div>
    </div>
`;

productAll.appendChild(cardRow);