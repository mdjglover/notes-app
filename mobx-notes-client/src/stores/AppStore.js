import { observable, computed, action, decorate } from "mobx";
import { createContext } from "react";

class AppStore {
    accessToken = null;
    loggedIn = false;
    notes = [];
}

decorate(AppStore, {
    accessToken: observable,
    loggedIn: observable,
    notes: observable,
});

export const AppStoreContext = createContext(new AppStore());
