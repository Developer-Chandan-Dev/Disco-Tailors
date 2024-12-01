// Get the album name from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const categoryKey = urlParams.has("mens")
  ? "mens"
  : urlParams.has("womens")
  ? "womens"
  : null;
const categoryName = urlParams.get(categoryKey);
// fetchProductDetails();

const thumbnailContainer = document.querySelector("#thumbnail-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
let thumbnails;
// Content
const title = document.querySelector(".title");
const desc = document.querySelector(".desc");
let images = [];
let currentIndex = 0;
document.querySelector(
  "title"
).innerHTML = `Disco Tailor - ${categoryName.replaceAll("_", " ")}`;

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

// New logic
if (categoryKey === "mens") {
  fetchDetailsData("mensData.json");
}
if (categoryKey === "womens") {
  fetchDetailsData("womensData.json");
}
function fetchDetailsData(params) {
  fetch(`../data/${params}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load JSON file");
      }
      return response.json();
    })
    .then((data) => {
      // Example : Accessing the 'home' products
      console.log(data);
      const response = categoryKey === "mens" ? data.mensData : data.womensData;

      response.forEach((item) => {
        if (item.fileName === categoryName) {
          console.log(item);
          item?.gallery?.forEach((image) => {
            console.log(image);
            thumbnailContainer.innerHTML += `
          <div class="thumbnail display-images">
            <img src=${image} alt=${item.title}/>
          </div>
          `;

            thumbnails = document.querySelectorAll(".thumbnail");
            images.push(image);
            // Initialize the first image as active
            updateMainImage(currentIndex);

            thumbnails.forEach((thumbnail, index) => {
              thumbnail.addEventListener("click", () => {
                currentIndex = index; // Set the clicked thumnail as the active image
                updateMainImage(currentIndex);
              });
            });

            title.innerHTML = item.title;
            desc.innerHTML = item.description;
          });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
