var database = {
    "childName": utils.getQueryString('child') ? utils.getQueryString('child') : 'bambino',
    "startingText" : "Ciao ${childName}, inquadra la scritta blu per qualche secondo per cominciare!",
    "startingText2": "Bene! Cominciamo! Oggi viaggeremo in tanti bellissimi posti!",
    "questions": [{
        "startingText": "Cominciamo con il primo. Andiamo a vedere di che posto si tratta. Inquadra la tv con il cursore per vederlo meglio.",
        "placeToBe": {
            "description": "Qui siamo in montagna, alta montagna. Siamo in Canada, in America del Nord. In questo momento sta nevicando e ci sono meno 5 gradi centrigradi!",
            "src": "./img/dataset/places/goat-mountain.jpg"
        },
        "textBeforeClothes": "Abbiamo capito che stiamo andando in un posto molto molto freddo, quindi decidiamo con cura quali vestiti scegliere.",
        "clothes": { // 3 levels of the body each question
            "top": {
                "startingText": "Cominciamo dalla parte alta del corpo. Usa il pallino nero per decidere una cosa da portare con te.",
                "options": [{
                    "src": "./gltf/glasses/scene.gltf",
                    "isCorrect": false,
                    "explanation": "Potrebbero essere utili, ma qualcos altro e' piu' importante." // text to be read when a wrong option is selected, like a suggestion to help them
                },{
                    "src": "./gltf/blue_winter_hat/scene.gltf",
                    "isCorrect": true,
                    "explanation": "Ben fatto. E' proprio quello che ci serve con quelle temperature!" // text to be read when a wrong option is selected, like a suggestion to help them
                }]
            },
            "middle": [
                
            ],
            "bottom": [
                
            ]
        }
    }]
};