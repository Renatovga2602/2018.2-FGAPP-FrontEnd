export default searchReducer = (state =[], action) => {
    switch(action.type){
        case 'SEARCH':
            return {
                ...state,
                locals: action.locals
            };
        default:
            return state;
    }
};
