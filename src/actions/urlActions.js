import HttpClient from '../utils/http'

const httpClient = new HttpClient();

export const fetchUrl = (url) => {

    return function(dispatch) {
        dispatch({
            type: "FETCH_SHORTEN_START",
            payload: url
        });

        httpClient.postUrl(url).then(shortenUrl => {
            dispatch({
                type: "FETCH_SHORTEN_SUCCESS",
                payload: shortenUrl
            });
        });
    }

}