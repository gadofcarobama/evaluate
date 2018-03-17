<template>
  <span class="exam">
    <Menu></Menu>
    <UserPop></UserPop>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{examName}}</span>
          </div>
          <div class="t1">本试卷包含{{this.bigtest}}道大题，{{this.smalltest}}小题，总计{{this.sumScore}}分</div>
        </el-card>
      </el-col>
      <div class="btn1">
        <el-button round size="mini" type="primary" v-show="choiceFlag">选择题&nbsp;&nbsp;&nbsp;</el-button>
        <el-button round size="mini" type="success" v-show="blankFlag">填空题&nbsp;&nbsp;&nbsp;</el-button>
        <el-button round size="mini" type="warning" v-show="ansFlag">简答题&nbsp;&nbsp;&nbsp;</el-button>
        <el-button round size="mini" type="info" v-show="codeFlag">程序题&nbsp;&nbsp;&nbsp;</el-button>
      </div>
      <el-col :span="18">
        <el-card class="box-card" id="t2" v-show="choiceFlag">
          <font size="3px">单项选择题(共有{{choices.length}}题，每题{{this.choiceScore}}分)</font>
        </el-card>
        <el-card class="box-card" id="t3">
          <div v-for="(item,o) in choices" :key="o">

            <div class="ans-title"> {{o+1}}、{{item.title}}</div>
            <ul id="3">
              <el-radio-group v-model="item.sectionId" @change="find(item.sectionId,item.id)">
                <li>
                  <el-radio :label="1" class="ans-title">A.{{item.sectionA}}</el-radio>
                </li>
                <li>
                  <el-radio :label="2" class="ans-title">B.{{item.sectionB}}</el-radio>
                </li>
                <li>
                  <el-radio :label="3" class="ans-title">C.{{item.sectionC}}</el-radio>
                </li>
                <li>
                  <el-radio :label="4" class="ans-title">D.{{item.sectionD}}</el-radio>
                </li>
              </el-radio-group>
            </ul>
          </div>
        </el-card>
        <el-card class="box-card" id="t20" v-show="blankFlag">
          填空题(共有{{blanks.length}}题，每题{{this.blankScore}}分)
          <div v-for="(item,o) in blanks " :key='o'>
            <div class="ans-title">{{o+1}}</div>
            <pre v-html="(item.title)" class="ans-title"></pre>
            <!--<div v-for="i in item.blankNum" class="blanknum">-->
            请作答： <input v-model="item.blankContent"
                        v-on:blur="addBlank(item.id,item.blankContent)" class="blankinput" placeholder="每空答案请用【】包裹"/>
            <!--</div>-->
          </div>
        </el-card>
        <el-card class="box-card" id="t21" v-show="ansFlag">
          简答题(共有{{ans.length}}题，每题{{this.ansQuestionScore}}分)
          <div v-for="(item,o) in ans " :key='o'>
            {{o+1}}
            <pre v-html="item.title"></pre>
            <el-input placeholder="请输入答案" v-model="item.ansConent" v-on:blur="addAns(item.id,item.ansConent)"/>
          </div>
        </el-card>
        <el-card class="box-card" id="t22" v-show="codeFlag">
          程序题(共有{{code.length}}题，每{{this.codeScore}}分)
          <div v-for="(item,index) in code" >
            <el-card>{{index+1}}
              <pre class="ans-title">{{item.title}}</pre>

              <codemirror ref="codeEditor" :options="{  mode: 'javascript',
    extraKeys: {'Ctrl': 'autocomplete'},lineNumbers: true,theme: 'eclipse'}"
                          @input="onCmCodeChange"

                          />
            </el-card>

            <el-button type="primary" style="float: right">测试</el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :span="5">
        <el-card class="dati" ref="anscard">
          <div slot="header">
            <div class="el-icon-time">12:45</div>
          </div>
          <span>答题卡</span>


          <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="选择题" name="1" v-show="choiceFlag">
        <div class="box" v-for="(item,index) in choices" :key="item">

          <div v-if="item.isChoice !== 'x'">
          {{item.isChoice}}
          </div>
          <div v-else-if="item.isChoice == 'x'">
          {{index+1}}
          </div>
        </div>

  </el-collapse-item>
  <el-collapse-item title="填空题" v-show="blankFlag" name="2">
   <div class="box" v-for="(item,index) in blanks" :key="item">
            <div>{{index+1}}</div>
          </div>
  </el-collapse-item>
  <el-collapse-item title="简答题" name="3" v-show="ansFlag">
     <div class="box" v-for="(item,index) in ans" :key="item">
            <div>{{index+1}}</div>
          </div>
  </el-collapse-item>
  <el-collapse-item title="程序题" name="4" v-show="codeFlag">
    <div class="box" v-for="(item,index) in code" :key="item">
            <div>{{index+1}}</div>
          </div>
  </el-collapse-item>
</el-collapse>

          <br>
          <div class="t8">
            <div class="t9">已做</div>
            <div>未做</div>
          </div>
          <div class="t12">
            <div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
          <el-button type="primary" size="medium" round @click="post " class="postbtn">提交</el-button>
        </el-card>
      </el-col>
    </el-row>
  </span>
</template>

<script>
import ElCard from "element-ui/packages/card/src/main";
import { codemirror } from "vue-codemirror-lite";
import Menu from "./Menu";
import UserPop from "./UserPop"
require("codemirror/mode/javascript/javascript");
require("codemirror/theme/eclipse.css");
require("codemirror/addon/hint/show-hint.js");
require("codemirror/addon/hint/show-hint.css");
require("codemirror/addon/hint/javascript-hint.js");
export default {
  components: {
    ElCard,
    codemirror,
    Menu,
    UserPop
  },
  name: "page-one",
  mounted() {
    this.getPage();
    this.f();
    this.judge();
    window.addEventListener("scroll", this.scroll);
  },
  data() {
    return {
      sumScore: 0,
      smalltest: 0,
      bigtest: 0,
      isactive: false,
      choiceFlag: true,
      blankFlag: true,
      ansFlag: true,
      codes: "",
      codeFlag: true,
      scrolltop: 0,
      choiceScore: 0,
      blankScore: 0,
      ansQuestionScore: 0,
      codeScore: 0,
      radio1: 5,
      radio2: "",
      result: {
        studentId: 0,
        pageId: 0,
        answer: []
      },
      examName: "",
      course: "",
      exam: [{ examName: "" }, { course: "" }],
      choices: [
        { score: 0 },
        { id: 0 },
        { sectionId: 0 },
        { title: "" },
        { sectionA: "" },
        { sectionB: "" },
        { sectionC: "" },
        { sectionD: "" },
        { isChoice: "x" }
      ],
      blanks: [
        { blankNum: "" },
        { title: "" },
        { id: 0 },
        { blankContent: "" },
        { sectionId: 0 },
        { tips: "" },
        { content: "" }
      ],
      ans: [
        { title: "" },
        { content: "" },
        { id: 0 },
        { ansConent: "" },
        { sectionId: 0 }
      ],
      code: [
        {
          codeContent: ""
        }
      ],
      dialogVisible: false,
      inputHtml:
        '<input class="blanknum"  blur="test()" style="border: 0px solid #878787; border-bottom-width: 1px;" align="center" readonly="readonly"/>'
    };
  },

  methods: {
    judge:function () {
      if (!this.user.name){
        this.$router.replace('/studentLogin')
      }
    },
    scroll: function() {
      this.scrolltop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // console.log('this scroll is ::'+this.scrolltop)
    },
    f: function() {
      for (let i = 0; i < this.choices.length; i++) {
        this.choices[i].sectionId = this.choices[i].id;
      }
      for (let i = 0; i < this.blanks.length; i++) {
        this.blanks[i].blankContent = this.blanks[i].id;
      }
      for (let i = 0; i < this.ans.length; i++) {
        this.ans[i].ansConent = this.ans[i].id;
      }
      for (let i = 0; i < this.code.length; i++) {
        this.code[i].codeContent = this.code[i].id;
      }
    },
    post: function() {
      if (this.code.length != 0) {
        let flag = 0;
        for (let i = 0; i < this.result.answer.length; i++) {
          if (this.result.answer[i].id === this.code[0].id) {
            this.result.answer.splice(i, 1, {
              id: this.code[0].id,
              ans: this.codes
            });
            flag = 1;
            console.log("flag is 1");
          }
        }
        if (flag === 0 || this.result.answer.length === 0) {
          console.log("flag is o");
          this.result.answer.push({ id: this.code[0].id, ans: this.codes });
        }
      }
      console.log(this.result.answer.length);
      console.log(this.result.answer);
      if(this.result.answer.length<this.smalltest){
      console.log("答案为空，无法提交");
        this.$notify.error({
          title: "错误",
          message: "有试题未填写,请认真答题。"
        });
         return;
      }
      this.result.studentId = JSON.parse(
        window.localStorage.getItem("user")
      ).id;
      this.axios
        .post(
          "http://193.112.6.35:8080/page/addAns",
          { result: this.result },
          {
            emulateJSON: true
          }
        )
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            // this.dialogVisible = true;
            this.$confirm("答案已经提交,请等待评测结果")
              .then(_ => {
                console.log("这是提交成功后");
                this.$router.push({
                  path: "/resultPage",
                  query: { studentId: this.result.studentId }
                });
              })
              .catch(_ => {
                console.log("这是提交成功后");
                this.$router.push({
                  path: "/resultPage",
                  query: { studentId: this.result.studentId }
                });
              });
          } else {
            this.$notify.error({
              title: "错误",
              message: "你已经提交过答案，请勿重复提交！"
            });
          }
        })
        .catch(err => {
          this.$notify.error({
            title: "错误",
            message: "你已经提交过答案，请勿重复提交！"
          });
          console.log(err);
        });
    },
    getPage: function() {
      let classId = this.$route.query.classId;
      this.result.pageId = this.$route.query.pageId;
      this.axios
        .get("http://193.112.6.35:8080/page/onePage", {
          params: {
            classId: classId,
            pageId: this.result.pageId
          }
        })
        .then(res => {
          console.log(res);
          this.choices = res.data.data.signChoice;
          this.blanks = res.data.data.blank;
          this.ans = res.data.data.ansQuestion;
          this.code = res.data.data.codeQuestion;
          if (this.choices.length === 0) {
            this.choiceFlag = false;
          }
          if (this.blanks.length === 0) {
            this.blankFlag = false;
          }
          if (this.ans.length === 0) {
            this.ansFlag = false;
          }
          if (this.code.length === 0) {
            this.codeFlag = false;
          }

          for (let i = 0; i < this.blanks.length; i++) {
            const str = this.blanks[i].title;
            // this.blanks[i].title.replace(/b/,"0")
            //'<input data-v-668945f7 class="blanknum" style="border: 0px solid #878787;border-bottom-width: 1px;" />') //v-model="item.blankContent" onblur="this.addBlank(item.id,item.blankContent)"/>')
            // console.log(result)
            this.blanks[i].title = str.replace(/【 】/gm, this.inputHtml);
          }
          if (res.data.data.signChoice.length !== 0) {
            this.choiceScore = res.data.data.signChoice[0].score;
          }
          if (res.data.data.blank.length !== 0) {
            this.blankScore = res.data.data.blank[0].score;
          }
          if (res.data.data.ansQuestion.length !== 0) {
            this.ansQuestionScore = res.data.data.ansQuestion[0].score;
          }
          if (res.data.data.codeQuestion.length !== 0) {
            this.codeScore = res.data.data.codeQuestion[0].score;
          }
          this.sumScore =
            this.choiceScore * this.choices.length +
            this.blankScore * this.blanks.length +
            this.ansQuestionScore * this.ans.length +
            this.codeScore * this.code.length;
          this.smalltest =
            this.choices.length +
            this.blanks.length +
            this.ans.length +
            this.code.length;
          if (this.choices.length !== 0) {
            this.bigtest += 1;
          }
          if (this.blanks.length !== 0) {
            this.bigtest += 1;
          }
          if (this.ans.length !== 0) {
            this.bigtest += 1;
          }
          if (this.code.length !== 0) {
            this.bigtest += 1;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    test: function() {
      console.log("test");
    },

    find: function(pid, id) {
      let ans;
      const self = this;

      switch (pid) {
        case 1:
          ans = "【A】";
          break;
        case 2:
          ans = "【B】";
          break;
        case 3:
          ans = "【C】";
          break;
        case 4:
          ans = "【D】";
          break;
      }
      for (let i = 0; i < this.choices.length; i++) {
        if (id === this.choices[i].id) {
          this.choices[i].isChoice = ans;
          // 刷新数据
        }
      }
      let flag = 0;
      for (let i = 0; i < this.result.answer.length; i++) {
        if (this.result.answer[i].id === id) {
          this.result.answer.splice(i, 1, { id: id, ans: ans });
          flag = 1;
        }
      }
      if (flag === 0 || this.result.ans.length === 0) {
        this.result.answer.push({ id: id, ans: ans });
      }
      this.isactive = true;
    },
    addBlank(pid, answer) {
      let flag = 0;
      for (let i = 0; i < this.result.answer.length; i++) {
        if (this.result.answer[i].id === pid) {
          this.result.answer.splice(i, 1, { id: pid, ans: answer });
          flag = 1;
          console.log("flag is 1");
        }
      }
      if (flag === 0 || this.result.answer.length === 0) {
        console.log("flag is o");
        this.result.answer.push({ id: pid, ans: answer });
      }
      console.log("blank::" + this.result.answer);
    },
    addAns: function(pid, answer) {
      let flag = 0;
      for (let i = 0; i < this.result.answer.length; i++) {
        if (this.result.answer[i].id === pid) {
          this.result.answer.splice(i, 1, { id: pid, ans: answer });

          flag = 1;
          // console.log('ans' + this.result)
          // console.log("flag is 1")
        }
      }
      if (flag === 0 || this.result.answer.length === 0) {
        // console.log("flag is o")
        this.result.answer.push({ id: pid, ans: answer });
      }
      // console.log('ans2' + this.result)
    },
    addCode: function(pid, answer) {
      console.log("code is " + answer);
      let flag = 0;
      for (let i = 0; i < result.answer.length; i++) {
        if (this.result.answer[i].id === pid) {
          this.result.answer.splice(i, 1, { id: pid, ans: answer });
          flag = 1;
        }
      }
      if (flag === 0 || this.result.answer.length === 0) {
        this.result.answer.push({ id: pid, ans: answer });
      }
    },
    onCmCodeChange(newCode) {
      console.log("this is new code", newCode);
      this.codes = newCode;
    },
    init() {
      const self = this;
      this.$refs.aa.style.backgroundColor = "gray";
    }
  },
  computed: {
    editor() {
      return this.$refs.codeEditor.editor;
    },
    user(){
      return JSON.parse(window.localStorage.getItem('user'))
    }
  }
};
</script>

<style scoped>
.blanknum {
  border: 0px solid #878787;
  border-bottom-width: 1px;
}

/*.blankinput{*/
/*width: 60px;*/
/*}*/
.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.clearfix {
  text-align: center;
}

.t1 {
  font-size: 18px;
}

.btn1 {
  margin-top: 125px;
  margin-left: 30px;
}

#t2 {
  margin-top: 10px;
  font-size: 10px;
}

.dati {
  margin-left: 50px;
  margin-bottom: 30px;
  position: fixed;
}

.datika {
  width: 200px;
  height: 50px;
  background-color: darkgrey;
  margin-top: 0;
  text-align: center;
}

.t3 {
  font-size: 10px;
}

.timu1 div {
  float: left;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  font-size: 5px;
  margin-left: 10px;
  text-align: center;
  margin-top: 10px;
  /*background-color: darkgrey;*/
}

.timu2 div {
  float: left;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  font-size: 5px;
  margin-left: 10px;
  text-align: center;
  margin-top: 7px;
}

.t4 {
  font-size: 10px;
  margin-top: 72px;
}

.timu3 div {
  float: left;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  font-size: 5px;
  margin-left: 10px;
  text-align: center;
  margin-top: 10px;
}

.timu4 div {
  float: left;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  font-size: 5px;
  margin-left: 10px;
  text-align: center;
  margin-top: 10px;
}

.t5 {
  font-size: 10px;
  margin-top: 85px;
}

.timu5 div {
  float: left;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  font-size: 5px;
  margin-left: 10px;
  text-align: center;
  margin-top: 10px;
}

.t6 {
  font-size: 10px;
  margin-top: 42px;
}

.timu6 div {
  float: left;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  font-size: 5px;
  margin-left: 10px;
  text-align: center;
  margin-top: 10px;
}

.t7 {
  font-size: 10px;
  float: left;
}

.t7 div {
  float: left;
  width: 20px;
  height: 20px;
  font-size: 5px;
  margin-left: 10px;
  text-align: center;
  margin-top: 10px;
}

.t8 {
  font-size: 10px;
}

.t8 div {
  float: left;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  font-size: 5px;
  margin-left: 2px;
  text-align: center;
  margin-top: 7px;
}

.t9 {
  background-color: darkgrey;
}

.t10 {
  border: 1px solid white;
}

.t12 {
  float: left;
  width: 20px;
  height: 20px;

  font-size: 5px;
  margin-left: 2px;
  text-align: center;
  margin-top: 7px;
}

#t3 {
  margin-top: 10px;
  font-size: 10px;
}

.active {
  background-color: gray;
}

.box {
  float: left;
  margin: 5px;
  border: solid 1px black;
  width: 20px;
  height: 20px;
  text-align: center;
}

.title {
  margin-top: 5px;
}

.card-content {
  margin: 20px;
  width: 100%;
  child-align: auto;
}

.blankinput {
  width: 200px;
  border: 0px solid #878787;
  border-bottom-width: 1px;
  text-align: center;
}

.ans-title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 14px;
}
</style>
