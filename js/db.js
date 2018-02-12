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
    mountain1: {
        type: 'img',
        src: '#mountain1'
    },
    city: {
        src: '#city'
    }
};

var db = {
    counter: 0,
    trips: [{
        place: 'Place nr 1',
        entity: src.city,
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