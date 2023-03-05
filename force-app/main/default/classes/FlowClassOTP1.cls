public class FlowClassOTP1 {
    
    @InvocableMethod(label='OTP Generator Class')
    public static FlowOutputParameters[] otpGenerator(){
        FlowOutputParameters[] result = new FlowOutputParameters[]{};
            
          
        final integer STRING_LENGTH = 5;

       String aleaNumberN = String.valueOf(Math.Round(Math.Random() * ((Math.pow(10,STRING_LENGTH) - 1)-Math.pow(10,STRING_LENGTH -1)) + Math.pow(10,STRING_LENGTH -1)));
       
            FlowOutputParameters obj = new FlowOutputParameters();
        obj.OTPNumber = aleaNumberN; //Copying the inserted sObject record Id to return as an flow output
        result.add(obj);
        system.debug('Result' + result);
        
        return result;
    }
    
    /* Input parameters for the Apex action 
public class FlowInputParameters{
@InvocableVariable(label='Record to Clone' required = true )
public sObject recordToClone;
}
*/
    /* Output parameters of the Apex action */
    public class FlowOutputParameters{
        @InvocableVariable(label='OTP Number')
        public string OTPNumber;
    }
    
}