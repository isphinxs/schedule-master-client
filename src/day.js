class Day {
    static all = [];
    static calendarContainer = document.getElementById("calendar-container");
    static months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    constructor({ id, day, month, year, weekday }) {
        // debugger;
        this.id = id;
        this.day = day;
        this.month = month;
        this.year = year; 
        this.weekday = weekday;

        this.monthName = Day.months[month];

        this.element = document.createElement("div");
        this.element.dataset.id = this.id;
        this.element.className += "calendar-day";
        this.element.id = `day-${this.id}`;

        Day.all.push(this)
    }
    
    dayHTML() {
        this.element.innerHTML += `
            <p>${this.monthName} ${this.day}</p>
        `
        return this.element;
    }

    // addToDom() {
    //     Day.calendarContainer.append(this.dayHTML());
    // }
}