import { getStorage } from 'firebase-admin/storage';

export default defineEventHandler(async (event) => {
  const { image, contentType, uniqueId } = await useBody(event);
  const imageBuffer = Buffer.from(image, 'base64');
  
  // Use the unique ID passed from client
  const fileName = `zzztesting/file-${uniqueId}`

  // Upload the image buffer to Firebase Storage
  const bucket = getStorage().bucket();
  const file = bucket.file(fileName);
  await file.save(imageBuffer, { contentType: contentType });

  // Get the public URL for the uploaded image
  const urls = await file.getSignedUrl({
    action: 'read',
    expires: '03-01-2500',
  });

  return { downloadUrl: urls[0] };
});
