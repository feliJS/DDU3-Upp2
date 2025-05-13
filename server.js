const cities = [
    { id: 2, name: "Lille", country: "France"},
    { id: 3, name: "Nantes", country: "France"},
    { id: 5, name: "Bremen", country: "Germany"},
    { id: 10, name: "Dresden", country: "Germany"},
    { id: 11, name: "Heidelberg", country: "Germany"},
    { id: 12, name: "Venice", country: "Italy"},
    { id: 13, name: "Rome", country: "Italy"},
    { id: 16, name: "Graz", country: "Austria"},
    { id: 20, name: "Basel", country: "Switzerland"},
    { id: 21, name: "Lucerne", country: "Switzerland"},
    { id: 22, name: "Kraków", country: "Poland"},
    { id: 23, name: "Warsaw", country: "Poland"}, 
    { id: 24, name: "Poznań", country: "Poland"},
    { id: 28, name: "Ghent", country: "Belgium"},
    { id: 31, name: "Maastricht", country: "Netherlands"},
    { id: 38, name: "Maribor", country: "Slovenia"},
    { id: 42, name: "Strasbourg", country: "France"},
  ];
//fixa response function
//fixa error funktioner

async function handler(request){
    const url = new URL(request.url);
    const headersCORS = new Headers();
    headersCORS.set("Access-Control-Allow-Origin", "*"); 
    if (request.method === "OPTIONS") {
    return new Response(null, { headers: headersCORS });
    }
    //cities
    if(url.pathname == "/cities"){
        const allowedMethods = ["GET", "POST", "DELETE"]
        if (!allowedMethods.includes(request.method)) {
            return new Response({status: 400,

                headers: { "Content-Type": "application/json" }
            });
        }
        if(request.method == "GET"){
            headersCORS.set("content-type", "application/json");
            return new Response(JSON.stringify(cities), {

                status: 200,

                headers: headersCORS,
              });
        }
        if(request.method == "POST"){
            try{let body = await request.json()}
            catch{return new Response(JSON.stringify({ error: "Not correct format" }), {

                status: 400,

                headers: { "Content-Type": "application/json" }
            })}
            if (!body.name || !body.country) {
                return new Response(JSON.stringify({ error: "Missing name and country" }), {

                    status: 400,

                    headers: { "Content-Type": "application/json" }
                });
            }
            const cityExists = cities.some(city => city.name.toLowerCase() === body.name.toLowerCase());
            if (cityExists) {
                return new Response(JSON.stringify({ error: "City already exists" }), {

                    status: 409,

                    headers: { "Content-Type": "application/json" }
                });
            }
            let highestID = 0;
            for (let x = 0; x < cities.length; x++) {
                if(highestID < cities[x].id){
                    highestID = cities[x].id
                }
            }
            let newCity = {id: highestID+1, name: body.name, country: body.country}
            cities.push(newCity);
            return new Response(JSON.stringify(newCity), { 

                status: 200,

                headers: { "Content-Type": "application/json" }
        });
    }
    if(request.method == "DELETE"){
        
    }
}
return new Response("Not Found", { status: 404 });
}

Deno.serve(handler)