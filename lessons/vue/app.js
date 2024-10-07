const app = Vue.createApp(
    {
        data(){
            return{
                title: 'The Final Empire',
                author: 'Brandon Sanderson',
                age: 45,
                showBooks: false
            }
        },
        methods:{
            toggleShowBooks(){
                this.showBooks = !this.showBooks
            }
        }
    }
)

app.mount('#myApp')

