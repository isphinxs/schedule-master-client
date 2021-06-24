class Day {
    static all = [];
    static calendarContainer = document.getElementById("calendar-container");
    static months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    constructor({ id, day, month, year, weekday }) {
        this.id = id;
        this.day = day;
        this.month = month;
        this.year = year; 
        this.weekday = weekday;

        this.monthName = Day.months[month - 1];

        this.element = document.createElement("div");
        this.element.dataset.id = this.id;
        this.element.className += "calendar-day";
        this.element.id = `day-${this.id}`;

        Day.all.push(this)
    }
    
    dayHTML() {
        this.element.innerHTML += `
            <p>${this.monthName} ${this.day}</p>
            <ul></ul>
        `
        return this.element;
    }

    // addToDom() {
    //     Day.calendarContainer.append(this.dayHTML());
    // }
}