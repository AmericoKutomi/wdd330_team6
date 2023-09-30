import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './alert';

import { loadHeaderFooter, getParam } from './utils.mjs';

const category = getParam('category');
const dataSource = new ProductData();
const product_list = document.querySelector('.product-list');
const products = new ProductList(category, dataSource, product_list);
// products.setTopList(['880RR', '985RF', '985PR', '344YJ']);
products.init();

loadHeaderFooter();

const mainDivider = document.querySelector("main");
const alerts = new Alert(mainDivider);
alerts.init();
