const app = Vue.createApp({
    data() {
        return {
            projectName: '',  // Für den Projektnamen
            selectedCustomer: '',  // Ausgewählter Kunde
            selectedPerson: '',  // Ausgewählte Person
            selectedProject: '',  // Ausgewähltes Projekt
            customers: [],  // Liste der Kunden
            persons: [],  // Liste der Personen
            projects: []  // Liste der Projekte
        };
    },
    methods: {
        // Methode zum Laden der Kunden von der API
        async loadCustomers() {
            try {
                const response = await fetch('https://api-sbw-plc.sbw.media/Customer');  // URL der API für Kunden
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen der Kunden');
                }
                const data = await response.json();
                this.customers = data.resources;  // Daten den Kunden-Array zuweisen
            } catch (error) {
                console.error("Fehler beim Laden der Kunden:", error);
            }
        },
        // Methode zum Laden der Personen von der API
        async loadPersons() {
            try {
                const response = await fetch('https://api-sbw-plc.sbw.media/Student');  // URL der API für Personen
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen der Personen');
                }
                const data = await response.json();
                this.persons = data.resources;  // Daten den Personen-Array zuweisen
            } catch (error) {
                console.error("Fehler beim Laden der Personen:", error);
            }
        },
        // Methode zum Laden der Projekte von der API
        async loadProjects() {
            try {
                const response = await fetch('https://api-sbw-plc.sbw.media/Project');  // URL der API für Projekte
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen der Projekte');
                }
                const data = await response.json();
                this.projects = data.resources;  // Projekte in den Array einfügen
            } catch (error) {
                console.error("Fehler beim Laden der Projekte:", error);
            }
        },
        // Methode zum Übermitteln des Formulars
        submitForm() {
            if (this.selectedCustomer === '' || this.selectedPerson === '' || this.selectedProject === '' || this.projectName === '') {
                alert("Bitte füllen Sie alle Felder aus.");
                return;
            }
            console.log("Projektname:", this.projectName);
            console.log("Ausgewählter Kunde:", this.selectedCustomer);
            console.log("Ausgewählte Person:", this.selectedPerson);
            console.log("Ausgewähltes Projekt:", this.selectedProject);
        }
    },
    mounted() {
        this.loadCustomers();  // Kunden beim Laden der App laden
        this.loadPersons();  // Personen beim Laden der App laden
        this.loadProjects();  // Projekte beim Laden der App laden
    }
});

app.mount('#app');
