// Script.js starting here

const home_service_container = document.getElementById(
  "home_service_container"
);
const mens_container = document.getElementById("mens_container");

console.log(home_service_container, mens_container);

showHomeData();

async function fetchHomeData(params) {
  console.log(params);
  let response = await fetch(`./services/${params}`);
  let homePageData = [];
  let value = await response.text();
  console.log(value);

  let div = document.createElement("div");
  div.innerHTML = value;

  let as = div.getElementsByTagName("a");

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.includes(`/services/home/`)) {
      homePageData.push(element);
    }
  }
  console.log(as);
  return homePageData;
}

async function showHomeData() {
  const homeData = await fetchHomeData("home");

  for (let index = 0; index < homeData.length; index++) {
    const element = homeData[index];
    if (
      element.href.endsWith(".jpg") ||
      element.href.endsWith(".jpeg") ||
      element.href.endsWith(".png")
    ) {
      const data = element.querySelector(".name").innerHTML;
      console.log(element, element.href);
      const name = data.split("[")[0];
      let category = data.split("[")[1];
      category = category.split("]")[0];

      let productName = name.length > 20 ? name.slice(0, 20) + '...' : name;

      home_service_container.innerHTML += `
            <div class="service-box">
              <a href=${PORT}pages/details-page.html?${category}=${name.replaceAll(
        " ",
        "_"
      )}>
                    <div class="service-box-image mx-auto">
                        <img src=${element.href} alt="image">
                    </div>
                </a>
                <div class="service-box-content">
                    <h2>${productName}</h2>
                    <a href=${PORT}services/${name.replaceAll(" ", "_")}>
                        <p>Explore...</p>
                    </a>
                </div>
                </div>
            `;
    }
  }

  console.log(homeData);
}
