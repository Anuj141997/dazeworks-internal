global class closeLeaveApplyFormScheduler  implements Schedulable{
    global void execute(SchedulableContext sc){
        closeLeaveApplyForm b = new closeLeaveApplyForm();
        database.executeBatch(b);
    }
}