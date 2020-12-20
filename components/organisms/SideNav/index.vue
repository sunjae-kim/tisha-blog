<template>
  <div>
    <nav :class="{ active: this.active }">
      <ul v-if="active" class="menu">
        <li>
          <a @click="onAuthBtnClick">{{
            isLoggedIn ? '로그아웃' : '로그인'
          }}</a>
        </li>
      </ul>
      <ul v-if="active" class="menu" :class="{ disabled: !isLoggedIn }">
        <p v-if="!isLoggedIn" class="message danger">
          로그인이 필요한 서비스입니다.
        </p>
        <li>
          <nuxt-link
            v-if="isLoggedIn"
            to="/subscriptions"
            @click.native="toggleSideNav"
            >구독</nuxt-link
          >
          <a v-else @click="toggleSideNav">구독</a>
        </li>
        <li>
          <nuxt-link
            v-if="isLoggedIn"
            to="/history"
            @click.native="toggleSideNav"
            >기록</nuxt-link
          >
          <a v-else @click="toggleSideNav">기록</a>
        </li>
      </ul>
      <ul v-if="active" class="menu">
        <li v-for="category in categories" :key="category.name">
          <nuxt-link
            :to="`/categories/${category.name}`"
            @click.native="toggleSideNav"
            >{{ category.label }}</nuxt-link
          >
        </li>
      </ul>
    </nav>
    <AppDimmer :active="active" @click.native="toggleSideNav" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppDimmer from '@/components/atoms/AppDimmer'

export default {
  name: 'SideNav',
  components: { AppDimmer },
  computed: {
    ...mapState({
      active: state => state.app.sideNav,
      categories: state => state.app.categories,
      isLoggedIn: state => state.user.uid,
    }),
  },
  methods: {
    ...mapActions({
      toggleSideNav: 'app/toggleSideNav',
      logout: 'user/logout',
      login: 'user/login',
    }),
    onAuthBtnClick: function () {
      if (this.isLoggedIn) {
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
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: white;
  box-shadow: 0 8pt 8pt rgba(0, 0, 0, 0.3);
  transition: width 150ms;
  z-index: 2;
}

nav.active {
  width: 200pt;
}

nav * {
  animation: fadein 200ms;
}

nav .menu {
  display: flex;
  flex-direction: column;
  border-bottom: 1pt solid rgba(0, 0, 0, 0.05);
}

nav .menu > li {
  height: 40pt;
  line-height: 40pt;
}

nav .menu > li > a {
  display: inline-block;
  width: 100%;
  padding: 0 16pt;
  color: #333333;
  font-weight: 500;
}

nav .menu > li > a.nuxt-link-active {
  color: rgba(0, 123, 255, 0.7);
}

nav .menu.disabled > li {
  position: relative;
  pointer-events: none;
}

nav .menu.disabled > li:after {
  content: '';
  display: inline-block;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
}

nav .menu.disabled > li > a {
  color: gray;
}

nav .menu .message {
  font-size: 8pt;
  height: 24pt;
  line-height: 24pt;
  text-align: center;
}

@media (max-width: 576px) {
  nav.active {
    width: 160pt;
  }
}
</style>
