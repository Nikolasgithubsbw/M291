const app = Vue.createApp({
    data() {
        return {
            projects: [],
            persons: [],
        };
    },
    methods: {
        async loadProjects() {
            try {
                const response = await fetch('http://api-sbw-plc.sbw.media/Project');
                const data = await response.json();
                this.projects = data.resources.map(project => ({
                    ...project,
                    showDetails: false,  // Projekt-Details anzeigen/ausblendend
                }));
            } catch (error) {
                console.error("Fehler beim Laden der Projekte:", error);
            }
        },
        async loadPersons() {
            try {
                const response = await fetch('http://api-sbw-plc.sbw.media/Student');
                const data = await response.json();
                this.persons = data.resources;
            } catch (error) {
                console.error("Fehler beim Laden der Personen:", error);
            }
        },
        toggleDetails(projectId) {
            const project = this.projects.find(p => p.id === projectId);
            project.showDetails = !project.showDetails;
        },
        async assignPerson(event, projectId) {
            const personId = event.target.value;
            const project = this.projects.find(p => p.id === projectId);
            const person = this.persons.find(p => p
