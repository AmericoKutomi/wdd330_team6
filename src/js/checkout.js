import { loadHeaderFooter, getLocalStorage, calculateCartTotal } from './utils.mjs';

loadHeaderFooter();

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        this.list.forEach(item => {
            this.itemTotal += item.count
        });

    }

    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        //Cart Total
        const tax = .06;
        if (this.itemTotal == 1) {
            this.shipping = 10;
        }else {
            this.shipping += 10;
            this.shipping += ((this.itemTotal - 1) * 2)
        }
        calculateCartTotal(this.list)
        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page

    }
}