class CalendarService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    createCalendar() {
        const calendar = {
            title: document.getElementById("title").value,
            start_month: document.getElementById("start-month").value,
            start_year: document.getElementById("start-year").value,
            end_month: document.getElementById("end-month").value,
            end_year: document.getElementById("end-year").value
        }

        const configObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(calendar)
        }

        fetch(`${this.endpoint}/calendars`, configObject)
        .then(resp => resp.json())
        .then(calendar => {
            const c = new Calendar(calendar);
            c.addToDom();
        })
    }
}