const axios = require('axios');

const getClima = async(lat, lon) => {
    console.log("llego");
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f93affd8a787161841c229b7b7e7ae21&units=metric`);

    console.log("llego2");
    return resp.data.main.temp;
}

module.exports = {
    getClima
}