<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
      <el-card class="box-card" style="background: whitesmoke">

        <div slot="header" class="clearfix">
          <span> 请输入考试相关信息</span>
        </div>
        <div class="t">
          <div class="q">考试班级</div>
          <div class="q">
            <el-input type="input" style="width: 100px; " v-model="classId"></el-input>
          </div>
        </div>
        <div class="t">
          <div class="q">试卷名称 {{this.$route.params.examName}}</div>

        </div>

      </el-card>
      <el-card class="s" style="background: whitesmoke">

        <div slot="header" class="clearfix">
          <span> 一.请选择所出试题的试题类型</span>
        </div>
        <div class="choice">

          <ul>
            <el-checkbox label="选择题" @change="show1=!show1"></el-checkbox>
          </ul>
          <ul>
            <el-checkbox label="填空题" @change="show2=!show2"></el-checkbox>
          </ul>
          <ul>
            <el-checkbox label="简答题" @change="show3=!show3"></el-checkbox>
          </ul>
          <ul>
            <el-checkbox label="程序题" @change="show4=!show4"></el-checkbox>
          </ul>
        </div>
      </el-card>
      <el-collapse-transition>
        <div v-show="show1">
          <el-card class="box-card" style="background: whitesmoke" body-style="{float:left}">
            <div slot="header" class="clearfix">
          <span>
            1.请输入选择题数量和分数
          </span>

            </div>

            <div class="t">
              <div class="q">试题数</div>
              <div class="q">
                <el-input type="input" size="small" class="qqq" style="border-radius: 44px; width: 55px;"
                          v-model="choiceQuestionsNum"></el-input>
              </div>
            </div>
            <div class="t">
              <div class="q">每题</div>
              <div class="q">
                <el-input type=" input" size="small" class="qqq" style="border-radius: 44px; width: 55px;"
                          v-model="choiceQuestionsScore"></el-input>
              </div>
              <div class="q">分</div>

            </div>
          </el-card>
        </div>
      </el-collapse-transition>
      <el-collapse-transition>
        <div v-show="show2">
          <el-card class="box-card" style="background: whitesmoke">
            <div slot="header" class="clearfix">
          <span>
            2.请输入填空题数量和分数
          </span>

            </div>
            <div class="t">
              <div class="q">试题数</div>
              <div class="q">
                <el-input type="input" size="small" class="qqq" style="border-radius: 44px; width: 55px;"
                          v-model="fillInTheBlankQuestionsNum"></el-input>
              </div>
            </div>
            <div class="t">
              <div class="q">每题</div>
              <div class="q">
                <el-input type=" input" size="small" style="border-radius: 44px; width: 55px;"
                          v-model="fillInTheBlankQuestionsScore"></el-input>
              </div>
              <div class="q">分</div>
            </div>
          </el-card>
        </div>
      </el-collapse-transition>
      <el-collapse-transition>
        <div v-show="show3">
          <el-card class="box-card" style="background: whitesmoke">
            <div slot="header" class="clearfix">
          <span>
            3.请输入简答题数量和分数
          </span>

            </div>
            <div class="t">
              <div class="q">试题数</div>
              <div class="q">
                <el-input type="input" size="small" style="border-radius: 44px; width: 55px" class="qqq"
                          v-model="shrAnsNum"></el-input>
              </div>
            </div>
            <div class="t">
              <div class="q">每题</div>
              <div class="q">
                <el-input type=" input" size="small" style="border-radius: 44px; width: 55px;"
                          v-model="shrAnsScore"></el-input>
              </div>
              <div class="q">分</div>
            </div>
          </el-card>
        </div>
      </el-collapse-transition>
      <el-collapse-transition>
        <div v-show="show4">
          <el-card class="box-card" style="background: whitesmoke">
            <div slot="header" class="clearfix">
          <span>
            4.请输入程序题数量和分数
          </span>

            </div>
            <div class="t">
              <div class="q">试题数</div>
              <div class="q">
                <el-input type="input" size="small" class="qqq" style="border-radius: 44px; width: 55px;"
                          v-model="programProgramNum"></el-input>
              </div>
            </div>
            <div class="t">
              <div class="q">每题</div>
              <div class="q">
                <el-input type=" input" size="small" style="border-radius: 44px;width: 55px;"
                          v-model="programProgramScore"></el-input>
              </div>
              <div class="q">分</div>
            </div>
          </el-card>
        </div>
      </el-collapse-transition>
      <el-card class="box-card" style="background: whitesmoke">
        <div slot="header" class="clearfix">
          <span>
            二.请选择试题难度
          </span>

        </div>
        <div class="choice">
          <el-radio-group v-model="radio2">
            <ul>
              <el-radio :label="3">简单</el-radio>
            </ul>
            <ul>
              <el-radio :label="6">中等</el-radio>
            </ul>
            <ul>
              <el-radio :label="9">困难</el-radio>
            </ul>

          </el-radio-group>

        </div>
      </el-card>
      <el-card class="box-card" style="background: whitesmoke;height: 200px">
        <div slot="header" class="clearfix">
          <span>
            三.请选择考试范围
          </span>
        </div>
        <div>
          <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选-->
          <!--</el-checkbox>-->
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedChapters"
                             @change="getValue(checkedChapters)">
            <el-checkbox v-model="chapters" v-for="(chapter,o) in chapters" :key="o" :label="chapter">{{chapter}}
            </el-checkbox>
          </el-checkbox-group>

        </div>
      </el-card>
      <el-card style="background: whitesmoke;height: 200px;text-align: left">
        <div slot="header" class="clearfix">
          <span>四.请输入考试时长</span>
        </div>
        <div class="block">

          <el-date-picker
            v-model="value1"
            @change="getTime(value1)"
            type="datetimerange"
            :picker-options="pickerOptions2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>

        </div>
        <div class="bt">
          <router-link :to="'/createTest/'+examName">
            <el-button type="primary" style="margin-right: 75px" @click="post">生成</el-button>
          </router-link>
          <el-button type="danger">重置</el-button>
        </div>
      </el-card>
    </el-row>
    <bottom></bottom>

  </div>

</template>

<script>


  import bottom from './bottom'

  export default {


    name: "exam",

    mounted() {
      this.s();
      this.get();
      this.getTime();
    },
    component: {
      bottom
    },

    data() {

      return {
        // a: URLSearchParams(),
        id: "1",
        teacherId: "1",
        examName: "",
        classId: "",
        course: "",
        chapters: "",

        startTime: '20180101-00:00-cts',
        endTime: '20180101-00:00-cts',
        choiceQuestionsNum: "",
        fillInTheBlankQuestionsNum: "",
        shrAnsNum: "",
        programProgramNum: "",
        choiceQuestionsScore: "",
        fillInTheBlankQuestionsScore: "",
        shrAnsScore: "",
        programProgramScore: "",
        input: '',
        c: "",
        radio2: 3,
        checkAll: false,
        checkedChapters: [],
        isIndeterminate: true,
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]

        },
        // totaltime:[end-start],
        value1: [new Date(2018, 0, 10, 10, 10), new Date(2018, 0, 11, 10, 10)],


      };

    },
    props: {
      queryData: {
        type: Object,
        required: true
      }
    },

    methods: {


      s: function () {
        this.examName = this.$route.params.examName;
      },
      getTime: function (value1) {
        console.log(value1)
        // this.str=value1.split(",");
        // console.log('开始结束时间'+str)
        // console.log('ddd'+value1.split(","))
        // value1.splitText()
        this.startTime = value1[0]
        this.endTime = value1[1]
      },
      getValue: function (value) {

        console.log('value' + value)
        this.c = '' + value
        console.log(this.c.toString())
      },
      get: function () {
        this.axios.get('http://localhost:8085/demand/allChapter', {
          params: {
            'course': 'JAVA'
          }
        })
          .then(res => {
            console.log(res)
            this.chapters = res.data.data;

            console.log(this.chapters)
          }).catch(err => {
          console.log(err)
        })

      },
      post: function () {
        // this.a.append("params",params)
        this.axios.post('http://localhost:8085/demand/add', {
            teacherIdL: "1",
            examName: this.$route.params.examName,
            classId: this.classId,
            course: this.course,
            startTime: this.startTime,
            endTime: this.endTime,
            chapter: this.c.toString(),
            choiceQuestionsNum: this.choiceQuestionsNum,
            fillInTheBlankQuestionsNum: this.fillInTheBlankQuestionsNum,
            shrAnsNum: this.shrAnsNum,
            programProgramNum: this.programProgramNum,
            choiceQuestionsScore: this.choiceQuestionsScore,
            fillInTheBlankQuestionsScore: this.fillInTheBlankQuestionsScore,
            shrAnsScore: this.shrAnsScore,
            programProgramScore: this.programProgramScore,
          },
          {
            emulateJSON: true
          })
          .then(res => {

            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      },

    },
    // handleCheckAllChange(val) {
    //   this.checkedChapters = val ? chapters:[];
    //   this.isIndeterminate = false;
    // },


  };
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;

  }

  .clearfix {
    text-align: left;

  }

  .choice {

    text-align: left;
    margin-left: 20px;
  }

  .t {
    margin-left: 50px;
    margin-top: auto;
    margin-bottom: auto;
    float: left;

  }

  .q {
    text-align: center;
    margin-right: 8px;
    float: left;
    font-size: 15px;

  }

  .el-card {
    background: whitesmoke;
  }

  .bt {

    text-align: center;

  }

</style>
