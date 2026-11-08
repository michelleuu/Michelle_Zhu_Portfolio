// Table of content behaviour on project pages:
// 1. Starts vertically centred beside the project overview text. project.css
//    uses --toc-offset to place it; sticking under the nav is CSS only.
// 2. Marks the link for the section currently in view with .active.
(function () {
  function centreToc() {
    const wrapper = document.querySelector('.toc-sticky');
    const toc = document.getElementById('table-of-content');
    const rows = document.querySelectorAll('#project-description .description-row');
    if (!wrapper || !toc || !rows.length) return;

    // Text block runs from the first row's top to the last row's bottom.
    const top = rows[0].getBoundingClientRect().top;
    const bottom = rows[rows.length - 1].getBoundingClientRect().bottom;
    const textMiddle = (top + bottom) / 2 - wrapper.getBoundingClientRect().top;

    const offset = Math.max(0, textMiddle - toc.offsetHeight / 2);
    wrapper.style.setProperty('--toc-offset', offset + 'px');
  }

  function setupActiveLink() {
    const links = Array.from(document.querySelectorAll('#table-of-content a[href^="#"]'));
    const sections = links.map(function (link) {
      return document.getElementById(link.getAttribute('href').slice(1));
    });
    if (!links.length) return;

    function update() {
      // A section is "current" once its top passes 40% down the window.
      const line = window.innerHeight * 0.4;
      let current = 0;
      sections.forEach(function (section, i) {
        if (section && section.getBoundingClientRect().top <= line) current = i;
      });
      // Short last sections can't scroll up to the line, so force it at the bottom.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = links.length - 1;

      links.forEach(function (link, i) {
        link.classList.toggle('active', i === current);
      });
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        update();
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  document.addEventListener('DOMContentLoaded', function () {
    const overview = document.getElementById('project-description');
    if (overview) {
      // Re-centre whenever the overview changes height (images loading, resizing).
      new ResizeObserver(centreToc).observe(overview);
    }
    setupActiveLink();
  });
})();
