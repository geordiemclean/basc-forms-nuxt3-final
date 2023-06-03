import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

const apps = getApps()
const {project_id, private_key, client_email} = useRuntimeConfig()

const serviceAccountKey = {
    "project_id": project_id,
    "private_key": private_key.replace(/\\n/g, '\n'),
    "client_email": client_email,
}

if (!apps.length) {
    initializeApp({
        credential: cert(serviceAccountKey),
      });
    
}

export default async (request, response) => {
    const db = getFirestore()
    var docReference =  db.collection("account").doc("visitorSettings");
   
    return await docReference.get().then((doc) => {
        if (doc.exists) {
            return {
                visitorReasons: doc.data().visitorReasons,
                visitorTC: doc.data().visitorTC,
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}
