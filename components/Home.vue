<template>
  <v-main fluid>
      <v-container fluid v-if="!store.appLoading">
      <v-row>
        <v-col v-for="(item, i) in store.formFilter" :key="i" cols="6" md="3" sm="4">
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-card
                shaped
                v-bind="props"
                @click="goToForm(item)"
                :elevation="isHovering ? 12 : 3"
              >
              <v-card-text>
                <h3 class="text-center font-weight-bold  text--black ">
                  {{
                  item.formName
                }}</h3>
                <v-card-text class="text-center">
                  <v-icon color="primary" size="50">mdi-plus-circle</v-icon>
                </v-card-text>
              </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
        <v-col
        v-for="item in vacItems"
        :key="item.formId"
        cols="6"
        md="3"
        sm="6"
      >
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              shaped
              v-bind="props"
              @click="goToVac(item.formId)"
              :elevation="isHovering ? 12 : 3"
            >
              <v-card-text :class="item.titleClass">{{
                item.title
              }}</v-card-text>
              <v-card-text class="text-center">
                <v-icon :color="item.iconColour" size="50">{{
                  item.icon
                }}</v-icon>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      </v-row>


    </v-container>
  </v-main>
</template>

<script>
import { useStore } from '../stores/Store'

export default {
  setup() {
        const store = useStore();
        return {
            store,
        };
    },
    mounted() {
    this.store.fetchTemplates()
      },
    data() {
        return {
            // Forms
            formTemplate: [],
            loading: false,
            vacItems: [
                {
                    title: "Senior Excursion Form",
                    titleClass: "text-center headline green--text font-weight-bold",
                    formId: "Senior",
                    iconColour: "tertiary",
                    icon: "mdi-bus",
                },
                {
                    title: "Junior Excursion Form",
                    titleClass: "text-center headline purple--text font-weight-bold",
                    formId: "Junior",
                    iconColour: "secondary",
                    icon: "mdi-bus",
                },
            ],
        };
    },
    methods: {
        goToForm(item) {
            this.$router.push("/new-form/" + item.id);
        },
        goToVac(item) {
            this.$router.push("/excursion-form/" + item);
        },
    },
   
};
</script>
