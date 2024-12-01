const mens_container = document.getElementById("mens_container");

mensData();

function mensData() {
  fetch("../data/mensData.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load JSON file");
      }
      return response.json();
    })
    .then((data) => {
      // Example : Accessing the 'home' products
      const mensData = data.mensData;
      mensData.forEach((product) => {
        if (product.category === "mens") {
          mens_container.innerHTML += `
          <div class="service-box">
                       <a href=${PORT}pages/details-page.html?mens=${
            product.fileName
          }>
                  <div class="service-box-image mx-auto">
                      <img src=${PORT}/${product.filePath} alt=${product.title}>
                  </div>
              </a>
              <div class="service-box-content">
                   <h2>${
                     product.title.length > 20
                       ? product.title.slice(0, 20) + "..."
                       : product.title
                   }</h2>
                  <a href=${PORT}pages/details-page.html?mens=${
            product.fileName
          }>
                      <p>Explore...</p>
                  </a>
              </div>
              </div>
          `;
        }

      });
    })
    .catch((error) => {
      console.log(error);
    });
}
