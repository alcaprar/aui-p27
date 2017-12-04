var database = {
    "childName": utils.getQueryString('child') ? utils.getQueryString('child') : 'bambino',
    "startingText" : "Ciao ${childName}, inquadra il pulsante blu con la scritta inizia per qualche secondo per cominciare!",
    "startingText2": "Bene! Cominciamo! Oggi ci teletrasporteremo in tanti bellissimi posti!",
    "questions": [{
        "startingText": "Cominciamo con il primo. Andremo in montagna, piu' precisamente a Gout Mountain in Canada.",
        "placeToBe": {
            "description": "",
            "src": "./img/dataset/places/goat-mountain.jpg"
        },
        "clothes": { // 3 levels of the body each question
            "top": [{
                "src": "./gltf/glasses/scene.gltf",
                "isCorrect": false,
                "explanation": "Potrebbero essere utili, ma qualcos altro e' piu' importante." // text to be read when a wrong option is selected, like a suggestion to help them
            },{
                "src": "./gltf/blue_winter_hat/scene.gltf",
                "isCorrect": true,
                "explanation": "Ben fatto. E' proprio quello che ci serve con quelle temperature!" // text to be read when a wrong option is selected, like a suggestion to help them
            }],
            "middle": [
                
            ],
            "bottom": [
                
            ]
        }
    }]
};