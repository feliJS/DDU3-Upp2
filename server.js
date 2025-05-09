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

function handler(request){
    const url = new URL(request.url);
    const headersCORS = new Headers();
    headersCORS.set("Access-Control-Allow-Origin", "*"); 
    if (request.method === "OPTIONS") {
    return new Response(null, { headers: headersCORS });
    }
   