<template>
  <div class="write">
    <CategoryTitle />
    <form class="article-form" @submit="onSubmit">
      <div class="field">
        <label class="required" for="title">글 제목</label>
        <input
          id="title"
          type="text"
          v-model="article.title"
          placeholder="제목을 입력해 주세요."
        />
      </div>
      <div class="field">
        <label class="required" for="content">내용</label>
        <textarea id="content" v-model="article.content"></textarea>
      </div>
      <div class="field"><AppButton type="submit" label="만들기" /></div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppButton from '@/components/atoms/AppButton'
import CategoryTitle from '@/components/molecules/CategoryTitle'

export default {
  name: 'Write',
  components: {
    AppButton,
    CategoryTitle,
  },
  data: function () {
    return {
      article: {
        title: '',
        content: '',
      },
    }
  },
  methods: {
    ...mapActions({ createArticle: 'article/createArticle' }),
    onSubmit: function (event) {
      event.preventDefault()
      const payload = {
        params: this.$route.params,
        article: this.article,
      }
      this.createArticle(payload)
    },
  },
}
</script>

<style>
div.write {
  display: flex;
  flex-direction: column;
  height: 100%;
}

div.write * {
  animation: fadein 200ms;
}

form.article-form {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 24pt;
  width: 760pt;
}

form.article-form .field input,
form.article-form .field textarea {
  width: 100%;
  padding: 8pt;
}

form.article-form .field label {
  display: inline-block;
  padding: 8pt 0;
  font-size: 10pt;
  color: #333333;
}

form.article-form .field + .field {
  margin-top: 8pt;
}

form.article-form textarea {
  min-height: 160pt;
}
</style>
