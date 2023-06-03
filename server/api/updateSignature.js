import { getStorage } from 'firebase-admin/storage';

export default defineEventHandler(async (event) => {

    const { image } = await useBody(event);

    // Convert base64 image to a buffer
    const base64Data = image.split(',')[1]; 
    const imageBuffer = Buffer.from(base64Data, 'base64');
    var id = "id" + Math.random().toString(16).slice(2)
    // Generate a unique filename for the image (e.g., using a UUID library)
    const fileName =  `signatures/signature-${id}`

      // Upload the image buffer to Firebase Storage
      const bucket = getStorage().bucket();

      const file = bucket.file(fileName);
      await file.save(imageBuffer, { contentType: 'image/png' });

      // Get the public URL for the uploaded image
      const url = await file.getSignedUrl({
        action: 'read',
        expires: '03-01-2500', // Set an appropriate expiration date
      });

      return  url
});