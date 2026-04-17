import { createApp } from 'vue'
import App from './App.vue'
import FtEditor from '../index'
import '../styles/index.css'

const app = createApp(App)
app.use(FtEditor)

app.mount('#app')
