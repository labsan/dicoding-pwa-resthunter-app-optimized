class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <footer tabindex="0">
            <p tabindex="0">Copyright © 2021 All data obtained from 
                <a class="link-footer" 
                  href="https://restaurant-api.dicoding.dev/" 
                  target="_blank" rel="noreferrer">
                  Restaurant API Dicoding
                </a> | <strong><i>RestHunter</i></strong>
            </p>
          </footer>
        `;
  }
}

customElements.define('custom-footer', CustomFooter);
