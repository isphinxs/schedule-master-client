class DayService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    getDays() {
        fetch(`${this.endpoint}/days`)
        .then(resp => resp.json())
        .then(days => {
            days.forEach(day => {
                const d = new Day(day);
                // d.addToDom();
            })
        })
    }
}