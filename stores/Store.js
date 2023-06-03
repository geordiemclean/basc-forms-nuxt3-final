import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
    state: () => ({
      // snackbar
      snackbars: [],
      // loaders
        loadingText: 'Loading...',
        appLoading: false,
        // Arrays 
        formTemplate: [],
        // dialog leave
        dialogLeave: false,
        // dialog complete
        dialogComplete: false,
        contactName: '',
    }),
    actions: {
      formComplete(name) {
        var vm = this
        if (name)
        {
        vm.contactName = name
        }
        vm.dialogComplete = true
        setTimeout(() => {
          vm.dialogComplete = false
        }, 5000);
      },
       // start dialog leave
       createPromise() {
        return new Promise(resolve => {
          this.functionResolve = resolve;
        })
      },
      dialogResponse(response) {
        this.functionResolve(response)
        if (!response)
        {
          this.dialogLeave = false
        }
      },
       // end dialog leave
      async fetchTemplates () {
        var vm = this
        vm.appLoading = true
        vm.formTemplate = []

        try {
          vm.fetchArray('formTemplate', 'formType', '==', 'parent').then(
            async (res) => {
              if (res.data.value !== null)
              {
                vm.formTemplate = res.data.value
                vm.appLoading = false
                vm.sortBy('formName')
            }
            })
         }
          catch (err) {
           vm.appLoading = false
           vm.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
          }
     
      },
      sortBy (prop) {
        this.formTemplate.sort((a, b) => a[prop] > b[prop] ? 1 : -1)
    },
     // start snackbar
    calcMargin(i) {
          return (i*70) + 'px'
      },
      hide(i){
          this.snackbars.splice(i,1)
      },
      snackbarSet(colour, title, message) {
        var vm = this
        let sameMessage = false
        if (vm.snackbars.length > 0)
        {
        vm.snackbars.forEach((item, index) => {
            if (item.show === false && vm.snackbars.length > 1)
            {
              vm.snackbars.splice(index, 1)
            }

          if (message === item.text && item.title !== 'Success')
          {
            sameMessage = true
            item.show = true
           
          }
          else {
            sameMessage = false
          }
        })
      }
        if (sameMessage === false)
        {
        vm.snackbars.push(
        {
          color: colour,
          text: message,
          title: title,
          show: true,
          timeout: 4000,
        }
      )
        }
      },
      async fetchCWA(collectionRef, docRef) {
        return await useFetch('/api/fetchCWA', {
          method: 'post',
          body: {
            collectionRef: collectionRef,
            docRef: docRef,
          },
         initialCache: false 
        })
      },
      // DEFAULT APi Calls
      async addDocument(collectionRef, info) {
        return await useFetch('/api/addDoc', {
          method: 'post',
          body: {
            collectionRef: collectionRef,
            info: info,
          },
          initialCache: false 
        })
      },
       // DEFAULT APi Calls
       async addSubDocument(collectionRef, docRef, subCollectionRef, info) {
        return  await fetch('/api/addSubDoc', {
          method: 'POST',
          body: JSON.stringify({
            collectionRef: collectionRef,
            docRef: docRef,
            subCollectionRef: subCollectionRef,
            info: info,
          }),
        });
        // return await useFetch('/api/addSubDoc', {
        //   method: 'post',
        //   body: {
        //     collectionRef: collectionRef,
        //     docRef: docRef,
        //     subCollectionRef: subCollectionRef,
        //     info: info,
        //   },
        //   initialCache: false 
        // })
      },
      async setDocument(collectionRef, docRef, info) {
        return await useFetch('/api/setDoc', {
          method: 'post',
          body: {
            collectionRef: collectionRef,
            docRef: docRef,
            info: info,
          },
          initialCache: false 
        })
      },
      async updateDocument(collectionRef, docRef, info) {
        return await useFetch('/api/updateDoc', {
          method: 'post',
          body: {
            collectionRef: collectionRef,
            docRef: docRef,
            info: info,
          },
          initialCache: false 
        })
      },
      async fetchData(collectionRef, docRef) {
        return await useFetch('/api/fetchData', {
          method: 'post',
          body: {
            collectionRef: collectionRef,
            docRef: docRef,
          },
         initialCache: false 
        })
      },
      async fetchArray(collectionRef, field, condition, value) {
        return await useFetch('/api/fetchArray', {
          method: 'post',
          body: {
            collectionRef: collectionRef,
            field: field,
            condition: condition,
            value: value,
          },
          initialCache: false 
        })
      },
      async fetchSubArray(collectionRef, docRef, subCollectionRef, field, condition, value) {

        return await useFetch('/api/fetchSubArray', {
          method: 'post',
          body: {
            collectionRef: collectionRef,
            docRef: docRef,
            subCollectionRef: subCollectionRef,
            field: field,
            condition: condition,
            value: value,
          },
          initialCache: false 
        })
      },
      },
     
    // Getters (Computed)
     getters: {
      formFilter: function () {
        return this.formTemplate.filter(function (u) {
            return u.published === true;
        });
    },
     
    },
  })