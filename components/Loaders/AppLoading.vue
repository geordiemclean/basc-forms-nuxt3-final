<template >
    <v-dialog v-model="visitorStore.appLoading">
        <v-row  class="my-auto" v-if="visitorStore.appLoading" justify="center">
            <v-progress-circular :size="200" :width="15" color="primary" :indeterminate="visitorStore.appLoading" />
        </v-row>
        <v-row justify="center">
            <h3>
                {{ visitorStore.loadingText }}
            </h3>
        </v-row>
    </v-dialog>
</template>

<script>
    import { useVisitorStore } from '../../stores/VisitorStore'
    
    export default {
        setup () {
            const visitorStore = useVisitorStore()
           // visitorStore.snackbarSet('Success', 'green', 'Testing')
            return { visitorStore }
        },
    }
</script>