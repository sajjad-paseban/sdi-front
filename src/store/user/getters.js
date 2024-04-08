export const getters = {
    getUserAccess(state) {
        const access = state.role.access;
        console.log(access, 'access of user');
        return true;
    },
    getUser(state) {
        return state;
    },
    getExpire(state) {
        return state.jwt.expire;
    }
};
//# sourceMappingURL=getters.js.map