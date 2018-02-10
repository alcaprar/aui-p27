var src = {
    glasses: {
        type: 'gltf',
        src: '#glasses',
        scale: '0.001 0.001 0.001'
    },
    woolrich: {
        type: 'img',
        src: '#woolrich',
        scale: ''
    }
};

var db = {
    counter: 0,
    questions: [{
        text: 'Chose what would you bring with you.',
        option1: {
            isCorrect: true,
            entity: src.glasses
        },
        option2: {
            isCorrect: false,
            entity: src.woolrich,
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