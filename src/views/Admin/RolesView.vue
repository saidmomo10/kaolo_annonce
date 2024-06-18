<template>
    <section class="dashboard sections">
        <div>
            <div class="row">
                <div class="col-lg-3 col-md-4 col-12">
                    <!-- Start Dashboard Sidebar -->
                    <AdminDashboardSidebar/>
                    <!-- Start Dashboard Sidebar -->
                </div>
                <div class="col-lg-9 col-md-8 col-12">
                    <div class="main-content">
                        <!-- Start Post Ad Block Area -->
                        <div class="dashboard-block mt-0">
                            <h3 class="block-title">Nouvelle Annonce</h3>
                            <div class="inner-block">
                                <!-- Start Post Ad Tab -->
                                <form @submit.prevent="handleAddRole" action="">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-group">
                                                <label>Add Title*</label>
                                                <input name="title" type="text" placeholder="Enter Title" v-model="formData.name">
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <div class="form-check" v-for="key in statusData" :key="key.id">
                                            <input class="form-check-input" type="checkbox" :value="key.id" v-model="formData.permission">
                                            <label class="form-check-label">{{ key.name }}</label>
                                            </div>
                                        </div>


                                        
                                    </div>
                                    <div class="button">
                                        <button class="btn">Registration</button>
                                    </div>
                                </form>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="getRoleData.length > 0">
                                                <tr v-for="(role,key) in getRoleData" :key = "key">
                                                    <td>{{ role.id }}</td>
                                                    <td>{{ role.name }}</td>
                                                    <td>
                                                        <!-- <router-link :to = '{name:"roleEdit", params:{id:role.id}}' class="btn btn-success">Modifier</router-link> -->
                                                        <button type="button" @click = 'deleteRole(role.id)' class="btn btn-danger">Supprimer</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tbody v-else>
                                                <tr>
                                                    <td colspan="4" align="center">No role</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <!-- End Post Ad Tab -->
                            </div>
                        </div>
                        <!-- End Post Ad Block Area -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// import NavBar from '../components/NavBar.vue'
import AdminDashboardSidebar from '@/components/Admin/AdminDashboardSidebar.vue';
import {ref, onMounted} from 'vue';
// import axios from 'axios';
// import router from '@/router';
import useRoles from '../../components/composables/rolesApi'

const { statusData, getRoleData, formData, getPermissions, getRole, addRole, deleteRole } = useRoles()

onMounted(getPermissions)
onMounted(getRole)

const handleAddRole = async() =>{
    await addRole(formData)
}
</script>