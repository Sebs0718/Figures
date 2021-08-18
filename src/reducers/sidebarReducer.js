const sidebar = (state = true, action) => {
    if(action.type === 'change'){
        return !state;
    }
}

export default sidebar;