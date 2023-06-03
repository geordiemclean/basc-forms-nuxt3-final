<template>
    <v-textarea 
    rows="1"
    auto-grow
    :label="label" 
    :placeholder="placeHolder" 
    :hint="hint" 
    :color="color"
    @change="changeUpdate"  
    v-model="model" 
    :rules="rules"
    density="compact"
    :counter="restrictLength"
    :maxlength="maxLength"
    variant="outlined"
     />
</template>
<script>
export default {
    props: ['type', 'label', 'placeHolder', 'hint', 'required', 'restrictLength', 'maxLength', 'minLength', 'color', 'updateOnChange', 'fieldId', 'importValue', 'importModel', 'childIndex'],
    data() {
        return {
            model: '',
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
        if (this.restrictLength === true && this.maxLength !== '') 
        {
            this.rules.push(value => value.length <= this.maxLength || `Max ${this.maxLength} characters`)
        }
        if (this.restrictLength === true && this.minLength !== '') 
        {
            this.rules.push(v => v.length >= this.minLength || `Min ${this.minLength} characters`)
        }
    },
}
</script>