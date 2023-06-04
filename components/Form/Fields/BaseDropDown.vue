<template>
     <v-select
    :label="childItem.label" 
    :placeholder="childItem.placeHolder" 
    :hint="childItem.hint" 
    clearable 
    :prepend-icon="prependIcon"
    v-model="model" 
    :rules="rules"
    :color="childItem.color"
    :items="mappedItems"
    :counter="childItem.restrictLength"
    :maxlength="childItem.maxLength"
    flat 
    variant="outlined"
    rounded
    @update:modelValue="changeUpdate"
  
     />
</template>
<script>
export default {
    props: ['updateOnChange','importValue', 'importModel', 'childIndex', 'childItem'],
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
                this.$emit('updateField', this.model, this.childIndex)
            }
        },
    },
    computed: {
        mappedItems() {
            return this.childItem.items.map(item => {
                return item.value
            })
        }
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