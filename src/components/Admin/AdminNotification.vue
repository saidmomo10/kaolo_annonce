<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Echo from '@/plugins/echo';
import axios from '@/plugins/axios';
import IconNotification from '../icons/IconNotification.vue'


const router = useRouter();

interface Notification {
  id: number;
  type: string;
  data: {
    ad_id: number;
    ad_title: string;
    user_id: number;
    user_name: string;
    message: string;
  };
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

// Marquer une notification comme lue avec Axios et rediriger vers l'annonce
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
    
    // Rediriger vers la page de l'annonce
    router.push(`/ad/${notification.data.ad_id}`);
    
    // Fermer le dropdown des notifications
    showNotifications.value = false;
  } catch (error) {
    console.error('Erreur lors du traitement de la notification:', error);
  }
};

onMounted(() => {
  fetchNotifications();
  
  // Écouter les nouvelles notifications
  Echo.private('admin-notifications')
    .notification((notification: Notification) => {
      notifications.value.unshift(notification);
      unreadCount.value++;
    });
});

onUnmounted(() => {
  // Arrêter d'écouter le canal
  Echo.leave('admin-notifications');
});
</script>

<template>
  <div class="notifications-container">
    <button @click="showNotifications = !showNotifications" class="notification-button">
      <IconNotification/> 
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </button>
    
    <div v-if="showNotifications" class="notifications-dropdown">
      <div v-if="notifications.length === 0" class="empty-message">
        Aucune notification
      </div>
      
      <div v-for="notification in notifications" :key="notification.id" 
           :class="['notification-item', { 'unread': !notification.read_at }]"
           @click="handleNotificationClick(notification)">
        <div class="notification-content">
          {{ notification.data.message }}
        </div>
        <div class="notification-time">
          {{ new Date(notification.created_at).toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
</template>

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
  width: 350px;
  max-height: 400px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
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
  background-color: #e6f7ff;
  border-left: 3px solid #1890ff;
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
</style>