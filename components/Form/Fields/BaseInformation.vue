 <template>
   <div class="mx-3 mb-5">
      <div v-if="childItem.type === 'information'"   v-html="childItem.description"></div>
      <div v-if="childItem.type === 'information'"  style="clear: both;"></div>
    </div>
 </template>
 <script>

 export default {
    props: ['childItem'],
    
 }
 </script>