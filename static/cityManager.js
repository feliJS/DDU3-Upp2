const apiBase = "http://localhost:1337";

const cityList = document.getElementById("city-list");
const searchResults = document.getElementById("search-results");

async function loadCities() {
  const res = await fetch(`${apiBase}/cities`);
  const cities = await res.json();
  cityList.innerHTML = "";
  cities.forEach(city => renderCity(city));
}

function renderCity(city) {
  const div = document.createElement("div");
  div.className = "city-item";
  div.innerHTML = `
    ${city.name}, ${city.country}
    <button class="delete-btn">Delete</button>
  `;
  div.querySelector("button").addEventListener("click", () => deleteCity(city.id));
  cityList.appendChild(div);
}

async function deleteCity(id) {
  const res = await fetch(`${apiBase}/cities`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });
  if (res.ok) loadCities();
}
