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

export function renderHtmlWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false,) {
  const htmlStrings = list.map(templateFn);
  if (clear)  {parentElement.innerHTML = '';}
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
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

export function alertMessage(message, scroll = true) {
  // create element to hold our alert
  const alert = document.createElement('div');
  // add a class to style the alert
  alert.classList.add('alert');
  // set the contents. You should have a message and an X or something the user can click on to remove
  alert.innerHTML = `<p>${message}</p><span>X</span>`

  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener('click', function(e) {
      if(e.target.tagName == 'SPAN') { // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
        main.removeChild(this);
      }
  })
  // add the alert to the top of main
  const main = document.querySelector('main');
  main.prepend(alert);
  
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll)
    window.scrollTo(0,0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach((alert) => document.querySelector('main').removeChild(alert));
}