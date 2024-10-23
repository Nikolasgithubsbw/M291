document.addEventListener("DOMContentLoaded", function() {
    // API Endpoints
    const projectApi = "http://api-sbw-plc.sbw.media/Project";
    const taskOptions = [
        "(Projektorganisation – Briefing)",
        "(Projektorganisation – Planung)",
        "(Projektorganisation – Koordination)",
        "(Projektorganisation – Dokumentation/Protokolle)",
        "(Research – Benchmarkanalyse)",
        "(Research – User Interviews)",
        "(Research – UX Analyse)",
        "(Konzept – Benutzergruppen/Personas)",
        "(Konzept – User Journey Map)",
        "(Ideation – User Flows/Story Map)",
        "(Prototyping – UX/Wireframes)",
        "(Prototyping – Testing)",
        "(Design – UI/Screendesign)",
        "(Design – Styleguide/Library)",
        "(Design – Graphic Design)",
        "(Design – Illustration)",
        "(Design – Bildauswahl/-bearbeitung)",
        "(Design – Präsentation)",
        "(Realisierung – Video/Animation)",
        "(Realisierung – Texte)"
    ];

    const projectInput = document.querySelector('.project-input');
    const taskInput = document.querySelector('.task-input');
    const taskSuggestionsContainer = document.querySelector('.task-suggestions');
    const projectSuggestionsContainer = document.querySelector('.project-suggestions');

    // Function for loading projects with Autocomplete
    function loadProjects(query) {
        fetch(`${projectApi}?search=${query}`)
            .then(response => response.json())
            .then(data => {
                projectSuggestionsContainer.innerHTML = ''; // Clear suggestions
                data.forEach(project => {
                    const suggestion = document.createElement('div');
                    suggestion.textContent = project.name;
                    suggestion.classList.add('suggestion-item');
                    suggestion.addEventListener('click', () => {
                        projectInput.value = project.name;
                        projectSuggestionsContainer.innerHTML = '';
                    });
                    projectSuggestionsContainer.appendChild(suggestion);
                });
            })
            .catch(error => console.error('Error loading projects:', error));
    }

    // Autocomplete for projects
    projectInput?.addEventListener('input', function() {
        const query = projectInput.value;
        if (query.length > 1) {
            loadProjects(query);
        } else {
            projectSuggestionsContainer.innerHTML = ''; // Clear suggestions if input is short
        }
    });

    // Display task suggestions as user types
    taskInput?.addEventListener('input', function() {
        const query = taskInput.value.toLowerCase();
        taskSuggestionsContainer.innerHTML = ''; // Clear previous suggestions
        taskOptions.forEach(task => {
            if (task.toLowerCase().includes(query)) {
                const suggestion = document.createElement('div');
                suggestion.textContent = task;
                suggestion.classList.add('suggestion-item');
                suggestion.addEventListener('click', () => {
                    taskInput.value = task;
                    taskSuggestionsContainer.innerHTML = ''; // Close suggestions
                });
                taskSuggestionsContainer.appendChild(suggestion);
            }
        });
    });

    // Hide suggestions if clicking outside
    document.addEventListener('click', function(e) {
        if (!projectInput?.contains(e.target)) {
            projectSuggestionsContainer.innerHTML = '';
        }
        if (!taskInput?.contains(e.target)) {
            taskSuggestionsContainer.innerHTML = '';
        }
    });

    // Dropdown functionality for the project items
    const dropdownButtons = document.querySelectorAll('.dropdown-btn');

    dropdownButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectItem = button.closest('.project-item');
            const details = projectItem.querySelector('.project-details');
            details.classList.toggle('active'); // Show or hide the project details
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Dropdown functionality for the project items
    const dropdownButtons = document.querySelectorAll('.dropdown-btn');

    dropdownButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectItem = button.closest('.project-item');
            projectItem.classList.toggle('active'); // Toggle the "active" class on the project-item
        });
    });
});


