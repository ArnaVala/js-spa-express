import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    // set the title for this page - call from AbstractView
    this.setTitle('Posts')
  }

  // HTML for the dashboard view returned
  async getHtml() {
    return `
      <h1>Posts</h1>
      <p>Here come some posts.</p>
     
    `;
  }
}