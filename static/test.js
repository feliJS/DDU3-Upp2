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
