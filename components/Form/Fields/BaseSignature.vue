<template lang="">
  <!-- <img 
      v-if="childItem.type === 'signature' && childDataLoaded && childItem.model"    
      height="100" :src="childItem.model"  alt="">  -->
   <!-- dialog signature update -->
  <v-dialog persistent width="700" v-model="dialogSignature">

    <template v-slot:activator="{ props }">
        <v-icon
        v-if="display === 'icon'"
          color="blue"
          v-bind="props"
        >
         mdi-pencil
        </v-icon>
        <v-text-field  
        v-if="!signature && display !== 'icon' "
        v-bind="props" 
        append-inner-icon="mdi-draw"  
        readonly 
        class="mt-2"
        density="compact"
        value="Signature" 
        />
      </template>
    <v-card >
      <v-toolbar flat ><v-spacer></v-spacer><v-btn color="blue" variant="outlined" @click="dialogSignature = false" size="large" prepend-icon="mdi-close">Close</v-btn></v-toolbar>
      <v-card-text class="py-10">
      <v-row  justify="center">
                <v-col class="mt-n3" cols="12" md="8" >
                <h3 class="text-blue">Sign</h3>
                <v-card-text class="font-weight-bold headline text-pink" :hidden="hideMessage1">Please sign on the pad below:</v-card-text>
                  <v-card-text >
                      <VueSignaturePad id="signature" :options="{onBegin: () => {$refs.signaturePad.resizeCanvas()}}" :class="signatureClass" width="330px" height="150px" ref="signaturePad" />
                      <div>
                        <v-btn class="text-right" @click="clear">Clear</v-btn>
                        <v-btn class="text-right" @click="undo">Undo</v-btn>
                        
                      </div>
                    </v-card-text>
                  <v-card-text class="font-weight-bold headline text-pink" :hidden="hideMessage">Please click save after creating your signature</v-card-text>
                </v-col>
              </v-row>
             
              </v-card-text>
        <v-card-text  class="text-center mt-n5">
            <v-progress-circular
            v-if="processing"
            color="grey"
            indeterminate
            small
          />
          <v-btn v-if=" processing === false" dark color="blue" size="x-large" class="font-weight-bold" @click="updateSignature">Sign </v-btn>
        </v-card-text>
       
    </v-card>
    </v-dialog>
</template>

<script>
// import { VueSignaturePad } from 'vue-signature-pad';

export default {
  // components: { VueSignaturePad },
  props: ['display', 'childDataLoaded', 'updateOnChange',  'importValue', 'importModel', 'childIndex', 'signatureType', 'childItem'],
    data() {
        return {
              // signature
                currentIndex: null,
                currentItem: null,
                dialogSignature: false,
                processing: false,
                signature: '',
                hideMessage: true,
                hideMessage1: true,
                signatureClass: 'blue lighten-5',
                saveColour: 'green',
                signUpDate: null,
                saveSignature: false,
        }
    },
    created () {
      if (this.importValue === true) 
        {
            
            this.signature = this.importModel
        }
    },
    methods: {
        // Start Signature Update


    async updateSignature () {
      var vm = this
       const { data } = this.$refs.signaturePad.saveSignature('image/png')
      if (data === undefined)
      {return this.signatureClass = 'red lighten-4', this.saveColour = 'red', this.hideMessage1 = false}
          else if (vm.updateOnChange === true)
           {
            vm.processing = true

            try {
              await useFetch('/api/updateSignature', {
          method: 'post',
          body: {
            image: data,
          //  filePath: `signature-${new Date()}`,
          },
          initialCache: false 
        }).then((res) => {
          console.log(res.data.value)
          vm.signature = res.data.value[0]
          
          this.$emit('updateArray', vm.childIndex, res.data.value[0], vm.signatureType)

        }).finally(() => {
          
          vm.processing = false
             this.signatureClass = 'green lighten-4'
              this.hideMessage = true
              vm.clear()
              vm.dialogSignature = false
              //vm.signature = ''
              vm.signatureClass = 'blue lighten-5'
              vm.hideMessage = true
              vm.saveColour = 'green'
        })
            }
            catch (err) {
         console.log(err)
         vm.processing = false
          }
          }
    },
     clear() {
      this.$refs.signaturePad.clearSignature()
      this.signature = ''
    },
        undo() {
      this.$refs.signaturePad.undoSignature()
      this.signature = ''
    },
    },
    
}
</script>

<style>
#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>