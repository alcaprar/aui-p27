var src = {
    woolrich: {
        src: '#woolrich',
        scale: ''
    },
    tshirtblue: {
        src: '#tshirtblue',
        scale: ''
    },
    mountain1: {
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
        questionsCounter: 0,
        questions: [{
            option1: {
                isCorrect: true,
                entity: src.woolrich
            },
            option2: {
                isCorrect: false,
                entity: src.tshirtblue,
                hint: 'Hint text'
            }
        }]
    }],
    questions: [{
        text: 'Chose what would you bring with you.',
        option1: {
            isCorrect: true,
            entity: src.woolrich
        },
        option2: {
            isCorrect: false,
            entity: src['tshirt-sketchfab'],
            hint: 'Hint text'
        }
    },{
        text: 'Chose what would you bring with you.',
        option1: {
            isCorrect: true,
            src: src.glasses
        },
        option2: {
            isCorrect: false,
            src: src.woolrich,
            hint: 'Hint2 text'
        }
    }]
};