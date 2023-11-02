const apiUrl = " https://openapi.programming-hero.com/api/ai/tools";

const data = await fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
const datas = data.data.tools;
console.log(datas);

const seeLessButton = document.getElementById("see-less-button");
const seeMoreButton = document.getElementById("see-more-button");
const dataContainer = document.getElementById("data-container");
const loadingSpinner = document.getElementById("loading-spinner");
const sortButton = document.getElementById("sort-button");

seeMoreButton.style.display = "none";
seeLessButton.style.display = "none";
sortButton.style.display = "none";
function displayData(data) {
  dataContainer.innerHTML = "";
  data.forEach((item, index) => {
    //  card div
    const card = document.createElement("div");
    card.className = "max-w-sm rounded overflow-hidden shadow-lg m-4";

    // image element
    const image = document.createElement("img");
    image.className = "w-full";
    image.src = item.image;
    image.alt = item.name;

    // Create a div for card content
    const cardContent = document.createElement("div");
    cardContent.className = "px-6 py-4";

    // Create a title element
    const title = document.createElement("div");
    title.className = "font-bold text-xl  my-2";
    title.textContent = "features";
    //line
    const line = document.createElement("div");
    line.className = "h-px bg-gray-400 mt-6";

    // card content 2
    const cardContent2 = document.createElement("div");
    cardContent2.className = "px-6 pb-4";
    //name
    const cardName = document.createElement("div");
    cardName.className = "font-bold text-xl  my-2";
    cardName.textContent = item.name;

    // dateContent
    const dateContent = document.createElement("div");
    dateContent.className = "flex";

    //icon
    const dateIcon = document.createElement("i");
    dateIcon.className = "fa-solid fa-calendar-days pt-1";

    // date
    const date = document.createElement("p");
    date.className = "pl-2 ";
    date.textContent = item.published_in;

    // arrow button
    const arrowBtn = document.createElement("button");
    arrowBtn.className =
      "fa-solid fa-arrow-right ml-56 bg-gray-200 rounded-full p-2 text-red-500";

    arrowBtn.addEventListener("click", () => {
      // Define the URL to which you want to redirect
      const redirectURL = item.links[0].url;

      // Redirect to the specified URL
      window.location.href = redirectURL;
    });

    //append child to card dateContent
    dateContent.appendChild(dateIcon);
    dateContent.appendChild(date);
    dateContent.appendChild(arrowBtn);

    //append child to card cardConten2
    cardContent2.appendChild(cardName);
    cardContent2.appendChild(dateContent);

    // Features
    const features = item.features;
    const feature1 = document.createElement("li");
    const feature2 = document.createElement("li");
    const feature3 = document.createElement("li");
    feature1.textContent = features[0];
    feature2.textContent = features[1];
    feature3.textContent = features[2];

    // Append the image, title, and description to the card content
    cardContent.appendChild(image);
    cardContent.appendChild(title);
    cardContent.appendChild(feature1);
    cardContent.appendChild(feature2);
    cardContent.appendChild(feature3);
    cardContent.appendChild(line);

    // Append the card content to the card
    card.appendChild(cardContent);
    card.appendChild(cardContent2);
    const loadingSpinner = document.getElementById("loading-spinner");

    loadingSpinner.style.display = "none";
    sortButton.style.display = "block";

    // Append the card to the data container
    dataContainer.appendChild(card);
    // displaying only six cards
    if (index >= 6) {
      card.style.display = "none";
      seeLessButton.style.display = "none";
      seeMoreButton.style.display = "block";
    }
    //see more buttons karma
    seeMoreButton.addEventListener("click", function () {
      card.style.display = "block";

      seeMoreButton.style.display = "none";
      seeLessButton.style.display = "block";
    });
    // see less buttons karma
    seeLessButton.addEventListener("click", function () {
      if (index >= 6) {
        card.style.display = "none";
        seeLessButton.style.display = "none";
        seeMoreButton.style.display = "block";
      }
    });
  });
}

function sortCardsByDate() {
  const sortedData = [...datas]; // Create a copy of the data array
  sortedData.sort(
    (a, b) => new Date(a.published_in) - new Date(b.published_in)
  );
  console.log(sortedData);
  displayData(sortedData); // Display the sorted cards
}
displayData(datas);

sortButton.addEventListener("click", sortCardsByDate);
