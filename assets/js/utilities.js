const AJAX = {
    getJSONByPromise(url) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open('GET', url, true);
            xhr.onload = function() {
                if(xhr.status === 200) {
                    var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
                    resolve(data);
                } else {
                    reject(xhr.status);
                }
            };
            xhr.onerror = function() {
                reject(Error('Network Error!'));
            }
            xhr.send(null);
        })
    }
} /*
function getJSONPByPromise(url) {
    return new Promise(function(resolve, reject) {
        var name = 'jsonp' + new Date().getTime();          // maakt een unieke getald op door de secondes die gepasseerd zijn. 
        if (url.match(/\?/)) url += '&callback='+name;      // een array die een waarde weergeeft per elke match, velvolgens wordt er &callback= toegeplakt aan onze url. Daarna nog de "unieke code"(in seconden).   
        else url += '?callback='+name;                      // bij geen match wordt ?callback + unieke code weergegeven in het url.
        
        var script = document.createElement('script');      // script gemaakt
        script.type = 'text/javascript';                    // type van script verwijzen
        script.src = url;                                   // source van de script verwijzen
        
        window[name] = function(data){                      // zal het verwijderen na het uitvoering van het script? idk<<
            document.getElementsByTagName('head')[0].removeChild(script);       
            script = null;
            delete window[name];
    
            resolve(data);
        };
        // TO DO: PDP
    
        document.getElementsByTagName('head')[0].appendChild(script);
    });
}*/