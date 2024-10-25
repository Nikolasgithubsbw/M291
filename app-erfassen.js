const appErfassen = Vue.createApp({
    data() {
        return {
            projectName: '',  // Name des neuen Projekts
            selectedCustomer: '',  // Ausgewählter Kunde
            selectedPersons: [],  // Ausgewählte Personen (Mehrfachauswahl)
            customers: [],  // Liste der Kunden
            persons: [],  // Liste der Personen
            personSearch: '',  // Suchbegriff für die Personenliste
            showPersonDropdown: false  // Kontrolliert, ob das Personen-Dropdown angezeigt wird
        };
    },
    computed: {
        // Gefilterte Liste der Personen basierend auf dem Suchbegriff
        filteredPersons() {
            if (this.personSearch.trim() === '') {
                return this.persons;
            }
            return this.persons.filter(person =>
                person.fullname.toLowerCase().includes(this.personSearch.toLowerCase())
            );
        }
    },
    methods: {
        // Methode zum Laden der Kunden von der API
        async loadCustomers() {
            try {
                const response = await fetch('https://api-sbw-plc.sbw.media/Customer');  // URL der API für Kunden (HTTPS)
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen der Kunden');
                }
                const data = await response.json();
                this.customers = data.resources || [];  // Kunden in den Array einfügen, falls vorhanden
                console.log("Kunden geladen:", this.customers);
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
                this.persons = data.resources || [];  // Personen in den Array einfügen, falls vorhanden
                console.log("Personen geladen:", this.persons);
            } catch (error) {
                console.error("Fehler beim Laden der Personen:", error);
            }
        },
        // Methode zum Umschalten des Personen-Dropdowns
        togglePersonDropdown() {
            this.showPersonDropdown = !this.showPersonDropdown;
        },
        // Methode zum Schließen des Personen-Dropdowns
        closePersonDropdown(event) {
            // Wenn der Klick außerhalb der Dropdown-Komponente erfolgt, schließe das Dropdown
            if (!this.$refs.personDropdown.contains(event.target)) {
                this.showPersonDropdown = false;
            }
        },
        // Methode zum Übermitteln des Formulars
        submitProject() {
            if (this.projectName === '' || this.selectedCustomer === '' || this.selectedPersons.length === 0) {
                alert("Bitte füllen Sie alle Felder aus.");
                return;
            }
            console.log("Projektname:", this.projectName);
            console.log("Ausgewählter Kunde:", this.selectedCustomer);
            console.log("Zugewiesene Personen:", this.selectedPersons);
            // Hier kannst du die Logik für das Speichern des Projekts an den Server einfügen
        }
    },
    mounted() {
        this.loadCustomers();  // Kunden beim Laden der Seite erfassen.html laden
        this.loadPersons();  // Personen beim Laden der Seite erfassen.html laden
        document.addEventListener('click', this.closePersonDropdown);  // Event-Listener zum Schließen des Dropdowns bei Klick außerhalb
    },
    beforeUnmount() {
        document.removeEventListener('click', this.closePersonDropdown);  // Entferne den Event-Listener beim Unmounten der Komponente
    }
});

appErfassen.mount('#app-erfassen');
