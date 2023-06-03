 <template>
    <div>
    <v-row  v-for="(row, i) in tableRows" :key="i+45566">
        <v-col cols="12">
          <h1 class="font-weight-bold blue--text" v-if="row.type === 'Heading'">{{row.info}}</h1>
          <p class="font-weight-bold black--text text-h6" v-if="row.type === 'Paragraph'">{{row.info}}</p>
          <a class="font-weight-bold text-h6 blue--text"  target="_blank" v-if="row.type === 'Link'" :href="row.info">{{row.info}}</a>
        </v-col>
     </v-row>
    </div>
 </template>
 <script>

 export default {
    props: ['tableRows'],
    
 }
 </script>