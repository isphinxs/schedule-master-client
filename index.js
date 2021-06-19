const baseUrl = "http://127.0.0.1:3000";
const dayService = new DayService(baseUrl);

dayService.getDays();
Calendar.renderForm();