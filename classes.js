let classes = {};

(function(){
    let data = null;
    if (typeof CLASSES_DATA !== 'undefined') {
        data = CLASSES_DATA;
    } else if (typeof require === 'function') {
        try {
            const fs = require('fs');
            const path = require('path');
            data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/classes.json'), 'utf8'));
        } catch (e) {}
    } else if (typeof XMLHttpRequest !== 'undefined') {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/classes.json', false);
        xhr.send(null);
        if (xhr.status === 200) data = JSON.parse(xhr.responseText);
    }
    classes = data || {};
})();

