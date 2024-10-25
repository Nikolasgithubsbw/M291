const appProjekte = Vue.createApp({
    data() {
        return {
            projects: [],
            editDropdownVisible: null
        };
    },
    methods: {
        async loadProjects() {
            try {
                const response = await fetch('https://api-sbw-plc.sbw.media/Project');
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen der Projekte');
                }
                const data = await response.json();
                this.projects = data.resources || [];
            } catch (error) {
                console.error("Fehler beim Laden der Projekte:", error);
            }
        },
        toggleEditDropdown(projectId) {
            this.editDropdownVisible = this.editDropdownVisible === projectId ? null : projectId;
        },
        async saveProject(project) {
            try {
                console.log("Projekt speichern:", project);
                const response = await fetch(`https://api-sbw-plc.sbw.media/Project/${project.ID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(project)
                });
                if (!response.ok) {
                    throw new Error('Fehler beim Speichern des Projekts');
                }
                alert('Projekt erfolgreich gespeichert');
            } catch (error) {
                console.error("Fehler beim Speichern des Projekts:", error);
            }
        }
    },
    mounted() {
        this.loadProjects();
    }
});

appProjekte.mount('#app-projekte');
