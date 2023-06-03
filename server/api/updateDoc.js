import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
  const {info, collectionRef, docRef} = await useBody(event)
  const db = getFirestore()
  console.log('updateREf', info, collectionRef, docRef)
  var updateRef = db.collection(collectionRef).doc(docRef);
  updateRef.update(info)
  return `Success`
  
      // .then(() => {
      //   console.log("Success!");
      // })
      // .catch((error) => {
      //   // The document probably doesn't exist.
      //   console.error("Error updating document: ", error);
      // });
})
