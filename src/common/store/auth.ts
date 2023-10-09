import { types } from 'mobx-state-tree'

const AuthData = types
    .model("AuthData", {
        accessToken: ""
    })
    .actions((authData) => ({
        setAccessToken(token) {
            authData.accessToken = token
        },
        removeAccessToken() {
            authData.accessToken = ""
        }
    }))

export const authDataStore = AuthData.create()

