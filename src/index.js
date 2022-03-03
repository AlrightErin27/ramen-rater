// write your code here
fetch(" http://localhost:3000/ramens")
  .then((res) => res.json())
  .then((data) => showRamenMenu(data))
  .catch((error) => console.error("ERROR️‍ 🔥:", error));

//display all ramen images in menu
function showRamenMenu(ramenArr) {
  const menu = document.getElementById("ramen-menu");

  for (let i = 0; i < ramenArr.length; i++) {
    const ramen = ramenArr[i];
    const img = document.createElement("img");

    img.src = ramen.image;
    img.setAttribute("ramen-id", ramen.id);
    img.addEventListener("click", handleShowDetail);
    menu.appendChild(img);
    img.style.border = "black solid 11px";
  }
}

//display ramen info
function handleShowDetail(e) {
  const img = e.target;
  const id = img.getAttribute("ramen-id");

  fetch(`http://localhost:3000/ramens/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showRamenDetails(data);
    })
    .catch((error) => console.error("ERROR️‍ ❌:", error));
}

function showRamenDetails(data) {
  const img = document.querySelector(".detail-image");
  img.src = data.image;
  img.alt = data.name;

  document.querySelector(".name").textContent = data.name;
  document.querySelector(".restaurant").textContent = data.restaurant;
  document.querySelector("#rating-display").textContent = data.rating;
  document.querySelector("#comment-display").textContent = data.comment;
}

//form
const form = document.querySelector("#new-ramen");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  console.log(event.target[2].value);
  const url = event.target[2].value;

  const img = document.createElement("img");
  img.src = url;
  img.alt = event.target[0].value;

  const menu = document.querySelector("#ramen-menu");

  menu.appendChild(img);
  form.reset();
});
