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
    headersCORS.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
    headersCORS.set("Access-Control-Allow-Headers", "Content-Type");
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: headersCORS });
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
            headersCORS.set("Content-Type", "application/json");
            return new Response(JSON.stringify(cities), {

                status: 200,

                headers: headersCORS,
              });
        }
        if(request.method == "POST"){
            headersCORS.set("Content-Type", "application/json"); //behövs denna set:as varje metod?
            let body;
            try{body = await request.json()}
            catch{return new Response(JSON.stringify({ error: "Not correct format" }), {

                status: 400,

                headers: headersCORS,
            })}
            if (!body.name || !body.country) {
                return new Response(JSON.stringify({ error: "Missing name and country" }), {

                    status: 400,

                    headers: headersCORS,
                });
            }
            const cityExists = cities.some(city => city.name.toLowerCase() === body.name.toLowerCase());
            if (cityExists) {
                return new Response(JSON.stringify({ error: "City already exists" }), {

                    status: 409,

                    headers: headersCORS
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

                headers: headersCORS
        });
    }
    if (request.method == "DELETE") {
      let body;
      try {
        body = await request.json();
      } catch {
                  return new Response(JSON.stringify({error: "invalid json"}), { 

                status: 200,

                headers: headersCORS
        });
      }

      if (!body.id) {
        return new Response(JSON.stringify({error: "invalid id"}), { 

                status: 400,

                headers: headersCORS
        });
      }

      const index = cities.findIndex((c) => c.id === body.id);
      if (index === -1) {
        return new Response(JSON.stringify({error: "city not found"}), { 

                status: 404,

                headers: headersCORS
        });
      }

      cities.splice(index, 1);
      return new Response(JSON.stringify({content: "Delete OK"}), { 

                status: 200,

                headers: headersCORS
        });
    }
}

const cityByIdPattern = new URLPattern({ pathname: "/cities/:id" });

if (request.method === "GET" && cityIdMatch) {
  const match = cityByIdPattern.exec(url);  
  if (match) {
    const id = match.pathname.groups.id;   
    const city = cities.find((c) => c.id === id);

    if (city) {
            return new Response(JSON.stringify(city), { 

                status: 200,

                headers: headersCORS
        });                
    }
          return new Response(JSON.stringify({error: "city not found"}), { 

                status: 404,

                headers: headersCORS
        });
  }
}

if (request.method === "GET" && pathname === "/cities/search") {
    const text = url.searchParams.get("text");
    const country = url.searchParams.get("country");

    if (!text) {
      return new Response(JSON.stringify({error: "missing text parameter"}), { 

                status: 400,

                headers: headersCORS
        });
    }

    let results = cities.filter((c) =>
      c.name.toLowerCase().includes(text.toLowerCase())
    );

    if (country) {
      results = results.filter(
        (c) => c.country.toLowerCase() == country.toLowerCase()
      );
    }

    return new Response(JSON.stringify(results), { 

                status: 200,

                headers: headersCORS
        });
  }

return new Response("Not Found", { status: 404 });
}

Deno.serve({ port: 1337},handler)