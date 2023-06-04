<template>
    <span :class="titleClass">
        {{ title }}
    </span>
 </template>

 <script>

 export default {
    props: ['title', 'textSize', 'textColor', 'textWeight', 'childItem'],
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
            const newColor =  this.textColor.split('-')
            textColor = `text-${newColor[0]}`
            this.titleClass = `${textColor} ${this.textSize} ${this.textWeight}`
        }
    },
    // computed: {
    //     titleClass: () => {
    //        const titleClass = []
            
    //         if (this.textSize)
    //         {
    //             titleClass.push(this.textSize)
    //         }
    //         if (this.textColor)
    //         {
    //          const newColor =  this.textColor.split('-').reverse('').join('-')
    //             titleClass.push(newColor)
    //         }
    //         if (this.textWeight)
    //         {
    //             titleClass.push(this.textWeight)
    //         }
    //         return titleClass 
    //     }
    // },
 }
 </script>