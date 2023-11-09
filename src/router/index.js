import {createRouter, createWebHashHistory} from "vue-router";
import Details from "@/views/Details.vue";
import Forecast from "@/views/Forecast.vue";
import CurrentLocation from "@/views/CurrentLocation.vue";

const routes = [
    {path: '/', name: 'Now', component: CurrentLocation, props: true},
    {path: '/details', name: 'Details', component: Details},
    {path: '/forecast', name: 'Forecast', component: Forecast}
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;