var eventsUtils = {
    'trigger': function (eventName, eventData) {
        console.log('[Eventutils][trigger]', eventName, eventData);
        var evt = new CustomEvent(eventName, {detail: eventData});
        document.dispatchEvent(evt);
        console.log('Event triggered ', evt);
    },
    'addEventListener': function (eventName, callback) {
        document.addEventListener(eventName, callback, {passive: true})
    },
    'removeEventListener': function (eventName, callback) {
        if(typeof callback !== 'undefined'){
            document.removeEventListener(eventName, callback)
        }else{
            document.removeEventListener(eventName)
        }
    }
};