//GLÖM EJ FIXA INDENTSEN!

//#1
let getCities = new Request("http://localhost:8000/cities")
fetch(getCities)
    .then((response) => {
        if(response.status == ok){
            console.log("everything works, " + response.status);
            return response.json()
        }
    })
    .then((allCities) => {
        console.log(allCities);
    })
