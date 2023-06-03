import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
  
   const {info, collectionRef, docRef, subCollectionRef} = await useBody(event)

  const db = getFirestore()
return  await  db.collection(collectionRef).doc(docRef).collection(subCollectionRef).add(info)
  .then((docRef) => {
    return  docRef.id
  //  console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});

})
