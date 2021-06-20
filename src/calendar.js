class Calendar {
    static calendarContainer = document.getElementById("calendar-container");
    static calendarForm = document.getElementById("calendar-form-container");
    static monthSelector = `
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
    `
    static weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    
    static renderForm() {
        Calendar.calendarForm.innerHTML += `
            <form id="new-calendar-form">
                Title: <input type="text" id="title">
                Starting Month: <select id="start-month">
                    ${this.monthSelector}
                </select>
                Starting Year: <input type="text" id="start-year">
                Ending Month: <select id="end-month">
                    ${this.monthSelector}
                </select>
                Ending Year: <input type="text" id="end-year">
                <input type="submit" id="create">
            </form>
        `
    }

    constructor({ id, title, start_month, start_year, end_month, end_year }) {
        this.id = id;
        this.title = title;
        this.start_month = start_month;
        this.start_year = start_year;
        this.end_month = end_month;
        this.end_year = end_year;

        this.element = document.createElement("div");
        this.element.id = `calendar-${this.id}`;
    }

    calendarHTML() {
        Calendar.calendarContainer.textContent = "";
        // convert to scope methods
        const startIndex = Day.all.findIndex(day => day.year === this.start_year && day.month === this.start_month);
        const endIndex = Day.all.findIndex(day => day.year === this.end_year && day.month === (this.end_month + 1));
        const days = Day.all.slice(startIndex, endIndex);

        const firstDay = days[0].weekday;
        if (firstDay !== "Sunday") {
            let counter = 0;
            const endIndex = Calendar.weekdays.indexOf(firstDay);
            while (counter < endIndex) {
                const newBlankDay = document.createElement("div");
                newBlankDay.innerHTML = `<div class="calendar-day"></div>`;
                this.element.append(newBlankDay);
                counter++;
            }
        }

        days.forEach(day => {
            const newDayHTML = day.element.innerHTML === "" ? day.dayHTML() : day.element;
            this.element.append(newDayHTML);
        });
        return this.element;
    }

    addToDom() {
        Calendar.calendarContainer.append(this.calendarHTML());
    }
}