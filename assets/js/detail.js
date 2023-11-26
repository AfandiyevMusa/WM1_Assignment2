
const productInfo = JSON.parse(localStorage.getItem('selectedProduct'));

const img = document.querySelector('.left .left-p img')
const mainImage = document.querySelector('.left .right-p .zoomArea img')

const title = document.querySelector('.right .text .title')
const brand = document.querySelector('.details .brand')
const cost = document.querySelector('.details .cost')

img.setAttribute('src', productInfo.image);
mainImage.setAttribute('src', productInfo.image);
title.textContent = productInfo.title;
brand.textContent = productInfo.brand;
cost.textContent = productInfo.cost;