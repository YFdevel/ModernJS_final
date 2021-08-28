Vue.component('products', {
    data() {
        return {
            filtered: [],
            products: [],
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                console.log(data)
                for (let item of data) {
                    this.products.push(item);
                    this.filtered.push(item);
                }

            });
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },

    template:
        `<section class="products">
        <h2 class="products__heading">Fetured Items</h2>
        <p class="products__text">Shop for items based on what we featured in this week</p>
        <ul class="products__cards container">
             <product v-for="product of filtered"
                 :key="product.id_product"
                 :product="product" >
                 
</product>
                 </ul>
                 <a href="#" class="products__button">Browse All Product</a>
    </section>`


});
Vue.component('product', {
    props: ['product'],
    template: `<li class="products__cards-item">
<div class="products__cards-image">
                    <img :src="product.img" alt="product1" width="360" height="420"/>
                    <button type="button" class="products__cards-button add-to-cart" 
                   @click="$root.$refs.cart.addProduct(product)">
                        <img src="./img/AddToCart.svg" alt="AddToCart"/>
                        Add to Cart
                    </button>
                </div>
                <div class="products-text-block">
                    <h3 class="products-text-block__heading">{{product.product_name}}</h3>
                    <p class="products-text-block__text">
                        {{product.desc}}
                    </p>
                    <p class="products-text-block__count">{{product.price}}</p>
                </div>
                </li>`

})

