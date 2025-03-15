export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        // the dataSource will return a Promise... so you can use await
        // to resolve it
        const list = await this.dataSource.getData();
        // next, render the list - ** future **
    }
}