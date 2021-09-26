<template>
  <div class="error-page">
    <div class="error-page-container">
      <div class="error-page-main">
        <h3><strong>500</strong>很抱歉，当前页面无法访问！</h3>
        请邮件联系 1915044279@qq.com
      </div>
    </div>
  </div>
</template>
<style scoped>
.error-page {
  background: #f0f1f3;
  height: 100vh;
  padding: 88px;
  text-align: left;
}
.error-page-container {
  position: relative;
  z-index: 1;
}
.error-page-main {
  position: relative;
  background: #f9f9f9;
  margin: 0 auto;
  width: 617px;
  box-sizing: border-box;
  padding: 50px 50px 70px;
}
.error-page-main:before {
  content: "";
  display: block;
  height: 7px;
  position: absolute;
  top: -7px;
  width: 100%;
  left: 0;
}
.error-page-main h3 {
  font-size: 24px;
  font-weight: 400;
  border-bottom: 1px solid #d0d0d0;
}
.error-page-main h3 strong {
  font-size: 54px;
  font-weight: 400;
  margin-right: 20px;
}
.error-page-main h4 {
  font-size: 20px;
  font-weight: 400;
  color: #333;
}
</style>