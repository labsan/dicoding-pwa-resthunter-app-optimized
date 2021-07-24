class HeroContent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <div tabindex="0" class="hero__text">
            <h1 tabindex="0" class="hero__title">Ayo kunjungi restoran terbaik di Indonesia</h1>
    
            <p tabindex="0" class="hero__subtitle">
              Menyajikan informasi lokasi restoran terbaik di Indonesia
            </p>
    
            <a href="#main-content" class="btn-hero">Temukan disini</a>
          </div>
        `;
  }
}

customElements.define('hero-content', HeroContent);
