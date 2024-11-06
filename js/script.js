const defaultFile = 'imagenes/photo.png';
const file = document.getElementById('foto');
const img = document.getElementById('img');

file.addEventListener('change', e => {
  if (e.target.files[0]) {
    const fileSelected = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (fileSelected.size > maxSize) {
      alert('El archivo seleccionado supera el tamaño máximo permitido');
      img.src = defaultFile;
      return;
    }

    if (!fileSelected.type.match('image.*')) {
      alert('El archivo seleccionado no es una imagen');
      img.src = defaultFile;
      return;
    }

    img.src = URL.createObjectURL(fileSelected);
  } else {
    img.src = defaultFile;
  }
});