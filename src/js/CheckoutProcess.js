import { getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices';

const extServices = new ExternalServices();
function dataToJson(formElement) {
    const Data = new FormData(formElement);
    const jsonObj = {};

    Data.forEach((value, key) => { jsonObj[key] = value });

    return jsonObj;
}

function packageItems(items) {
    const simplifiedItems = items.map((item) => (
        {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
        }
    ));

    return simplifiedItems;
}

export default class CheckoutProcess {
    constructor(key, selector) {
        this.key = key;
        this.selector = selector;
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
        this.list = [];
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateSummary();
        this.calculateOrderTotal();
    }

    calculateSummary() {
        const cartTotalElement = document.querySelector(
        this.selector + ' #cartTotal'
        );

        const itemNumElement = document.querySelector(
        this.selector + ' #num-items'
        );
        itemNumElement.innerText = this.list.length;

        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        cartTotalElement.innerText = '$' + this.itemTotal;
    }

    calculateOrderTotal() {
        this.shipping = 10 + ((this.list.length - 1) * 2);
        this.tax = (this.itemTotal * 0.06).toFixed(2);

        this.orderTotal = (
        parseFloat(this.itemTotal) +
        parseFloat(this.shipping) +
        parseFloat(this.tax)
        ).toFixed(2);

        this.RenderOrderTotals();
    }

    RenderOrderTotals() {
        const shippingElement = document.querySelector(this.selector + ' #shipping');
        const taxElement = document.querySelector(this.selector + ' #tax');
        const orderTotalElement = document.querySelector(this.selector + ' #orderTotal');

        shippingElement.innerText = '$' + this.shipping;
        taxElement.innerText = '$' + this.tax;
        orderTotalElement.innerText = '$' + this.orderTotal;
    }

    async checkout() {
        const formElement = document.forms["checkout"];

        const json = dataToJson(formElement);
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try {
            const res = await extServices.checkout(json);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
}