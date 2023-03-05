global class EmployeeBirthdayScheduler implements Schedulable{
    global void execute(SchedulableContext ctx){
        EmployeeBirthday.getEmail();
        EmployeeBirthdayScheduler scheduleJob = new EmployeeBirthdayScheduler();
        
    }
}