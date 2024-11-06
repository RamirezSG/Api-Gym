
// Función para ir específicamente a MostrarEmpleados
function irAlContenedor() {
        var contenedor = document.getElementById("mi-contenedor");
        if (contenedor) {
            contenedor.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(function() {
                contenedor.classList.add("show");
            }, 300);
        } else {
            console.log("El contenedor no se encontró");
        }
    }


// Función para regresar específicamente a Empleados
function regresar() {
    window.location.href = 'Interfaz9.html';
}




