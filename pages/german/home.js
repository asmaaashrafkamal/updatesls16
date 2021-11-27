const database=firebase.firestore();
const user=database.collection('Users');
var no1 = document.getElementById('no1');
var no2 = document.getElementById('no2');
var no3 = document.getElementById('no3');
var no4 = document.getElementById('no4');
var no5 = document.getElementById('no5');
var no6 = document.getElementById('no6');
var s=[]
var s1=[]
var s2=[]
var s3=[]
var s4=[]
var s5=[]
database.collection("Users").where('role', "==", 'user').get()
.then((querySnapshot) =>{
querySnapshot.forEach((doc) => {
 s.push(doc.id)
})
console.log(s.length)
no1.innerHTML=s.length
})
database.collection("Users").where('role', "==", 'seller').get()
.then((querySnapshot) =>{
querySnapshot.forEach((doc) => {
 s1.push(doc.id)
})
console.log(s1.length)
no2.innerHTML=s1.length
})
database.collection("Users").where('confirmState', "==", 'pending').get()
.then((querySnapshot) =>{
querySnapshot.forEach((doc) => {
 s2.push(doc.id)
})
console.log(s2.length)
no3.innerHTML=s2.length
})
database.collection("Users").where('role', "==", 'PendingSeller').get()
.then((querySnapshot) =>{
querySnapshot.forEach((doc) => {
 s3.push(doc.id)
 
})
console.log(s3.length)
no4.innerHTML=s3.length
})
database.collection("Reports").get()
.then((querySnapshot) =>{
querySnapshot.forEach((doc) => {
 s4.push(doc.id)
})
console.log(s4.length)
no5.innerHTML=s4.length
})
database.collection("Payouts").get()
.then((querySnapshot) =>{
querySnapshot.forEach((doc) => {
 s5.push(doc.id)
})
console.log(s5.length)
no6.innerHTML=s5.length
})
