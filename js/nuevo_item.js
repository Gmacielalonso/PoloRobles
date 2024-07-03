import { API } from './config.js';

document.getElementById('itemForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const id = document.getElementById('id').value; // Obtener el ID
  const nombre = document.getElementById('nombre').value;
  const precio = document.getElementById('precio').value;
  const medidas = document.getElementById('medidas').value;
  const materiales = document.getElementById('materiales').value;
  const codigo = document.getElementById('codigo').value;
  const slide1 = document.getElementById('slide1').files[0];
  const slide2 = document.getElementById('slide2').files[1];
  const slide3 = document.getElementById('slide3').files[2];

  let formData = new FormData();
  formData.append('nombre', nombre);
  formData.append('precio', precio);
  formData.append('medidas', medidas);
  formData.append('materiales', materiales);
  formData.append('codigo', codigo);
  formData.append('slide1', slide1);
  formData.append('slide2', slide2);
  formData.append('slide3', slide3);

  let url = `${API}/items`;
  let method = 'POST';

  if (id) {
    // Si hay un ID, estamos en modo edición
    url += `/${id}`;
    method = 'PUT'; // Usar el método PUT para actualizar la película existente

  }

  fetch(url, {
    method: method,
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('message').innerText = data.message;
    loadItems(); // Recarga la lista de items después de agregar uno nuevo
  })
  .catch(error => {
    document.getElementById('message').innerText = 'Error al agregar.';
    console.error('Error:', error);
  });
});


function loadItems() {
  fetch(`${API}/items`)
    .then(response => response.json())
    .then(data => {
      const itemsList = document.getElementById('itemsList');
      itemsList.innerHTML = ''; // Limpiar la lista existente

      data.forEach(item => {
        const itemItem = document.createElement('li');
        itemItem.innerHTML = `
          <span>${item.nombre} (${item.precio})</span>
          <div>
            <button onclick="editItem(${item.id })">Editar</button>
            <button onclick="deleteItem(${item.id})">Borrar</button>
          </div>
        `;
        itemsList.appendChild(itemItem);
      });
    })
    .catch(error => {
      console.error('Error al cargar los items:', error);
    });
}

window.deleteItem = (id) => {
  fetch(`${API}/items/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('message').innerText = data.message;
    loadItems(); // Recarga la lista después de borrar un item
  })
  .catch(error => {
    document.getElementById('message').innerText = 'Error al borrar.';
    console.error('Error:', error);
  });
}

// Usar función flecha para editar y asignarla al objeto window
window.editItem = (id) => {
  // Obtener por su ID y cargar los datos en el formulario
  fetch(`${API}/items/${id}`)
    .then(response => response.json())
    .then(item => {
      // Llenar el formulario con los datos
      document.getElementById('id').value = item.id;
      document.getElementById('nombre').value = item.nombre;
      document.getElementById('precio').value = item.precio;
      document.getElementById('medidas').value = item.medidas;
      document.getElementById('materiales').value = item.materiales;
      document.getElementById('codigo').value = item.codigo;
      document.getElementById('slide1').value = item.slide1;
      document.getElementById('slide2').value = item.slide2;
      document.getElementById('slide3').value = item.slide3;
      document.getElementById('btnSave').innerText = 'Guardar Cambios';

      
    })
    .catch(error => {
      console.error('Error al obtener el item para editar:', error);
    });
};

// Función para limpiar el formulario después de guardar cambios o cancelar
const clearForm = () => {
  document.getElementById('id').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('precio').value = '';
  document.getElementById('medidas').value = '';
  document.getElementById('materiales').value = '';
  document.getElementById('codigo').value = '';
  document.getElementById('slide1').value = '';
  document.getElementById('slide2').value = '';
  document.getElementById('slide3').value = '';

  // Restaurar el texto original del botón de submit
  document.querySelector('button[type="submit"]').innerText = 'Agregar';
};

// Cancelar la edición y limpiar el formulario al hacer clic en "Cancelar"
document.getElementById('cancelEdit').addEventListener('click', clearForm);

// Cargar las películas cuando la página se cargue por primera vez
document.addEventListener('DOMContentLoaded', loadItems);
