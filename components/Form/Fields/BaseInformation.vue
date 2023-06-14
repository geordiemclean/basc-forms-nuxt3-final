 <template>
   <div>
      <div class="mt-10" v-html="childItem.description"></div>
       </div>
 </template>
 <script>

 export default {
    props: ['childItem'],
    
 }
 </script>