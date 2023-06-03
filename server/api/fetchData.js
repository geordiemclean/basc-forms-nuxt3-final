import { getFirestore } from 'firebase-admin/firestore';
// import { format } from 'date-fns'

export default defineEventHandler(async (event) => {
 
  const {collectionRef, docRef} = await useBody(event)
  console.log(collectionRef, docRef)
  const db = getFirestore()
    // var docReference = db.collection("account").doc("visitorSettings");
     var docReference = db.collection(collectionRef).doc(docRef);
    return  docReference.get().then((doc) => {
        if (doc.exists) {
            return doc.data()
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

})
