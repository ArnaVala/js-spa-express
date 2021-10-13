import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    // set the title for this page - call from AbstractView
    this.setTitle('Viewing Post')
  }

  // HTML for the dashboard view returned
  async getHtml() {
    console.log(this.params.id);
    return `
      <h1>This post</h1>
      <p>you are viewing a POST</p>
     
    `;
  }
}