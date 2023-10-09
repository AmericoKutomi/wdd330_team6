// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage as normal
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// save data to local storage as an array
export function setArrLocalStorage(key, data) {
  const localData = getLocalStorage(key);
  localStorage.setItem(key, JSON.stringify(Array.isArray(localData) ? [... localData, data] : [data]));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param)
}

export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear)  {parentElement.innerHTML = '';}
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML('afterbegin', template);
  if (callback) {
    callback(data);
  }

}

export function renderHtmlWithTemplate(templateFn, parentElement, Alerts, position = 'afterbegin', clear = false,) {
  if (clear)  {parentElement.innerHTML = '';}

  if (Array.isArray(Alerts)) {
    var htmlStrings = Alerts.map(templateFn).join('');
  } else {
    var htmlStrings = templateFn(Alerts);
  }

  parentElement.insertAdjacentHTML(position, htmlStrings);
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('../partials/header.html');
  const footerTemplate = await loadTemplate('../partials/footer.html');
  const headerElement = document.querySelector('#main-header');
  const footerElement = document.querySelector('#main-footer');
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
  checkCart();
}

export function checkCart(){
  const superScript = document.getElementById('superScript');
  const cartItems = getLocalStorage('so-cart') || [];
  const itemCount = cartItems.length
  superScript.textContent = itemCount;
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

export function calculateCartTotal(cartItems) {
  let total = 0
  if (cartItems) {
    total = cartItems.reduce((acc, item) => (acc + item.FinalPrice), 0);
  }
  return total;
}

export function isListEmpty(list) {
  return Object.is(list, null) || list.length === 0;
}