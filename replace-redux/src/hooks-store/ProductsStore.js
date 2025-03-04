import { initStore } from '../hooks-store/Store';

const toggleFav = (currState, productId) => {
    const products = currState.products;
    const prodIndex = products.findIndex(
        p => p.id === productId
    );
    const newFavStatus = !products[prodIndex].isFavorite;
    const updatedProducts = [...products];
    updatedProducts[prodIndex] = {
        ...products[prodIndex],
        isFavorite: newFavStatus
    };

    return { products: updatedProducts }
}

const configureStore = () => {

    // [0], [1]
    initStore({ 'TOGGLE_FAV': toggleFav }, {
        products: [
            {
                id: 'p1',
                title: 'Red Scarf',
                description: 'A pretty red scarf.',
                isFavorite: false
            },
            {
                id: 'p2',
                title: 'Blue T-Shirt',
                description: 'A pretty blue t-shirt.',
                isFavorite: false
            },
            {
                id: 'p3',
                title: 'Green Trousers',
                description: 'A pair of lightly green trousers.',
                isFavorite: false
            },
            {
                id: 'p4',
                title: 'Orange Hat',
                description: 'Street style! An orange hat.',
                isFavorite: false
            }
        ]
    });
}

export default configureStore;