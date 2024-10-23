document.addEventListener("DOMContentLoaded", function() {
    // Fetch and populate projects from API
    fetch('http://api-sbw-plc.sbw.media/Project')
        .then(response => response.json())
        .then(data => {
            const projectSelect = document.querySelector('.project-select');
            data.forEach(project => {
                const option = document.createElement('option');
                option.value = project.id;
                option.textContent = project.name;
                projectSelect.appendChild(option);
            });
        });

    // Fetch and populate tasks (assuming tasks are part of the project, modify this accordingly)
    fetch('http://api-sbw-plc.sbw.media/Projectrole')
        .then(response => response.json())
        .then(data => {
            const taskSelect = document.querySelector('.task-select');
            data.forEach(task => {
                const option = document.createElement('option');
                option.value = task.id;
                option.textContent = task.name;
                taskSelect.appendChild(option);
            });
        });

    // Function to save time entry
    const saveBtn = document.querySelector('.save-btn');
    saveBtn.addEventListener('click', function() {
        const project = document.querySelector('.project-select').value;
        const task = document.querySelector('.task-select').value;
        const time = document.querySelector('.time-input input').value;
        const description = document.querySelector('.description').value;

        if (project && task && time) {
            // Data to be sent to the API
            const timeEntry = {
                project_id: project,
                task_id: task,
                time_spent: time,
                description: description
            };

            fetch('http://api-sbw-plc.sbw.media/TimeEntry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(timeEntry),
            })
            .then(response => response.json())
            .then(data => {
                alert('Zeiterfassung gespeichert!');
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            alert('Bitte alle Pflichtfelder ausfüllen.');
        }
    });

    // Handling adding new project
    const addProjectBtn = document.querySelector('.add-project-btn');
    addProjectBtn.addEventListener('click', function() {
        const projectName = prompt('Bitte geben Sie den Projektnamen ein:');
        if (projectName) {
            fetch('http://api-sbw-plc.sbw.media/Project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: projectName }),
            })
            .then(response => response.json())
            .then(data => {
                alert('Projekt erfolgreich hinzugefügt!');
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });
});
