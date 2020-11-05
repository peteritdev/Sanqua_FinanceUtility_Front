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
          name: 'Report Daily Attendance',
          path: 'pages/report/daily_attendance',
          component: () => import('@/views/dashboard/pages/report/ReportDailyAttendance'),
        },
        {
          name: 'Report Access Door',
          path: 'pages/report/access_door',
          component: () => import('@/views/dashboard/pages/report/ReportAccessDoor'),
        },
        {
          name: 'Report Attendance Device',
          path: 'pages/report/attendance_device',
          component: () => import('@/views/dashboard/pages/report/ReportAttendanceDevice'),
        },
        {
          name: 'User List',
          path: 'pages/user/list',
          component: () => import('@/views/dashboard/pages/user/UserList'),
        },
        /* {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
        }, */
      ],
    },
  ],
})
