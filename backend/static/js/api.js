var api = (function(){
    var module = {};

    function formPost(url, data, callback) {
        let formdata = new FormData();
        Object.keys(data).forEach((k) => {
            formdata.append(k, data[k]);
        });
        let req = new XMLHttpRequest();
        req.onload = () => {
            if(req.status !== 200) callback(req.status + ": " + req.responseText, null);
            else callback(null, JSON.parse(req.responseText));
        };
        req.open('POST', url, true);
        req.send(formdata);
    }

    function request(method, url, data, callback) {
        let req = new XMLHttpRequest();
        req.onload = () => {
            if(req.status !== 200) callback(req.status + ": " + req.responseText, null);
            else callback(null, JSON.parse(req.responseText));
        };
        req.open(method, url, true);
        if (!data) req.send();
        else{
            req.setRequestHeader('Content-Type', 'application/json');
            req.send(JSON.stringify(data));
        }
    }

    module.getCurrentMode = () => {
        request('GET', 'api/mode/', null, (error, res) => {
            if(error) console.log(error);
            else notifyModeListener(res.mode);
        });
    };

    module.updateMode = (mode) => {
        request('POST', 'api/mode/', {mode: mode}, (error, res) => {
            if(error) console.log(error);
            else notifyModeListener(mode);
        });
    };

    module.uploadImage = (img) => {
        formPost('api/image/', {image:img}, (error, res) => {
            if(error) console.log(error);
            else console.log('success');
        });
    };

    let modeListener = [];

    function notifyModeListener(mode) {
        modeListener.forEach((i) => {
            i(mode);
        });
    }

    module.onModeUpdate = function(listener){
        modeListener.push(listener);
    };

    
    return module;
})();