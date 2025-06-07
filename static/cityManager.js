const apiBase = "http://localhost:1337"; //bas till url

const cityList = document.getElementById("city-list"); //city list där alla visas
const searchResults = document.getElementById("search-results"); //resultaten för sök

async function loadCities() { //hämtar alla städer från servern
  const res = await fetch(`${apiBase}/cities`);
  const cities = await res.json();
  cityList.innerHTML = ""; //rensar listan
  cities.forEach(city => renderCity(city)); //lägger till varje stad med renderCity
}

function renderCity(city) { //detta skapar div till varje stad
  const div = document.createElement("div");
  div.className = "city-item"; //className cityItem
  div.innerHTML = ` //såhär kommer den visas
    ${city.name}, ${city.country}
    <button class="delete-btn">Delete</button>
  `;
  div.querySelector("button").addEventListener("click", () => deleteCity(city.id)); //dn kmmer ha en knapp som tar bort de
  cityList.appendChild(div);
}

async function deleteCity(id) { //här är requesten
  const res = await fetch(`${apiBase}/cities`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });
  if (res.ok) loadCities(); //om det gick bra, reloada cities (för o uppdatera så det inte blir delete)
}

//nedan är async, den kommer ju lägga till när det är klart
document.getElementById("add-btn").addEventListener("click", async () => { //lägger till en stad! den är async.
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