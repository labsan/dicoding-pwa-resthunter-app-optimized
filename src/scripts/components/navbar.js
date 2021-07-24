class Navbar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <nav>
            <div class="menu-hp">
              <div>
                <a href="/" class="logo-font"><i>RestHunter</i></a>
              </div>
    
              <div class="menu-container">
                <button
                  class="menu"
                  aria-label="button menu dropdown on mobile"
                  type="button"
                >
                  <span class="fa fa-bars"></span>
                </button>
              </div>
            </div>
    
            <ul class="nav-list">
              <li class="nav-item"><a href="/">Gallery</a></li>
              <li class="nav-item"><a href="#/favorite">Favorite</a></li>
              <li class="nav-item">
                <a href="https://github.com/labsan" 
                    target="_blank"
                    rel="noopener noreferrer">About
                </a>
              </li>
            </ul>
          </nav>
        `;
  }
}

customElements.define('nav-bar', Navbar);
