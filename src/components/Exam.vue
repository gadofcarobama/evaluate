<template>
  <div class="exam">
    <el-row>
      <el-col :span="24">

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{examName}}</span>
          </div>
          <div class="t1">本试卷包含4道大题，27小题，总计100分，时间120分钟</div>
        </el-card>
      </el-col>
      <div class="btn1">
        <el-button round size="mini" type="primary">选择题&nbsp&nbsp&nbsp</el-button>
        <el-button round size="mini" type="success">填空题&nbsp&nbsp&nbsp</el-button>
        <el-button round size="mini" type="warning">简答题&nbsp&nbsp&nbsp</el-button>
        <el-button round size="mini" type="info">程序题&nbsp&nbsp&nbsp</el-button>
      </div>
      <el-col :span="18">
        <el-card class="box-card" id="t2">
          一，单项选择题(共有{{choices.length}}题，每题2分)
        </el-card>
        <el-card class="box-card" id="t3">
          <div v-for="(item,o) in choices" :key="o">
            {{o+1}}
            {{item.content}}
            <ul id="3">
              <el-radio-group v-model="item.sectionId" @change="find(item.sectionId,item.pid)">
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
        <el-card class="box-card" id="t20">
          二，填空题(共有{{blanks.length}}题，每题2分)
          <div v-for="(item,o) in blanks " :key='o'>
            {{o+1}}
            <pre v-html="item.content"></pre>
            <el-input placeholder="请输入答案，一连串就行，不要空格" v-model="item.blankContent"
                      v-on:blur="addBlank(item.pid,item.blankContent)"/>
          </div>
        </el-card>
        <el-card class="box-card" id="t21">
          三，简答题(共有{{ans.length}}题，每题2分)
          <div v-for="(item,o) in ans " :key='o'>
            {{o+1}}
            <pre v-html="item.content"></pre>
            <el-input placeholder="请输入答案，一连串就行，不要空格" v-model="item.ansConent" v-on:blur="addAns(item.pid,item.ansConent)"/>
          </div>
        </el-card>

      </el-col>

      <el-col :span="5">
        <el-card class="dati">
          <div slot="header" class="clearfix">
            <div class="el-icon-time">12:45</div>
          </div>
          <div>答题卡</div>
          <hr/>
          <div>
            <div class="t3">选择题</div>
            <div class="timu1">
              <div ref="aa">1</div>
              <div ref="bb">2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
            </div>
            <div class="timu2">
              <div>6</div>
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
            </div>
          </div>
          <div class="t4">填空题</div>
          <div class="timu3">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
          </div>
          <div class="timu4">
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
          </div>
          <div class="t5">简答题</div>
          <div class="timu5">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
          </div>
          <div class="t6">程序题</div>
          <div class="timu6">
            <div>1</div>
            <div>2</div>
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
          <el-button type="primary" size="medium" round @click="post">提交</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ElCard from "element-ui/packages/card/src/main";

  export default {
    components: {ElCard},
    name: "exam",
    mounted() {
      this.s();
      this.f();


    },

    data() {

      return {
        id1:0,
        id: 0,
        radio1: 5,
        radio2: '',
        result: {
          id: 1,
          demandId: 1,
          paper: {
            choice: [],
            blank: [],
            ans: []
          }
        },
        examName:'',
        course:'',
        exam: [{examName: ''},
          {course: ''},

        ],
        choices: [
          {chapter: ''},
          {content: ''},
          {pid: 0},
          {sectionId: 0},
          {sectionA: ''},
          {sectionB: ''},
          {sectionC: ''},
          {sectionD: ''},
        ],
        blanks: [
          {chapter: ''},
          {content: ''},
          {pid: 0},
          {blankContent: ''},
          {sectionId: 0},
          {tips: ''},
        ],
        ans: [
          {chapter: ''},
          {content: ''},
          {pid: 0},
          {ansConent: ''},
          {sectionId: 0},
        ]
      }
    },

    methods: {
      id: function () {
        this.id1 = this.$route.params.id;
        console.log('id is '+this.id1)

      },
      f: function () {
        for (let i = 0; i < this.choices.length; i++) {
          this.choices[i].sectionId = this.choices[i].pid
        }
        for (let i = 0; i < this.blanks.length; i++) {
          this.blanks[i].blankContent = this.blanks[i].pid
        }
        for (let i = 0; i < this.ans.length; i++) {
          this.ans[i].ansConent = this.ans[i].pid
        }
      },
      post: function () {
        this.axios.post('http://localhost:8085/student/submitPaper', {"result": this.result},
          {
            emulateJSON: true
          })
          .then(res => {

            console.log(res)
            console.log(res.data.code)
             if(res.data.code===200){
                  this.$router.replace({path:'/success'})
                }

          })
          .catch(err => {
            console.log(err)
          })
      },

      s: function () {
        this.axios.get('http://localhost:8085/paper/publish', {
          params: {
            "id": this.$route.params.id
          }

        })
          .then(res => {
            console.log(res)
            this.examName = res.data.data.examName;
            console.log(this.examName)
            this.course = res.data.course;
            this.choices = res.data.data.choices
            //console.log('222' + this.blanks + '2121')
            // this.choices.sectionId = res.data.data.choice[0].pid
            this.blanks = res.data.data.blanks
            this.ans = res.data.data.ans
          })
          .catch(err => {
            console.log(err)
          })
      },
      find: function (id, pid) {
        const self = this;
        switch (id) {
          case 1:
            var ans = '【A】';
            break;
          case 2:
            var ans = '【B】';
            break;
          case 3:
            var ans = '【C】'
            break;
          case 4:
            var ans = '【D】';
            break
        }
        let flag = 0;
        for (let i = 0; i < this.result.paper.choice.length; i++) {
          if (this.result.paper.choice[i].pid === pid) {
            this.result.paper.choice.splice(i, 1, {id: pid, answer: ans})
            flag = 1;
            console.log("flag is y")
          }
        }
        if (flag === 0 || this.result.paper.choice.length === 0) {
          console.log("flag is o")
          this.result.paper.choice.push({id: pid, answer: ans})
        }
        console.log(this.result.paper.choice)
        console.log("id is " + id + ' pid is ' + pid)
      },
      addBlank(pid, answer) {
        console.log('pid is ' + pid + '   ans is ' + answer)

        let flag = 0;
        for (let i = 0; i < this.result.paper.blank.length; i++) {
          if (this.result.paper.blank[i].pid === pid) {
            this.result.paper.blank.splice(i, 1, {id: pid, answer: answer})
            flag = 1;
            console.log("flag is y")

          }
        }

        if (flag === 0 || this.result.paper.blank.length === 0) {
          console.log("flag is o")
          this.result.paper.blank.push({id: pid, answer: answer})
        }
        console.log('blank' + this.result.paper.blank)
      },
      addAns: function (pid, answer) {
        let flag = 0;
        for (let i = 0; i < this.result.paper.ans.length; i++) {
          if (this.result.paper.ans[i].pid === pid) {
            this.result.paper.ans.splice(i, 1, {pid: pid, answer: answer})
            flag = 1;
            console.log('ans' + this.result.paper.ans)
          }

        }
        if (flag === 0 || this.result.paper.ans.length === 0) {
          console.log("flag is o")
          this.result.paper.ans.push({id: pid, answer: answer})
        }
        console.log('ans2' + this.result.paper.ans)
      },
      init() {
        const self = this;
        this.$refs.aa.style.backgroundColor = 'gray';
      }
    },

  }
</script>

<style scoped>
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
    font-size: 10px;
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
    margin-top: 10px;

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


</style>
