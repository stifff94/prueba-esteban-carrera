const express = require('express');
const app = express();
const axios = require('axios');

const ubicacion = require('./controlador/ubicacion');
const clima = require('./controlador/clima');

const hbs = require('hbs');
require('./hbs/helpers');

const getInfo = async(ciudad,ciudad2) => {
    console.log("llego")
    try {

        const coords = await ubicacion.getCiudadLatLon('Quito');
        const temp = await clima.getClima(coords.lat, coords.lng);
        const coords2 = await ubicacion.getCiudadLatLon('Quito');
        const temp2 = await clima.getClima(coords2.lat, coords2.lng);

        return temp;
    } catch (e) {
        return `No se pudo determinar el clima`;
    }
}

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

// Express HBS engine
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    
    getInfo("Quito","Guayaquil").then(archivo =>{
        
            res.render('home', {    
                datos1: archivo,
                datos2: archivo,
            });
        
        
    }).catch(error =>{
        res.render('home', {    
            datos1: error,
        });
    });
    
    
});

app.get('/about', function(req, res) {
    
    getInfo("Madrid","Paris").then(archivo =>{
        if(archivo.length > 2){
            res.render('about', {    
                datos1: archivo,
                datos2: archivo,
            });
        }
        else{
            res.render('about', {    
                datos1: archivo[0],
                datos2: archivo[1],
            });
        }
        
    }).catch(error =>{
        res.render('about', {    
            datos1: error,
        });
    });
});

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});