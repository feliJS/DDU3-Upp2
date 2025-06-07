const cities = [
  { id: 2, name: "Lille", country: "France" },
  { id: 3, name: "Nantes", country: "France" },
  { id: 5, name: "Bremen", country: "Germany" },
  { id: 10, name: "Dresden", country: "Germany" },
  { id: 11, name: "Heidelberg", country: "Germany" },
  { id: 12, name: "Venice", country: "Italy" },
  { id: 13, name: "Rome", country: "Italy" },
  { id: 16, name: "Graz", country: "Austria" },
  { id: 20, name: "Basel", country: "Switzerland" },
  { id: 21, name: "Lucerne", country: "Switzerland" },
  { id: 22, name: "Kraków", country: "Poland" },
  { id: 23, name: "Warsaw", country: "Poland" },
  { id: 24, name: "Poznań", country: "Poland" },
  { id: 28, name: "Ghent", country: "Belgium" },
  { id: 31, name: "Maastricht", country: "Netherlands" },
  { id: 38, name: "Maribor", country: "Slovenia" },
  { id: 42, name: "Strasbourg", country: "France" },
];

async function handler(request) { //async för att läsa in json
  const url = new URL(request.url);
  const headersCORS = new Headers(); //headers som gör att vi får olika access
  headersCORS.set("Access-Control-Allow-Origin", "*"); //förhindrar CORS errors
  headersCORS.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS"); //så vi kan skicka förfrågningar från htmlHandler.js blandannat
  headersCORS.set("Access-Control-Allow-Headers", "Content-Type"); //till denna domän

  if (request.method === "OPTIONS") { //En del fetch-anrop skickar först en OPTIONS-förfrågan (för att kontrollera att det är säkert).
    return new Response(null, { status: 204, headers: headersCORS });
  }

  // /cities
  if (url.pathname === "/cities") { //hämta alla städer
    // GET /cities
    if (request.method === "GET") {
      headersCORS.set("Content-Type", "application/json");
      return new Response(JSON.stringify(cities), {
        status: 200,
        headers: headersCORS,
      });
    }

    // POST /cities
    if (request.method === "POST") {
      headersCORS.set("Content-Type", "application/json");
      let body;
      try {
        body = await request.json(); //försök läsa body som json
      } catch {
        return new Response( //annars är de ej correct format.
          JSON.stringify({ error: "Not correct format" }),
          { status: 400, headers: headersCORS }
        );
      }
      if (!body.name || !body.country) { //om man ej har med name eller country är de missing!
        return new Response(
          JSON.stringify({ error: "Missing name and country" }),
          { status: 400, headers: headersCORS }
        );
      }
      const cityExists = cities.some( //om den redan finns!
        (city) => city.name.toLowerCase() === body.name.toLowerCase()
      );
      if (cityExists) {
        return new Response(
          JSON.stringify({ error: "City already exists" }),
          { status: 409, headers: headersCORS }
        );
      }
      let highestID = 0; //skapa unikt id till din nya country!
      for (let x = 0; x < cities.length; x++) { //för cities length
        if (highestID < cities[x].id) { //om highestid är mindre
          highestID = cities[x].id; //sätt den till highestID
        }
      }
      const newCity = { //skapa nya city!
        id: highestID + 1, //högsta man fick ut + 1
        name: body.name, //namnet!
        country: body.country, //country!
      };
      cities.push(newCity); //lägg in den i listan
      return new Response(JSON.stringify(newCity), { //ge dig nya objektet!
        status: 200,
        headers: headersCORS,
      });
    }

    // DELETE /cities
    if (request.method === "DELETE") { //ta bort stad!
      headersCORS.set("Content-Type", "application/json");
      let body;
      try {
        body = await request.json();
      } catch {
        return new Response( //kolla om det är valid json format!
          JSON.stringify({ error: "Invalid JSON" }),
          { status: 400, headers: headersCORS }
        );
      }

      if (body.id === undefined) { //om den inte har ett id
        return new Response(
          JSON.stringify({ error: "Missing id" }), //då saknar den id..
          { status: 400, headers: headersCORS }
        );
      }

      const index = cities.findIndex((c) => c.id === body.id); //kontrollera stad index
      if (index === -1) { //om de inte hittades
        return new Response(
          JSON.stringify({ error: "City not found" }), //
          { status: 404, headers: headersCORS }
        );
      }

      cities.splice(index, 1); //ta bort det från rätt plats, index och sen 1
      return new Response(
        JSON.stringify({ message: "Delete OK" }),
        { status: 200, headers: headersCORS }
      );
    }
  }

  // GET /cities/search
  if (request.method === "GET" && url.pathname === "/cities/search") {
    headersCORS.set("Content-Type", "application/json");
    const text = url.searchParams.get("text"); //hämta search params
    const country = url.searchParams.get("country"); //country också

    if (!text) { //om det ej var ngn text
      return new Response(
        JSON.stringify({ error: "Missing text" }), //skicka error
        { status: 400, headers: headersCORS }
      );
    }

    let results = cities.filter((c) => //filter för att hitta alla resultat
      c.name.toLowerCase().includes(text.toLowerCase()) //man kollar igenom om text finns i name,
      //name kommer ju vara en sträng, så det är om strängen name includerar text.
    );

    if (country) { //om country finns med, det behövs inte man kan bara ha text.
      results = results.filter( //men ifall att country finns med ska man uppdatera results variablen
        //detta är för att vi vill utgå från text och sen vilken country som texten tillhör.
        (c) => c.country.toLowerCase() === country.toLowerCase()
        //så leta reda på alla countrys som stämmer in med country.
      );
    }

    return new Response(JSON.stringify(results), { //ge tibaks results!
      status: 200,
      headers: headersCORS,
    });
  }

  // GET /cities/:id
  const cityByIdPattern = new URLPattern({ pathname: "/cities/:id" });
  if (request.method === "GET") {
    const match = cityByIdPattern.exec(url);
    if (match) { //om det var urln
      headersCORS.set("Content-Type", "application/json");
      const idNum = match.pathname.groups.id; //ta ut id
      const city = cities.find((c) => c.id == idNum); //hitta staden med rätt id
      if (city) { //om den fanns
        return new Response(JSON.stringify(city), { //skicka!
          status: 200,
          headers: headersCORS,
        });
      } else {
        return new Response( //annars skicka city not found
          JSON.stringify({ error: "City not found" }),
          { status: 404, headers: headersCORS }
        );
      }
    }
  }

  // Övriga endpoints eller metoder => 400
  headersCORS.set("Content-Type", "application/json");
  return new Response(
    JSON.stringify({ error: "Invalid endpoint or method" }),
    {
      status: 400,
      headers: headersCORS,
    }
  );
}

Deno.serve({ port: 1337 }, handler);
