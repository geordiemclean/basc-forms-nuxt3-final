import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
  
   const {info, collectionRef} = await useBody(event)
   console.log(collectionRef, info)
  const db = getFirestore()
  await  db.collection(collectionRef).add(info)
  return `Success`
//   .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch((error) => {
//     console.error("Error adding document: ", error);
// });

})
