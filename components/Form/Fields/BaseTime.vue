<template>
    <div class="time-input">
        <input class="my-2 mx-2 inputClass" timeFormat="12" @change="changeUpdate" type="time"  v-model="model">
        <v-btn size="x-small" color="blue" class="font-weight-bold ml-1" dark @click="now">Now</v-btn>
      </div>
</template>

<script>
import { format } from 'date-fns';


export default {
    props: [ 'updateOnChange',  'importValue', 'importModel', 'childIndex', 'childItem'],
    data() {
        return {
            model: '00:00',
            format: 'yyyy-MM-dd ',
           timePickerFormat: 'hh:mm a',
            rules: [],
            prependIcon: '',
        }
    },
    methods: {
         convert12To24(time12h) {
            const [time, modifier] = time12h.split(' ');
            let [hours, minutes] = time.split(':');

            if (hours === '12') {
                hours = '00';
            }

            if (modifier === 'pm') {
                hours = parseInt(hours, 10) + 12;
            }

            return `${hours}:${minutes}`;
            },

        now () {
          this.model = format(new Date(), "HH:mm")
                this.$emit('updateField', this.model, this.childIndex)
        },
        changeUpdate() {
            if (this.updateOnChange === true && this.model !== this.importModel)
            {
                this.$emit('updateField', this.model, this.childIndex)
            }
        },
    },
    created () {
        if (this.importValue === true && this.importModel) 
        {
            // check if import model is in 12 hour time
            if (/^(0?[1-9]|1[0-2]):[0-5][0-9]\s[AP]M$/i.test(this.importModel)) {
           // is 12 hour
          this.model = this.convert12To24(this.importModel);
            } else {
                // is 24 hour time
                this.model = this.importModel
            }
        }
        if (this.childItem.required === true) 
        {
            this.rules.push(v => !!v || 'Field is required')
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






