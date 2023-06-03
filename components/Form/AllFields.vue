<template>
    <div>
        <BaseTextField 
        v-if="(childItem.type === 'text-field' || childItem.type === 'email' || childItem.type === 'mobile') && childDataLoaded" 
        :type="childItem.type" 
        :dataType="childItem.dataType" 
        :label="childItem.label"
        :placeHolder="childItem.placeHolder"
        :hint="childItem.hint" 
        :required="childItem.required"
        :color="childItem.color"
        :fieldId="childItem.key"
        :updateOnChange="updateOnChange"
        @updateField="updateField"
        :importValue="importValue"
        :importModel="childItem.model"
        :childIndex="childIndex"
        />
    <!-- Text Area -->
        <BaseTextArea
        v-if="childItem.type === 'text-area'  && childDataLoaded"
        :type="childItem.type" 
        :label="childItem.label"
        :placeHolder="childItem.placeHolder"
        :hint="childItem.hint" 
        :required="childItem.required"
        :color="childItem.color"
        :fieldId="childItem.key"
        :updateOnChange="updateOnChange"
        @updateField="updateField"
        :importValue="importValue"
        :importModel="childItem.model"
        :childIndex="childIndex"
        />
    <!-- Date -->
        <BaseDate
        v-if="childItem.type === 'date'  && childDataLoaded"
        :type="childItem.type" 
        :required="childItem.required"
        :color="childItem.color"
        :fieldId="childItem.key"
        :updateOnChange="updateOnChange"
        @updateField="updateField"
        :importValue="importValue"
        :importModel="childItem.model"
        :childIndex="childIndex"
        />
    <!-- Switch -->
        <BaseSwitch 
        v-if="childItem.type === 'switch'  && childDataLoaded"
        :type="childItem.type" 
        :label="childItem.label"
        :required="childItem.required"
        :color="childItem.color"
        :fieldId="childItem.key"
        :updateOnChange="updateOnChange"
        @updateField="updateField"
        :importValue="importValue"
        :importModel="childItem.model"
        :childIndex="childIndex"
        />
    <!-- check box -->
      <BaseCheckBox 
      v-if="childItem.type === 'check-box' && childDataLoaded"
      :type="childItem.type" 
      :label="childItem.label"
      :required="childItem.required"
      :color="childItem.color"
      :fieldId="childItem.key"
      :updateOnChange="updateOnChange"
      @updateField="updateField"
      :importValue="importValue"
      :importModel="childItem.model"
      :childIndex="childIndex"
      />
    <!-- Text Field -->
        <BaseDropDown 
        v-if="childItem.type === 'drop-down' && childDataLoaded"
        :type="childItem.type" 
        :dataType="childItem.dataType" 
        :label="childItem.label"
        :placeHolder="childItem.placeHolder"
        :hint="childItem.hint" 
        :items="childItem.items"
        :required="childItem.required"
        :color="childItem.color"
        :fieldId="childItem.key"
        :updateOnChange="updateOnChange"
        @updateField="updateField"
        :importValue="importValue"
        :importModel="childItem.model"
        :childIndex="childIndex"
        />
    <!-- Radio -->
      <BaseRadio 
      v-if="(childItem.type === 'single-choice' || childItem.type ===  'multiple-choice') && childDataLoaded"
      :type="childItem.type" 
      :dataType="childItem.dataType" 
      :label="childItem.label"
      :placeHolder="childItem.placeHolder"
      :hint="childItem.hint" 
      :items="childItem.items"
      :required="childItem.required"
      :color="childItem.color"
      :fieldId="childItem.key"
      :row="childItem.row"
      :updateOnChange="updateOnChange"
      @updateField="updateField"
      :importValue="importValue"
      :importModel="childItem.model"
      :childIndex="childIndex"
      />
    <!-- Time -->
      <BaseTime
      v-if="childItem.type === 'time' && childDataLoaded"
      :type="childItem.type" 
      :dataType="childItem.dataType" 
      :label="childItem.label"
      :placeHolder="childItem.placeHolder"
      :hint="childItem.hint" 
      :required="childItem.required"
      :color="childItem.color"
      :fieldId="childItem.key"
      :timeFormat="childItem.timeFormat"
      :updateOnChange="updateOnChange"
      @updateField="updateField"
      :importValue="importValue"
      :importModel="childItem.model"
      :childIndex="childIndex"
      />
    <!-- Signature -->
      <BaseSignature 
      display="text-field"
      :updateOnChange="updateOnChange"
      :fieldId="childItem.key"
      @updateField="updateField"
      :childIndex="childIndex"
      @updateArray="updateArray"
      :importValue="importValue"
      :importModel="childItem.model"
      v-if="childItem.type === 'signature' && childDataLoaded && (childItem.model === '' || childItem.model === null || childItem.model === undefined)"                 
      />
    
      <img 
      v-if="childItem.type === 'signature' && childDataLoaded && childItem.model"    
      height="100" :src="childItem.model"  alt=""> 
    
    <!-- STart File Upload -->
    
    <div  v-if="childItem.model !== '' && childItem.model !== null && childItem.model !== undefined && childItem.type === 'upload'"  >
         
      <h4 v-for="(file, fileIndex) in childItem.model" :key="fileIndex + 123423532" class="font-weight-bold black--text">File Uploaded <v-icon small color="green">mdi-check</v-icon>
       <a  target="_blank"  :href="file.url">{{file.name}}</a>
       <v-icon  right color="red" @click="childItem.model.splice(fileIndex, 1), updateField(childItem.key, childItem.model, childIndex, null)">mdi-close-circle</v-icon>
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
    
    <BaseUpload 
    v-if="childItem.type === 'upload' && childDataLoaded"
    :multiple="childItem.multiple" 
      :fileKey="childItem.fileKey"
      :label="childItem.label"
      :color="childItem.color"
      :fieldId="childItem.key"
      :childIndex="childIndex"
      @updateFiles="updateFiles"
      :importValue="importValue"
      :importModel="childItem.model"
      :updateOnChange="updateOnChange"
    />
    <BaseInformation 
    v-if="childItem.type === 'information' && childDataLoaded"
    :tableRows="childItem.tableRows"
    :fieldId="childItem.key"
    />
    <BaseTable 
    v-if="childItem.type === 'table' && childDataLoaded"
    :tableRows="childItem.tableRows"
    :fieldId="childItem.key"
    />

    <BaseSubItem 
    v-if="childItem.type === 'sub-item' && childDataLoaded"
    :type="childItem.type" 
    :dataType="childItem.dataType" 
    :label="childItem.label"
    :placeHolder="childItem.placeHolder"
    :hint="childItem.hint" 
    :items="childItem.items"
    :required="childItem.required"
    :color="childItem.color"
    :fieldId="childItem.key"
    :row="childItem.row"
    :updateOnChange="updateOnChange"
    @updateField="updateField"
    :importValue="importValue"
    :importModel="childItem.model"
    :childIndex="childIndex"
    :childItem="childItem"
    @revealSubItems="revealSubItems"
    @hideSubItems="hideSubItems"
    />

 
        
    </div>
</template>

<script setup>
  // import
  import BaseTextField from "./Fields/BaseTextField.vue";
  import BaseTextArea from "./Fields/BaseTextArea.vue";
  import BaseDate from "./Fields/BaseDate.vue";
  import BaseSwitch from "./Fields/BaseSwitch.vue";
  import BaseDropDown from "./Fields/BaseDropDown.vue";
  import BaseRadio from "./Fields/BaseRadio.vue";
  import BaseCheckBox from "./Fields/BaseCheckBox.vue";
  import BaseTime from "./Fields/BaseTime.vue";
  import BaseUpload from "./Fields/BaseUpload.vue";
  import BaseInformation from "./Fields/BaseInformation.vue";
  import BaseTable from "./Fields/BaseTable.vue";
  import BaseSignature from "./Fields/BaseSignature.vue";
  import BaseSubItem from "./Fields/BaseSubItem.vue";
  // props
        const { childItem, childIndex, childDataLoaded, importValue, updateOnChange  } = defineProps(['childItem', 'childIndex', 'childDataLoaded', 'importValue', 'updateOnChange'])
        const emit = defineEmits(['updateField', 'updateArray', 'updateFiles', 'revealSubItems', 'hideSubItems'])


  function updateField(key, value, childIndex, snackbar) {
            emit('updateField', key, value, childIndex, snackbar)
        }
        function    updateArray(index, value) {
            emit('updateArray', index, value)
        }
        function   updateFiles(index, file) {
            emit('updateFiles', index, file)
        }
        function  revealSubItems(childItem) {
                emit('revealSubItems', childItem)
            
        }
        function   hideSubItems(childItem) {
      
                emit('hideSubItems', childItem)
            
        }


</script>

