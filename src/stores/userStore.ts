/**
 * 
 * Note importante 
 * 
 */

import { defineStore } from 'pinia'
import { type User, type UserCredentials } from '@/types/user'
import axios from 'axios';
import { API_URL } from '@/network';

type UserStore = {
    user    : User | null,
    loggedIn: boolean,
    token   : string | null,
};

export const useUserStore = defineStore('user', {
    state: (): UserStore => ({
        user: null,
        loggedIn: false,
        token: null,
    }),

    actions: {

        setUser(user: User, token: string) {
            this.user = user;
            this.loggedIn = true;
            this.token = token;


            /** 
             * Attention en production !
             * Le LocalStorage est sensible aux attaques XSS
             * contrairement à un cookie HTTP Only+secure
             */

            window.localStorage.setItem("token", token);
        },

        bearerHeader() {
            if (this.token === null)
                return {};

            return {
                'Authorization': `Bearer ${this.token}` 
            }
        },

        async tryReconnect(): Promise<boolean> {
            let token = window.localStorage.getItem("token");
            if (token === null)
                return false;

            try {
                const response = await axios.get<User>(`${API_URL}/user`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const credentials : User = response.data;
                this.setUser(credentials, token);
                return true;
            } catch {
                return false;
            }

        },

        async attemptLogin(credentials: UserCredentials): Promise<string | null> {
            try {
                const response = await axios.post<{ token: string }>(`${API_URL}/login`, {
                    ...credentials
                });

                const token = response.data.token;
                this.setUser(credentials, token);
                return response.data.token;
            } catch {
                return null;
            }
        },

        async attemptRegister(credentials: UserCredentials): Promise<boolean> {
            // Si 200 - register fonctionnel
            // Les autres cas de figure sont gérés dans le catch {}
            try {
                const response = await axios.post<{ message: string, token: string }>(`${API_URL}/register`, {
                    ...credentials
                });

                const token = response.data.token;
                this.setUser(credentials, token);

                return true;
            } catch {
                return false;
            }
        },

        logOut() {
            this.loggedIn = false;
            this.user     = null;
            window.localStorage.removeItem("token");
        },
    },
});