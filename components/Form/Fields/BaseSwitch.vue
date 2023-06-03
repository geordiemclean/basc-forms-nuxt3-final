<template>
    <v-switch 
    :label="label" 
    :color="color"
    v-model="model" 
    :rules="rules"
    class="font-weight-bold blacl--text"
    @change="changeUpdate"
     />
</template>
<script>
export default {
    props: ['type', 'dataType', 'label', 'placeHolder', 'hint', 'required', 'restrictLength', 'maxLength', 'minLength', 'color', 'updateOnChange', 'fieldId', 'importValue', 'importModel', 'childIndex'],
    data() {
        return {
            model: false,
            rules: [],
        }
    },
    methods: {
        changeUpdate() {
            if (this.updateOnChange === true)
            {
                this.$emit('updateField', this.fieldId, this.model, this.childIndex, null)
            }
        },
    },
    created () {
        if (this.importValue === true) 
        {   
            this.model = this.importModel
            
        }
        if (this.required === true) 
        {
            this.rules.push(v => !!v || 'Field is required')
        }
    },
}
</script>