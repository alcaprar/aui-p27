var src = {
    items: {
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
    questions: []
};

for(var i = 0; i < lastSession.questions.length; i++){
    var question = lastSession.questions[i];
    question.place = src.places[question.place];

    for(var j = 0; j < question.items.length; j++){
        if(question.items[j].entity !== ''){
            question.items[j].entity = src.items[question.items[j].entity]
        }
    }
    db.questions.push(question)
}