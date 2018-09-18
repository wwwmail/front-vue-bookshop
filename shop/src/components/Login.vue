

<template>

<div class="hello">


    <div class="container main-container login-container">
        <form class="form-horizontal" role="form">
            <div class="row">
                <h2 class="title-login text-center">Login Form</h2>
            </div>
            <h3>{{infoMessage}}</h3>

            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-2 field-label-responsive">
                    <label for="email">E-Mail Address</label>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon" style="width: 2.6rem">
                                <icon name="at"></icon>
                            </div>
                            <input type="text" name="email" v-model="login.email" class="form-control" id="email" placeholder="you@example.com" required autofocus>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-control-feedback">
                        <span class="text-danger align-middle">
                          <span v-if="errorEmail">  {{errorEmail}} </span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-2 field-label-responsive">
                    <label for="password">Password</label>
                </div>
                <div class="col-md-6">
                    <div class="form-group has-danger">
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon" style="width: 2.6rem">
                                <icon name="key"></icon>
                            </div>
                            <input type="password" name="password" v-model="login.password" class="form-control" id="password" placeholder="Password" required>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-control-feedback">
                        <span class="text-danger align-middle">
                          <span v-if="errorPassword">  {{errorPassword}} </span>
                        </span>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-8">
                    <span type="submit" v-on:click="sendForm()" class="btn btn-style btn-login">
                        <icon name="plus"></icon> Login</span>
                </div>
            </div>
        </form>
    </div>
</div>

</template>

<script>

export default {
    name: 'Login',
    data() {
        return {
            infoMessage: '',
            login: {
                email: '',
                password: '',

            },
            errorEmail: '',
            errorPassword: '',

        }
    },
    methods: {
        sendForm: function() {

             if (!this.validEmail(this.login.email)){
                 this.errorEmail = 'email not valid';
                 return false;
             }else if (!this.login.password){
                this.errorPassword = 'pass is required';
                return false;
            }

            fetch(this.$config.API + '/auth', {
                method: 'post',
                body: JSON.stringify(this.login)
            }).then(function(response) {
                return response.json();
            }).then((data) => {
              console.log(data);
              if(data.success == 'true'){

                this.errorEmail = '';
                this.errorPassword = '';
                this.infoMessage = data.message;


                localStorage.setItem('user-token', data.auth);
                this.setAuth();
              }else{
                this.infoMessage = data.message;
              }
              console.log(333);
            });



        },
        validEmail: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

        setAuth: function(){
            this.$store.dispatch('setAuth');
            this.$store.dispatch('checkAuth');
        }
    }

}

</script>
