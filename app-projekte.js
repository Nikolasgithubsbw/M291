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
                    showDetails: false,
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
            if (project) {
                project.showDetails = !project.showDetails;
            }
        },
        async assignPerson(event, projectId) {
            const personId = event.target.value;
            const project = this.projects.find(p => p.id === projectId);
            const person = this.persons.find(p => p.id === personId);

            if (project && person) {
                project.assignedPersons = project.assignedPersons || [];
                project.assignedPersons.push(person);
                // API-Aufruf für das Hinzufügen der Person zum Projekt
            }
        },
        async saveProject(project) {
            // Funktion zum Speichern eines Projekts nach Bearbeitung
            console.log("Projekt gespeichert", project);
        }
    }
});
