const initialState = {
    isCollapsed:false
}
export const CollapsedReducer = (preState=initialState,action)=>{
    const {type} = action
    switch(type){
        case "change_collapsed":
            return {isCollapsed:action.data}
        default:
            return preState
    }   
}