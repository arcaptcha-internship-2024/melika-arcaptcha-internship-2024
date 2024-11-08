<template>
    <div v-if="action === 'read'">
        <h1>Name: {{user.name}}</h1>
        <h2>Status: {{user.status}}</h2>
        <h2>Company Name: {{user.companyName}}</h2>
        <h2>Job Position: {{user.jobPosition}}</h2>
        <h3>Phone Number: {{user.phoneNumber}}</h3>
        <p>User Explanation: {{user.explanation}}</p>
        <h3>Created Date: {{user.createdDate}}</h3>
        <h3>Last Update: {{user.lastUpdate}}</h3>
        <p>SupervisorExplanation: {{user.SupervisorExplanation}}</p>
    </div>
    <div v-else>
        <div class="update-form" v-if="isFetched">
            <MyForm :formFields="formFields" :buttonContent="buttonContent" :headerContent="headerContent" :multiRole="multiRole" :id="user.id" :selectInfo="selectInfo" :status="status"/>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import MyForm from '../components/MyForm.vue'
export default {
    props:['id','action'],
    components:{MyForm},
    setup(props){
        const isFetched = ref(false)
        const formFields = ref([
            { id: "name", type: "text", rows: "", placeholder: "Your full name", label: "Name: ", isRequired: true, fieldType: "input", value: "" },
            { id: "companyName", type: "text", rows: "", placeholder: "Company you work for", label: "Company Name: ", isRequired: true, fieldType: "input", value: "" },
            { id: "jobPosition", type: "text", rows: "", placeholder: "Your job position", label: "Job Position: ", isRequired: true, fieldType: "input", value: "" },
            { id: "phoneNumber", type: "tel", rows: "", placeholder: "Your phone number", label: "Phone Number: ", isRequired: true, fieldType: "input", value: "" },
            { id: "createdDate", type: "text", rows: "", placeholder: "Created Date", label: "Created Date: ", isRequired: true, fieldType: "input", value: "" },
            { id: "lastUpdate", type: "text", rows: "", placeholder: "Last update", label: "Last Update: ", isRequired: true, fieldType: "input", value: "" },
            { id: "explanation", type: "", rows: "4", placeholder: "Provide a short explanation", label: "Customer Explanation: ", isRequired: true, fieldType: "textarea", value: "" },
            { id: "SupervisorExplanation", type: "", rows: "4", placeholder: "Provide a short explanation", label: "Supervisor Explanation: ", isRequired: true, fieldType: "textarea", value: "" },
            
        ]);
        const headerContent = "Update Info"
        const buttonContent = "Save"
        const multiRole = true
        const selectInfo = {
            id:"status",
            label: "Select Status: ",
            options: [
                {value: "pending",content: "Pending", isDisabled: false},
                {value: "processing",content: "Processing", isDisabled: false},
                {value: "processed",content: "Processed", isDisabled: false}
            ]
        }
        const jwtToken = localStorage.getItem('jwtToken');
        const user = ref({})
        const users = ref([])
        const status = ref('')
        fetch('http://localhost:3000/getUsers',{
            method:"GET",
            headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${jwtToken}`
            }
        }).then(response => response.json()).then(
            data => {
                users.value = data
                const foundUser = users.value.find(user => user.id === props.id)
                if(foundUser){
                    console.log('this is founded user: ',foundUser)
                    user.value = foundUser
                    formFields.value.forEach(field => {
                        field.value = user.value[field.id]
                    });
                    status.value = user.value.status
                    console.log('this is status in userDetail: ',status.value)
                    isFetched.value = true
                }
            }
        )
        return{user,formFields,multiRole,headerContent,buttonContent, selectInfo,status, isFetched}
    }
}
</script>

<style>
.update-form{
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>