// imports
import { cog, people } from "./svg.js";

export const drawWebsites = () => {
  const websiteList = document.querySelector(".website-list ul");
  console.log(websiteList);

  fetch("./data/websites.json")
    .then((response) => response.json())
    .then((data) => {
      // append a new for each element in the data array
      data.forEach((d) => {
        appendli(d);
      });
    })
    .catch((error) => console.log(error));

  const appendli = (data) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("list-icons");
    data.categories.forEach((d) => {
      appendImage(imageDiv, d);
    });
    const span = document.createElement("span");
    span.innerText = data.name;
    div.appendChild(span);
    li.appendChild(imageDiv);
    li.appendChild(div);
    websiteList.appendChild(li);
  };
  const appendImage = (parent, img) => {
    // console.log(parent);
    // console.log(img);

    const image = document.createElement("img");
    image.src = `./assets/${img}.svg`;
    image.classList.add("icon");
    parent.appendChild(image);
  };
};
