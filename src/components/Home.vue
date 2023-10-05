<template>
  <section>
    <h3>Danh sách sản phẩm</h3>
    <nav>
      <router-link class="nav-items" to="/create">Thêm sản phẩm</router-link>
      <span class="nav-items" @click="addCategory">Thêm danh mục</span>
    </nav>
    <table>
      <thead>
      <tr>
        <th>STT</th>
        <th>Tên sản phẩm</th>
        <th>Số lượng</th>
        <th>Giá</th>
        <th>Danh mục</th>
        <th colspan="2">Tác vụ</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(product, index) in products" :key="product.id">
        <td>{{ index + 1 }}</td>
        <td>
          <router-link :to="'/detail/' + product.id">{{ product.name }}</router-link>
        </td>
        <td>{{ product.quantity }}</td>
        <td>{{ intl.format(product.price) }} đ</td>
        <td>{{ product.category.name }}</td>
        <td>
          <router-link class="btn" :to="'/edit/' + product.id">Sửa</router-link>
        </td>
        <td>
          <span class="btn" @click="deleteProduct(product.name, product.id)">Xoá</span>
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import {modalCreateCategory, toastError, toastSuccess} from "@/components/alert";

export default {
  name: 'HomePage',
  methods: {
    addCategory() {
      modalCreateCategory();
    }
  },

  setup() {
    const products = ref([]);
    const intl = new Intl.NumberFormat('en')

    const getAllProduct = async () => {
      try {
        const res = await axios.get('http://localhost:8081/default/product/all-list');
        products.value = res.data;
      } catch {
        toastError("Lỗi kết nối server!")
      }
    }

    getAllProduct();

    const deleteProduct = (name, id) => {
      Swal.fire({
        title: 'Bạn có chắc?',
        text: `Muốn xoá ${name}!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Tôi chắc chắn!!',
        cancelButtonText: 'Huỷ!'
      }).then(async (result) => {
        try {
          if (result.isConfirmed) {
            await axios.delete(`http://localhost:8081/default/product/delete/id=${id}`)
            await toastSuccess("Xoá thành công!");
            await getAllProduct();
          }
        } catch {
          toastError("Xoá không thành công!")
        }
      })
    }

    return {
      products,
      intl,
      deleteProduct
    }
  }
}
</script>

<style scoped>
section {
  margin-top: 20px;
}

h3 {
  text-transform: uppercase;
}

.btn,
.nav-items {
  border-radius: 10px;
  outline: none;
  border: 1px solid #07beb8;
  padding: 6px 8px;
  font-size: 1.2rem;
  text-transform: uppercase;
  background-color: #68d8d6;
  cursor: pointer;
  color: #000;

  &:hover {
    background-color: #9ceaef;
  }
}

nav {
  margin: 20px 0;
}

.nav-items {
  &:hover {
    color: #07beb8;
  }

  + .nav-items {
    margin-left: 6px;
  }
}
</style>