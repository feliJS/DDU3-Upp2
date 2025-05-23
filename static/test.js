//GLÖM EJ FIXA INDENTSEN!
//ta bort everything works loggen?

//#1
let getCities = new Request("http://localhost:1337/cities")
fetch(getCities)
    .then((response) => {
        if(response.status == 200){
            console.log("everything works, " + response.status);
            return response.json()
        }
    })
    .then((allCities) => {
        console.log(allCities);
    })

//#2
let citiesPost = new Request("http://localhost:1337/cities", {method: "POST", headers:{
    "Content-Type": "application/json"},    
    body: JSON.stringify({
        "name": "Malmö",
        "country": "Sweden"
    })})
fetch(citiesPost)
    .then((response) => {
        if(response.status == 200){
            console.log("everything works, " + response.status);
            return response.json()
        }
    })
    .then((addedCity) => {
        console.log(addedCity);
    })

//#3
let deleteCity = new Request("http://localhost:1337/cities", {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: 2
    })
})
fetch(deleteCity)
    .then((response) => {
        if(response.status == 200){
            console.log("everything works, " + response.status);
            return response.text()
        }
    })
    .then((message) => {
        console.log(message);
    })

//#4
async function getCitiesAgain() {
    let response = await fetch("http://localhost:8000/cities")
    if(response.status == 200){
        console.log("everything works, " + response.status);
        let allCities = await response.json()
        console.log(allCities);
    }
}
getCitiesAgain()

//#5
async function getMalmo() {
    let response = await fetch("http://localhost:8000/cities/43")
    if(response.status == 200){
        console.log("everything works, " + response.status);
        let city = await response.json()
        console.log(city);
    }
}
getMalmo()


//#6
async function searchCitiesEn() {
    let response = await fetch("http://localhost:8000/cities/search?text=en")
    if(response.status == 200){
        console.log("everything works, " + response.status);
        let result = await response.json()
        console.log(result);
    }
}
searchCitiesEn()

//#7
async function searchCitiesEnSweden() {
    let response = await fetch("http://localhost:8000/cities/search?text=en&country=Sweden")
    if(response.status == 200){
        console.log("everything works, " + response.status);
        let result = await response.json()
        console.log(result);
    }
}
searchCitiesEnSweden()


//#8
let duplicatePost = new Request("http://localhost:8000/cities", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "Dresden",
        country: "Germany"
    })
})
fetch(duplicatePost)
    .then((response) => {
        console.log("status code is: " + response.status);
    })

//#9
let invalidPost = new Request("http://localhost:8000/cities", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "Ystad"
    })
})
fetch(invalidPost)
    .then((response) => {
        console.log("status code is: " + response.status);
    })


//#10
let deleteNonExistent = new Request("http://localhost:8000/cities", {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: 56
    })
})
fetch(deleteNonExistent)
    .then((response) => {
        console.log("status code is: " + response.status);
    })


//#11
let deleteEmpty = new Request("http://localhost:8000/cities", {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({})
})
fetch(deleteEmpty)
    .then((response) => {
        console.log("status code is: " + response.status);
    })

//#12
async function postInvalidMessage() {
    let response = await fetch("http://localhost:8000/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            from: 2,
            to: 1,
            password: "pass"
        })
    })
    console.log("status code is: " + response.status);
}
postInvalidMessage()

//#13
async function getSearchWithoutQuery() {
    let response = await fetch("http://localhost:8000/cities/search")
    console.log("status code is: " + response.status);
}
getSearchWithoutQuery()

//#14
async function deleteMordor() {
    let response = await fetch("http://localhost:8000/mordor", {
        method: "DELETE"
    })
    console.log("status code is: " + response.status);
}
deleteMordor()