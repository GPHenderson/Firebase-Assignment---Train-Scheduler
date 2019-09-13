// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed  

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
    authDomain: "time-sheet-55009.firebaseapp.com",
    databaseURL: "https://time-sheet-55009.firebaseio.com",
    storageBucket: "time-sheet-55009.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Train
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input   Lines 27-30 
    var trnName = $("#trn-name-input").val().trim();
    var trnDest = $("#destination-input").val().trim();
    var trnFrstTime = moment($("#firstTrn-input").val().trim(), "HH:mm").format("X");
    var trnFreq = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data  Saving the information for the train 
    var newTrn = {
      name: trnName,
      role: trnDest,
      start: trnFrstTime,
      rate: trnFreq
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrn);
  
    // Logs everything to console
    // console.log(newEmp.name);
    // console.log(newEmp.role);
    // console.log(newEmp.start);
    // console.log(newEmp.rate);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes 
    $("#trn-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrn-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // alert('called');
    // Store everything into a variable. Change to train code reference lines 34-37
    var trnName = childSnapshot.val().name;
    var trnDest = childSnapshot.val().role;
    var empStart = childSnapshot.val().start;
    var empRate = childSnapshot.val().rate;
  
    // // Employee Info
    console.log(trnName);
    console.log(trnDest);
    console.log(empStart);
    console.log(empRate);
  
    // Prettify the employee start         Math file will go here 
    var trnStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var trnMins = moment().diff(moment(empStart, "X"), "months");
    //console.log(empMonths);
  
    // Calculate the total billed rate
    //var empBilled = empMonths * empRate;
    // console.log(empBilled);
  
    // Create the new row    Train name destination/ freq next/ day arrival/ mins away 
    var newRow = $("<tr>").append(
      $("<td>").text(trnName),
      $("<td>").text(trnDest),
      $("<td>").text(trnStartPretty),
      $("<td>").text(empStart),
      $("<td>").text(empRate),
      $("<td>").text("greg")
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case