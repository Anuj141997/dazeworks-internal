@isTest
public class reUsableMultiSelectLookupCtrlTest {
    @isTest static void reUsableTest(){
        List<Contact> conList = new List<Contact>();
        for(integer i=0;i<2;i++){
           Contact conObj = new Contact(lastName='test'+i) ;
            conList.add(conObj);
        }
        insert conList;
        
        reUsableMultiSelectLookupCtrl.fetchLookUpValues('search','Contact',new list<sObject>() );

}
}