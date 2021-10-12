import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor() {
    super();
    // set the title for this page - call from AbstractView
    this.setTitle('Dashboard')
  }

  // HTML for the dashboard view returned
  async getHtml() {
    return `
      <h1>Welcome to the dashboard</h1>
      <p> This is a dashboard.</p>
      <div>
        <a href='/posts' data-link>View recent posts</a>
      </div>
    `;
  }
}