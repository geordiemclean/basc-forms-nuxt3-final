<template>
    <v-switch 
    :label="childItem.label" 
    :color="childItem.color"
    v-model="model" 
    :rules="rules"
    class="font-weight-bold blacl--text"
    @change="changeUpdate"
     />
</template>
<script>
export default {
    props: ['updateOnChange',  'importValue', 'importModel', 'childIndex', 'childItem'],
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
                this.$emit('updateField', this.model, this.childIndex)
            }
        },
    },
    created () {
        if (this.importValue === true) 
        {   
            this.model = this.importModel
            
        }
        if (this.childItem.required === true) 
        {
            this.rules.push(v => !!v || 'Field is required')
        }
    },
}
</script>