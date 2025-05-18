//GLÖM EJ FIXA INDENTSEN!

//#1
let getCities = new Request("http://localhost:8000/cities")
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
let citiesPost = new Request("http://localhost:8000/cities", {method: "POST", headers:{
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
