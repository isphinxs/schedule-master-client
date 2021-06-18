class Day {
    static all = [];
    static calendarContainer = document.getElementById("calendar-container");

    constructor({ id, day, month, year, weekday }) {
        this.id = id;
        this.day = day;
        this.month = month;
        this.year = year; 
        this.weekday = weekday;

        Day.all.push(this)
    }

}