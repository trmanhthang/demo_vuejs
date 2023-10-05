<template>
  <section>
    <h1>Thêm sản phẩm</h1>
    <form @submit.prevent="sendData">
      <div class="container">
        <div class="wrap-field">
          <label for="name">Tên sản phẩm:</label>
          <input id="name" type="text" v-model="product.name"/>
        </div>

        <div class="wrap-field">
          <label for="quantity">Số lượng:</label>
          <input id="quantity" type="text" v-model="product.quantity"/>
        </div>

        <div class="wrap-field">
          <label for="price">Giá:</label>
          <input id="price" type="text" v-model="product.price"/>
        </div>

        <div class="wrap-field">
          <label>Danh mục:</label>
          <select id="category" v-model="product.category.id">
            <option v-for="(category) in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
      </div>

      <div class="container-btn">
        <router-link class="btn" to="/">Trang chủ</router-link>
        <button :disabled="isButtonDisable" :class="{ 'disable': hasNewClass }" type="submit">Lưu</button>
      </div>
    </form>
  </section>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import {toastError, toastSuccess} from "@/components/alert";

export default {
  name: 'CreatePage',
  data() {
    const categories = ref([])
    const product = ref({
      name: '',
      quantity: '',
      price: '',
      category: {
        id: ''
      }
    })

    const getAllCategory = async () => {
      try {
        const res = await axios.get('http://localhost:8081/default/category/all')
        categories.value = res.data;
        product.value.category.id = categories.value[0].id;
      } catch {
        console.log("Lỗi");
      }

    }

    getAllCategory();

    const handleChange = () => {
      const productValue = product.value;
      if (productValue.name === '' || productValue.quantity === '' || productValue.price === '') {
        this.isButtonDisable = true;
        this.hasNewClass = true;
      } else {
        this.isButtonDisable = false;
        this.hasNewClass = false;
      }
    }

    handleChange();

    const sendData = async () => {
      try {
        await axios.post('http://localhost:8081/default/product/save', product.value)
        toastSuccess("Tạo sản phẩm thành công!")
      } catch {
        toastError("Lỗi tạo sản phẩm!")
      }
    }

    return {
      product,
      categories,
      sendData,
      isButtonDisable: false,
      hasNewClass: false,
    }
  },
}
</script>

<style scoped>
section {
  margin-top: 20px;
  padding: 0 300px;
}

h1 {
  padding-bottom: 10px;
  text-transform: uppercase;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.wrap-field {
  display: flex;
  flex-direction: column;
  width: 33.3333333%;
  padding: 0 20px;
  margin: 0 -16px;
  margin-bottom: 26px;
}

label {
  font-size: 1.4rem;
  color: #000;
}

select {
  padding: 6px;
  outline: none;
}

.btn,
button {
  border-radius: 10px;
  outline: none;
  border: 1px solid #07beb8;
  padding: 10px 30px;
  font-size: 1.6rem;
  text-transform: uppercase;
  background-color: #68d8d6;
  cursor: pointer;

  &:hover {
    background-color: #9ceaef;
  }

}

.btn {
  margin-right: 6px;
}

.container-btn {
  display: flex;
}

.disable {
  cursor: alias;
  background-color: #888888;
}
</style>