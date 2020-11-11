<template>
  <header>
    <div class="wrapper">
      <div class="menu">
        <button type="button" class="sidebar-icon" @click="toggleSideNav">
          <i class="fas fa-bars"></i>
        </button>
        <h1 class="logo">
          <nuxt-link to="/">미요미</nuxt-link>
        </h1>
        <HeaderNav />
      </div>
      <div class="menu">
        <div v-if="user.uid" class="username">
          안녕하세요, {{ user.username }}님
        </div>
        <Button
          v-if="user.uid"
          backgroundColor="white"
          color="black"
          label="로그아웃"
          @click.native="logout"
        />
        <Button
          v-if="!user.uid"
          backgroundColor="white"
          color="black"
          label="로그인"
          @click.native="login"
        />
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HeaderNav from '@/components/molecules/HeaderNav'
import Button from '@/components/atoms/Button'

export default {
  name: 'Header',
  components: { Button, HeaderNav },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions({
      toggleSideNav: 'app/toggleSideNav',
      logout: 'user/logout',
    }),
    login: function () {
      this.$store.dispatch('user/login', { uid: 1, username: 'Jason' })
    },
  },
}
</script>

<style>
header {
  height: 48pt;
  color: white;
  background-color: rgb(0, 78, 162);
}

header * {
  animation: fadein 1s;
  -moz-animation: fadein 1s; /* Firefox */
  -webkit-animation: fadein 1s; /* Safari and Chrome */
  -o-animation: fadein 1s; /* Opera */
}

header .wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8pt 24pt;
  max-width: 800pt;
  margin: 0 auto;
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  transition: padding 500ms;
}

header .menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1.logo {
  font-weight: 900;
  font-size: 24pt;
  display: inline-block;
}

header h1.logo > a {
  color: white;
  text-decoration: none;
}

header .menu .username {
  margin-right: 16pt;
}

header button + button {
  margin-left: 8pt;
}

header .sidebar-icon {
  cursor: pointer;
  margin-right: 8pt;
  padding: 8pt;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 12pt;
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
