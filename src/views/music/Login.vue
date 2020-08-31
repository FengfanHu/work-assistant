<template>
  <v-row justify="center" align="center">
    <v-form v-model="valid" lazy-validation>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="phone"
              :rules="phoneRules"
              label="Phone"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              type="password"
              required
            ></v-text-field>
          </v-col>

          <v-col class="d-flex justify-center align-center">
            <v-btn color="success" @click="login" :disabled="!valid">登录</v-btn>
          </v-col>

        </v-row>
      </v-container>
    </v-form>
  </v-row>
</template>

<script>
// eslint-disable-next-line import/named
import { Login } from '@/api/login'

export default {
  name: 'login',
  data () {
    return {
      valid: false,
      phone: '',
      password: '',
      phoneRules: [
        (v) => !!v || '请填写手机号',
        (v) => v.length === 11 || '手机号格式不正确'
      ],
      passwordRules: [
        (v) => !!v || '请输入密码'
      ]
    }
  },
  methods: {
    login () {
      Login({
        phone: this.phone,
        password: this.password
      }).then((response) => {
        // 保存userId
        const uid = response.data.account.id
        localStorage.setItem('uid', uid)
        // 跳转
        this.$router.push({ name: 'ShowUser' })
        const info = { type: 'success', message: '登录成功' }
        this.$store.commit('message/Notification', info)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
