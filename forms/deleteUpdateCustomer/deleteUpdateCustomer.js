
deleteUpdateCustomer.onshow=function(){
    drpCompanyNameD.clear()
    let query = "SELECT name FROM customer"
    req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query)
  
    if (req1.status == 200) { //transit worked.
       results = JSON.parse(req1.responseText)
    
       //get the array
       if (results.length == 0)
           txtResultD.value("There are no company name.")
       else {        
           //console.log("the parsed JSON is " + results)
           //console.log("eg. temp[0] or first row in big array is " + results[0])
           //console.log("to get to Paul, need results[0][1]: " + results[0][1])
           // output the names of all the dogs
           let message = ""
           for (i = 0; i <= results.length - 1; i++){
               message = message + results[i][0] + "\n"
               drpCompanyNameD.addItem(results[i][0])
           }
       } 
   }else{
      NSB.MsgBox("Something run")
  }
  hamMenuD.clear()
  hamMenuD.addItem("Sign out") 
  hamMenuD.addItem("See Customer")
  hamMenuD.addItem("Delete Customer")
  hamMenuD.addItem("Edit Customer")
  hamMenuD.addItem("Add Customer")
}



drpCompanyNameD.onclick=function(s){
  if (typeof(s) == "object"){  // means control clicked but no selection made yet
    return                     // do nothing
  } else {
    drpCompanyNameD.value = s   // make dropdown show choice user made
  }
}

butSubmit.onclick=function(){
if (rdoUorD.value ==0){





  let dName = drpCompanyNameD.value
    // make sure the name is in the database before you try to delete it
    
    let found = false
    for (i = 0; i <= results.length - 1; i++) {
        if (dName == results[i][0])
            found = true
    }
    if (found == false) 
       NSB.MsgBox("That name is not in the database.")
    else if (found == true) {
      let queryDelete = "DELETE FROM customer WHERE name = " + '"' + dName + '"'
      req4 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + queryDelete)

      if (req4.status == 200) { //transit worked.
        if (req4.responseText == 500){    // means the delete succeeded
            let message = ""
            for (i=0; i <= results.length-1; i++){
                let query4="SELECT name FROM customer"
                req5 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query4)

                if (req5.status==200){
                  //transaction works
                  results=JSON.parse(req5.responseText)
                  
                  
                  let message = ""
                  for (i=0; i <= results.length-1; i++)
                      message = message + results[i][0] + "\n"
                  txtResultD.value = message
                
                }else{
                  NSB.MsgBox("Error code: " + req1.status)
                }
            }
            
        }else{
            NSB.MsgBox("There was a problem deleting " + dName + " from the database.")
        }
      } else {
        // transit error
        NSB.MsgBox("Error: " + req5.status);
      }  
  } // count if





}else if (rdoUorD.value == 1){
   let oldName = drpCompanyNameD.selection
   let newName = iptNewName.value
   let query2 = "UPDATE customer SET name =" + '"' + newName + '"' + " WHERE name = " + '"' + oldName + '"'
   
   req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query2)
   
   if (req2.status == 200) { //transit worked.
        if (req2.responseText == 500) {   // means the update succeeded
            var result2 = JSON.parse(req2.responseText)
            
            let query3 = "SELECT name FROM customer"
            req3 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=sch54620&query=" + query3)
            
            if (req3.status == 200) { //transit worked.
               let results3 = JSON.parse(req3.responseText)
               //get the array
               if (results3.length == 0)
                     txtResultD.value("There are no company of that type.")
                else {        
                   console.log("the parsed JSON is for result3 is " + results3)
                   console.log("eg. temp[0] or first row in big array is " + results3[0][0])
                  // output the names of all the dogs
                   let message2 = ""
                   for (i = 1; i <= results3.length-1; i++)
                     message2 = message2 + results3[i] + "\n"
                     
                  txtResultD.value=message2
                 } 
           }else
               NSB.MsgBox("Something wrong")
            
      } else
          NSB.MsgBox("There was a problem changing the company name.")

    } 
  }
}

hamMenuD.onclick=function(s){
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
