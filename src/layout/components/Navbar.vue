<template>
  <div class="navbar" :style="`left:${navbarLeft};`">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <img v-else src="@/assets/logo.png" class="user-avatar">
          <span class="user-name">{{name}}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <template slot:dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item divided @click.stop="userInfo">
              <span style="display:block;">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click.stop="logout">
              <span style="display:block;">退出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      voice: this.$store.state.settings.voice
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device',
      'avatar',
      'name'
    ]),
    navbarLeft() {
      let l = '0'
      if (this.device !== 'mobile') {
        if (this.sidebar.opened) {
          l = '210px'
        } else {
          l = '54px'
        }
      }
      return l
    }
  },
  watch: {
    voice(val) {
      console.warn('语音提示：', val)
      this.$store.dispatch('settings/changeSetting', {
        key: 'voice',
        value: val
      })
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    userInfo() {
      this.$router.push('/profile/password')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  display: flex;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 2000;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  transition: all 0.28s;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &:focus {
      outline: none;
    }

    .voice {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
      font-size: 12px;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        display: flex;
        cursor: pointer;

        .user-avatar {
          width: 35px;
          height: 35px;
          border-radius: 100%;
        }

        .user-name{
          align-items: center;
          display: flex;
          padding: 0 5px;
        }

        .el-icon-caret-bottom {
          font-size: 12px;
          align-items: center;
          display: flex;
        }
      }
    }
  }
}
.user-dropdown {
  //top: 40px !important;
}
</style>
