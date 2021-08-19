
const listFigure = (state = [], action)=>{
    if(action.type === 'getElement'){
        return state.concat(action.payload);
    }
}

export default listFigure;