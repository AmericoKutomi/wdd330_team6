import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';
import Alert from './alert';
import SearchBar from './searchbar';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ExternalServices();

const element = document.querySelector('.product-list');
const products = new ProductList(category, dataSource, element);
// products.setTopList(['880RR', '985RF', '985PR', '344YJ']);
const title = document.querySelector('.title');
const str = category;
const str2 = str.charAt(0).toUpperCase() + str.slice(1);
title.textContent = str2;

products.init();

const sortOption = document.querySelector('#content-sort');

function SortProducts() {
  products.sortBy(sortOption.value);
}

sortOption.addEventListener('change', () => {
  SortProducts();
});

SortProducts();

const mainDivider = document.querySelector('main');
const alerts = new Alert(mainDivider);
alerts.init();

const searchBar = new SearchBar(products);
searchBar.init();
