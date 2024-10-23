<template>
    <div v-if="action === 'read'">
        <h1>{{user.name}}</h1>
        <h2>{{user.companyName}}</h2>
        <h2>{{user.jobPosition}}</h2>
        <h3>{{user.phoneNumber}}</h3>
        <p>{{user.explanation}}</p>
    </div>
    <div v-else>
        <div class="update-form">
            <MyForm :formFields="formFields" :buttonContent="buttonContent" :headerContent="headerContent" :multiRole="multiRole" :id="user.id" :selectInfo="selectInfo"/>
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
        const formFields = ref([
            { id: "name", type: "text", rows: "", placeholder: "Your full name", label: "Name: ", isRequired: true, fieldType: "input", value: "" },
            { id: "companyName", type: "text", rows: "", placeholder: "Company you work for", label: "Company Name: ", isRequired: true, fieldType: "input", value: "" },
            { id: "jobPosition", type: "text", rows: "", placeholder: "Your job position", label: "Job Position: ", isRequired: true, fieldType: "input", value: "" },
            { id: "phoneNumber", type: "tel", rows: "", placeholder: "Your phone number", label: "Phone Number: ", isRequired: true, fieldType: "input", value: "" },
            { id: "createdDate", type: "text", rows: "", placeholder: "Created Date", label: "Created Date: ", isRequired: true, fieldType: "input", value: "" },
            { id: "lastUpdate", type: "text", rows: "", placeholder: "Last update", label: "Last Update: ", isRequired: true, fieldType: "input", value: "" },
            { id: "SupervisorExplanation", type: "", rows: "4", placeholder: "Provide a short explanation", label: "Supervisor Explanation: ", isRequired: true, fieldType: "textarea", value: "" },
            
        ]);
        const headerContent = "Update Info"
        const buttonContent = "Save"
        const multiRole = true
        const selectInfo = {
            id:"status",
            label: "Select Status: ",
            options: [
                {value: "default",content: "Pending", isDisabled: false},
                {value: "processing",content: "Processing", isDisabled: false},
                {value: "processed",content: "Processed", isDisabled: false}
            ]
        }
        const jwtToken = localStorage.getItem('jwtToken');
        const user = ref({})
        const users = ref([])

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
                    user.value = foundUser
                    formFields.value.forEach(field => {
                        field.value = user.value[field.id]
                    });
                }
            }
        )
        return{user,formFields,multiRole,headerContent,buttonContent, selectInfo}
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