import reqwest from 'reqwest';

// ------------------------------------------------------
// Initialize
const remoteUrl = 'https://api.zbcai.xyz/url/create';

export default class HttpClient {
    postUrl = (url) => {
        return new Promise((resolve, reject) => {
            reqwest({
                url: remoteUrl
                , method: 'post'
                , data: { url: url }
                , success: resp => {
                    if (resp.success === true) {
                        resolve(resp.shorten);
                    } else {
                        reject(resp.error);
                    }
                }, header: {
                    'Content-Type': 'application/json',
                }
            });
        });
    };
}
// let json = (url) => {
//     return new Promise((resolve, reject) => {
//         var request = new XMLHttpRequest();
//         request.open('GET', url, true)
//
//         request.onload = () => {
//             if (request.status >= 200 && request.status < 400) {
//                 var data = JSON.parse(request.responseText);
//                 resolve(data);
//             } else {
//                 // we reach the target server, but it returned an error
//                 reject(request.statusText)
//             }
//         };
//
//         request.onerror = function () {
//             reject(Error('Network Error'));
//         };
//
//         request.send();
//     })
// };