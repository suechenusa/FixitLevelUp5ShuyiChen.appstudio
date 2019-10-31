//Change of properties:
//1, change the dropdown value
//2, change the textarea title, change the textarea header col
//3, change the drop box heading in design side, and delete the items in design side.
//4, change the drop box size from medium to big.
//5, delete the placeholder for textarea.
//6, change the textarea width


seeCustomer.onshow=function(){
  drpCompanyName.clear()
  let query = "SELECT name FROM customer"
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query)
  
  if (req1.status == 200) { //transit worked.
    let results = JSON.parse(req1.responseText)
    
    //get the array
    if (results.length == 0)
        txtResult.value("There are no company name.")
    else {        
        //console.log("the parsed JSON is " + results)
        //console.log("eg. temp[0] or first row in big array is " + results[0])
        //console.log("to get to Paul, need results[0][1]: " + results[0][1])
        // output the names of all the dogs
        let message = ""
        for (i = 0; i <= results.length - 1; i++){
            message = message + results[i][0] + "\n"
            drpCompanyName.addItem(results[i][0])
        }
     } 
  } else{
      NSB.MsgBox("Something run")
  }
  hamMenuS.clear()
  hamMenuS.addItem("Sign out") 
  hamMenuS.addItem("See Customer")
  hamMenuS.addItem("Delete Customer")
  hamMenuS.addItem("Edit Customer")
  hamMenuS.addItem("Add Customer")
}




drpCompanyName.onclick=function(s){
    if (typeof(s) == "object"){  // means control clicked but no selection made yet
    return                     // do nothing
    }else {
      drpCompanyName.value = s   // make dropdown show choice user made
      
      //get the information from the database
      let query2 = "SELECT * FROM customer WHERE name=" + '"' + drpCompanyName.selection + '"' 
      req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query2)
      
      
      if (req2.status == 200) { //transit worked.
          let results2 = JSON.parse(req2.responseText)
        
          //get the array
          if (results2.length == 0){
              txtResult.value("There are no company of that type.")
          }else {        
              console.log("the parsed JSON is " + results2)
              console.log("eg. temp[0] or first row in big array is " + results2[0])
              console.log("to get to Paul, need results[0][1]: " + results2[0][2])
              // output the names of all the dogs
              let message2 = ""
              for (i = 1; i <= 2; i++)
                  message2 = message2 + results2[0][i] + "\n"
              for (i =3; i <=5; i++)
                  message2 = message2 + results2[0][i] + ", "
              txtResult.value = message2
          } 
      }else{
        NSB.MsgBox("Something wrong")
      }
   }
}

hamMenuS.onclick=function(s){
    if (typeof(s) == "object") { // do nothing
       return
    }
    switch(s) {
      case "Sign Out":
          hmbrMenu.hide()
          btnSignIn.show()
          break
      case "See Customer":
          // do something
          ChangeForm(seeCustomer)
          break
       case "Edit Customer":
          ChangeForm(deleteUpdateCustomer)
          break
       case "Delete Customer":
          ChangeForm(deleteUpdateCustomer)
          break
      case "Add Customer":
          ChangeForm(addCustomer)
          break
     }
}
