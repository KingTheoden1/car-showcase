export async function fetchCars() {
    const headers = {
        'X-RapidAPI-Key': '3284f3090bmsh2216203ed9e94c7p163f0fjsn0758e85f5594',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
}

    const response = await fetch('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars', {
        headers: headers,
    });

    const result = await response.json();

    return result;
}