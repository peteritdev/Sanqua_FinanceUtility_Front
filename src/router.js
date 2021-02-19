import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/logout',
      component: () => import('@/views/Login'),
    },
    {
      path: '/',
      component: () => import('@/views/Login'),
    },
    {
      path: '/admin',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'Vendor',
          path: 'pages/vendor',
          component: () => import('@/views/vendor/VendorList'),
        },
        {
          name: 'Vendor Form',
          path: 'pages/vendor/form',
          component: () => import('@/views/vendor/SaveVendorForm'),
        },
        {
          name: 'Vendor Form',
          path: 'pages/vendor/form/id/:id',
          component: () => import('@/views/vendor/SaveVendorForm'),
        },
        {
          name: 'Upload Vendor',
          path: 'pages/vendor/upload',
          component: () => import('@/views/vendor/UploadVendorForm'),
        },
        {
          name: 'Invoice',
          path: 'pages/invoice',
          component: () => import('@/views/invoice/InvoiceList'),
        },
        {
          name: 'Upload Invoice',
          path: 'pages/invoice/upload',
          component: () => import('@/views/invoice/UploadInvoiceForm'),
        },
        {
          name: 'Payment Request Form',
          path: 'pages/paymentrequest/form',
          component: () => import('@/views/paymentrequest/PayReqForm'),
        },
        {
          name: 'Payment Request',
          path: 'pages/paymentrequest/list',
          component: () => import('@/views/paymentrequest/PayReqList'),
        },
        {
          name: 'Payment Request Form',
          path: 'pages/paymentrequest/form/id/:id',
          component: () => import('@/views/paymentrequest/PayReqForm'),
        },
        {
          name: 'Currency',
          path: 'pages/currency',
          component: () => import('@/views/currency/CurrencyList'),
        },
        {
          name: 'Currency Form',
          path: 'pages/currency/form',
          component: () => import('@/views/currency/CurrencyForm'),
        },
        {
          name: 'Currency Form',
          path: 'pages/currency/form/id/:id',
          component: () => import('@/views/currency/CurrencyForm'),
        },
      ],
    },
  ],
})
