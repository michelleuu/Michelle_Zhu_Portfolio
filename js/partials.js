// Shared markup reused across pages (site footer, and the project-page nav +
// hamburger dropdown menu). Injected on DOMContentLoaded so menu.js's
// getElementById lookups (fired from onclick handlers) still resolve normally.
(function () {
  const FOOTER_HTML = `<footer class="footer-container outer-margin">
      <div>
        <h2 id="footer-note">Coded in HTML, CSS, and Javascript.</h2>
        <p>© 2025 Michelle Zhu</p>
      </div>

      <section id="footer-navigation">
        <div class="footer-grid-navigation">
          <div>
            <h2 class="footer-category">Contact</h2>
            <a class="footer-link" href="mailto:michellezed2018@gmail.com">Email</a>
          </div>
          <div>
            <h2 class="footer-category">Socials</h2>
            <a class="footer-link" href="https://www.linkedin.com/in/michelle-z-a64144259">LinkedIn</a>
            <a class="footer-link" href="https://github.com/michelleuu">GitHub</a>
          </div>
          <div>
            <h2 class="footer-category">Projects</h2>
            <a class="footer-link" href="projectPage1.html">PlantSnapper Mobile App</a>
            <a class="footer-link" href="projectPage2.html">Jazzdor Music Festival</a>
          </div>
        </div>
      </section>
    </footer>`;

  const PROJECT_NAV_HTML = `<nav>
      <div class="nav-bar-flex nav-links">
        <a href="index.html" class="home-icon nav-role button-nav">Michelle Zhu</a>
        <div id="navigation-links" class="nav-link-flex">
          <a href="index.html#about" class="button-nav">About</a>
          <a href="assets/Resume.pdf" target="_blank" class="button-nav">Resume</a>
          <a href="index.html#contact" class="button-nav">Contact</a>
        </div>
        <div id="hamburger" class="nav-link-flex">
          <a href="javascript:void(0);" onclick="openMenu()" id="menu-toggle" aria-expanded="false" aria-controls="dropdown-menu"><img id="menu-icon" src="assets/hamburger-icon.svg" alt="menu" width="800" height="800"></a>
          <a href="javascript:void(0);" onclick="closeMenu()"><img id="close-icon" class="hide" src="assets/close-icon.svg" alt="close" width="800" height="800"></a>
        </div>
      </div>
    </nav>
    <div id="dropdown-menu" class="menu-dropdown-content" aria-hidden="true">
      <a href="index.html#about" onclick="closeMenu()" class="dropdown-link" tabindex="-1">About</a>
      <a href="assets/Resume.pdf" target="_blank" onclick="closeMenu()" class="dropdown-link" tabindex="-1">Resume</a>
      <a href="index.html#contact" onclick="closeMenu()" class="dropdown-link" tabindex="-1">Contact</a>
    </div>`;

  function injectPartial(placeholderId, html) {
    const placeholder = document.getElementById(placeholderId);
    if (placeholder) placeholder.outerHTML = html;
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectPartial('project-nav', PROJECT_NAV_HTML);
    injectPartial('site-footer', FOOTER_HTML);
  });
})();
