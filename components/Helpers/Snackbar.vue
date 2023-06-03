<template >
    <v-snackbar transition="scroll-x-reverse-transition"  elevation="10"  v-for="(item, i) in store.snackbars" :key="i" v-model="item.show" :timeout="item.timeout"  location="top right" :style="{'margin-top':store.calcMargin(i)}">
        <v-icon v-if="item.title === 'Error'" left class="float-left" color="red">mdi-alert-circle</v-icon> 
        <v-icon v-if="item.title === 'Success'" left class="float-left" color="green">mdi-check-circle</v-icon> 
          <span class="ml-2 font-weight-bold">{{ item.text }}</span>
          <v-icon class="float-right" color="blue" text @click="store.hide(i)">mdi-close</v-icon>
      </v-snackbar>
</template>

<script>
    import { useStore } from '../../stores/Store.js'

    export default {
        setup() {
        const store = useStore()
        return {
            store,
        };
    },
     
    }
</script>