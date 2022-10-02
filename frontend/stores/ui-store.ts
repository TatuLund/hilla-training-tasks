import { makeAutoObservable, runInAction } from 'mobx';
import {
    login as serverLogin,
    logout as serverLogout,
} from "@hilla/frontend";
import { crmStore } from "./app-store";
import {
    ConnectionState,
    ConnectionStateStore,
} from "@vaadin/common-frontend";
import * as endpoint from 'Frontend/generated/AuthorityEndpoint';

class Message {
    constructor(public text = '', public error = false, public open = false) { }
}

export class UiStore {
    message = new Message();
    loggedIn = true;
    offline = false;
    admin = false;
    connectionStateStore?: ConnectionStateStore;

    // Listen connection state changes
    // Doc: https://hilla.dev/docs/tutorials/in-depth-course/installing-and-offline-pwa/#reacting-to-changes-in-network-status
    connectionStateListener = () => {
        this.setOffline(
            this.connectionStateStore?.state === ConnectionState.CONNECTION_LOST
        );
    };

    setupOfflineListener() {
        const $wnd = window as any;
        if ($wnd.Vaadin?.connectionState) {
            this.connectionStateStore = $wnd.Vaadin
                .connectionState as ConnectionStateStore;
            this.connectionStateStore.addStateChangeListener(
                this.connectionStateListener
            );
            this.connectionStateListener();
        }
    }

    private setOffline(offline: boolean) {
        // Refresh from server when going online
        if (this.offline && !offline) {
            crmStore.initFromServer();
        }
        this.offline = offline;
    }

    constructor() {
        makeAutoObservable(
          this,
          {
            connectionStateListener: false,
            connectionStateStore: false,
            setupOfflineListener: false,
          },
          { autoBind: true }
        );
        this.setupOfflineListener();
    }

    showSuccess(message: string) {
        this.showMessage(message, false);
    }

    showError(message: string) {
        this.showMessage(message, true);
    }

    private showMessage(text: string, error: boolean) {
        this.message = new Message(text, error, true);
        // TODO: Use setTimeout and runInAction to clear message after 5 secs
    }


    async login(username: string, password: string) {
        const result = await serverLogin(username, password);
        if (!result.error) {
            this.setLoggedIn(true);
            this.getAuthorities();
        } else {
            throw new Error(result.errorMessage || 'Login failed');
        }
    }

    async logout() {
        await serverLogout();
        this.setLoggedIn(false);
    }

    private setLoggedIn(loggedIn: boolean) {
        this.loggedIn = loggedIn;
        if (loggedIn) {
            crmStore.initFromServer();
        }
    }

    async getAuthorities() {
        // TODO: use endpoint.checkAuthority to update value of this.admin
    }

    isAdmin() : boolean {
        return this.admin;
    }
}
