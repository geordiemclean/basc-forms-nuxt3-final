import { getFirestore } from 'firebase-admin/firestore';
// import { format } from 'date-fns'

export default defineEventHandler(async (event) => {
 
  const {collectionRef, docRef, subCollectionRef, field, condition, value} = await useBody(event)
  
  let response = []
  const db = getFirestore()
  await  db.collection(collectionRef).doc(docRef).collection(subCollectionRef).where(field, condition, value)
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        response.push({...doc.data(), id: doc.id, style: ''})
      });
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });

   return response
})
