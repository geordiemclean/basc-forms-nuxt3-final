<template>
    <v-table class="mt-3" >
        <tbody>
         <tr v-for="(row, i) in childItem.tableRows" :key="i+'tableRowKey'">
         <td class="black--text body-1 font-weight-bold">
           {{row.title}}
         </td>
           <td class="black--text body-1">
           {{row.info}}
         </td>
         </tr>
       </tbody>
     </v-table>
 </template>

 <script>

 export default {
    props: ['childItem'],
    
 }
 </script>