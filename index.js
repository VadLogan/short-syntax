const app = {
    createdEllement: null,
    gettedEllement: null,
    gettedEllements: null,
    lastEvent: '',
    getEl(element) {
        const sasha = document.querySelectorAll.bind(document);
        const arr = sasha(element);
        switch (true) {
            case arr.length === 1:
                this.gettedEllement = arr[0];
                this.lastEvent = 'getted element';
                return this;
            case arr.length > 1:
                this.gettedEllements = [].slice.call(arr);
                this.lastEvent = 'getted elements'
                return this;
            default:
                console.log('set valid argument')
                return;
        }
    },
    create(element) {
        this.lastEvent = 'created'
        const sasha = document.createElement.bind(document);
        this.createdEllement = sasha(element);
        this.createdEllement.textContent = '!!! Click Me !!!';
        return this;
    },
    addTo(parrent) {
        this.lastEvent = 'addTo'
        if (parrent && this.createdEllement) {
            this.getEl(parrent);

            this.gettedEllement.appendChild(this.createdEllement);
            return this;
        } else {
            console.error('you should add parent')
            return;
        }
    },
    onClick(func) {
        switch (this.lastEvent) {
            case 'getted element':
                this.gettedEllement.addEventListener('click', func, false);
                break;
            case 'getted elements':
                this.gettedEllements.forEach(el => addEventListener('click', func, false))
                break;
            case 'created':
                this.createdEllement.addEventListener('click', func, false);
                break;
            default:
                console.error("You can't add event to ellement untill you will not choose ellement")
                break;
        }
    }
}
// example of work

const API = 'https://api.github.com/users/orionpro'

const getReq = () => fetch(API)
    .then(data => data.json())
    .then(res => {
        const h2 = app.create('h2')
        h2.createdEllement.textContent = `${res.name} - ${res.login}`
        app.addTo('.sasha')
        const img = app.create('img')
        img.createdEllement.src = res.avatar_url
        app.addTo('.sasha')
    })
    .catch(err => console.log(err))


app.create('li').addTo('ul').onClick(getReq)