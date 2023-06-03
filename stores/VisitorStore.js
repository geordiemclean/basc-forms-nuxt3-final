import { defineStore } from 'pinia'
import { format } from 'date-fns'


export const useVisitorStore = defineStore('visitorStore', {
    state: () => ({
      snackbars: [],
        loadingText: 'Loading...',
        appLoading: false,
        loading: false,
        visitorTC: null,
        // Arrays 
        visitorRecord: [],
        visitorProfile: [],
        // visitor data
        mobile: '',
        visitorFirstName: '',
        visitorLastName: '',
        reasonForVisit: '',
        email: '',
        wwcc: '',
        checkIn: false,
        signUpDialog: false,
        // check in out
        dialogCheckIn: false,
        checkInText: '',
        thankYouText: '',
        welcomeText: '',
        // settings
        visitorReasons: [],
        visitorTC: null,

    }),
    actions: {
      signUp () {
        var vm = this
        if (vm.firstName === "") {
            vm.snackbarSet("pink", "Error", "Please add a first name!");
        }
        else if (vm.lastName === "") {
            vm.snackbarSet("pink", "Error", "Please add a last name!");
        }
        else if (vm.reasonForVisit === "") {
            vm.snackbarSet("pink", "Error", "Please add a reason for visit!");
        }
        else if (vm.email === "") {
            vm.snackbarSet("pink", "Error", "Please add an email address!");
        }
        else {
          vm.signUp()
        }

      },
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
    async signOutAll () {
      var vm = this
      try {
        vm.fetchArray('visitorRecord', 'checkIn', '==', true).then(
          async (res) => {
            if (res.data.value !== null)
            {
            if (res.data.value.length !== 0)
            {
              res.data.value.forEach(async (visitor) => {
                 if (visitor.checkedInDate !== format(new Date(), 'dd/MM/yyyy'))
                  {
                        await this.updateDocument('visitorRecord', visitor.id, 
                        {
                        checkedOutDate: format(new Date(), 'dd/MM/yyyy'),
                        checkedOutTime: '18:00',
                        checkIn: false,
                        checkedOutBy: 'Auto'
                        })
                  }
              })
            }
            else{
              return
            }
          }
          })
       }
        catch (err) {
          console.log(err)
        //  vm.appLoading = false
        //  vm.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
        }
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
      async fetchSettings() {
        this.appLoading = true
        try {
         // console.log('fetching settings')
          await useFetch('/api/fetchReasons').then((res) => {
          // console.log(res.data.value.visitorReasons)
          this.visitorReasons  = res.data.value.visitorReasons
          this.visitorTC = res.data.value.visitorTC
          this.appLoading = false
          })
        }
        catch (err) {
         vm.appLoading = false
         vm.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
        }
      },
       async  checkIn () {
        var vm = this
        vm.signUpDialog = false
        vm.loadingText = 'Signing You In...'
        vm.appLoading = true

        const visit = {
          mobile: vm.mobile,
          visitorFirstName: vm.visitorFirstName,
          visitorLastName: vm.visitorLastName,
          reasonForVisit: vm.reasonForVisit,
          email: vm.email,
          wwcc: vm.wwcc,
          checkIn: true,
          termsAndConditions: true,
          checkedInDate: format(new Date(), 'dd/MM/yyyy'),
          checkedInTime: format(new Date(), 'HH:mm'),
          checkedInFull: format(new Date(), 'yyyyMMdd') + 'T' + format(new Date(), 'HH:mm:ss'), //Date(),
        };
        // add document 
        try {
         await this.addDocument('visitorRecord', visit)
          .then(() => { 
            vm.appLoading = false
            vm.dialogCheckIn = true
            vm.welcomeText = 'Welcome'
            vm.checkInText = 'You are now checked in!'
            vm.thankYouText = 'We hope you enjoy your visit!'
            vm.mobile = ''
            setTimeout(() => {
              vm.dialogCheckIn = false
              vm.clearForm()
            }, 5000);
            })
         }
         catch(err) {
          vm.appLoading = false
          vm.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
         }
      },
      async checkOut (checkOutId) {
        var vm = this
        const info = {
          checkIn: false,
          checkedOutDate: format(new Date(), 'dd/MM/yyyy'),
          checkedOutTime: format(new Date(), 'HH:mm'),
          checkedOutFull: format(new Date(), 'yyyyMMdd') + 'T' + format(new Date(), 'HH:mm:ss'),
          checkedOutBy: "Visitor",
      }
      try {
         this.updateDocument('visitorRecord', checkOutId, info)
         .then(() => { 
           vm.appLoading = false
           vm.dialogCheckIn = true
           vm.welcomeText = 'Goodbye'
           vm.checkInText = 'You are now checked out!'
           vm.thankYouText = 'Thank you for visiting!'
           vm.mobile = ''
           setTimeout(() => {
             vm.dialogCheckIn = false
             vm.clearForm()
           }, 5000);
           })
        }
        catch(err) {
         vm.appLoading = false
         vm.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
        }
    },
      close() {
        // this.closeConfirmDialog = false
        this.signUpDialog = false;
        this.clearForm();
    },
    clearForm() {
        this.visitorFirstName = "",
        this.visitorLastName = "",
        this.email = "";
        this.wwcc = "";
        this.reasonForVisit = "";
    },
      async signUp() {
        var vm = this;

        if (vm.visitorFirstName === "") {
          vm.snackbarSet('red', 'Error', 'Please enter your first name')
        }
        else if (vm.visitorLastName === "") {
          vm.snackbarSet('red', 'Error', 'Please enter your last name')
        }
        else if (vm.reasonForVisit === "") {
          vm.snackbarSet('red', 'Error', 'Please select a reason for your visit')
        }
        else if (vm.email === "") {
          vm.snackbarSet('red', 'Error', 'Please enter your email address')
        }
        else {
          vm.loadingText = 'Creating Your Account...'
          vm.appLoading = true

            const info = {
                mobile: this.mobile,
                visitorFirstName: this.visitorFirstName,
                visitorLastName: this.visitorLastName,
                email: this.email,
                wwcc: this.wwcc,
                reasonForVisit: this.reasonForVisit,
                termsAndConditions: true,
                active: true,
                signUpDate: format(new Date(), "dd/MM/yyyy"),
                signUpTime: format(new Date(), "HH:mm"),
                signUpFull: format(new Date(), "yyyyMMdd") + "T" + format(new Date(), "HH:mm:ss"),
            };
           
            try {
              await this.setDocument('visitorProfile', vm.mobile, info)
               .then(() => { 
                vm.signUpDialog = false
                vm.snackbarSet('green', 'Success', `${vm.visitorFirstName} is now signed up!`)
                vm.checkIn()
                 })
              }
              catch(err) {
               vm.appLoading = false
               vm.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
              }
            }
            },
     
      // end check in
      // start check out  
      async login() {
        var vm = this;
        // Validate Mobile
        if (vm.mobile == "" || vm.mobile.length !== 10) {
            vm.snackbarSet("red", "Error", `Mobile must be 10 digits, however, mobile is currently ${vm.mobile.length} digits!`);
            return;
        }
        vm.appLoading = true;
        vm.loadingText = 'Checking Your Details...'
        // Check if Visitor Exists
            try {
              this.fetchData("visitorProfile", vm.mobile).then((res) => {
                // if visitor does not exist - sign up
                if (res.data.value === null) {
                  vm.appLoading = false;
                  vm.signUpDialog = true;
                }
                else  {
                  vm.visitorFirstName = res.data.value.visitorFirstName;
                  vm.visitorLastName = res.data.value.visitorLastName;
                  vm.email = res.data.value.email;
                  vm.wwcc = res.data.value.wwcc;
                  vm.reasonForVisit = res.data.value.reasonForVisit;
                  this.loginCheckInOrOut()
                }
               })
             }
             catch (err) {
              vm.appLoading = false
              vm.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
             }
            
    },
    loginCheckInOrOut () {
      var vm = this
       // if visitor exists - check if checked in or out
       try {
        // get all visitors
        vm.fetchArray('visitorRecord', 'mobile', '==', vm.mobile).then(
           (res) => {
            // filter response to only checked in visitors
            const filtered = res.data.value.filter( (el)  => {
              return el.checkIn === true
            })
            // if there are checked in visitors - check out
              if (filtered.length !== 0)
              {
              vm.checkOut(filtered[0].id)
              }
            // if there are no checked in visitors - check in
              else {
                vm.checkIn()
              }
          })
       }
       catch (err) {
        vm.appLoading = false
        vm.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
       }
    },
     // start snackbar
     addSnackbar () {
      this.snackbars.push(
        {
          text: 'Hello snackbar',
        }
      )
    },
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
      }
      },
      
    // Getters (Computed)
     getters: {
      mapReasons: function () {
        return this.visitorReasons.map(function (u) {
            return u.reason
        });
      },
      checkedIn: function () {
        return this.visitorRecord.filter(function (u) {
            return u.checkIn === true
        });
        },
     
    },
  })