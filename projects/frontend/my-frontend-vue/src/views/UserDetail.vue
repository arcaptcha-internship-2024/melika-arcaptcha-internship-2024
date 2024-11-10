<template>
    <div v-if="action === 'read'">
        <div class="update-form" v-if="isFetched && isCustomer" >
            <MyForm :formFields="formFields" :headerContent="headerContent" :multiRole="multiRole" :id="user.id" :selectInfo="selectInfo" :status="status"/>
        </div>
        <div class="update-form" v-if="isFetched && !isCustomer">
            <UserForm :headerContent="'Read'" :foundUser="user" :multiRole="true" :isDisabled="true"/>
        </div>
    </div>
    <div v-else>
        <div class="update-form" v-if="isFetched && isCustomer">
            <MyForm :formFields="formFields" :buttonContent="buttonContent" :headerContent="headerContent" :multiRole="multiRole" :id="user.id" :selectInfo="selectInfo" :status="status"/>
        </div>
        <div class="update-form" v-if="isFetched && !isCustomer">
            <UserForm :buttonContent="'Save'" :headerContent="'Update'" :foundUser="user" :multiRole="true" :isDisabled="false" :id="user.id"/>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import MyForm from '../components/MyForm.vue'
import UserForm from '../components/UserForm.vue'

export default {
    props:['id','action','filePath'],
    components:{MyForm, UserForm},
    setup(props){
        const isFetched = ref(false)
        const isDisabled = ref(false)
        let headerContent = "Update Info"
        const isCustomer = ref(true)
        if(props.filePath === './database/users.json'){
            isCustomer.value = false
        }
        if(props.action === 'read'){
            isDisabled.value = true
            headerContent = "Read Info"
        }
        
        const formFields = ref([
            { id: "name", type: "text", rows: "", placeholder: "Your full name", label: "Name: ", isRequired: true, fieldType: "input", value: "",isDisabled:isDisabled },
            { id: "companyName", type: "text", rows: "", placeholder: "Company you work for", label: "Company Name: ", isRequired: true, fieldType: "input", value: "",isDisabled:isDisabled },
            { id: "jobPosition", type: "text", rows: "", placeholder: "Your job position", label: "Job Position: ", isRequired: true, fieldType: "input", value: "",isDisabled:isDisabled },
            { id: "phoneNumber", type: "tel", rows: "", placeholder: "Your phone number", label: "Phone Number: ", isRequired: true, fieldType: "input", value: "",isDisabled:isDisabled },
            { id: "createdDate", type: "text", rows: "", placeholder: "Created Date", label: "Created Date: ", isRequired: true, fieldType: "input", value: "",isDisabled:isDisabled },
            { id: "lastUpdate", type: "text", rows: "", placeholder: "Last update", label: "Last Update: ", isRequired: true, fieldType: "input", value: "",isDisabled:isDisabled },
            { id: "explanation", type: "", rows: "4", placeholder: "Provide a short explanation", label: "Customer Explanation: ", isRequired: true, fieldType: "textarea", value: "",isDisabled:isDisabled },
            { id: "supervisorExplanation", type: "", rows: "4", placeholder: "Provide a short explanation", label: "Supervisor Explanation: ", isRequired: true, fieldType: "textarea", value: "",isDisabled:isDisabled },
            
        ]);
        const buttonContent = "Save"
        const multiRole = true
        let selectInfo = {
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
            'Authorization': `Bearer ${jwtToken}`,
            'X-File-Path': props.filePath
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
                    status.value = user.value.status
                    console.log('this is status in userDetail: ',status.value)
                    isFetched.value = true
                }
            }
        )
        return{user,formFields,multiRole,headerContent,buttonContent, selectInfo,status, isFetched, isCustomer}
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