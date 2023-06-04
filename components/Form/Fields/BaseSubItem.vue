<template>
    <v-radio-group
    @change="changeUpdate"
    v-model="model" 
    :rules="rules"
    :required="childItem.required"
    class="font-weight-bold" 
   row
    :multiple="childItem.multiple"
     >
     <v-radio 
     @click="revealSubItems" 
     label="Yes"
     :value="true"
     :color="childItem.color"
     />
     <v-radio 
     @click="hideSubItems" 
     label="No"
     :value="false"
     :color="childItem.color"
     />
     </v-radio-group>
</template>
<script>
export default {
    props: ['updateOnChange','importValue', 'importModel', 'childIndex', 'childItem'],
    data() {
        return {
            model: '',
            rules: [],
            prependIcon: '',
            multiple: false,
        }
    },
    created () {

        if (this.importValue === true) 
        {
            
            this.model = this.importModel
            if (this.importModel === true)
            {
            this.revealSubItems()
            }

        }
    },
    methods: {
    changeUpdate() {
            if (this.updateOnChange === true)
            {
                this.$emit('updateField', this.model, this.childIndex)
            }
        },
        revealSubItems() {
            if (this.updateOnChange === true)
            {
                this.$emit('revealSubItems', this.childItem)
            }
        },
        hideSubItems() {
            if (this.updateOnChange === true)
            {
                this.$emit('hideSubItems', this.childItem)
            }
        },
        clear() {
            this.model = ''
                this.$emit('updateField', this.model, this.childIndex)
        
        }
    },
}
</script>