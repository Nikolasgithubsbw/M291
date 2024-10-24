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
            try {
                const url = "http://api-sbw-plc.sbw.media/Project";
                const response = await fetch(url);
                const data = await response.json();
                this.projects = data.resources;
                console.log('Projects loaded:', this.projects);
            } catch (error) {
                console.error("Error loading projects:", error);
            }
        },
        async loadCustomers() {
            try {
                const url = "http://api-sbw-plc.sbw.media/Customer";
                const response = await fetch(url);
                const data = await response.json();
                this.customers = data.resources;
                console.log('Customers loaded:', this.customers);  // console 
            } catch (error) {
                console.error("Error loading customers:", error);
            }
        },
        async loadPersons() {
            try {
                const url = "http://api-sbw-plc.sbw.media/Student";
                const response = await fetch(url);
                const data = await response.json();
                this.persons = data.resources;
                console.log('Persons loaded:', this.persons);  // For debugging
            } catch (error) {
                console.error("Error loading persons:", error);
            }
        },
        async submitForm() {
            const projectData = {
                projectName: this.projectName,
                customerId: this.selectedCustomer,  // Pass the customer ID
                personId: this.selectedPerson       // Pass the person ID
            };
            
            console.log('Submitting Project:', projectData);

            try {
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
            } catch (error) {
                console.error("Error submitting project:", error);
                alert('Error occurred during project submission.');
            }
        }
    },
    mounted() {
        this.loadProjects();
        this.loadCustomers();
        this.loadPersons();
    }
}).mount('#customer');
