// Get the album name from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const categoryKey = urlParams.has("mens")
  ? "mens"
  : urlParams.has("womens")
  ? "womens"
  : null;
const categoryName = urlParams.get(categoryKey);
fetchProductDetails();

const thumbnailContainer = document.querySelector("#thumbnail-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
let thumbnails;
// Content
const title = document.querySelector(".title");
const desc = document.querySelector(".desc");
let images = [];
let currentIndex = 0;

async function fetchProductDetails() {
  console.log(categoryKey, categoryName);
  let response = await fetch(
    `${PORT}services/${categoryKey}/${categoryName.replaceAll("_", " ")}`
  );
  let value = await response.text();

  let div = document.createElement("div");
  div.innerHTML = value;
  let as = div.getElementsByTagName("a");
  let lis = div.getElementsByTagName("li");

  if (lis.length <= 1) {
    const h2 = document.createElement("h2");
    h2.innerHTML = "No Data found";
  }

  for (let index = 0; index < as.length; index++) {
    const element = as[index];

    // Product details
    if (
      element.href.endsWith(".png") ||
      element.href.endsWith(".jpg") ||
      element.href.endsWith(".webp") ||
      element.href.endsWith(".json")
    ) {
      if (!element.href.endsWith(".json")) {
        // Adding gallery images
        thumbnailContainer.innerHTML += `
          <div class="thumbnail display-images">
            <img src=${element.href} alt=""/>
          </div>
          `;
        thumbnails = document.querySelectorAll(".thumbnail");
        images.push(element.href);
        // Initialize the first image as active
        updateMainImage(currentIndex);

        thumbnails.forEach((thumbnail, index) => {
          thumbnail.addEventListener("click", () => {
            currentIndex = index; // Set the clicked thumnail as the active image
            updateMainImage(currentIndex);
          });
        });
      }

      // Adding product content
      if (element.href.endsWith(".json")) {
        let jsonData = await fetch(element.href);
        jsonData = await jsonData.json();

        title.innerHTML = jsonData.title;
        desc.innerHTML = jsonData.desc;
      }
    }
  }
}

// Gallery images
const mainImage = document.getElementById("mainImage");

// Function to update the main image and active thumbnail
function updateMainImage(index) {
  mainImage.src = images[index];
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index); // Highlights active thumbnail
  });
}

// Event listeners for the navigation buttons
prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length; // Go to the previous image
  updateMainImage(currentIndex);
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length; // Go to the next image
  updateMainImage(currentIndex);
});
