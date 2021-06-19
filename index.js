const baseUrl = "http://127.0.0.1:3000";
const calendarService = new CalendarService(baseUrl);
const dayService = new DayService(baseUrl);

dayService.getDays();

Calendar.renderForm();
Calendar.calendarForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    calendarService.createCalendar();
    event.target.reset();
}