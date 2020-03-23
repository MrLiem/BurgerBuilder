import * as actionTypes from '../actions/actionTypes'
import updateObject from '../../shared/utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
    
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    })
    const updatedProperties = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedProperties)
}
const removeIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    })
    const updatedProperties = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedProperties)
}

const setIngredients = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {
        salad: action.ingredients.salad,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat,
        bacon: action.ingredients.bacon
    })
    const updatedProperties = {
        ingredients: updatedIngredients,
        totalPrice: 4,
        error: false,
        building: false
    }
    return updateObject(state, updatedProperties)
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true })
}

const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTs:
            return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action)
        default:
            return state;
    }
}

export default burgerBuilderReducer