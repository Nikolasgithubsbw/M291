document.addEventListener("DOMContentLoaded", function() {
    // API Endpoints
    const projectApi = "http://api-sbw-plc.sbw.media/Project";
    const taskApi = "http://api-sbw-plc.sbw.media/Projectrole";
    const customerApi = "http://api-sbw-plc.sbw.media/Customer";

    // Dropdowns
    const projectSelect = document.querySelector('.project-select');
    const taskSelect = document.querySelector('.task-select');
    
    // Funktion zum Laden von Projekten
    function loadProjects() {
        fetch(projectApi)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Fehler beim Abrufen der Projekte: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                data.forEach(project => {
                    const option = document.createElement('option');
                    option.value = project.id;
                    option.textContent = project.name;
                    projectSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Fehler beim Abrufen der Projekte:', error));
    }

    // Funktion zum Laden von Tätigkeiten (Task)
    function loadTasks() {
        fetch(taskApi)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Fehler beim Abrufen der Tätigkeiten: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                data.forEach(task => {
                    const option = document.createElement('option');
                    option.value = task.id;
                    option.textContent = task.roleName;
                    taskSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Fehler beim Abrufen der Tätigkeiten:', error));
    }

    // Funktion zum Speichern der Zeiterfassung
    const saveBtn = document.querySelector('.save-btn');
    saveBtn.addEventListener('click', function() {
        const project = projectSelect.value;
        const task = taskSelect.value;
        const time = document.querySelector('.time-input input').value;
        const description = document.querySelector('.description').value;

        if (project && task && time) {
            console.log(`Projekt: ${project}, Tätigkeit: ${task}, Zeit: ${time}, Beschreibung: ${description}`);
            alert('Zeiterfassung gespeichert!');
        } else {
            alert('Bitte alle Pflichtfelder ausfüllen.');
        }
    });

    // Initiales Laden der Daten
    loadProjects();
    loadTasks();
});
