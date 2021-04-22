// Variables

const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
  listaCursos.addEventListener("click", agregarCurso);

  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //Muestra los cursos
  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoHTML();
  });
  //Vaciar Carrito
  vaciarCarrito.addEventListener("click", limpiarHTML);
}

//Funciones

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccioando = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccioando);
  }
  //Agregar carrito a Local Storage
  sincronizarStorage();
}

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    console.log(articulosCarrito);
    carritoHTML();
  }
  sincronizarStorage();
}

function leerDatosCurso(curso) {
  console.log(curso);

  if (articulosCarrito.length === 0) {
    cargarDatos(curso);
    carritoHTML();
  } else {
    if (prueba(curso)) {
      carritoHTML();
    } else {
      cargarDatos(curso);
      carritoHTML();
    }
  }

  console.log(articulosCarrito);
}

function cargarDatos(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  articulosCarrito = [...articulosCarrito, infoCurso];
}

function prueba(curso) {
  for (i = 0; i < articulosCarrito.length; i++) {
    if (curso.querySelector("h4").textContent === articulosCarrito[i].titulo) {
      articulosCarrito[i].cantidad++;
      console.log("igual");
      return true;
    }
  }
  return false;
}

function carritoHTML() {
  //Limpiar HTML
  limpiarHTML();

  //Genera HTML
  articulosCarrito.forEach((curso) => {
    const { cantidad, imagen, titulo, precio, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
      <img width=100px src='${imagen}'></img>
    </td>
    <td>
      ${titulo}
    </td>
    <td>
      ${precio}
    </td>
    <td>
      ${cantidad}
    </td>
    <td>
      <a href="#" class="borrar-curso" data-id="${id}">X</a>
    </td>
    `;
    console.log(row);
    contenedorCarrito.appendChild(row);
  });
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
