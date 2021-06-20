Vue.component('cart', {
    data() {
        return {
            cartItems: [],
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el)
                }
                console.log(this.cartItems)
            });
    },
    methods: {

        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        remove(product) {

            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${product.id_product}`, {quantity: -1})
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${product.id_product}/${product.product_name}`)
                    .then(data => {
                            if (data.result) {
                                this.cartItems.splice(this.cartItems.indexOf(product), 1);
                            } else {
                                console.log('error');
                            }
                        }
                    )
            }
        },
    },
    template: `
        <div class="cart-block-comp" v-show="$parent.showCart">
        <p v-if="!cartItems.length">В корзине нет товаров</p>
            <cart-item v-for="item of cartItems" :key="item.id_product" :img="imgCart" :cart-item="item" @remove="remove">
            </cart-item>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
    <div class="cart-item">

                          <img :src="cartItem.img" alt="product1" width="60%" height="auto"/>

                            <div class="product-title products-text-block__heading">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>


                    <div class="right-block">
                        <div class="product-price products-text-block__count">{{cartItem.quantity*cartItem.price}}</div>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
})

