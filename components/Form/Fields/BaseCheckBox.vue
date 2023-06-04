<template>
    <v-checkbox 
    :label="label" 
    :color="colorModel"
    v-model="model" 
    :rules="rules"
    class="font-weight-bold text-black"
    @change="changeUpdate"
     />
</template>

<script setup>
        import { ref, onMounted } from 'vue'
        const emit = defineEmits(['updateField'])
    const { type, dataType, label, placeHolder, hint, required, restrictLength, maxLength, minLength, color, updateOnChange, fieldId, importValue, importModel, childIndex, childItem  } = defineProps(['type', 'dataType', 'label', 'placeHolder', 'hint', 'required', 'restrictLength', 'maxLength', 'minLength', 'color', 'updateOnChange', 'fieldId', 'importValue', 'importModel', 'childIndex', 'childItem'])

    const model = ref(false)
    const rules = ref([])
    const colorModel = ref('primary')
    function  changeUpdate() {
            if (updateOnChange === true)
            {
               emit('updateField', fieldId, model, childIndex, null)
            }
        }
    onMounted(() => {
        if (color)
        {
            colorModel.value = color
        }
        if (importValue === true) 
        {
            
            model.value = importModel
        }
        if (required === true) 
        {
            rules.value.push(v => !!v || 'Field is required')
        }
        } )
    
       


</script>
