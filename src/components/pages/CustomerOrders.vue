<template>
    <div >
        <loading :active.sync="isLoading"></loading>
        <div class="row mt-4" >
            <div class="col-md-4 mb-4" v-for ="item in products" :key="item.id">
                <div class="card">
                    <div style="height: 150px; background-size: cover; background-position: center"
                    :style="{backgroundImage: `url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body">
                    <span class="badge  badge-danger float-right ml-2" v-if="item.category">{{item.category}}</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark">{{item.title}}</a>
                    </h5>
                    <p class="card-text">{{item.content}}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <!-- <div class="h5">2,800 元</div> -->
                        <del class="h6" v-if="!item.price">原價 {{item.origin_price}} 元</del>
                        <del class="h6" v-if="item.price">原價 {{item.origin_price}} 元</del>
                        <div class="h6 text-danger" v-if="item.price">現在只要 {{item.price}} 元</div>
                    </div>
                    </div>
                    <div class="card-footer d-flex">
                    <button type="button" class="btn btn-info btn-sm"
                        @click="getProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                        查看更多
                    </button>
                    <button type="button" class="btn btn-danger btn-sm ml-auto"  @click="addtoCart(item.id)">
                        <i class="fas fa-spinner fa-spin"  v-if="status.loadingItem === item.id"></i>
                        加到購物車
                    </button>
                    </div>
                </div>
                <!-- Modal -->
                <div class="modal fade" id="ProductModal" tabindex="-1" role="dialog" aria-labelledby="ProductModalTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">{{product.title}}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col">
                                    <img :src="product.imageUrl" alt="" class="img-fluid">
                                </div>
                            </div>
                            <h5 class="mt-2 mb-4">{{product.description}}</h5>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <!-- <div class="h5">2,800 元</div> -->
                                <del class="h4" v-if="!product.price">原價 {{product.origin_price}} 元</del>
                                <del class="h6" v-if="product.price">原價 {{product.origin_price}} 元</del>
                                <div class="h4" v-if="product.price">現在只要 {{product.price}} 元</div>
                            </div>
                            <select name="" class="form-control mt-3" v-model="product.num">
                                <option :value="num" v-for="num in 12" :key="num">
                                    訂閱 {{num}} 個{{product.unit}}
                                </option>
                            </select>
                        </div>
                        <div class="modal-footer">
                            <div class="text-muted mr-3 h6">
                                小計 <strong class="text-danger h5">{{product.price * product.num}} </strong>元
                            </div>
                            <button type="button" class="btn btn-info text-gold" data-dismiss="modal" @click="addtoCart(product.id, product.num)">加到購物車</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-block border-top border-secondary" v-if="cart_price">
            <table class="table table-list table-striped mt-5 table-hover table-warning">
                <thead class="bg-gold">
                    <tr>
                        <th></th>
                        <th scope="col">品名</th>
                        <th scope="col">數量</th>
                        <th scope="col">單價</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cart" :key="item.id">
                        <td><span class="border p-1 border-danger text-danger rounded" @click="deleteCart(item.id)"><i class="far fa-trash-alt"></i></span></td>
                        <td>{{item.product.title}}
                        <div class="text-success" v-if="item.coupon">
                            已套用優惠券
                        </div>
                        </td>
                        <td>{{item.qty}}/個{{item.product.unit}}</td>
                        <td>{{item.final_total}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>總計</td>
                        <td>{{cart_price}}</td>
                    </tr>
                    <tr v-if="coupon_total !== cart_price">
                        <td></td>
                        <td></td>
                        <td class="text-success">折扣價</td>
                        <td>{{coupon_total}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="input-group mb-3 input-group-sm">
                <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code">
                <div class="input-group-append">
                    <button class="btn btn-dark text-gold" type="button" @click="addCouponCode()">
                        套用優惠碼
                    </button>
                </div>
            </div>
        </div>
        <div class="my-5 row justify-content-center">
                    <form class="col-md-6" @submit.prevent="creatOrder">
                        <div class="form-group">
                            <label for="useremail">Email</label> 
                            <input type="email" class="form-control" name="email" id="useremail"
                                v-model="form.user.email" v-validate="'required|email'" :class="{ 'is-invalid': errors.has('name')}" 
                                placeholder="請輸入 Email" >
                            <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email')}}</span>
                            </div>
                        
                            <div class="form-group">
                            <label for="username">收件人姓名</label>
                            <input type="text" class="form-control" name="name" id="username"
                                v-model="form.user.name" v-validate="'required'" :class="{ 'is-invalid': errors.has('name')}" placeholder="輸入姓名">
                            <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
                            </div>
                        
                            <div class="form-group">
                            <label for="usertel">收件人電話</label>
                            <input type="tel" class="form-control" id="usertel" name="phone" 
                            v-model="form.user.tel"  placeholder="請輸入電話" v-validate="'required'" :class="{ 'is-invalid': errors.has('phone')}">
                            <span class="text-danger" v-if="errors.has('phone')">電話必須輸入</span>
                            </div>
                            
                            <div class="form-group">
                            <label for="useraddress">收件人地址</label>
                            <input type="address" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                                 v-validate="'required'" :class="{ 'is-invalid': errors.has('address')}"
                                placeholder="請輸入地址">
                            <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
                            </div>
                        
                            <div class="form-group">
                            <label for="useraddress">留言</label>
                            <textarea name="" id="" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                            </div>
                            <div class="text-right">
                            <button class="btn btn-dark text-gold">送出訂單</button>
                            </div>
                        </form>
                    </div>
    </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ""
      },
      form:{
          user:{
              name: '',
              email: '',
              tel: '',
              address: '',
          },
          message:'',
      },
      isLoading: false,
      cart: [],
      cart_price:'',
      final_total:'',
      coupon_total:'',
      coupon_code: '',
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    getProduct(id) {
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then(response => {
        vm.product = response.data.product;
        $("#ProductModal").modal("show");
        vm.status.loadingItem = "";
      });
    },
    addtoCart(id, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      const cart = {
        product_id: id,
        qty
      };
      vm.status.loadingItem = id;
      this.$http.post(api, { data: cart }).then(response => {
        console.log(response);
        this.getCart();
        vm.status.loadingItem = "";
      });
    },
    deleteCart(id){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(api).then(response => {
        this.getCart();
        vm.isLoading = false;
      });  
    },
    getCart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.cart = response.data.data.carts;
        vm.cart_price = response.data.data.total
        vm.coupon_total = response.data.data.final_total
      });
    },
    addCouponCode(){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
        const vm = this;
        const coupon = {
            code: vm.coupon_code
        }
        vm.isLoading = true;
        this.$http.post(api, {data: coupon}).then(response => {
        console.log(response)
        this.getCart();
        vm.isLoading = false;
      });        
    },
    creatOrder(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form
      vm.isLoading = true;
      this.$validator.validate().then((result) => {
          if(result){
            this.$http.post(api, {data: order}).then(response => {
                console.log('訂單已建立', response);
                if(response.data.success){
                    vm.$router.push(`/customer_checkout/${response.data.orderId}`)
                }
                // vm.getCart();
                vm.isLoading = false;
            });
          } else {
              console.log('欄位不完整')
          }
      })
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>


<style scoped>
    .card {
        border: 3px solid #888888;
        box-shadow: 3px 3px #888888;
    }
    table.table{
        max-width: 635px;
        margin: 10px auto;
    }
    .input-group{
        margin: 0 auto;
        max-width: 50%;
    }
    span.border{
        cursor: pointer;
    }
    span.border:hover{
        color: white!important;
        background: red;
        transition: 0.3s all linear;
    }
</style>