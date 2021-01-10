const getOrderTotal = (shoppingcart) => {
    var total = 0
    shoppingcart.items.forEach(item => {
        const itemTotal = item.price * item.quantity
        total = total + parseFloat(itemTotal)
    });
    return total 
}

export default getOrderTotal;