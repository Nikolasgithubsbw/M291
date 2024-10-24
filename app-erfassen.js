const customer = Vue.createApp({
    data() {
        return {
            projects: [],
            customers: [],
            persons: [],
            projectName: '',
            selectedCustomer: '',
            selectedPerson: ''
        };
    },
    methods: {
        async loadProjects() {
            const url = "http://api-sbw-plc.sbw.media/Project";
            const response = await fetch(url);
            const data = await response.json();
            this.projects = data.resources;
        },
        async loadCustomers() {
            const url = "http://api-sbw-plc.sbw.media/Customer";
            const response = await fetch(url);
            const data = await response.json();
            this.customers = data.resources;
        },
        async loadPersons() {
            const url = "http://api-sbw-plc.sbw.media/Student";
            const response = await fetch(url);
            const data = await response.json();
            this.persons = data.resources;
        },
        async submitForm() {
            const projectData = {
                projectName: this.projectName,
                customer: this.selectedCustomer,
                person: this.selectedPerson
            };
            
            console.log('Submitting Project:', projectData);

            const url = "http://api-sbw-plc.sbw.media/Project";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(projectData)
            });
            
            if (response.ok) {
                alert('Project saved successfully!');
                this.projectName = '';
                this.selectedCustomer = '';
                this.selectedPerson = '';
            } else {
                alert('Failed to save the project. Please try again.');
            }
        }
    },
    mounted() {
        this.loadProjects();
        this.loadCustomers();
        this.loadPersons();
    }
}).mount('#customer');
