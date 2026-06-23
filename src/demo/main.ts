import { createApp } from 'vue'
import App from './App.vue'
import AiEditor from '../index'
import '../styles/index.css'

const app = createApp(App)
app.use(AiEditor)

app.mount('#app')
