<template >
    <v-container fluid>
        <v-text-field v-model="accountName" />
        
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            accountName: 'Account 1'
        }
    },
}
</script>