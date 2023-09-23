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
  localStorage.setItem(key, JSON.stringify(Array.isArray(localData) ? [... localData, data] : [data] ));
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
