<template>
  <fragment>
    <nav :class="classes">
      <ul v-if="active" class="menu">
        <li>
          <a v-if="isLoggedIn" @click="logout">로그아웃</a>
          <a v-else @click="login">로그인</a>
        </li>
      </ul>
      <ul v-if="active" class="menu">
        <p v-if="!isLoggedIn" class="message danger">
          로그인이 필요한 서비스입니다.
        </p>
        <li :class="{ disabled: !isLoggedIn }">
          <nuxt-link to="/subscriptions" @click.native="toggleSideNav"
            >구독</nuxt-link
          >
        </li>
        <li :class="{ disabled: !isLoggedIn }">
          <nuxt-link to="/history" @click.native="toggleSideNav"
            >기록</nuxt-link
          >
        </li>
      </ul>
      <ul v-if="active" class="menu">
        <li v-for="category in categories" :key="category.id">
          <nuxt-link :to="`/${category.path}`" @click.native="toggleSideNav">{{
            category.label
          }}</nuxt-link>
        </li>
      </ul>
    </nav>
    <Dimmer :active="active" @click.native="toggleSideNav" />
  </fragment>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Dimmer from '@/components/atoms/Dimmer'

export default {
  name: 'SideNav',
  components: { Dimmer },
  computed: {
    ...mapState({
      active: state => state.app.sideNav,
      categories: state => state.app.categories,
      isLoggedIn: state => state.user.uid,
    }),
    classes: function () {
      return {
        'side-nav': true,
        active: this.active,
      }
    },
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
.side-nav {
  position: fixed;
  left: 0;
  top: 0;
  width: 0pt;
  height: 100%;
  background-color: white;
  box-shadow: 0 8pt 8pt rgba(0, 0, 0, 0.3);
  transition: width 150ms;
  z-index: 2;
}

.side-nav.active {
  width: 200pt;
}

.side-nav * {
  animation: fadein 500ms;
  -moz-animation: fadein 500ms; /* Firefox */
  -webkit-animation: fadein 500ms; /* Safari and Chrome */
  -o-animation: fadein 500ms; /* Opera */
}

.side-nav .menu {
  display: flex;
  flex-flow: column;
  border-bottom: 1pt solid rgba(0, 0, 0, 0.05);
}

.side-nav .menu > li {
  display: flex;
  align-items: center;
  position: relative;
  height: 40pt;
}

.side-nav .menu > li.disabled:after {
  content: '';
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.side-nav .menu > li.disabled > a {
  color: gray;
}

.side-nav .menu > li > a {
  width: 200pt;
  padding: 8pt 16pt;
  color: #333333;
  font-weight: 500;
}

.side-nav .menu > li > a.nuxt-link-active {
  color: rgb(0, 78, 162);
  font-weight: 700;
}

.side-nav .menu .message {
  font-size: 8pt;
  height: 24pt;
  line-height: 32pt;
  text-align: center;
}

@media (max-width: 576px) {
  .side-nav.active {
    width: 160pt;
  }

  .side-nav .menu > li > a {
    width: 160pt;
  }
}
</style>
