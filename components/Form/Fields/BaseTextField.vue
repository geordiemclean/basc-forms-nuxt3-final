<template>
    <v-text-field 
    :type="dataType"
    :label="label" 
    :placeholder="placeHolder" 
    :hint="hint" 
    clearable 
    :prepend-icon="prependIcon"
    @change="changeUpdate"  
    v-model="model"
    :rules="rules"
    :color="color"
    density="compact"
    :counter="restrictLength"
    :maxlength="maxLength"
    variant="outlined"
     />
</template>
<script>
export default {
    props: ['type', 'dataType', 'label', 'placeHolder', 'hint', 'required',  'color', 'updateOnChange', 'fieldId', 'importValue', 'importModel', 'childIndex', 'childItem'],
    data() {
        return {
            model: '',
            rules: [],
            prependIcon: '',
            restrictLength: false,
            maxLength: '',
            minLength: '',
        }
    },
    methods: {
        trim() {
            if (this.model !== '' && this.model !==  undefined && this.model !== null)
            {
            this.model = this.model.trim()
            }
        },
        changeUpdate() {
          ///  this.trim()
            
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
        if (this.type === 'email') 
        {
            this.rules.push((v) => /.+@.+\..+/.test(v) || "E-mail must be valid")
            this.prependIcon = 'mdi-email'
          //  this.dataType = 'text'
        }
        if (this.type === 'mobile') 
        {
            this.maxLength = 10
            this.minLength = 10
            this.restrictLength = true
         //   this.dataType = 'number'
            this.prependIcon = 'mdi-phone'
        }
        // if (this.restrictLength === true && this.maxLength !== '') 
        // {
        //     this.rules.push(value => value.length <= this.maxLength || `Max ${this.maxLength} characters`)
        // }
        // if (this.restrictLength === true && this.minLength !== '' ) 
        // {
        //     this.rules.push(v => v.length >= this.minLength || `Min ${this.minLength} characters`)
        // }
    },
}
</script>