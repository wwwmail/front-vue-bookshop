import Vue from 'vue'
import store from './../store'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainApp from '@/components/MainApp'
import SignUp from '@/components/SignUp'
import Login from '@/components/Login'
import Cart from '@/components/Cart'
import Book from '@/components/Book'
import AdminApp from '@/components/admin/AdminApp'
import AdminGenre from '@/components/admin/AdminGenre'
import AdminAuthor from '@/components/admin/AdminAuthor'
import AdminBooks from '@/components/admin/AdminBooks'
import AdminBook from '@/components/admin/AdminBook'
import AdminBookAdd from '@/components/admin/AdminBookAdd'
import AdminUsers from '@/components/admin/AdminUsers'
import AdminUser from '@/components/admin/AdminUser'
import AdminOrders from '@/components/admin/AdminOrders'
import AdminOrder from '@/components/admin/AdminOrder'
import App from '@/App'
Vue.use(Router)


  const routes = [
    {
      path: '/',
      name: 'MainApp',
      component: MainApp
    },
    {
      path: '/books/:id',
      name: 'Book',
      component: Book
    },

    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },

    {
      path: '/admin',
      name: 'AdminApp',
      component: AdminApp,
      meta: {
                requiresAuth: true,
                is_admin : true
            }
    },

    {
      path: '/admin/genre',
      name: 'AdminGenre',
      component: AdminGenre,
      meta: {
                requiresAuth: true,
                is_admin : true
            }
    },
    {
      path: '/admin/author',
      name: 'AdminAuthor',
      component: AdminAuthor,
      meta: {
                requiresAuth: true,
                is_admin : true
            }
    },

    {
      path: '/admin/books',
      name: 'AdminBooks',
      component: AdminBooks,
      meta: {
                requiresAuth: true,
                is_admin : true
            }
    },
    {
      path: '/admin/books/:id',
      name: 'AdminBook',
      component: AdminBook,
      meta: {
                requiresAuth: true,
                is_admin : true
            }
    },

    {
      path: '/admin/book/add',
      name: 'AdminBookAdd',
      component: AdminBookAdd,
      meta: {
                requiresAuth: true,
                is_admin : true
            }
    },

    {
      path: '/admin/users',
      name: 'AdminUsers',
      component: AdminUsers,
      meta: {
                requiresAuth: true,
                is_admin : true
            }
    },

    {
      path: '/admin/user/:id',
      name: 'AdminUser',
      component: AdminUser,
      meta: {
                requiresAuth: true,
                is_admin : true
            }
    },

    {
      path: '/admin/orders',
      name: 'AdminOrders',
      component: AdminOrders,
      meta: {
                requiresAuth: true,
                is_admin : true
            }
    },

    {
      path: '/admin/order/:id',
      name: 'AdminOrder',
      component: AdminOrder,
      meta: {
                // requiresAuth: true,
                // is_admin : true
            }
    },



    {
      path: '/hi',
      name: 'HelloWorld',
      component: HelloWorld
    },
  ]


const router = new Router({routes})

router.beforeEach((to, from, next) => {
  if(to.meta.is_admin) {
    if(to.meta.is_admin) {

      const authUser =  store.state.isAdmin;
      if(authUser) {
        next()
      }else {
        next('/login')
      }
    }
  }else {
    next()
  }
})


export default router;
