try {
  var value = localStorage.getItem('avatarLights');
  document.documentElement.dataset.avatarLights = JSON.parse(value || '"on"');
} catch(_) {}
