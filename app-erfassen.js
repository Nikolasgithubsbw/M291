const appp = Vue.createApp({
    data() {
        return {
            students: [], // Verwende das korrekte Plural
            StudentId: 0
        }
    },
    methods: {
        async loadStudents() {
            const url = "http://api-sbw-plc.sbw.media/Student";
                const response = await fetch(url);
                const data = await response.json();
                this.students = data.resources; // Gleiche Benennung wie im Dropdown v-for 
        }
    },
    mounted() {
        this.loadStudents(); // Korrekte Methode aufrufen
    }
});

appp.mount('#appp');
