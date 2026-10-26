const fondos = document.querySelectorAll(".art-image");

let fondoActual = 0;

function cambiarFondo() {
    fondos[fondoActual].classList.remove("active");

    fondoActual++;

    if (fondoActual >= fondos.length) {
        fondoActual = 0;
    }

    fondos[fondoActual].classList.add("active");
}

setInterval(cambiarFondo, 5000);

/* =====================================
   2. BUSCADOR Y FILTROS
===================================== */

const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const placeCards = document.querySelectorAll(".place-card");
const noResults = document.getElementById("noResults");
const seccionVideo = document.getElementById("videoFestividades");
const videoCarnaval = document.getElementById("videoCarnaval");

let categoriaActual = "Todos";

function mostrarLugares() {

    const textoBuscado = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    let lugaresEncontrados = 0;

    placeCards.forEach((card) => {

        const categoria = card.dataset.category || "";
        const contenido = card.textContent.toLowerCase();

        const coincideCategoria =
            categoriaActual === "Todos" ||
            categoria.toLowerCase() === categoriaActual.toLowerCase();

        const coincideBusqueda =
            contenido.includes(textoBuscado);

        if (coincideCategoria && coincideBusqueda) {
            card.style.display = "";
            lugaresEncontrados++;
        } else {
            card.style.display = "none";
        }

    });

    if (noResults) {

        if (lugaresEncontrados === 0) {
            noResults.style.display = "block";
            noResults.textContent =
                "No encontramos lugares con esa búsqueda.";
        } else {
            noResults.style.display = "none";
        }

    }

}


/* Solo activar el buscador si existe en la página */

if (searchInput && placeCards.length > 0) {

    searchInput.addEventListener("input", mostrarLugares);

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            categoriaActual = button.dataset.category;

            /* Mostrar el video al seleccionar Festividades */
            const esFestividades =
                categoriaActual.toLowerCase() === "festividades";
            
            if (seccionVideo) {
                seccionVideo.hidden = !esFestividades;
            }
            
            /* Detener el video al cambiar de categoría */
            if (!esFestividades && videoCarnaval) {
                videoCarnaval.pause();
                videoCarnaval.currentTime = 0;
            }
            
            mostrarLugares();

        });

    });

    mostrarLugares();

}


