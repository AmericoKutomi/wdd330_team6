export default class SearchBar {
  constructor(products) {
    this.products = products;
    this.setup();
  }

  init() {
    this.renderSearchBar();
  }

  setup() {
    this.prositionSelector = document.querySelector('#sortByPrice');
    this.createElements();
  }

  createElements() {
    this.searchBarHolder = document.createElement('div');
    this.searchBarHolder.classList.add('search-bar');
    this.prositionSelector.after(this.searchBarHolder);

    this.textField = document.createElement('input');
    this.textField.placeholder = 'Search';
    this.textField.setAttribute('id', 'search-bar-input');
    this.textField.type = 'search';
    this.addListener();
  }

  renderSearchBar() {
    this.searchBarHolder.append(this.textField);
  }

  addListener() {
    this.textField.oninput = () => {
      this.products.UpdateProductView(this.dataListFilter());
    };
  }

  dataListFilter() {
    return this.products.getDataList().filter((data) => {
      return data.Name.toLowerCase().includes(
        this.textField.value.toLowerCase()
      );
    });
  }
}
