const app = Vue.createApp({
    data() {
        return {
            projects: [],
            persons: [],
            projectName: '',
            selectedCustomer: '',
            StudentId: '',
            customers: [],  // Kunden hinzufügen, falls benötigt
            students: []  // Personen hinzufügen, falls benötigt
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
        submitForm() {
            // Hier wird die Logik zur Formularübergabe implementiert
            console.log('Projektname:', this.projectName);
            console.log('Ausgewählter Kunde:', this.selectedCustomer);
            console.log('Zugewiesene Person:', this.StudentId);
        }
    },
    mounted() {
        this.loadProjects();
        this.loadPersons();
    }
});

app.mount('#appp');
