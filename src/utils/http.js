export default {
    json: (url) => {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();
            request.open('GET', url, true)

            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    var data = JSON.parse(request.responseText);
                    resolve(data);
                } else {
                    // we reach the target server, but it returned an error
                    reject(request.statusText)
                }
            };

            request.onerror = function () {
                reject(Error('Network Error'));
            };

            request.send();
        })
    },

    post: (url) => {

    }
}
