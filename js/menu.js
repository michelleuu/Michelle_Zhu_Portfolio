document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add("js-enabled");
});

function openMenu() {
    const menu = document.getElementById("dropdown-menu");
    const toggle = document.getElementById("menu-toggle");

    menu.classList.add('active');
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    
    // Enable tabbing Links
    const links = menu.querySelectorAll("a");
    links.forEach(link => link.removeAttribute("tabindex"));

    document.getElementById("close-icon").classList.remove('hide');
    document.getElementById("menu-icon").classList.add('hide');
}

function closeMenu() {
    const menu = document.getElementById("dropdown-menu");
    const toggle = document.getElementById("menu-toggle");

    menu.classList.remove('active');
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");

    // Disable tabbing links
    const links = menu.querySelectorAll("a");
    links.forEach(link => link.setAttribute("tabindex", "-1"));

    document.getElementById("close-icon").classList.add('hide');
    document.getElementById("menu-icon").classList.remove('hide');
}
