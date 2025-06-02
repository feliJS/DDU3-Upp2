const output = document.getElementById("output");

function log(message) {
  const div = document.createElement("div");
  div.className = "log";
  div.textContent = message;
  output.appendChild(div);
}

// #1
function fetchCities() {
    let getCities = new Request("http://localhost:1337/cities");
    return fetch(getCities)
        .then(response => {
            if (response.status == 200) {
                log("#1 everything works, " + response.status);
                return response.json();
            }
        })
        .then(allCities => {
            log("#1 " + JSON.stringify(allCities));
        });
}

// #2
function postCity() {
    let citiesPost = new Request("http://localhost:1337/cities", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: 43,
            name: "Malmö",
            country: "Sweden"
        })
    });
    return fetch(citiesPost)
        .then(response => {
            if (response.status == 200) {
                log("#2 everything works, " + response.status);
                return response.json();
            }
        })
        .then(addedCity => {
            log("#2 " + JSON.stringify(addedCity));
        });
}

// #3
function deleteCityById() {
    let deleteCity = new Request("http://localhost:1337/cities", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: 2 })
    });
    return fetch(deleteCity)
        .then(response => {
            if (response.status == 200) {
                log("#3 everything works, " + response.status);
                return response.text();
            }
        })
        .then(message => {
            log("#3 " + message);
        });
}

// #4
async function getCitiesAgain() {
    let response = await fetch("http://localhost:1337/cities");
    if (response.status == 200) {
        log("#4 everything works, " + response.status);
        let allCities = await response.json();
        log("#4 " + JSON.stringify(allCities));
    }
}

// #5
async function getMalmo() {
    let response = await fetch("http://localhost:1337/cities/43");
    if (response.status == 200) {
        log("#5 everything works, " + response.status);
        let city = await response.json();
        log("#5 " + JSON.stringify(city));
    }
}

// #6
async function searchCitiesEn() {
    let response = await fetch("http://localhost:1337/cities/search?text=en");
    if (response.status == 200) {
        log("#6 everything works, " + response.status);
        let result = await response.json();
        log("#6 " + JSON.stringify(result));
    }
}

// #7
async function searchCitiesEnSweden() {
    let response = await fetch("http://localhost:1337/cities/search?text=en&country=Sweden");
    if (response.status == 200) {
        log("#7 everything works, " + response.status);
        let result = await response.json();
        log("#7 " + JSON.stringify(result));
    }
}

// #8
function duplicateCityPost() {
    let duplicatePost = new Request("http://localhost:1337/cities", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "Dresden",
            country: "Germany"
        })
    });
    return fetch(duplicatePost)
        .then(response => {
            log("#8 everything works, " + response.status);
        });
}

// #9
function invalidCityPost() {
    let invalidPost = new Request("http://localhost:1337/cities", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "Ystad"
        })
    });
    return fetch(invalidPost)
        .then(response => {
            log("#9 everything works, " + response.status);
        });
}

// #10
function deleteNonExistingCity() {
    let deleteNonExistent = new Request("http://localhost:1337/cities", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: 56
        })
    });
    return fetch(deleteNonExistent)
        .then(response => {
            log("#10 everything works, " + response.status);
        });
}

// #11
function deleteEmptyRequest() {
    let deleteEmpty = new Request("http://localhost:1337/cities", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    });
    return fetch(deleteEmpty)
        .then(response => {
            log("#11 everything works, " + response.status);
        });
}

// #12
async function postInvalidMessage() {
    let response = await fetch("http://localhost:1337/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            from: 2,
            to: 1,
            password: "pass"
        })
    });
    log("#12 everything works, " + response.status);
}

// #13
async function getSearchWithoutQuery() {
    let response = await fetch("http://localhost:1337/cities/search");
    log("#13 everything works, " + response.status);
}

// #14
async function deleteMordor() {
    let response = await fetch("http://localhost:1337/mordor", {
        method: "DELETE"
    });
    log("#14 everything works, " + response.status);
}

// Kör alla i ordning
async function runAll() {
    await fetchCities();
    await postCity();
    await deleteCityById();
    await getCitiesAgain();
    await getMalmo();
    await searchCitiesEn();
    await searchCitiesEnSweden();
    await duplicateCityPost();
    await invalidCityPost();
    await deleteNonExistingCity();
    await deleteEmptyRequest();
    await postInvalidMessage();
    await getSearchWithoutQuery();
    await deleteMordor();
}

runAll();
