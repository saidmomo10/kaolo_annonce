import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref([]);

    const addToCart = (product) => {
        const existingProduct = cartItems.value.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cartItems.value.push({ ...product, quantity: 1 });
        }
    };

    const removeFromCart = (productId) => {
        cartItems.value = cartItems.value.filter(item => item.id !== productId);
    };

    const clearCart = () => {
        cartItems.value = [];
    };

    return {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
    };
});
