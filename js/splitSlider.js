
/* Javascript for split image slider behaviour and accessibility*/
/* 
Referenced from: https://github.com/stevereich/split-panel-layout
Referenced from: https://webdesign.tutsplus.com/how-to-create-a-split-screen-slider-with-javascript--cms-28844t
*/

document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.slider-container');
  const topImage = container.querySelector('.slider-image.top');
  const slider = container.querySelector('.slider');
  const handle = container.querySelector('.handle');
  let isDragging = false; // variable to check if user's mouse is dragging

  /* Calculate slider position from given coordinate (mouse or by keyboard input) in pixels to a percentage */
  function moveSlider(x) {
    const rect = container.getBoundingClientRect(); // Get dimension of entire container 
    let offset = x - rect.left; 
    offset = Math.max(0, Math.min(offset, rect.width));
    const percent = (offset / rect.width) * 100; 
    updateSlider(percent); // Pass percentage to update slider 
  }


  /* Function for updating position of the slider */
  function updateSlider(percent) {
    // Clip right side of the top image */
    topImage.style.clipPath = 'inset(0 ' + (100 - percent) + '% 0 0)';

    // Move slider and handle position 
    slider.style.left = percent + '%';
    handle.style.left = percent + '%';

    handle.setAttribute('aria-valuenow', Math.round(percent)); // Update value for aria

    /* Update aria for accessiblity */
    var wireframe = Math.round(percent);
    var mockup = 100 - wireframe;
    var text = wireframe + '% Wireframe, ' + mockup + '% Mockup';
    handle.setAttribute('aria-valuetext', text);
  }
  
  /* ---- Listens for mouse drag ---- */
  // Check if mouse is dragging
  container.addEventListener('mousedown', event => {
    isDragging = true;
    moveSlider(event.clientX);
  });

  // Check if mouse stops dragging
  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Continuously update position
  window.addEventListener('mousemove', event => {
    if (isDragging) moveSlider(event.clientX);
  });

  /* ---- Listens for touch on mobile devices ---- */
  container.addEventListener('touchstart', event => {
    isDragging = true;
    moveSlider(event.touches[0].clientX);
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', event => {
    if (isDragging) moveSlider(event.touches[0].clientX);
  });

  /* ----  Listens for Keyboard to move slider ---- */
  handle.addEventListener('keydown', event => {
    const rect = container.getBoundingClientRect();
    let currentLeft = parseFloat(handle.style.left);
    
    if (isNaN(currentLeft)) {
      currentLeft = 50;
    }

    let newLeft = currentLeft;

    if (event.key === 'ArrowLeft') {
      newLeft = Math.max(0, currentLeft - 5);
      updateSlider(newLeft);
      event.preventDefault();
    } 
    else if (event.key === 'ArrowRight') {
      newLeft = Math.min(100, currentLeft + 5);
      updateSlider(newLeft);
      event.preventDefault();
    }
  });
});