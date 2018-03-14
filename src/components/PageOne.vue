<template>
  <div class="exam">
    <Menu></Menu>
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
        <el-button round size="mini" type="primary" v-show="choiceFlag">选择题&nbsp&nbsp&nbsp</el-button>
        <el-button round size="mini" type="success" v-show="blankFlag">填空题&nbsp&nbsp&nbsp</el-button>
        <el-button round size="mini" type="warning" v-show="ansFlag">简答题&nbsp&nbsp&nbsp</el-button>
        <el-button round size="mini" type="info" v-show="codeFlag">程序题&nbsp&nbsp&nbsp</el-button>
      </div>
      <el-col :span="18">
        <el-card class="box-card" id="t2" v-show="choiceFlag">
          <font size="3px">单项选择题(共有{{choices.length}}题，每题{{this.choiceScore}}分)</font>
        </el-card>
        <el-card class="box-card" id="t3">
          <div v-for="(item,o) in choices" :key="o">
            {{o+1}}
            {{item.title}}
            <ul id="3">
              <el-radio-group v-model="item.sectionId" @change="find(item.sectionId,item.id)">
                <li>
                  <el-radio :label="1">A.{{item.sectionA}}</el-radio>
                </li>
                <li>
                  <el-radio :label="2">B.{{item.sectionB}}</el-radio>
                </li>
                <li>
                  <el-radio :label="3">C.{{item.sectionC}}</el-radio>
                </li>
                <li>
                  <el-radio :label="4">D.{{item.sectionD}}</el-radio>
                </li>
              </el-radio-group>
            </ul>
          </div>
        </el-card>
        <el-card class="box-card" id="t20" v-show="blankFlag">
          填空题(共有{{blanks.length}}题，每题{{this.blankScore}}分)
          <div v-for="(item,o) in blanks " :key='o'>
            {{o+1}}
            <pre v-html="item.title"></pre>
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
          <div v-for="(item,index) in code">
            <el-card>{{index+1}}
              <pre>{{item.title}}</pre>
              <!--<el-input type="textarea"></el-input>-->
              <codemirror :options="{  mode: 'javascript',
    extraKeys: {'Ctrl': 'autocomplete'},lineNumbers: true,theme: 'eclipse'}"
                          v-model="item.codeContent"
                          v-on:blur="addCode(item.id,item.codeContent)"></codemirror>
            </el-card>
            <el-button type="primary" style="float: right">测试</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="dati" ref="anscard">
          <div slot="header" class="clearfix">
            <div class="el-icon-time">12:45</div>
          </div>
          <div>答题卡</div>
          <hr/>
          <div>
            <div class="t3" v-show="choiceFlag">选择题</div>
            <div class="timu1" v-for="(item,index) in choices">
              <!--动态绑定class-->
              <div v-bind:class="{active:isactive}">{{index+1}}</div>
            </div>
          </div>
          <div class="t4" v-show="blankFlag">填空题</div>
          <div class="timu3" v-for="(item,index) in blanks">
            <div>{{index+1}}</div>
          </div>
          <div class="t5" v-show="ansFlag">简答题</div>
          <div class="timu5" v-for="(item,index) in ans">
            <div>{{index+1}}</div>
          </div>
          <div class="t6" v-show="codeFlag">程序题</div>
          <div class="timu6" v-for="(item,index) in code">
            <div>{{index+1}}</div>
          </div>
          <div class="t7">
            <div></div>
            <div></div>
            <div></div>
          </div>
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
          <el-button type="primary" size="medium" round @click="post" class="postbtn">提交</el-button>
        </el-card>
      </el-col>
    </el-row>
    <!--<input class="blanknum" @blur="test()" style="border: 0px solid #878787; border-bottom-width: 1px;"/>-->
  </div>
</template>
<script>

  // var Vue=_require('vue')
  // var VueCodeMirroer=_require('vue-codemirror-lite')
  // Vue.use(VueCodeMirroer)
  // require('codemirror/mode/javascript/javascript')
  // require('codemirror/mode/vue/vue')
  // require('codemirror/addon/hint/show-hint.js')
  // require('codemirror/addon/hint/show-hint.css')
  // require('codemirror/addon/hint/javascript-hint.js')
  import ElCard from "element-ui/packages/card/src/main";
  import {codemirror} from 'vue-codemirror-lite'
  import Menu from './Menu'
  require('codemirror/mode/javascript/javascript')
  require('codemirror/mode/vue/vue')
  // require('codemirror/mode/java/java')
  require('codemirror/theme/eclipse.css')
  require('codemirror/addon/hint/show-hint.js')
  require('codemirror/addon/hint/show-hint.css')
  require('codemirror/addon/hint/javascript-hint.js')
  export default {
    components: {
      ElCard,
      codemirror,
      Menu
    },
    name: "page-one",
    mounted() {
      this.getPage();
      this.f();

      window.addEventListener('scroll', this.scroll)
    },
    data() {
      return {
        sumScore: 0,
        smalltest:0,
        bigtest:0,
        isactive: false,
        choiceFlag: true,
        blankFlag: true,
        ansFlag: true,
        codeFlag: true,
        scrolltop: 0,
        choiceScore: 0,
        blankScore: 0,
        ansQuestionScore: 0,
        codeScore: 0,
        radio1: 5,
        radio2: '',
        result: {
          studentId: 0,
          pageId: 0,
          answer: []
        },
        examName: '',
        course: '',
        exam: [{examName: ''},
          {course: ''},

        ],
        choices: [
          {score: 0},
          {id: 0},
          {sectionId: 0},
          {title: ''},
          {sectionA: ''},
          {sectionB: ''},
          {sectionC: ''},
          {sectionD: ''},
        ],
        blanks: [
          {blankNum: ''},
          {title: ''},
          {id: 0},
          {blankContent: ''},
          {sectionId: 0},
          {tips: ''},
          {content: ''}
        ],
        ans: [
          {title: ''},
          {content: ''},
          {id: 0},
          {ansConent: ''},
          {sectionId: 0},
        ],
        code: [
          {
            codeContent: ''
          }
        ],
        inputHtml: '<input class="blanknum"  blur="test()" style="border: 0px solid #878787; border-bottom-width: 1px;" align="center" readonly="readonly"/>'
      }
    },

    methods: {

      scroll: function () {
        this.scrolltop = document.documentElement.scrollTop || document.body.scrollTop
        // console.log('this scroll is ::'+this.scrolltop)
      },
      f: function () {
        for (let i = 0; i < this.choices.length; i++) {
          this.choices[i].sectionId = this.choices[i].id
        }
        for (let i = 0; i < this.blanks.length; i++) {
          this.blanks[i].blankContent = this.blanks[i].id
        }
        for (let i = 0; i < this.ans.length; i++) {
          this.ans[i].ansConent = this.ans[i].id
        }
        for (let i = 0; i < this.code.length; i++) {
          this.code[i].codeContent = this.code[i].id
        }
      },
      post: function () {
        let studentId = JSON.parse(window.localStorage.getItem('user')).id  // 从 local 里面获取
        this.result.studentId = studentId
        // console.log('studentId3 is ::'+this.result.studentId)
        // console.log('result length is::'+this.result.length)
        this.axios.post('http://193.112.6.35:8080/page/addAns', {"result": this.result},
          {
            emulateJSON: true
          })
          .then(res => {
            console.log(res)
            console.log(res.data.code)

            if (res.data.code == 200) {
              this.$router.push({path: '/success', query: {studentId: this.result.studentId}})
            }else {
              alert("请勿重复提交")
            }
          })
          .catch(err => {
            console.log(err)
            alert("请勿重复提交")

          })
      },

      getPage: function () {
        let classId = this.$route.query.classId;
        this.result.pageId = this.$route.query.pageId
        // console.log('this.pageid is::'+this.result.pageId)
        // console.log('pageid is::'+pageId)
        this.axios.get('http://193.112.6.35:8080/page/onePage', {
          params: {
            "classId": classId,
            "pageId": this.result.pageId
          }
        })
          .then(res => {
            console.log(res)
            this.choices = res.data.data.signChoice
            this.blanks = res.data.data.blank
            this.ans = res.data.data.ansQuestion
            this.code = res.data.data.codeQuestion
            if (this.choices.length == 0) {
              this.choiceFlag = false
            }
            if (this.blanks.length == 0) {
              this.blankFlag = false
            }
            if (this.ans.length == 0) {
              this.ansFlag = false
            }
            if (this.code.length == 0) {
              this.codeFlag = false
            }
            //
            for (var i = 0; i < this.blanks.length; i++) {
              var str = this.blanks[i].title
              console.log(str)
              // this.blanks[i].title.replace(/b/,"0")
              var result = str.replace(/【 】/gm, this.inputHtml)//'<input data-v-668945f7 class="blanknum" style="border: 0px solid #878787;border-bottom-width: 1px;" />') //v-model="item.blankContent" onblur="this.addBlank(item.id,item.blankContent)"/>')
              // console.log(result)
              this.blanks[i].title = result
            }
            if (res.data.data.signChoice.length != 0) {
              this.choiceScore = res.data.data.signChoice[0].score
            }
            if (res.data.data.blank.length != 0) {
              this.blankScore = res.data.data.blank[0].score
            }
            if (res.data.data.ansQuestion.length != 0) {
              this.ansQuestionScore = res.data.data.ansQuestion[0].score
            }
            if (res.data.data.codeQuestion.length != 0) {
              this.codeScore = res.data.data.codeQuestion[0].score
            }
            this.sumScore = this.choiceScore * this.choices.length + this.blankScore * this.blanks.length + this.ansQuestionScore * this.ans.length + this.codeScore * this.code.length
            this.smalltest=this.choices.length+this.blanks.length+this.ans.length+this.code.length
             if(this.choices.length!==0){
              this.bigtest+=1
             }
             if(this.blanks.length!==0){
              this.bigtest+=1
             }
             if(this.ans.length!==0){
              this.bigtest+=1
             }
             if(this.code.length!==0){
              this.bigtest+=1
             }
          })
          .catch(err => {
            console.log(err)
          })
      },
      test: function () {
        console.log("test")
      },

      find: function (pid, id) {
        // var thisid=id
        // this.$refs.thisid.style.backgroundColor='gray'
        const self = this;
        switch (pid) {
          case 1:
            var ans = 'A';
            break;
          case 2:
            var ans = 'B';
            break;
          case 3:
            var ans = 'C'
            break;
          case 4:
            var ans = 'D';
            break
        }
        let flag = 0;
        for (let i = 0; i < this.result.answer.length; i++) {
          if (this.result.answer[i].id === id) {
            this.result.answer.splice(i, 1, {id: id, answer: ans})
            flag = 1;
            // console.log("flag is y")
          }
        }
        if (flag === 0 || this.result.answer.length === 0) {
          // console.log("flag is o")
          this.result.answer.push({id: id, answer: ans})
        }
        // console.log(this.result.answer)
        // console.log("id is " + id + ' pid is ' + id)
        this.isactive = true
      }
      ,
      addBlank(pid, answer) {
        console.log('pid is ' + pid + '   ans is ' + answer)
        let flag = 0;
        for (let i = 0; i < this.result.answer.length; i++) {
          if (this.result.answer[i].id === pid) {
            this.result.answer.splice(i, 1, {id: pid, answer: answer})
            flag = 1;
            console.log('flag is 1')
          }
        }
        if (flag === 0 || this.result.answer.length === 0) {
          console.log("flag is o")
          this.result.answer.push({id: pid, answer: answer})
        }
        console.log('blank::' + this.result.answer)
      }
      ,
      addAns: function (pid, answer) {
        let flag = 0;
        for (let i = 0; i < this.result.answer.length; i++) {
          if (this.result.answer[i].id === pid) {
            this.result.answer.splice(i, 1, {id: pid, answer: answer})
            flag = 1;
            // console.log('ans' + this.result)
            // console.log("flag is 1")
          }

        }
        if (flag === 0 || this.result.answer.length === 0) {
          // console.log("flag is o")
          this.result.answer.push({id: pid, answer: answer})
        }
        // console.log('ans2' + this.result)
      }
      ,
      addCode: function (pid, answer) {
        let flag = 0;
        for (let i = 0; i < result.answer.length; i++) {
          if (this.result.answer[i].id === pid) {
            this.result.answer.splice(i, 1, {id: pid, answer: answer})
            flag = 1
          }
        }
        if (flag === 0 || this.result.answer.length === 0) {
          this.result.answer.push({id: pid, answer: answer})
        }
      },
      init() {
        const self = this;
        this.$refs.aa.style.backgroundColor = 'gray';
      }
    },


  }
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
    margin-top: 75px;
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

  .blankinput {
    width: 200px;
    border: 0px solid #878787;
    border-bottom-width: 1px;
    text-align: center;
  }

</style>
