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

/**
 * Max 6 clothes per trip.
 * @type {{counter: number, trips: *[]}}
 */
var db = {
    counter: 0,
    trips: [{
        entity: src.places.mountainSnow,
        temperature: '0',
        season: 'Inverno',
        exerciseText: 'Scegli tutti i vestiti che ti porteresti con te.',
        clothes: [{
            isCorrect: false,
            entity: src.clothes.woolrich
        }, {
            isCorrect: true,
            entity: src.clothes.tshirtblue
        }, {
            isCorrect: true,
            entity: src.clothes.costumemareouomo
        }]
    },{
        temperature: '10',
        season: 'Primavera',
        exerciseText: 'Scegli tutti i vestiti che ti porteresti con te.',
        clothes: [{
            isCorrect: false,
            entity: src.clothes.woolrich
        }, {
            isCorrect: true,
            entity: src.clothes.tshirtblue
        }, {
            isCorrect: true,
            entity: src.clothes.costumemareouomo
        }]
    },{
        place: 'Place nr 1',
        entity: src.places.beach,
        temperature: '30',
        season: 'Estate',
        exerciseText: 'Scegli tutti i vestiti che ti porteresti con te.',
        clothes: [{
            isCorrect: false,
            entity: src.clothes.woolrich
        }, {
            isCorrect: true,
            entity: src.clothes.tshirtblue
        }, {
            isCorrect: true,
            entity: src.clothes.costumemareouomo
        }]
    }]
};