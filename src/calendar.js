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
    
    static renderForm() {
        Calendar.calendarForm.innerHTML += `
            <form id="new-calendar-form">
                Starting Month: <select id="starting-month">
                    ${this.monthSelector}
                </select>
                Starting Year: <input type="text" id="starting-year">
                Ending Month: <select id="ending-month">
                    ${this.monthSelector}
                </select>
                Ending Year: <input type="text" id="ending-year">
                <input type="submit" id="create">
            </form>
        `
    }

    constructor() {
    
    }
}