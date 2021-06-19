class DayService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    getDays() {
        fetch(`${this.endpoint}/days`)
        .then(resp => resp.json())
        .then(days => {
            // console.log(days)
            })
        })
    }
}