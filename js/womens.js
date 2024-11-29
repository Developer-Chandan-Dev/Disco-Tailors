const womens_container = document.getElementById("womens_container");

async function fetchWomensData() {
  let response = await fetch(`${PORT}services/womens`);
  let value = await response.text();

  let div = document.createElement("div");
  div.innerHTML = value;

  let as = div.getElementsByTagName("a");
  let lis = div.getElementsByTagName("li");

  if (lis.length <= 1) {
    const h2 = document.createElement("h2");
    h2.innerHTML = "No Data found";
    womens_container.append(h2);
  }

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (
      element.href.includes(`/services/womens/`) &&
      !element.href.endsWith(".jpg")
    ) {
      const name = element.querySelector(".name");

      let productName =
      name.innerHTML.length > 20
        ? name.innerHTML.slice(0, 20) + "..."
        : name.innerHTML;

      womens_container.innerHTML += `
                <div class="service-box">
                              <a href=${PORT}pages/details-page.html?womens=${name.innerHTML.replaceAll(
        " ",
        "_"
      )}>
                        <div class="service-box-image mx-auto">
                            <img src=${element.href + ".jpg"} alt="image">
                        </div>
                    </a>
                    <div class="service-box-content">
                        <h2>${productName}</h2>
                        <a href=${PORT}services/${name.innerHTML.replaceAll(
        " ",
        "_"
      )}>
                            <p>Explore...</p>
                        </a>
                    </div>
                    </div>
                `;
    }
  }
}

fetchWomensData();
