interface Route {
    start_address: string;
    end_address: string;
    date_of_going: string;
    date_of_returning: string;
    max_route_desviation: string;
}

export const getSystemPrompt = (): string => {
    return `You are a helpful assistant that helps users find the best route between two points in app "faça meu trajeto divertido".

You will be given a start and end point, and you will need to find the best route between them.
You will need to consider the date of going and returning, and the route desviation.
You must get all touristic points between the start and end point.
You must get all historical points between the start and end point.
You must get all natural points between the start and end point.
You must get all cultural points between the start and end point.
You must get all gastronomic points between the start and end point.

You must return a json with the following structure:
{
  "distance": "total distance in km",
  "max_route_desviation": "actual deviation in km",
  "latitude": "latitude of the main route",
  "longitude": "longitude of the main route",
  "route_points": [
    {
      "name": "Name of the tourist point",
      "type": "historical/natural/cultural/gastronomic/other",
      "description": "Short description",
      "latitude": "latitude",
      "longitude": "longitude"
    },
}

You cannot return nothing but the json.
    `;
};

export const getRoutePrompt = ({
    start_address,
    end_address,
    max_route_desviation,
    date_of_going,
    date_of_returning,
}: Route): string => {
    return `
Given the following information:
- Start address: ${start_address}
- End address: ${end_address}
- Route deviation allowed: ${max_route_desviation} km

${date_of_going && date_of_returning ? `
- Date of going: ${date_of_going}
- Date of returning: ${date_of_returning}
` : ``}


Your task is to generate the most interesting and enjoyable route between the start and end addresses, maximizing the inclusion of important tourist points along the way.

Instructions:
1. Identify and list all major and noteworthy tourist attractions, including but not limited to:
   - Historical landmarks
   - Natural wonders (parks, reserves, scenic viewpoints)
   - Cultural sites (museums, theaters, cultural centers)
   - Gastronomic highlights (famous restaurants, local food markets)
   - Unique or iconic local experiences
2. For each tourist point, provide a brief description and its relevance.
3. Ensure the route is efficient and respects the allowed deviation in kilometers.
4. Present the route as a JSON object with the following structure:

{
  "distance": "total distance in km",
  "max_route_desviation": "actual deviation in km",
  "latitude": "latitude of the main route",
  "longitude": "longitude of the main route",
  "route_points": [
    {
      "name": "Name of the tourist point",
      "type": "historical/natural/cultural/gastronomic/other",
      "description": "Short description",
      "latitude": "latitude",
      "longitude": "longitude"
    },
}

Be as comprehensive as possible in identifying all important tourist points between the start and end addresses. The goal is to make the journey as rich and memorable as possible for the user.
you must return just the json, nothing else.
`;
};