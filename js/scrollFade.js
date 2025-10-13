document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add("js-enabled");

  const role = document.querySelector("#position");
  const name = document.querySelector("#name");
  const sticky = document.querySelector(".scroll-fade");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    const fadeOutEnd = 360;
    const fadeInStart = 360;
    const fadeInEnd = 720;

    // Role fades out
    if (scrollY < fadeOutEnd) {
      const roleOpacity = 1 - (scrollY / fadeOutEnd);
      role.style.opacity = roleOpacity;
      name.style.opacity = 0;

      // Ensure role is visible, name is hidden
      if (roleOpacity > 0) {
        role.style.display = "block";
        name.style.display = "none";
      }
    }

    // Name fades in
    else if (scrollY >= fadeInStart && scrollY < fadeInEnd) {
      const nameOpacity = (scrollY - fadeInStart) / (fadeInEnd - fadeInStart);
      role.style.opacity = 0;
      name.style.opacity = nameOpacity;

      // Hide role, show name only when it has some visibility
      role.style.display = "none";
      name.style.display = "block";
    }

    // After fade in
    else {
      role.style.opacity = 0;
      role.style.display = "none";
      name.style.opacity = 1;
      name.style.display = "block";
    }
  });
});