<template>
<div>
    <section id="firebaseui-auth-container"></section>
</div>
</template>


<script>
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import axios from 'axios';

export default {
  name: 'Login',
  props: [],
  data() {
      return {
      };
  },
  methods: {
  },
  mounted() {
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        const router = this.$router
        var uiConfig = {
            signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
            callbacks: {
            signInSuccess: function(currentUser) {
                // Manually redirect.
                currentUser.getIdToken().then(idToken => {
                    axios.post('http://localhost:5000/sessionLogin', {
                        "idToken": idToken,
                    }, {withCredentials: true})
                    .then((res) => {
                        console.log(res)
                        alert("!")
                        router.push({ name: 'profile' })
                    })
                    .catch(err => console.log(err));
                })
                console.log(currentUser)
                // Do not automatically redirect.
                
                return false;
            },
        },
        };
        ui.start("#firebaseui-auth-container", uiConfig);
    }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    a {
        color: black;
    }
</style>
