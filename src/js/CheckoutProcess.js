import { loadHeaderFooter, getLocalStorage, calculateCartTotal } from './utils.mjs';

loadHeaderFooter();

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.num_items = 0;
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
        this.num_items += this.list.count;
        this.itemTotal = calculateCartTotal(this.list);

    }

    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        //Cart Total
        const taxRate = .06;
        if (this.itemTotal == 1) {
            this.shipping = 10;
        }else {
            this.shipping += 10;
            this.shipping += ((this.itemTotal - 1) * 2)
        }

        this.tax = this.itemTotal * taxRate
        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        this.orderTotal = this.itemTotal + this.tax + this.shipping
    }
}