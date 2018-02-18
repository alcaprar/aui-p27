var eventsUtils = {
    'trigger': function (eventName, eventData) {
        console.log('[Eventutils][trigger]', eventName, eventData);
        var evt = new CustomEvent(eventName, {detail: eventData});
        document.dispatchEvent(evt);
    },
    'addEventListener': function (eventName, callback, once) {
        document.addEventListener(eventName, callback, {passive: true, once: !!(once)})
    },
    'removeEventListener': function (eventName, callback) {
        if(typeof callback !== 'undefined'){
            document.removeEventListener(eventName, callback)
        }else{
            document.removeEventListener(eventName)
        }
    }
};