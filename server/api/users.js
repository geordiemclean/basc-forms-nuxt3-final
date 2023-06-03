import { initializeApp, getApps, cert } from 'firebase-admin/app';

const apps = getApps()
const {project_id, private_key, client_email, storage_bucket} = useRuntimeConfig()

const serviceAccountKey = {
    "project_id": project_id,
    "private_key": private_key.replace(/\\n/g, '\n'),
    "client_email": client_email,
}

if (!apps.length) {
    initializeApp({
        credential: cert(serviceAccountKey),
        storageBucket: storage_bucket
      });
    
}
export default async (request, response) => {

    console.log('db')
    // const db = getFirestore()
    // const users = await db.collection('users').get()    
    // const usersData = users.docs.map(doc => {
    //  return {
    //     uuid: doc.id,
    //     ...doc.data()
    //  }   
    // })
    // return usersData
}