<template>
  <header>
    <div class="wrapper">
      <div class="menu">
        <i class="sidebar-icon fas fa-bars"></i>
        <h1 class="logo">
          <nuxt-link to="/">미요미</nuxt-link>
        </h1>
        <Nav />
      </div>
      <div class="menu">
        <div v-if="user.uid" class="username">
          안녕하세요, {{ user.username }}님
        </div>
        <Button
          backgroundColor="white"
          color="black"
          label="로그아웃"
          v-if="user.uid"
        />
        <Button
          backgroundColor="white"
          color="black"
          label="로그인"
          v-if="!user.uid"
        />
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Nav from '@/components/molecules/Nav'
import Button from '@/components/atoms/Button'

export default {
  name: 'Header',
  components: { Button, Nav },
  computed: {
    ...mapState(['user']),
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
  transition: padding 0.5s;
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
  margin-right: 8pt;
}

header button + button {
  margin-left: 8pt;
}

header .sidebar-icon {
  cursor: pointer;
  margin-right: 8pt;
  padding: 8pt;
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

@media (min-width: 768px) {
  header .sidebar-icon {
    display: none;
  }
}
</style>
