import axios from 'axios';
import ipsum from 'lorem-ipsum';

const sampleURI = "https://jsonplaceholder.typicode.com/posts/",
    LIMITS = {
        H: 2,
        Q: 1,
        C: 50
    }

function getRandomInt(_min, _max) {
    const min = Math.ceil(_min);
    const max = Math.floor(_max);
    return Math.floor(Math.random() * (max - min)) + min;
}

class _ChatService {
    constructor() { }

    _inputValidation(value) {
        return !!value.match(/[a-zA-Z]/g);
    }

    get(notvalidmsg, duration = 1) {
        this.counter += 1;
        return new Promise((resolve, reject) => (
            setTimeout(() => (
                !notvalidmsg ? (
                    axios.get(`${sampleURI}/${getRandomInt(0, LIMITS.C)}`)
                        // .then(({ data }) => resolve(data))
                        // .then(({ data }) => resolve(this._injectFakeHyperLink(data)))
                        // .then(({ data }) => resolve(this._injectFakeQuestions(data)))
                        .then(({ data }) => resolve(this._injectBothFakes(data)))
                        .catch((err) => {
                            console.error(`CUSTOM ERROR: ${err}`);
                            reject(this._invalidResponse('Invalid Input'))
                        })
                ) : resolve(this._invalidResponse('Invalid Input'))
            ), duration * 1000)
        ));
    }

    _injectBothFakes(resp) {
        const hyperlinks = this._createFakeHyperObject(resp.body, LIMITS.Q);
        const questions = this._createFakeQuestions(LIMITS.H);
        return {
            ...resp,
            hyperlinks,
            questions
        }
    }

    _injectFakeHyperLink(resp) {
        return {
            ...resp,
            hyperlinks: this._createFakeHyperObject(resp.body, LIMITS.Q)
        };
    }

    _injectFakeQuestions(resp) {
        return {
            ...resp,
            questions: this._createFakeQuestions(LIMITS.Q)
        }
    }

    _createFakeQuestions(limit) {
        return ipsum({
            count: limit,
            units: 'sentences',
            format: 'plain'
        }).split('.').map(sentence => (
            (sentence.slice(0, -1) + " ?").trim()
        )).slice(0, -1);
    }

    _createFakeHyperObject(text, num) {
        const words = text.split(' ');
        let hyperLinks = new Array(num);
        for (let i = 0; i < words.length; i++) {
            const key = getRandomInt(0, words.length);
            if (i == num) break;
            hyperLinks[i] = {
                word: words[key],
                link: 'http://www.google.com.tr',
                key
            }
        };
        return hyperLinks;
    }

    _invalidResponse(failresponse) {
        return {
            data: {
                body: failresponse
            }
        }
    }


    post(input, duration = 1) {
        this.counter += 1;
        const response = this._inputValidation(input) ? input : {
            input: input,
            isvalid: false
        };
        // console.info(encodeURIComponent(input));
        return new Promise((resolve, reject) => (
            setTimeout(() => typeof response == 'string' ?
                resolve(response) : reject(response), duration * 1000)
        ));
    }
}

const ChatService = new _ChatService;

export { ChatService };