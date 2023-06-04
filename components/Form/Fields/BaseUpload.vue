<template lang="">
    <div>
      <div  v-if="childItem.model !== '' && childItem.model !== null && childItem.model !== undefined && childItem.type === 'upload'"  >
         
        <h4 v-for="(file, fileIndex) in childItem.model" :key="fileIndex + 123423532" class="font-weight-bold black--text">File Uploaded <v-icon small color="green">mdi-check</v-icon>
         <a  target="_blank"  :href="file.url">{{file.name}}</a>
         <v-icon  right color="red" @click="childItem.model.splice(fileIndex, 1), $emit('updateField', childItem.key, childItem.model, childIndex, null)">mdi-close-circle</v-icon>
       </h4>
         <!-- <v-icon large color="purple">mdi-file</v-icon> -->
         <!-- :href="childItem.model" target="_blank" -->
       </div>
      
       <div  v-if="childItem.model !== '' && childItem.model !== null && childItem.model !== undefined && childItem.type === 'photos'"  >
      
         <h4 v-for="(file, fileIndex) in childItem.model" :key="fileIndex + 123423532" class="font-weight-bold black--text">
           <v-img 
         
           :src="file"
           :lazy-src="file"
           aspect-ratio="2"
           contain
           
           ></v-img>
      
          <a  target="_blank"  :href="file">Download</a>
        </h4>
          <!-- <v-icon large color="purple">mdi-file</v-icon> -->
          <!-- :href="childItem.model" target="_blank" -->
        </div>
        <div class="mt-5 text-center">
            <v-progress-circular
                  v-if="processing"
                  color="grey"
                  indeterminate
                  small
                />
                <v-file-input
                v-model="files"
                :multiple="multiple"
                :label="label"
                v-if="!processing"  
                :name='fileKey' 
                :id='fileKey'
                show-size
                :color="color"
                counter
                placeholder="Select your files"
                prepend-icon="mdi-paperclip"
                variant="outlined"
                @change='handleFileChange'
              >
            </v-file-input>
            </div>
    </div>
</template>

<script>
// import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { format } from 'date-fns';

export default {
    props: [ 'multiple', 'fileKey', 'label', 'color', 'updateOnChange', 'fieldId', 'childIndex', 'importValue', 'importModel', 'childItem'],
    data() {
        return {
            processing: false,
            loadingMessage: '',
            loadingValue: '',
            files: [],
        }
    },
    created () {

    },
    methods: {
      makeId(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * 
                charactersLength));
            }
            return result;
        },
        async handleFileChange() {
          var vm = this
  this.processing = true;  // Start loading

  const files = this.files;
  
  const promises = files.map(file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1];

        // Generate a unique ID for each file
        var id = "id" + Math.random().toString(16).slice(2);
      
        // Send the file, its content type and unique ID to your server
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image: base64String,
            contentType: file.type,
            uniqueId: id,
          }),
        });
        const data = await response.json();
        this.$emit('updateFiles', vm.childIndex, {name: file.name, url: data.downloadUrl})
       // console.log('Download URL:', file.name, data.downloadUrl);
        resolve();
      };
      reader.readAsDataURL(file);
    });
  });
  
  await Promise.all(promises);

  this.processing = false;  // End loading
}
   
    },
    
}
</script>