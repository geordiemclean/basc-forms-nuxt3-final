<template>
    <v-checkbox 
    :label="childItem.label" 
    :color="childItem.color"
    v-model="model" 
    :rules="rules"
    class="font-weight-bold text-black"
    @change="changeUpdate"
     />
</template>

<script setup>
        import { ref, onMounted } from 'vue'
        const emit = defineEmits(['updateField'])
    const {  updateOnChange, importValue, importModel, childIndex, childItem  } = defineProps(['updateOnChange','importValue', 'importModel', 'childIndex', 'childItem'])

    const model = ref(false)
    const rules = ref([])
    function  changeUpdate() {
            if (updateOnChange === true)
            {
               emit('updateField',  model, childIndex)
            }
        }
    onMounted(() => {
        if (!childItem.color)
        {
            childItem.color = 'primary'
        }
        if (importValue === true) 
        {
            
            model.value = importModel
        }
        if (childItem.required === true) 
        {
            rules.value.push(v => !!v || 'Field is required')
        }
        } )
    
       


</script>
