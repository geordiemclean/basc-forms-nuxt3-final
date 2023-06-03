import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
  
   const {info, collectionRef, docRef} = await useBody(event)
  const db = getFirestore()
  await  db.collection(collectionRef).doc(docRef).set(info)
  return `Success`
})
