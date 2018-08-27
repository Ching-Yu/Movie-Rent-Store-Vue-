<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right">
            <button class="btn btn-dark mt-4"  @click="openModal(true)"  data-target="#couponModal">建立新優惠券</button>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">建立新優惠券</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="title">標題</label>
                        <input type="text" class="form-control" id="title"
                            placeholder="請輸入標題" v-model="tempCoupon.title">
                    </div>
                    <label for="percent">折扣百分比</label>
                    <div class="form-group">
                        <select name="percent" id="percent" class="form-control" v-model="tempCoupon.percent">
                            <option :value="num" v-for="num in 100" :key="num">折扣{{num}}%</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="due_date">到期日</label>
                        <input type="text" class="form-control datepicker" id="due_date"
                            placeholder="請輸入到期日" v-model="tempCoupon.due_date">
                    </div>
                    <div class="form-group">
                        <label for="code">優惠代碼</label>
                        <input type="text" class="form-control" id="code"
                            placeholder="請輸入優惠代碼" v-model="tempCoupon.code">
                    </div>
                        <div class="form-group">
                    <div class="form-check">
                            <input class="form-check-input" type="checkbox"
                            id="is_enabled"
                            v-model="tempCoupon.is_enabled"
                            :true-value="1"
                            :false-value="0"
                            >
                            <label class="form-check-label" for="is_enabled">
                            是否啟用
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-info text-gold" @click="updateCoupon">Save changes</button>
                </div>
                </div>
            </div>
        </div>
        <div>
            <table class="table mt-4 text-left table-hover table-striped table-warning" >
                <thead class="bg-gold">
                    <th width="300">名稱</th>
                    <th width="120">折扣百分比</th>
                    <th width="120">到期日</th>
                    <th width="100">是否啟用</th>
                    <th width="80">編輯</th>
                </thead>
                <tbody>
                    <tr v-for="(item) in coupons" :key="item.id">
                        <td>{{item.title}}</td>
                        <td>{{item.percent}}%</td>
                        <td>{{item.due_date}}</td>
                        <td>
                            <span v-if="item.is_enabled" class="text-success">啟用</span>
                            <span v-else class="text-danger">未啟用</span>
                        </td>
                        <td width="150">
                            <button class="btn btn-outline-info btn-sm" @click="openModal(false, item)">編輯</button>
                            <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal(item)">刪除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-gold text-white">
                    <h5 class="modal-title " id="exampleModalLabel">
                    <span>刪除優惠券</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" @click="DeleteItem">確認刪除</button>
                </div>
                </div>
            </div>
            </div>
    </div>
</template>

<script>
    import $ from 'jquery'

    export default{
        data(){
            return{
                 isLoading: false,
                 coupons:[],
                 pagination:{},
                 tempCoupon:{},
            }
        },
        methods: {
            getCoupons(page = 1) {
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
                const vm = this;
                vm.isLoading = true;
                this.$http.get(api).then(response => {
                    console.log(response.data);
                    console.log(vm.coupons)
                    vm.isLoading = false;
                    vm.coupons = response.data.coupons;
                    vm.pagination = response.data.pagination;
                });
            },
            updateCoupon(){
                let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
                let httpMethod = 'post';
                const vm = this;
                if(!vm.isNew){
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
                    httpMethod = 'put';
                }
                this.$http[httpMethod](api, {data: vm.tempCoupon}).then(response => {
                    // console.log(response.data);
                    if(response.data.success){
                        $('#couponModal').modal('hide');
                        vm.getCoupons();
                    } else {
                        $('#couponModal').modal('hide');
                        vm.getCoupons();
                        console.log('新增失敗');
                    }
                });        
            },
            openModal(isNew, item){
                if(isNew){
                    this.tempCoupon = {};
                    this.isNew = true;
                } else {
                    this.tempCoupon = Object.assign({}, item);
                    this.isNew = false;
                }     
                $('#couponModal').modal('show');
            },
            openDeleteModal(item){
                $('#delProductModal').modal('show');
                this.tempCoupon = Object.assign({}, item);
                console.log(this.tempCoupon)
            },
            DeleteItem(){
                const vm = this
                let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
                vm.$http.delete(api, {data: vm.tempCoupon}).then((response) => {
                    console.log(response.data)
                    if(response.data.success){
                    $('#delProductModal').modal('hide');
                    console.log('已成功刪除')
                    vm.getCoupons();
                    } else {
                        alert('刪除失敗')
                        vm.getCoupons();
                    }      
                });        
            },
        },
        created(){
            this.getCoupons();
        }
    }
</script>

<style>

</style>

