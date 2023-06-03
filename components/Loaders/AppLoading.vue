<template >
    <v-dialog v-model="store.appLoading">
        <v-row  class="my-auto" v-if="store.appLoading" justify="center">
            <v-progress-circular :size="200" :width="15" color="primary" :indeterminate="store.appLoading" />
        </v-row>
        <v-row justify="center">
            <h3>
                {{ store.loadingText }}
            </h3>
        </v-row>
    </v-dialog>
</template>

<script>
    import { useStore } from '../../stores/Store'
    
    export default {
        setup () {
            const store = useStore()
            return { store }
        },
    }
</script>