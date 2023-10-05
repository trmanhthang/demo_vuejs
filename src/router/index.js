import Home from "@/components/Home.vue";
import Create from "@/components/Create.vue";
import Edit from "@/components/Edit.vue";
import {createRouter, createWebHistory} from "vue-router";
import Detail from "@/components/Detail.vue";


const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/create",
        component: Create
    },
    {
        path: "/edit/:id",
        component: Edit
    },
    {
        path: "/detail/:id",
        component: Detail
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
