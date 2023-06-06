<template>
    <div>
        <input  class="my-2 mx-2 inputClass"  @change="changeUpdate" v-model="model" type="date">
    <v-btn size="x-small" color="blue" class="font-weight-bold ml-1" dark @click="today">Today</v-btn>
</div>
</template>

<script>
import { format } from 'date-fns';

export default {
    props: [ 'updateOnChange', 'importValue', 'importModel', 'childIndex', 'childItem'],
    data() {
        return {
            model: '2000-01-01',
            rules: [],
        }
    },
    methods: {
        today () {
            this.model = format(new Date(), 'yyyy-MM-dd')

            this.changeUpdate()
        },
        changeUpdate() {
            if (this.updateOnChange === true)
            {
                let date = this.model.split('-').reverse('').join('/')
                this.$emit('updateField', date, this.childIndex)
            }
        },
        isValidDateFormat(dateString) {
            var regex = /^\d{2}\/\d{2}\/\d{4}$/;
            return regex.test(dateString);
            }
    },
    created () {
        if (this.childItem.required === true) 
        {
            this.rules.push(v => !!v || 'Field is required')
        }
        if (this.importValue === true && this.importModel) 
        {
            if (this.isValidDateFormat(this.importModel))
            {
                this.model = this.importModel.split('/').reverse('').join('-')
            }
            else {
            this.model = this.importModel
            }

        }
    },
}
</script>

<style>

.inputClass {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1.2rem;
}
</style>
