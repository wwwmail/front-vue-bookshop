

<template>

<div class="container main-container">

    <div class="row b-b">
      <div class="col-10">
      <span v-if="infoMessage">{{infoMessage}}</span>
      </div>
      <div class="col-2">Your personal discount is {{userDiscount}} %</div>
    </div>

    <div class="row b-b">
        <div class="col-3">
            title book
        </div>
        <div class="col-2">
            price
        </div>
        <div class="col-1">
          discount
        </div>

        <div class="col-3">
            add, substract
        </div>
        <div class="col-1">
            delete
        </div>
        <div class="col-2">
            price by book(s)
        </div>
    </div>

    <div class="row b-b" v-for="item in cart">
        <div class="col-3">
            {{item.title}}
        </div>
        <div class="col-2">
            {{item.price}}
        </div>
        <div class="col-1">
          {{item.discount}} %
        </div>
        <div class="col-3">

            <span v-on:click="subtractCountBook(item.bookId, item.count)" class="float-left minus">
                -
            </span> <span class="float-left">{{item.count}}</span>

            <span v-on:click="addCountBook(item.bookId, item.count)" class="float-left plus">
                +
            </span>
        </div>
        <div class="col-1">
            <p v-on:click="deleteFromCart(item.bookId)">
                <icon name="trash-alt"></icon>
            </p>
        </div>

        <div class="col-2">
            {{subCount(item.price, item.count, item.discount)}}
        </div>
    </div>

    <div class="row b-b">
        <div class="col-8">
        </div>
        <div class="col-2"> Total: {{total}}</div>
        <div class="col-2">With personal discout: {{totalWithPersonalDiscount}}</div>
    </div>

    <div class="row">
      <div class="col-8">
      <p>Payments type:</p>
      <select v-model="selected" >
        <option v-for="option in payments" v-bind:value="option.id">{{option.type}}</option>
      </select>
    </div>
    <div class="col-4">
      <button class="btn btn-primary" v-on:click="createOrder">Create order</button>
    </div>
    </div>
</div>

</template>

<script>

export default {
    name: 'Cart',
    data() {
        return {
            cart: [],
            totalCount: 0,
            userDiscount:0,
            payments: [],
            selected: '',
            infoMessage: '',
            booksId:[],
        }
    },
    methods: {
      createOrder(){
        if(!this.selected){
          this.infoMessage = 'Please select payment type';
          return false;
        }
        this.infoMessage = '';
        let id = 333333;
        let token = localStorage.getItem('user-token') || '';

         let booksIds = this.getBookIds();
         this.axios(this.$config.API + '/orders', {
                method: "POST",
                 headers: {'Authorization': 'Bearer ' + token,},
                 data: {
                   books: this.cart,
                  //books:booksIds,
                   payment: this.selected
                 }
             }).then((response) => {


               if(response.data.success == 'true'){
                 this.infoMessage = response.data.message;
                 this.cart = [];
                 this.totalCount = 0;
                 this.$store.dispatch('setEmptyCounters');
                 //commit('set', {type: 'isAuth', items: true});
               }

         })

      },
        getCart() {
                let token = localStorage.getItem('user-token') || '';

                this.axios.get(this.$config.API + '/cart', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }).then((response) => {
                  if(response.data.cartItems){
                    this.userDiscount = response.data.userDiscount;
                    return this.cart = response.data.cartItems;
                  }
                })
            },

            getBookIds(){
              let ids = [];
              let arr = this.cart;

              arr.forEach(function(item, i, arr) {
                ids[i]= { 'id':item.bookId},{'count':item.count};

              });

                return ids;
            },

            addCountBook(bookId, count) {
                let countitems = ++count;
                let token = localStorage.getItem('user-token') || '';

                this.axios(this.$config.API + '/cart', {
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {
                        book_id: bookId,
                        count: countitems
                    }
                }).then((response) => {
                    this.getCart();

                })
            },

            subtractCountBook(bookId, count) {
                if (count == 1) {
                    return false;
                }
                let countitems = --count;
                let token = localStorage.getItem('user-token') || '';

                this.axios(this.$config.API + '/cart', {
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {
                        book_id: bookId,
                        count: countitems
                    }
                }).then((response) => {
                    this.getCart();
                })
            },

            deleteFromCart(bookId) {
                let token = localStorage.getItem('user-token') || '';

                this.axios(this.$config.API + '/cart', {
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {
                        book_id: bookId,
                    }
                }).then((response) => {
                    this.subCounter();
                    this.getCart();
                })
            },

            subCount(price, count, discount) {
                return (price - (price * (discount / 100))) * count;
            },

            subCounter(){
              this.$store.dispatch('subCountCartItems');

            },

            getPayments(){

                this.axios.get(this.$config.API + '/payments').then((response) => {

                    this.payments = response.data;
              })

            }
    },
    computed: {
        cartItems() {
                return this.$store.state.cartItems;
            },
            total() {
                return  this.cart.reduce((total, i) => {
                    //return total + i.price * i.count
                    return total + (i.price - (i.price * (i.discount / 100))) * i.count
                }, 0)
            },

            totalWithPersonalDiscount(){

                  let totalPriceByBook =  this.cart.reduce((total, i) => {
                      //return total + i.price * i.count
                      return total + (i.price - (i.price * (i.discount / 100))) * i.count
                  }, 0) ;

                  let totalWithPersonalDiscount = totalPriceByBook - (totalPriceByBook * (this.userDiscount / 100));

                  return Math.floor(totalWithPersonalDiscount);

            },





    },
    created() {
        this.getCart();
        this.getPayments();
    }

}

</script>
