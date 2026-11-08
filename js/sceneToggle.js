// OnTrack page: time-of-day scene switcher.
// Opens on the scene for the visitor's local time (same hour ranges as the
// app's determineTimeOfDay()), then lets them switch scenes with the buttons.
(function () {
  const scenes = {
    morning: { label: 'Morning', alt: 'OnTrack focus screen in the morning: soft pink and lavender sky with a pale sun behind the viaduct' },
    afternoon: { label: 'Afternoon', alt: 'OnTrack focus screen in the afternoon: warm yellow sky with a full sun above the viaduct' },
    evening: { label: 'Evening', alt: 'OnTrack focus screen in the evening: coral sunset glowing through the viaduct arches' },
    night: { label: 'Night', alt: 'OnTrack focus screen at night: a train crosses a viaduct under a navy sky and full moon' },
  };

  function determineTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 10) return 'morning';
    if (hour >= 10 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 20) return 'evening';
    return 'night';
  }

  const image = document.getElementById('scene-demo-image');
  const status = document.getElementById('scene-demo-status');
  const buttons = document.querySelectorAll('.scene-button');
  if (!image || !buttons.length) return;

  // Preload so switching is instant.
  Object.keys(scenes).forEach(function (key) {
    new Image().src = 'assets/onTrack/scene-' + key + '.svg';
  });

  function show(key, note) {
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.scene === key));
    });
    image.classList.add('is-swapping');
    setTimeout(function () {
      image.src = 'assets/onTrack/scene-' + key + '.svg';
      image.alt = scenes[key].alt;
      image.classList.remove('is-swapping');
    }, 150);
    if (status) status.textContent = 'Showing the ' + scenes[key].label + ' scene' + (note || '') + '.';
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      show(button.dataset.scene);
    });
  });

  show(determineTimeOfDay(), ', matching your local time');
})();
