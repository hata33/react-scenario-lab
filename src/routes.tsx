import { lazy } from 'react'
import App from './App.tsx'

// 懒加载页面
const Home = lazy(() => import('./pages/Home.tsx'))

const Basic_Counter = lazy(() => import('./pages/Basic/Counter.tsx'))
const Basic_TodoList = lazy(() => import('./pages/Basic/TodoList.tsx'))

const Forms_BasicForm = lazy(() => import('./pages/Forms/BasicForm.tsx'))
const Forms_StepForm = lazy(() => import('./pages/Forms/StepForm.tsx'))
const Forms_FormValidation = lazy(() => import('./pages/Forms/FormValidation.tsx'))

const Data_Table = lazy(() => import('./pages/Data/Table.tsx'))
const Data_SearchFilter = lazy(() => import('./pages/Data/SearchFilter'))

const Charts_BarChart = lazy(() => import('./pages/Charts/BarChart'))
const Charts_LineChart = lazy(() => import('./pages/Charts/LineChart'))
const Charts_PieChart = lazy(() => import('./pages/Charts/PieChart'))

const Files_FileUpload = lazy(() => import('./pages/Files/FileUpload'))
const Files_FilePreview = lazy(() => import('./pages/Files/FilePreview'))

const Map_MapMarkers = lazy(() => import('./pages/Map/MapMarkers'))
const Map_RoutePlanner = lazy(() => import('./pages/Map/RoutePlanner'))

const Animation_PageTransition = lazy(() => import('./pages/Animation/PageTransition'))
const Animation_ElementAnimation = lazy(() => import('./pages/Animation/ElementAnimation'))
const Animation_DragDrop = lazy(() => import('./pages/Animation/DragDrop'))

const Chat_ChatRoom = lazy(() => import('./pages/Chat/ChatRoom'))

const Auth_Login = lazy(() => import('./pages/Auth/Login'))
const Auth_Register = lazy(() => import('./pages/Auth/Register'))
const Auth_RouteGuard = lazy(() => import('./pages/Auth/RouteGuard'))

const Other_I18n = lazy(() => import('./pages/Other/I18n'))
const Other_ThemeToggle = lazy(() => import('./pages/Other/ThemeToggle'))
const Other_RichText = lazy(() => import('./pages/Other/RichText'))
const Other_Notifications = lazy(() => import('./pages/Other/Notifications'))
const Other_Payment = lazy(() => import('./pages/Other/Payment'))

const Performance_VirtualList = lazy(() => import('./pages/Performance/VirtualList'))

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home />, meta: { title: 'Home' } },
      {
        path: 'basic',
        meta: { title: '基础' },
        children: [
          { path: 'counter', element: <Basic_Counter />, meta: { title: 'Counter 计数器' } },
          { path: 'todolist', element: <Basic_TodoList />, meta: { title: 'TodoList 待办' } },
        ],
      },
      {
        path: 'forms',
        meta: { title: '表单' },
        children: [
          { path: 'basic', element: <Forms_BasicForm />, meta: { title: '基础表单' } },
          { path: 'step', element: <Forms_StepForm />, meta: { title: '分步表单' } },
          { path: 'validation', element: <Forms_FormValidation />, meta: { title: '表单校验' } },
        ],
      },
      {
        path: 'data',
        meta: { title: '数据' },
        children: [
          { path: 'table', element: <Data_Table />, meta: { title: '表格' } },
          { path: 'search-filter', element: <Data_SearchFilter />, meta: { title: '搜索/筛选' } },
        ],
      },
      {
        path: 'charts',
        meta: { title: '图表' },
        children: [
          { path: 'bar', element: <Charts_BarChart />, meta: { title: '柱状图' } },
          { path: 'line', element: <Charts_LineChart />, meta: { title: '折线图' } },
          { path: 'pie', element: <Charts_PieChart />, meta: { title: '饼图' } },
        ],
      },
      {
        path: 'files',
        meta: { title: '文件' },
        children: [
          { path: 'upload', element: <Files_FileUpload />, meta: { title: '文件上传' } },
          { path: 'preview', element: <Files_FilePreview />, meta: { title: '文件预览' } },
        ],
      },
      {
        path: 'map',
        meta: { title: '地图' },
        children: [
          { path: 'markers', element: <Map_MapMarkers />, meta: { title: '点标注' } },
          { path: 'route-planner', element: <Map_RoutePlanner />, meta: { title: '路径规划' } },
        ],
      },
      {
        path: 'animation',
        meta: { title: '动画/交互' },
        children: [
          { path: 'page-transition', element: <Animation_PageTransition />, meta: { title: '页面过渡' } },
          { path: 'element', element: <Animation_ElementAnimation />, meta: { title: '元素动画' } },
          { path: 'drag-drop', element: <Animation_DragDrop />, meta: { title: '拖拽' } },
        ],
      },
      {
        path: 'chat',
        meta: { title: '实时通信' },
        children: [
          { path: 'room', element: <Chat_ChatRoom />, meta: { title: '聊天室(WebSocket)' } },
        ],
      },
      {
        path: 'auth',
        meta: { title: '认证' },
        children: [
          { path: 'login', element: <Auth_Login />, meta: { title: '登录' } },
          { path: 'register', element: <Auth_Register />, meta: { title: '注册' } },
          { path: 'guard', element: <Auth_RouteGuard />, meta: { title: '路由守卫' } },
        ],
      },
      {
        path: 'other',
        meta: { title: '其他' },
        children: [
          { path: 'i18n', element: <Other_I18n />, meta: { title: '国际化' } },
          { path: 'theme', element: <Other_ThemeToggle />, meta: { title: '主题切换' } },
          { path: 'richtext', element: <Other_RichText />, meta: { title: '富文本' } },
          { path: 'notifications', element: <Other_Notifications />, meta: { title: '通知' } },
          { path: 'payment', element: <Other_Payment />, meta: { title: '支付' } },
        ],
      },
      {
        path: 'performance',
        meta: { title: '性能' },
        children: [
          { path: 'virtual-list', element: <Performance_VirtualList />, meta: { title: '虚拟列表' } },
        ],
      },
    ],
  },
]

export default routes


