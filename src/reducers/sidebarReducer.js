const sidebar = (state = false, action) => {
    if(action.type === 'change'){
        return !state;
    }
}

export default sidebar;