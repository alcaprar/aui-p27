var src = {
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
    places:{
        city: {
            src: '#city'
        },
        beach: {
            src: '#beach'
        }
    }

};

var db = {
    counter: 0,
    trips: [{
        place: 'Place nr 1',
        entity: src.places.beach,
        exerciseText: 'Choose what would you bring with you',
        clothes: [{
            isCorrect: true,
            entity: src.woolrich
        }, {
            isCorrect: false,
            entity: src.tshirtblue
        }]
    }]
};