import { mount } from 'svelte'
import './styles/app.css'
import App from './App.svelte'

const target = document.getElementById('app');
if (!target) throw new Error('Element #app introuvable');

const app = mount(App, {
  target: target,
})

export default app
