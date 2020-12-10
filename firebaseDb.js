const firebase = require('firebase');

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "e-commerce-1465a.firebaseapp.com",
    databaseURL: "https://e-commerce-1465a-default-rtdb.firebaseio.com",
    projectId: "e-commerce-1465a",
    storageBucket: "e-commerce-1465a.appspot.com",
    messagingSenderId: process.env.MESSAGING_ID,
    appId: process.env.APP_ID
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function writeOrderData(orderId, products) {
    database.ref('orders/' + orderId).set({
        products: products
    });
}

function readOrderData(orderId) {
    database.ref('orders/' + orderId)
        .once('value')
        .then((snap) => {
            return snap.val();
        });
}

function readProductsData(){
    return database.ref('products/')
        .once('value')
        .then((snap) => {
            return snap.val();
        });
}

function readProductData(productId) {
    database.ref('products/' + productId)
        .once('value')
        .then((snap) => {
            return snap.val();
        });
}

// readProductsData().then(function(result){
//     console.log(result);
// })

console.log(process.env.APP_ID);
console.log(process.env.API_KEY);
console.log(process.env.MESSAGING_ID);


exports.writeOrderData = writeOrderData;
exports.readOrderData = readOrderData;
exports.readProductsData = readProductsData;

