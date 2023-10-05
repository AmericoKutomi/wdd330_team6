
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');

const dataSource = new ProductData();

const element = document.querySelector('.product-list');
const products = new ProductList(category, dataSource, element);
// products.setTopList(['880RR', '985RF', '985PR', '344YJ']);
const title = document.querySelector('.title');
const str = category
const str2 = str.charAt(0).toUpperCase() + str.slice(1);
title.textContent = str2

products.init();

const sortByNameElement = document.querySelector('#sortByName');
sortByNameElement.addEventListener('click', () => products.sortBy('name'));

const sortByPriceElement = document.querySelector('#sortByPrice');
sortByPriceElement.addEventListener('click', () => products.sortBy('price'));

