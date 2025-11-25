import { getCartTotal, getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1,
        };
    });
    return simplifiedItems;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = getCartTotal();
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }
    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        const summaryElement = document.querySelector(`${this.outputSelector} #cartTotal`);
        summaryElement.innerHTML = `$${this.itemTotal}`;
        const itemNumElement = document.querySelector(`${this.outputSelector} #num-items`);
        itemNumElement.innerHTML = `$${this.list.length}`;
        this.calculateOrderTotal();
    }

    calculateOrderTotal() {
        this.tax = (this.itemTotal * 0.06);
        this.shipping = 10 + ((this.list.length - 1) * 2);
        this.orderTotal = (
            parseFloat(this.itemTotal) + parseFloat(this.tax) + parseFloat(this.shipping)
        );
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        tax.innerHTML = `$${this.tax.toFixed(2)}`;
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        shipping.innerHTML = `$${this.shipping.toFixed(2)}`;
        const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);
        orderTotal.innerHTML = `$${this.orderTotal.toFixed(2)}`;

    }
    async checkout() {
        const formElement = document.forms["checkout"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);
        console.log(order);

        try {
            const response = await services.checkout(order);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
    
}