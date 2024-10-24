const app = Vue.createApp({
    data() {
        return {
            projects: [],
            projectId: 0
        }
    },
    methods: {
        async loadProjects() {
            const url = "https://api-sbw-plc.sbw.media/Project";
            const response = await fetch(url);
            const data = await response.json();
            this.projects = data.resources;
        }
    },
    mounted() {
        this.loadProjects();
    }, 
}).mount('#app');
