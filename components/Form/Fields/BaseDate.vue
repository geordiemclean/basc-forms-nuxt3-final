<template>
    <div>
        <input @change="changeUpdate" v-model="model" type="date">
    <!-- <vue-date-picker
    v-model:value="model" 
    type="date"
    lang="en"
    :color="color"
    :rules="rules"
    format="DD/MM/YYYY"
    valueType="format"
    @change="changeUpdate"
    /> -->
    <v-btn size="x-small" color="blue" class="font-weight-bold ml-1" dark @click="today">Today</v-btn>
</div>
</template>
<script>
//   import DatePicker from 'vue-datepicker-next';
//   import 'vue-datepicker-next/index.css';
import { format } from 'date-fns';

export default {
    props: ['required', 'color', 'autoFill', 'updateOnChange', 'fieldId', 'importValue', 'importModel', 'childIndex', 'childItem'],
    // components: {
    //     DatePicker,
    // },
    data() {
        return {
            model: '',
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
                this.$emit('updateField', this.fieldId, date, this.childIndex, null)
            }
        },
        isValidDateFormat(dateString) {
            var regex = /^\d{2}\/\d{2}\/\d{4}$/;
            return regex.test(dateString);
            }
    },
    created () {
        if (this.required === true) 
        {
            this.rules.push(v => !!v || 'Field is required')
        }
        if (this.autoFill === true)
        {
          this.model =  format(new Date(), 'dd/MM/yyyy')
        }
        if (this.importValue === true && this.importModel) 
        {
            if (isValidDateFormat(this.model))
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