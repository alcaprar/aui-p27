var utils = {
    addEntity: function (type, options) {
        var el = document.createElement(type);
        for(var key in options){
            el.setAttribute(key, options[key])
        }
        document.querySelector('a-scene').appendChild(el);
    },
    removeEntity: function (id) {
        var el = document.getElementById(id);
        el.parentNode.removeChild(el)
    },
    showEntity: function (id){
        var el = document.getElementById(id);
        el.setAttribute('visible', 'true')
    },
    hideEntity: function (id){
        var el = document.getElementById(id);
        el.setAttribute('visible', 'false')
    }
};