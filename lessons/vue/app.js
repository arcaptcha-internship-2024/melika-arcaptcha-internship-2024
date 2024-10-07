const app = Vue.createApp(
    {
        data(){
            return{
                books:[
                    {title: 'name of the wind', author: 'patrick rothfuss', isFav: true, img: 'assets/1.jpeg'},
                    {title: 'the way of kings', author: 'brandon sanderson', isFav: false, img: 'assets/2.jpeg'},
                    {title: 'the final empire', author: 'brandon sanderson', isFav: true, img: 'assets/3.jpeg'}
                ],
                showBooks: false
            }
        },
        methods:{
            toggleShowBooks(){
                this.showBooks = !this.showBooks
            },
            toggleFave(book){
                book.isFav = !book.isFav
            }
        },
        computed:{
            filteredBooks(){
                return this.books.filter((book)=>book.isFav)
            }
        }
    }
)

app.mount('#myApp')

