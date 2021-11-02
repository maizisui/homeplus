<template>
<div>
  <div class="login">
    <span class="btn" @click="dialogFormVisible = true">Login in</span>
    <span class="btn" @click="dialogFormVisible = true">Sign up</span>
  </div>
  <el-dialog title="Join or Sign In" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="" :label-width="formLabelWidth">
        <el-input v-model="form.account" autocomplete="off" placeholder="Email"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="dialogFormVisible = false">Continue with Email</el-button>
    <div class="line">Or</div>
    <div style="margin-bottom: 20px">
      <el-button>
        <span>
          <svg class="SvgIcon facebook facebookIcon fill-white">
            <svg viewBox="0 0 24 24">
              <path d="M21.252 1.6H2.747c-.633 0-1.147.514-1.147 1.148v18.504c0 .634.514 1.148 1.147 1.148h9.963v-8.055H9.999v-3.139h2.71V8.891c0-2.686 1.641-4.15 4.038-4.15 1.148 0 2.134.086 2.422.125v2.807h-1.662c-1.304 0-1.556.62-1.556 1.529v2.004h3.109l-.405 3.14h-2.704V22.4h5.3c.635 0 1.149-.514 1.149-1.148V2.748c0-.634-.514-1.148-1.148-1.148" fill-rule="evenodd">
              </path>
            </svg>
          </svg>
          <span class="signInText">Continue with  Facebook</span>
        </span>
      </el-button>
    </div>
    <div>
      <el-button>
        <span>
          <span class="Svg google-sso googleIcon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <g fill="none" fill-rule="evenodd">
                <path d="M8.808 1.98a10.372 10.372 0 017.015.063 10.091 10.091 0 013.354 2.115c-.324.36-.677.695-1.013 1.044l-1.915 1.95a5.652 5.652 0 00-2.245-1.347 6.046 6.046 0 00-3.058-.125 6.198 6.198 0 00-3.113 1.762A6.602 6.602 0 006.32 9.945c-1.136-.901-2.273-1.796-3.415-2.696C4.11 4.797 6.27 2.864 8.808 1.98z" fill="#EA4335"></path><path d="M2.004 9.905c.185-.923.487-1.824.907-2.668 1.137.9 2.274 1.796 3.415 2.697a6.505 6.505 0 000 4.127 1214.66 1214.66 0 01-3.41 2.696c-1.052-2.092-1.371-4.55-.912-6.852z" fill="#FBBC05"></path><path d="M12.212 10.013h9.798c.325 1.864.252 3.808-.263 5.633-.476 1.67-1.378 3.221-2.637 4.4L15.8 17.43a5.007 5.007 0 002.083-3.279h-5.677c.006-1.378.006-2.758.006-4.138z" fill="#4285F4"></path><path d="M2.906 16.764c1.136-.896 2.273-1.796 3.41-2.697A6.58 6.58 0 008.7 17.323a6.17 6.17 0 002.318 1.02c.817.172 1.663.15 2.486.007a5.91 5.91 0 002.295-.924l3.31 2.617c-1.193 1.123-2.688 1.887-4.267 2.257-1.747.405-3.594.417-5.33-.057A10.234 10.234 0 015.726 20.3a10.684 10.684 0 01-2.821-3.536z" fill="#34A853">
                </path>
              </g>
            </svg>
          </span>
          <span class="signInText">Continue with  Google</span>
        </span>
      </el-button>
    </div>
    <div>

    </div>
  </el-dialog>
</div>
</template>


<script>


export default {
  name: 'Login1',
  props: [],
  data() {
    return {
      options: [],
      value: '',
      list: [],
      loading: false,
      dialogFormVisible: false,
      form: {
        account: '',
        password: '',
      },
      formLabelWidth: '0'
    }
  },
  methods: {



  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
/*.login {
  padding: 20px 0;
}*/
.el-dialog {
  width: 20%;
}
.el-button {
  width: 100%;
}
.el-button--primary {
  background: #d9aa29;
  border-color: #d9aa29;
}
.signInText {
  vertical-align: 7px;
  margin-left: 5px;
}
.line:before {
  margin-left: .25em;
  content: "";
  flex: 1;
  border-bottom: 1px solid #999;
}
.facebookIcon {
  fill: #3b5998;
  height: 24px;
  width: 24px;
}
.line {
  color: #999;
  font-size: 14px;
  display: flex;
  align-items: center;
  text-align: center;
  padding-top: 14px;
  padding-bottom: 14px;
}
.line:after {
  margin-left: .25em;
  content: "";
  flex: 1;
  border-bottom: 1px solid #999;
}

.btn {
  display: inline-block;
  border: 1px solid #a4a19e;
  width: 72px;
  height: 28px;
  margin: 15px 8px;
  line-height: 28px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  &:hover {
    border-color: #d9aa29 !important;
    color: #d9aa29 !important;
  }
}
@media screen and (max-width: 767px) {
  /deep/ .el-dialog {
    width: 80% !important;
  }
  .btn {
    display: inline-block;
    border: 1px solid #a4a19e;
    width: 72px;
    height: 28px;
    margin: 15px 8px;
    line-height: 28px;
    border-radius: 5px;
    color: #d9aa29;
    cursor: pointer;
  }
}
</style>
