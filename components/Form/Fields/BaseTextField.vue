<template>
    <v-text-field 
    :type="childItem.dataType"
    :label="childItem.label" 
    :placeholder="childItem.placeHolder" 
    :hint="childItem.hint" 
    clearable 
    :prepend-icon="prependIcon"
    @change="changeUpdate"  
    v-model="model"
    :rules="rules"
    :color="childItem.color"
    density="compact"
    :counter="childItem.restrictLength"
    :maxlength="childItem.maxLength"
    variant="outlined"
     />
</template>
<script>
export default {
    props: [ 'updateOnChange',  'importValue', 'importModel', 'childIndex', 'childItem'],
    data() {
        return {
            model: '',
            rules: [],
            prependIcon: '',
            restrictLength: false,
         
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
        if (this.childItem.type === 'email') 
        {
            this.rules.push((v) => /.+@.+\..+/.test(v) || "E-mail must be valid")
            this.prependIcon = 'mdi-email'
          //  this.dataType = 'text'
        }
        if (this.childItem.type === 'mobile') 
        {
            this.childItem.maxLength = 10
            this.childItem.minLength = 10
            this.childItem.restrictLength = true
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