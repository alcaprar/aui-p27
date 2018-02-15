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
        place: 'Place nr 1',
        entity: src.places.mountainSnow,
        temperature: '0',
        season: 'winter',
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
        place: 'Place nr 1',
        entity: src.places.mountainNoSnow,
        temperature: '10',
        season: 'spring',
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
        place: 'Place nr 1',
        entity: src.places.beach,
        temperature: '30',
        season: 'summer',
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
    }]
};