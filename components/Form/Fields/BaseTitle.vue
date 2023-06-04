<template>
    <span :class="titleClass">
        {{ childItem.title }}
    </span>
 </template>

 <script>

 export default {
    props: ['childItem'],
    created () {
        this.createClass()
    },
    data() {
        return {
            titleClass: []
        }
    },
    methods: {
        createClass() {
            let textColor = ''
            const newColor =  this.childItem.textColor.split('-')
            textColor = `text-${newColor[0]}`
            this.titleClass = `${textColor} ${this.childItem.textSize} ${this.childItem.textWeight}`
        }
    },
 }
 </script>