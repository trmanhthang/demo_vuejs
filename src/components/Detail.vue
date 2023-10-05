<template>
  <section>
    <h1>Chi tiết sản phẩm</h1>
    <aside>
      <div>
        <span>Tên sản phẩm: </span>
        <span>{{product.name}}</span>
      </div>

      <div>
        <span>Số lượng sản phẩm: </span>
        <span>{{product.quantity}}</span>
      </div>

      <div>
        <span>Giá sản phẩm: </span>
        <span>{{intl.format(product.price)}} đ</span>
      </div>

      <div>
        <span>Danh mục: </span>
        <span>{{product.category.name}}</span>
      </div>
    </aside>
  </section>
</template>

<script>
import axios from "axios";
import {useRoute} from "vue-router";
import {ref} from "vue";

export default {
  name: "DetailPage",
  setup () {
    const intl = new Intl.NumberFormat('en')
    const route = useRoute();
    const product = ref({
      category: {
        name: ""
      }
    })
    const getProduct = async () => {
      const id = route.params.id;
      const res = await axios.get(`http://localhost:8081/default/product/detail/id=${id}`)
      product.value = res.data;
    }

    getProduct();
    return {
      product,
      intl,
    }
  }
}
</script>

<style scoped>
h1 {
  text-transform: uppercase;
}
</style>