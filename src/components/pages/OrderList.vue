<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <table class="table table-striped mt-5 table-hover table-warning">
            <thead>
                <tr class="bg-gold">
                    <th scope="col" width="150">購買時間</th>
                    <th scope="col">Email</th>
                    <th scope="col">購買款項</th>
                    <th scope="col" width="150">應付金額</th>
                    <th scope="col" width="150">是否付款</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in orders" :key="item.id">
                    <td>{{item.create_at | date}}</td>
                    <td>{{item.user.email}}</td>
                    <td>
                        <ul class="list-unstyled">
                          <li v-for="(product, i) in item.products" :key="i">
                            {{ product.product.title }} : {{ product.qty }}
                            個{{ product.product.unit }}
                          </li>
                       </ul>
                    </td>
                    <td>{{item.total | currency}}</td>
                    <td v-if="item.is_paid" class="text-success">已付款</td>
                    <td v-else class="text-danger">尚未付款</td>                  
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>

</style>

<script>
    export default{
        data(){
            return{
                isLoading: false,
                orders: [],
                item_id:'',
            }
        },
        methods:{
            getOrderList(page = 1){
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=:page`;
                const vm = this;
                vm.isLoading = true;
                this.$http.get(api).then(response => {
                    console.log(response.data);
                    vm.isLoading = false;
                    vm.orders = response.data.orders;
                    console.log(vm.orders);
                });
            },
        },
        created() {
            this.getOrderList();
        },
    }
</script>
