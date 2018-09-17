

<template>
  <router-link to="/cart">
  <a class="float-right">
    <icon name="shopping-cart"></icon> {{cartItems}}
  </a>
  </router-link>
</template>
<script>

export default {
    name: 'headerCart',
    data() {
        return {
            items: 0,
        }
    },
    methods: {

    },
    computed:{
      cartItems(){
        return this.$store.state.cartItems;
      }
    }

}

</script>
