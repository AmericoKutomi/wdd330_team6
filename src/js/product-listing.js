import { doc } from 'prettier';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
// first create an instance of our ProductData class.
const dataSource = new ProductData();
// then get the element we want the product list to render in
const listElement = document.querySelector('.product-list');
// then create an instance of our ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
const title = document.querySelector('.title');
const str = category
const str2 = str.charAt(0).toUpperCase() + str.slice(1);
title.textContent = str2

// finally call the init method to show our products
myList.init();