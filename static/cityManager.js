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

document.getElementById("add-btn").addEventListener("click", async () => {
  const name = document.getElementById("add-name").value;
  const country = document.getElementById("add-country").value;
  if (!name || !country) return alert("Please enter name and country");

  const res = await fetch(`${apiBase}/cities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, country })
  });

  if (res.ok) {
    document.getElementById("add-name").value = "";
    document.getElementById("add-country").value = "";
    loadCities();
  } else {
    const error = await res.json();
    alert(error.error);
  }
});

document.getElementById("search-btn").addEventListener("click", async () => {
  const text = document.getElementById("search-text").value;
  const country = document.getElementById("search-country").value;

  const url = new URL(`${apiBase}/cities/search`);
  if (text) url.searchParams.set("text", text);
  if (country) url.searchParams.set("country", country);

  const res = await fetch(url);
  const results = await res.json();

  searchResults.innerHTML = "";
  if (res.ok) {
    if (results.length === 0) {
      searchResults.textContent = "No cities found";
    } else {
      results.forEach(city => {
        const div = document.createElement("div");
        div.className = "city-item";
        div.textContent = `${city.name}, ${city.country}`;
        searchResults.appendChild(div);
      });
    }
  } else {
    alert(results.error);
  }

});

loadCities();