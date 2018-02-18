var src = {
    clothes: {
        woolrich: {
            type: 'img',
            src: '#woolrich',
            scale: ''
        },
        tshirtblue: {
            type: 'img',
            src: '#tshirtblue',
            scale: ''
        },
        pinkwinterhat: {
            type: 'gltf',
            src: '#pinkwinterhat',
            scale: ''
        },
        costumemareouomo: {
            type: 'img',
            src: '#costumemareuomo'
        },
        bikinidonna: {
            type: 'img',
            src: '#bikinidonna'
        },
        infradito: {
            type: 'img',
            src: '#infradito'
        }
    },
    places:{
        city: {
            src: '#city'
        },
        beach: {
            src: '#beach'
        },
        mountainNoSnow: {
            src: '#mountain-no-snow'
        },
        mountainSnow: {
            src: '#mountain-snow'
        }
    }
};

var speak = lastSession.audio;

var db = {
    counter: 0,
    trips: []
};

for(var i = 0; i < lastSession.trips.length; i++){
    var trip = lastSession.trips[i];
    trip.place = src.places[trip.place];

    for(var j = 0; j < trip.clothes.length; j++){
        if(trip.clothes[j].entity !== ''){
            trip.clothes[j].entity = src.clothes[trip.clothes[j].entity]
        }
    }
    db.trips.push(trip)
}