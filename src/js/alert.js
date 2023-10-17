import { renderHtmlWithTemplate, isListEmpty } from './utils.mjs';

import AlertList from '../public/json/alerts.json';

function AlertCardTemplate(alert) {

  return `<div class="alert-card" style="background-color:${alert.background};color:${alert.color};">
    <p class="alert-card-message">${alert.message}</p>
    <span class="alert-card-close">&#10006;</span>
    </div>`;
}

export default class Alert {
  constructor(listElement) {
    this.listElement = listElement;
    this.alerts = AlertList;
    this.isEmpty = isListEmpty(this.alerts);
  }

  async generateAlertHolder() {
    this.alertHolder = document.createElement('section');
    this.listElement.prepend(this.alertHolder);
    this.alertHolder.classList.add('alert-list');
  }

  addCloseEventListenter() {
    const alertCloseSpans = document.querySelectorAll('.alert-card-close');
    [...alertCloseSpans].forEach((item) => {
      item.addEventListener('click', () => {
        item.parentNode.remove();
      });
    });
  }

  renderAlerts(list) {
    this.generateAlertHolder();
    renderHtmlWithTemplate(AlertCardTemplate, this.alertHolder, list);
    this.addCloseEventListenter();
  }

  init() {
    if (!this.isEmpty) {
      this.renderAlerts(this.alerts);
    }
  }
}
