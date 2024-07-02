document.getElementById('contact-form').addEventListener('submit', function(event) {
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();
    var reason = document.getElementById('reason').value.trim();
    var checkbox = document.getElementById('checkbox').checked;
  
    if (!name || !email || !message || !reason || !checkbox) {
      event.preventDefault();
      alert('Por favor, complete todos los campos obligatorios.');
    }
  });