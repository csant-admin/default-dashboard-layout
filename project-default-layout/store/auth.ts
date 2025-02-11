import { defineStore } from 'pinia';
import axios from 'axios';

// Assuming `useLaravelAPI` is a utility function or a constant that returns the base API URL
const api = 'http://localhost:8000'; // Replace with your actual API URL

export const userAuthenticated = ref([]); // This is global, could be used in your app, but it’s better to define this inside the store
export const path = ref('');

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
        user: null,
        token: null,
    }),

    actions: {
    async authenticateUser(email: string, password: string) {
        this.loading = true;
        try {
        const response = await axios.post(
            `${api}/login`,
            {
            email,
            password,
            },
            {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
            },
            }
        );

        if (response.data) {
            const token = response.data.token;
            this.token = token; // Directly assigning the token
            this.authenticated = true;
            this.user = response.data.user;

            // Assuming `UserType` is part of `response.data.user`
            if (parseInt(this.user.UserType) === 1) {
            path.value = '/dashboard';
            } else {
            path.value = '/';
            }

            // Store the user and token in session storage
            sessionStorage.setItem('user', JSON.stringify(this.user));
            sessionStorage.setItem('token', JSON.stringify(this.token));
        }
        } catch (error) {
            console.error(error);
        }
        this.loading = false;
    },

    async logout() {
      this.loading = true;
      try {
        await axios.post(`${api}/logout`);
        this.token = null;
        this.user = null;
        this.authenticated = false;

        // Clear session storage on logout
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    },
  },
});
