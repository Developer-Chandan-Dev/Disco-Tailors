// Script.js starting here

const home_service_container = document.getElementById(
  "home_service_container"
);
const mens_container = document.getElementById("mens_container");

console.log(home_service_container, mens_container);

showHomeData();

function showHomeData() {
  fetch("./data/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load JSON file");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      // Example : Accessing the 'home' products
      const homeproducts = data.home;
      homeproducts.forEach((product) => {
        console.log(product.filePath, product.title);

        // Example: Add products dynamically to the page
        home_service_container.innerHTML += `
                <div class="service-box">
                  <a href=${PORT}pages/details-page.html?${product.category}=${
          product.fileName
        }>
                        <div class="service-box-image mx-auto">
                            <img src=${product.filePath} alt=${product.title}>
                        </div>
                    </a>
                    <div class="service-box-content">
                        <h2>${
                          product.title.length > 20
                            ? product.title.slice(0, 20) + "..."
                            : product.title
                        }</h2>
                        <a href=${PORT}pages/details-page.html?${
          product.category
        }=${product.fileName}>
                            <p>Explore...</p>
                        </a>
                    </div>
                    </div>
                `;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
