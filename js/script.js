document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.getElementById("gallery");
    const infoContainer = document.getElementById("image-info");
    let cont; // Definir la constante para almacenar el valor de la primera columna y segunda fila

    fetch("urls.csv") // Ruta del archivo CSV
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n');

            // Obtener el valor de la primera columna y segunda fila del CSV
            const firstRowColumns = rows[1].split(';');
            cont = firstRowColumns[0]; // Valor de la primera columna y fila

            // Mostrar el valor de cont en el elemento HTML
            document.getElementById("imagesCont").textContent = cont;

            // Omitir la primera fila (cabecera) y procesar la información de las imágenes
            const imagesInfo = rows.slice(1).map(row => {
                const columns = row.split(';');
                return {
                    url: columns[1],
                    number: columns[0], // Columna 0: Número de imagen
                    title: columns[2], // Columna 2: Título de la imagen
                    description: columns[3], // Columna 3: Descripción de la imagen
                    tags: columns[4], // Columna 4: Etiquetas de la imagen
                    team: columns[5], // Columna 5: Ubicación de la imagen
                    year: columns[6],
                    location: columns[7],
                    source: columns[8]
                };
            });

            setupGallery(imagesInfo);
        })
        .catch(error => console.error("Error al obtener la lista de imágenes e información:", error));

    function setupGallery(imagesInfo) {
        imagesInfo.forEach(imageInfo => {
            const imgContainer = document.createElement("div");
            imgContainer.classList.add("img-container");

            const imgElement = document.createElement("img");
            imgElement.src = imageInfo.url;

            imgElement.addEventListener("click", function () {
                showFullscreenImage(imgElement.src, imageInfo);
            });

            imgContainer.appendChild(imgElement);
            galleryContainer.appendChild(imgContainer);
        });
    }

    function showFullscreenImage(imageSrc, info) {
        const fullscreenContainer = document.createElement("div");
        fullscreenContainer.classList.add("fullscreen-container");

        const fullscreenImage = document.createElement("img");
        fullscreenImage.src = imageSrc;

        fullscreenImage.addEventListener("click", function () {
            fullscreenContainer.remove();
            // Limpiar la información al cerrar la imagen
            infoContainer.innerHTML = '';
            // Ocultar la barra lateral al cerrar la imagen
            infoContainer.classList.add("hidden");
        });

        fullscreenContainer.appendChild(fullscreenImage);
        document.body.appendChild(fullscreenContainer);

        displayImageInfo(info);
    }

    function displayImageInfo(info) {
        // Mostrar la información de la imagen en la barra lateral
        document.getElementById("number").textContent = info.number;
        document.getElementById("title").textContent = info.title;
        document.getElementById("description").textContent = info.description;
        document.getElementById("tags").textContent = info.tags;
        document.getElementById("team").textContent = info.team;
        document.getElementById("year").textContent = info.year;
        document.getElementById("location").textContent = info.location;
        document.getElementById("source").textContent = info.source;

        // Mostrar y actualizar la barra de información lateral
        infoContainer.classList.remove("hidden");
    }



});
