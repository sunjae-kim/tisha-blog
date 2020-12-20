<template>
  <header>
    <div class="wrapper">
      <div class="menu">
        <button type="button" class="sidebar-icon" @click="toggleSideNav">
          <i class="fas fa-bars"></i>
        </button>
        <span class="logo">
          <nuxt-link to="/">미요미</nuxt-link>
        </span>
        <HeaderNav />
      </div>
      <div class="menu">
        <span v-if="user.uid" class="username">
          안녕하세요, {{ user.username }}님
        </span>
        <AppButton
          backgroundColor="white"
          color="black"
          :label="user.uid ? '로그아웃' : '로그인'"
          @click.native="onAuthBtnClick"
        />
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HeaderNav from './HeaderNav'
import AppButton from '@/components/atoms/AppButton'

export default {
  name: 'Header',
  components: { AppButton, HeaderNav },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions({
      toggleSideNav: 'app/toggleSideNav',
      logout: 'user/logout',
      login: 'user/login',
    }),
    onAuthBtnClick: function () {
      if (this.user.uid) {
        this.logout()
      } else {
        // TEMP.
        this.login({ uid: 1, username: 'Jason123' })
      }
    },
  },
}
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 48pt;
  background-color: rgb(0, 78, 162);
}

header .wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24pt;
  max-width: 760pt;
  margin: 0 auto;
  transition: padding 300ms;
  height: 100%;
}

header .menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

header .sidebar-icon {
  cursor: pointer;
  width: 32pt;
  margin-right: 8pt;
  padding: 8pt;
  background-color: transparent;
  border: none;
  font-size: 12pt;
}

header .logo {
  font-weight: 900;
  font-size: 24pt;
  display: inline-block;
}

header .username {
  margin-right: 16pt;
}

@media (max-width: 576px) {
  header .menu .username {
    display: none;
  }
}

@media (max-width: 768px) {
  header .wrapper {
    padding: 8pt;
  }
}
</style>

<style>
header * {
  color: white;
  animation: fadein 300ms;
}
</style>
