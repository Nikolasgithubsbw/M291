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
      newProject: {
        CustomerID: 0, // ID des ausgewählten Kunden
        Name: "", // Name des Projekts
      }, 
      Start: "", // Startdatum des Projekts
      End: "", // Enddatum des Projekts
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
        const response = await fetch("https://api-sbw-plc.sbw.media/Studentroleproject");
        if (!response.ok) {
          throw new Error("Fehler beim Laden der Rollen");
        }
        const data = await response.json();
        this.roles = [
          { ID: "PL", Name: "Projektleiter" },
          { ID: "GMA", Name: "Gruppenmitglied" },
          { ID: "TMA", Name: "Teammitglied" },
          { ID: "AMA", Name: "Assistent" }
        ]; // Beispielhafte Rollen, bitte anpassen
      } catch (error) {
        console.error("Fehler beim Laden der Rollen:", error);
      }
    },

    // Speichere das Projekt und die ausgewählten Studenten mit ihren Rollen
    async saveProject() {
      if (!this.projectName) {
        alert("Bitte geben Sie einen Projektnamen ein.");
        return;
      }
      if (!this.selectedCustomer) {
        alert("Bitte wählen Sie einen Kunden aus.");
        return;
      }
      if (this.selectedPersons.length === 0) {
        alert("Bitte wählen Sie mindestens eine Person aus.");
        return;
      }

      try {
        // Speichere das Projekt
        const projectResponse = await fetch("https://api-sbw-plc.sbw.media/Project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: this.projectName,
            CustomerID: this.selectedCustomer,
          }),
        });

        if (!projectResponse.ok) {
          throw new Error("Fehler beim Speichern des Projekts");
        }

        const projectData = await projectResponse.json();
        const projectID = projectData.id; // ID des gespeicherten Projekts

        // Speichere jede Person mit ihrer Rolle im Projekt
        for (const studentID of this.selectedPersons) {
          const roleID = this.selectedRoles[studentID];
          await this.saveProjectStudent(projectID, studentID, roleID);
        }

        alert("Projekt und Zuweisungen erfolgreich gespeichert!");

        // Nach dem Speichern des Projekts auf die Projektübersicht weiterleiten
        window.location.href = "projekte.html"; // Leitet den Benutzer zur Projektübersicht weiter

      } catch (error) {
        console.error("Fehler beim Speichern des Projekts oder der Zuweisungen:", error);
      }
    },

    // Speichere die Studenten-Rollen-Zuweisung im Projekt
    async saveProjectStudent(ProjectID, StudentID, RoleID) {
      try {
        const response = await fetch("https://api-sbw-plc.sbw.media/Studentroleproject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ProjectID,
            StudentID,
            ProjectRoleID: RoleID,
            Start: this.Start,
            End: this.End,
          }),
        });

        if (!response.ok) {
          throw new Error("Fehler beim Speichern der Student-Rollen-Zuweisung");
        }
      } catch (error) {
        console.error("Fehler beim Speichern der Zuweisung:", error);
      }
    },

    // Umschalten des Personen-Dropdowns
    togglePersonDropdown() {
      this.showPersonDropdown = !this.showPersonDropdown;
    },
  },

  mounted() {
    this.loadCustomers();
    this.loadPersons();
    this.loadRoles();
  }
});

appErfassen.mount("#app-erfassen");
