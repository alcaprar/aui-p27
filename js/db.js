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
        place: 'Place nr 1',
        entity: src.places.beach,
        exerciseText: 'Siamo in una bellissima spiaggia. Scegli tutti i vestiti che ti porteresti con te.',
        clothes: [{
            isCorrect: false,
            entity: src.clothes.woolrich,
            hint: 'Questo potrebbe essere adatto per un bel viaggio in montagna.Prova con un altro.'
        }, {
            isCorrect: true,
            entity: src.clothes.tshirtblue
        }, {
            isCorrect: true,
            entity: src.clothes.costumemareouomo
        }]
    },{
        place: 'Place nr 2',
        entity: src.places.city,
        exerciseText: 'Choose what would you bring with you',
        clothes: [{
            isCorrect: true,
            entity: src.clothes.woolrich
        }, {
            isCorrect: false,
            entity: src.clothes.tshirtblue,
            hint: 'Questo potrebbe essere adatto per un bel viaggio al mare. Prova con un altro.'
        }, {
            isCorrect: false,
            entity: src.clothes.costumemareouomo,
            hint: 'Questo potrebbe essere adatto per un bel viaggio al mare. Prova con un altro.'
        }]
    }]
};