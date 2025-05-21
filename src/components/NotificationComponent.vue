<template>
  <div class="dropdown">
    <button @click="showNotifications = !showNotifications" class="btn dropdown-toggl" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <IconNotification/>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </button>
    <ul class="dropdown-menu notifications-dropdown">
      <a class="dropdown-item empty-message" v-if="notifications.length === 0">Pas de nouvelles notifications</a>
      <a class="dropdown-item" v-for="notification in notifications" :key="notification.id" :class="['notification-item', { 'unread': !notification.read_at }]" @click="handleNotificationClick(notification)">
        <p><strong>{{ notification.data.message }}</strong></p>  
        <p id="moment">{{ fromNow(notification.created_at) }}</p>
      </a>
    </ul>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { initEcho } from '@/plugins/echo';
import axios from '@/plugins/axios';
import IconNotification from './icons/IconNotification.vue'
import { DateTime } from "luxon";

// Dans votre composant Vue
const userId = ref<number | null>(null);

const getCurrentUser = async () => {
  try {
    const response = await axios.get('profile');
    userId.value = response.data.id;

    // Setup Echo après avoir l'ID et récupéré le cookie CSRF
    await setupEcho();
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
  }
};

const setupEcho = async () => {
  if (userId.value) {
    const echo = await initEcho(); // important !
    echo.private(`App.Models.User.${userId.value}`)
      .notification((notification: Notification) => {
        notifications.value.unshift(notification);
        unreadCount.value++;
      });
  }
};

onMounted(() => {
  fetchNotifications();
  getCurrentUser();
});

onUnmounted(async () => {
  if (userId.value) {
    const echo = await initEcho();
    echo.leave(`App.Models.User.${userId.value}`);
  }
});


const router = useRouter();

interface NotificationData {
  // Champs communs
  message: string;
  
  // Champs pour les annonces
  ad_id?: number;
  ad_title?: string;
  user_id?: number;
  user_name?: string;
  
  // Champs pour les commentaires
  commenter_id?: number;
  commenter_name?: string;
  comment_id?: number;
  comment?: string;
  comment_status?: string;
}

interface Notification {
  id: number;
  type: string;
  data: NotificationData;
  read_at: string | null;
  created_at: string;
}

const notifications = ref<Notification[]>([]);
const unreadCount = ref(0);
const showNotifications = ref(false);

// Charger les notifications existantes depuis l'API avec Axios
const fetchNotifications = async () => {
  try {
    const response = await axios.get('/notifications');
    notifications.value = response.data;
    unreadCount.value = response.data.filter((n: Notification) => !n.read_at).length;
  } catch (error) {
    console.error('Erreur lors du chargement des notifications:', error);
  }
};

// Marquer une notification comme lue avec Axios et rediriger vers la page appropriée
const handleNotificationClick = async (notification: Notification) => {
  try {
    // Marquer la notification comme lue
    await axios.post(`/notifications/${notification.id}/read`);
    
    // Mettre à jour l'interface
    const index = notifications.value.findIndex(n => n.id === notification.id);
    if (index !== -1) {
      notifications.value[index].read_at = new Date().toISOString();
      unreadCount.value = Math.max(0, unreadCount.value - 1);
    }
  
    router.push(`/ad/${notification.data.ad_id}?focus=comments`);
    
    // Fermer le dropdown des notifications
    showNotifications.value = false;
  } catch (error) {
    console.error('Erreur lors du traitement de la notification:', error);
  }
};

// Convertir la date en relatif avec Luxon
const fromNow = (date: string) => {
  return DateTime.fromISO(date).setLocale("fr").toRelative();
};
</script>


<style scoped>
.notifications-container {
  position: relative;
}

.notification-button {
  position: relative;
  padding: 8px 16px;
  background-color: #f1f1f1;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}

.notifications-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 350px;
  max-height: 400px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0;
  scroll-behavior: smooth;
}

.notification-item {
  padding: 12px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.notification-item:hover {
  background-color: #f0f7ff;
}

.notification-item.unread {
  background-color: rgb(215, 218, 219);
  border-left: 3px solid #ff8c00;
}

.notification-content {
  font-size: 14px;
  margin-bottom: 4px;
}

.notification-time {
  font-size: 12px;
  color: #888;
}

.empty-message {
  padding: 20px;
  text-align: center;
  color: #888;
}

#moment{
  font-size: 12px;
  color: rgb(134, 133, 133);
}

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
  white-space: normal;
  word-break: break-word;
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

  .notifications-dropdown::-webkit-scrollbar {
  width: 6px;
}

.notifications-dropdown::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.notifications-dropdown::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 3px;
}

.notifications-dropdown::-webkit-scrollbar-thumb:hover {
  background: #999;
}

</style>