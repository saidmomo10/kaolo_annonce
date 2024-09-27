<template>

<!-- <li class="dropdown">
    <a id="navbarDropdown" class="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span id="notify_num" v-show="unreadnotifications.length > 0">{{unreadnotifications.length}}</span>
    </a>

    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
        <a class="dropdown-item" v-show="unreadnotifications.length > 0" @click="markAsRead">Mark all as read!</a>
        <a class="dropdown-item" v-for="(unread, index) in unreadnotifications" :key="index" @click="showPost(index)">
            <h5>{{unread.data.comment_status}}</h5>
            <p>{{unread.data.post_title}}</p>
            <p>{{(unread.created_at)}}</p>
        </a>
        <a class="dropdown-item" v-show="unreadnotifications.length == 0">No new notifications</a>
    </div>
</li> -->





  </template>
  
<script setup lang="ts">
  
</script>
  
  
<style scoped>
.dropdown-item p{
  cursor: pointer;
}

.dropdown-toggl{
  box-shadow: none;
}

.dropdown-toggl:focus{
  border: none;
}

.dropdown-toggl:hover{
  box-shadow: none;
}

.dropdown-item{
  cursor: pointer;
}

#notify_num{
  font-size: 10px;
  padding: 2px 6px;
  top: -7px;
  background: #ff5722;
  border-radius: 100%;
  color: #fff;
  font-weight: 600;
  width: 19px;
  height: 19px;
}

#moment{
  font-size: 10px;
  color: rgb(134, 133, 133);
}
</style>