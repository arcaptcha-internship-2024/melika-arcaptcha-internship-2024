import {ref} from 'vue'
const getPost = (id) => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    const post = ref(null)
    const error = ref(null)

    const loadData = async () => {
        try {
            let data = await fetch('http://localhost:3000/posts/' + id)
            console.log(`this is data: ${data}`)
            if(!data.ok){
                throw Error('The Post does not Exist!')
            }
            post.value = await data.json()
            console.log(`this is post title of id: ${id} :: ${post.title}`)
        } catch (err) {
            error.value = err.message
        }
    }
    return{post,error,loadData}
}
export default getPost