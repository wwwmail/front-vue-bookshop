<style>



</style>

<template>

<div class="container main-container">
    <div class="row">
        <div class="col-12">{{infoMessage}}</div>
    </div>

    <div class="row item-list" v-for="(item, index) in orders">
        <div class="col-1"><router-link :to="{ name: 'AdminOrder', params: {id: item.id } }">{{index+1}}</router-link></div>
        <div class="col-1">
           <router-link :to="{ name: 'AdminOrder', params: {id: item.id } }">{{item.user_id}}</router-link>

        </div>
        <div class="col-2">
            {{item.created}}
        </div>
        <div class="col-1">
            {{item.status}}
        </div>
        <div class="col-2">
            <select class="form-control" v-model="item.status">

                <option value="confirmed">confirmed</option>
                <option value="pending">pending</option>
            </select>
            <button class="btn" v-on:click="udateOrder(item)">update</button>
        </div>

        <div class="col-1">
            {{item.payment_id}}
        </div>
        <div class="col-1">
            {{item.total_order}} $
        </div>

        <div class="col-1">
            <button class="btn" v-on:click="deleteorder(item)">
                <icon name="trash-alt"></icon>
            </button>
        </div>
        <div class="col-2">

        </div>

    </div>




</div>

</template>

<script>

export default {
    name: 'Adminorder',
    data() {
        return {
            orders: [],
            order: '',
            selected: [],
            addMessage: '',
            infoMessage: '',
            inputParams: []
        }
    },
    methods: {
        ordersList() {
                let token = localStorage.getItem('user-token') || '';

                this.axios.get(this.$config.API + '/orders').then((response) => {
                    this.orders = response.data;
                    console.log(response);
                });

            },
            udateOrder(item) {
            //  console.log(item); return false;
                    let token = localStorage.getItem('user-token') || '';

                    this.axios(this.$config.API + '/orders', {
                        method: "PUT",
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        },
                        data: {
                            data: item,

                        }
                    }).then((response) => {
                      console.log(response);
                      //  this.getuser();
                    })

            },

            deleteorder(item) {
            //  console.log(id); return false;
              let token = localStorage.getItem('user-token') || '';

              this.axios(this.$config.API + '/orders', {
                  method: "DELETE",
                  headers: {
                      'Authorization': 'Bearer ' + token,
                  },
                  data: {
                      data: item,
                  }
              }).then((response) => {
                this.ordersList();
              })

            },


    },
    computed: {

    },
    created() {
        this.ordersList();
    }

}

</script>
