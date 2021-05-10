<template>
  <div>
    <el-card class="box-card">
      <div class="avatar">
        <img src="@/images/pic.png" style="height: 200px" />
      </div>
      <div class="info">
        <div class="name">{{ name }}</div>
        <div class="icon item">
          <img src="@/icons/id.png" /><span>{{ id }}</span>
        </div>
        <div class="idIcon item">
          <img src="@/icons/zhaoxueyuan.png" /><span>{{ apart }}</span>
        </div>
        <div class="idIcon item">
          <img src="@/icons/banji.png" /><span>{{ uClass }}</span>
        </div>
        <div class="idIcon item">
          <img src="@/icons/icon1.png" /><span>{{ major }}</span>
        </div>
        <div class="idIcon item">
          <img src="@/icons/youxiang.png" /><span>{{ email }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: this.$store.getters.info.userName,
      id: this.$store.getters.info.userId,
      apart: this.$store.getters.info.userApart,
      uClass: this.$store.getters.info.userClass,
      major: this.$store.getters.info.userMajor,
      email: this.$store.getters.info.userEmail
    }
  }
}
</script>

<style>
.box-card {
  width: 480px;
}
span {
  margin-left: 10px;
}
.avatar {
  height: 200px;
  width: 200px;
  display: inline-block;
}
.info {
  display: inline-block;
  vertical-align: top;
  height: 200px;
  margin-left: 45px;
}
.name {
  font-size: 30px;
  letter-spacing: 3px;
}
.item {
  margin-top: 10px;
  line-height: 20px;
}
.icon {
  height: 20px;
}
</style>
