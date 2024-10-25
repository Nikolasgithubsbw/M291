const appErfassen = Vue.createApp({
  data() {
    return {
      projectName: "", // Name des neuen Projekts
      selectedCustomer: "", // Ausgewählter Kunde
      selectedPersons: [], // Ausgewählte Personen (Mehrfachauswahl)
      customers: [], // Liste der Kunden
      persons: [], // Liste der Personen (Studenten)
      roles: [], // Liste der Rollen
      selectedRoles: {}, // Rollen für ausgewählte Personen
      personSearch: "", // Suchbegriff für die Personenliste
      showPersonDropdown: false, // Kontrolliert, ob das Personen-Dropdown angezeigt wird
      projectStudent: {
        StudentID: 0,
        ProjectID: 0,
        Start: "2024-10-25",
        ProjectRoleID: "",
        End: "2024-10-26",
      },
      newProject: {
        ParentID: 0,
        Number: "",
        Name: "",
        Description: "",
        TypeID: 0,
        CustomerID: 0,
        Coach: "",
        Status: 0,
      },
    };
  },
  computed: {
    // Gefilterte Liste der Personen basierend auf dem Suchbegriff
    filteredPersons() {
      if (this.personSearch.trim() === "") {
        return this.persons;
      }
      return this.persons.filter((person) =>
        person.fullname.toLowerCase().includes(this.personSearch.toLowerCase())
      );
    },
  },
  methods: {
    // Lade die Liste der Kunden von der API
    async loadCustomers() {
      try {
        const response = await fetch("https://api-sbw-plc.sbw.media/Customer");
        if (!response.ok) {
          throw new Error("Fehler beim Laden der Kunden");
        }
        const data = await response.json();
        this.customers = data.resources || [];
      } catch (error) {
        console.error("Fehler beim Laden der Kunden:", error);
      }
    },

    // Lade die Liste der Studenten (Personen) von der API
    async loadPersons() {
      try {
        const response = await fetch("https://api-sbw-plc.sbw.media/Student");
        if (!response.ok) {
          throw new Error("Fehler beim Laden der Personen");
        }
        const data = await response.json();
        this.persons = data.resources || [];
      } catch (error) {
        console.error("Fehler beim Laden der Personen:", error);
      }
    },

    // Lade die Liste der Rollen von der API
    async loadRoles() {
      try {
        const response = await fetch("https://api-sbw-plc.sbw.media/Projectrole");
        if (!response.ok) {
          throw new Error("Fehler beim Laden der Rollen");
        }
        const data = await response.json();
        this.roles = data.resources || [];
        // this.roles = [
        //   { ID: "PL", Name: "Projektleiter" },
        //   { ID: "GMA", Name: "Gruppenmitglied" },
        //   { ID: "TMA", Name: "Teammitglied" },
        //   { ID: "AMA", Name: "Assistent" }
        // ]; // Beispielhafte Rollen, bitte anpassen
      } catch (error) {
        console.error("Fehler beim Laden der Rollen:", error);
      }
    },

    // Speichere das Projekt und die ausgewählten Studenten mit ihren Rollen
    async saveProject() {
      // Validierung des Projektnamens
      if (this.projectName.trim() === "") {
        alert("Bitte geben Sie einen Projektnamen ein.");
        return;
      }
      this.newProject.Name = this.projectName; // Setzen des Projektnummers
      this.newProject.Number = ""; // Reset des Projektnummer
      this.newProject.CustomerID = this.selectedCustomer; // Setzen des Kunden-IDs
      this.newProject.Coach = ""; // Reset des Coaches
      this.newProject.Status = 0; // Reset des Status
      const URL = "https://api-sbw-plc.sbw.media/Project";
      const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(this.newProject),
        });
      if (!response.ok) {
          throw new Error("Fehler beim Speichern des Projekts");
        }
      console.log("Projekt gespeichert");
      const data = await response.json();
      const ProjectID = data.id; // Speichern des Projekt-IDs
      this.selectedPersons.forEach((StudentID) => {
        this.saveProjectStudent(ProjectID, StudentID); // Speichern des Projekt-Student-BeziehungsProjectStudent(ProjectID); // Speichern des Projekt-Student-Beziehungs
      });
    },
    async saveProjectStudent(ProjectID, StudentID) {
      this.projectStudent.ProjectID = ProjectID;
      this.projectStudent.StudentID = StudentID;
      const URL = "https://api-sbw-plc.sbw.media/Studentroleproject";
      const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(this.projectStudent),
      });
      if (!response.ok) {
        throw new Error("Fehler beim Speichern des Projekts");
      }
      console.log("Projekt gespeichert");
      this.projectName = ""; // Reset des Projektnamens
      this.selectedCustomer = ""; // Reset des ausgewählten Kunden
      this.selectedPersons = []; // Reset der ausgewählten Personen
    },

    // Umschalten des Personen-Dropdowns
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
      if (
        this.projectName === "" ||
        this.selectedCustomer === "" ||
        this.selectedPersons.length === 0
      ) {
        alert("Bitte füllen Sie alle Felder aus.");
        return;
      }
      console.log("Projektname:", this.projectName);
      console.log("Ausgewählter Kunde:", this.selectedCustomer);
      console.log("Zugewiesene Personen:", this.selectedPersons);
      // Hier kannst du die Logik für das Speichern des Projekts an den Server einfügen
    },
  },
  mounted() {
    this.loadCustomers(); // Kunden beim Laden der Seite erfassen.html laden
    this.loadPersons(); // Personen beim Laden der Seite erfassen.html laden
    this.loadRoles(); // Rollen beim Laden der Seite erfassen.html laden
    document.addEventListener("click", this.closePersonDropdown); // Event-Listener zum Schließen des Dropdowns bei Klick außerhalb
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closePersonDropdown); // Entferne den Event-Listener beim Unmounten der Komponente
  },
});

appErfassen.mount("#app-erfassen");
