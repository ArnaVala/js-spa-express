import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor() {
    super();
    // set the title for this page - call from AbstractView
    this.setTitle('Settings')
  }

  // HTML for the dashboard view returned
  async getHtml() {
    return `
      <h1>Settings</h1>
      <p>Manage your settings.<p>
    `;
  }
}