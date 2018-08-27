<template>
    <div>
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>管理員</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/products">
                  <i class="fas fa-boxes"></i>
                  產品列表
                </router-link>
              </li>
            </ul>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link to="/admin/order_list" class="nav-link">
                  <i class="far fa-list-alt"></i> 訂單列表
                </router-link>
              </li>
            </ul>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link to="/admin/coupon" class="nav-link">
                  <i class="fas fa-credit-card"></i> 新增優惠券
                </router-link>
              </li>
            </ul>
             <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>模擬功能</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link to="/customer_order" class="nav-link">
                  <i class="fas fa-shopping-cart"></i> 模擬訂單
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
    </div>
</template>

<style lang="scss">
$gold: #E1D5BD;

 div.sidebar-sticky{
   background: rgba(0, 0, 0, .8);

 }
 .sidebar .nav-link{
    color: $gold;
    &:hover{
      color: white;
      transition: all .2s linear;
    }
  }

</style>
