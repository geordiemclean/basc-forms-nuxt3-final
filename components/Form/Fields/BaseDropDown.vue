<template>
    <v-select
    :label="label" 
    :placeholder="placeHolder" 
    :hint="hint" 
    clearable 
    :prepend-icon="prependIcon"
    v-model="model" 
    :rules="rules"
    :color="color"
    item-text="value"
    :items="items"
    :counter="restrictLength"
    :maxlength="maxLength"
    flat 
    variant="outlined"
    rounded
    @change="changeUpdate"
     />
</template>
<script>
export default {
    props: ['type', 'label', 'placeHolder', 'hint', 'required', 'restrictLength', 'maxLength', 'minLength', 'color', 'items', 'updateOnChange', 'fieldId', 'importValue', 'importModel', 'childIndex'],
    data() {
        return {
            model: '',
            rules: [],
            prependIcon: '',
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