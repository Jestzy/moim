const functions = require('firebase-functions');
const admin = require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase);
exports.addUserMessage = functions.database.ref('/messages/{messageId}')
.onWrite( (change, context) => {
if (change.before.exists()) {
return null;
}

if (!change.after.exists()) {


return null;
}
const messageKey = context.params.messageId;
const messageValue = change.after.val();

admin.database().ref(`/user-messages/${messageValue.userFromId}/${messageValue.userToId}`).
child(messageKey).set(1);

admin.database().ref(`/user-messages/${messageValue.userToId}/${messageValue.userFromId}`).
child(messageKey).set(1);

return true; // or whatever you want to return value or promise

});

// admin.initializeApp(functions.config().firebase);
exports.LastMes = functions.database.ref('/messages/{messageId}')
.onWrite( (change, context) => {
    if (change.before.exists()) {
    return null;
    }
    
    if (!change.after.exists()) {
    return null;
    }
    const messageKey = context.params.messageId;
    console.log(messageKey);
    const messageValue = change.after.val();
    console.log(messageValue);
  
    admin.database().ref(`/last-messages/${messageValue.userFromId}/${messageValue.userToId}`).child(`key`).set(messageKey);
    admin.database().ref(`/last-messages/${messageValue.userToId}/${messageValue.userFromId}`).child(`key`).set(messageKey);
    return true;

});

// exports.generateLastMessage  = functions.database.ref(`/messages/{messageId}`)
//     .onWrite(event => {

//         const messageKey = event.data.key;
//         const messageVal = event.data.val();

//         const userFromId = messageVal.userFromId;
//         const userToId = messageVal.userToId;

//         admin.database().ref(`/last-messages/${messageValue.userFromId}/
//         ${messageValue.userToId}`).child('key').set(messageKey);
//         admin.database().ref(`/last-messages/${messageValue.userToId}/
//         ${messageValue.userFromId}`).child('key').set(messageKey);
//      return true;

//     })

// exports.deleteOldItems = functions.database.ref('/event-list/')
// .onWrite((change, context) => {
//   var ref = change.after.ref.parent; // reference to the items
//   var now = Date.now();
//   var cutoff = now - 2 * 60 * 60 * 1000;
//   var oldItemsQuery = ref.orderByChild('timestamp').endAt(cutoff);
//   return oldItemsQuery.once('value', function(snapshot) {
//     // create a map with all children that need to be removed
//     var updates = {};
//     snapshot.forEach(function(child) {
//       updates[child.key] = null
//     });
//     // execute all updates in one go and return the result to end the function
//     return ref.update(updates);
//   });
// });

