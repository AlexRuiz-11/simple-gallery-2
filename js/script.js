document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.getElementById("gallery");
    const infoContainer = document.getElementById("image-info");

    fetch("urls.csv") // Ruta del archivo CSV
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n').slice(1); // Omitir la primera fila (cabecera)

            const imagesInfo = rows.map(row => {
                const columns = row.split(';');
                return {
                    url: "https://i.imgur.com/" + columns[1],
                    info: columns[2]
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
                showFullscreenImage(imgElement.src, imageInfo.info);
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
            infoContainer.classList.add("hidden"); // Ocultar la barra de información al cerrar la imagen
            infoContainer.innerHTML = ''; // Limpiar la información al cerrar la imagen
        });

        fullscreenContainer.appendChild(fullscreenImage);
        document.body.appendChild(fullscreenContainer);

        infoContainer.innerHTML = info; // Mostrar la información
        infoContainer.classList.remove("hidden"); // Mostrar la barra de información
    }
});
