// Initialize Firebase
var config = {
  apiKey: "AIzaSyBS9Cjuoypd4fQL00qNBZ9HMYmGJOBCKrI",
  authDomain: "hw7-firebase.firebaseapp.com",
  databaseURL: "https://hw7-firebase.firebaseio.com",
  projectId: "hw7-firebase",
  storageBucket: "",
  messagingSenderId: "882564944836"
};

firebase.initializeApp(config);

var database = firebase.database();

$('#addTrainBtn').on("click", function() {
  event.preventDefault();

  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequencyInput").val().trim();

  var newTrain = {
    name: trainName,
    dest: destination,
    ftrain: firstTrain,
    freq: frequency
  }

  database.ref().push(newTrain);

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");

});

database.ref().on("child_added", function(childSnapshot) {
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().ftrain;
  var frequency = childSnapshot.val().freq;

  var firstTimeConverted = moment(firstTrain, "HH:mm");
  var currentTime = moment().format("HH:mm");

  var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");

  var timeRemainder = timeDifference % frequency;

  var minToTrain = frequency - timeRemainder;
  var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");

  $("#trains-go-here").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});
