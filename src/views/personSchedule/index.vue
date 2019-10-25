<template>
    <div class="c-wrapper-20" v-cloak>
        <el-form ref="searchForm" :inline="true" :model="searchKey" :rules="rules" size="small">
            <el-form-item label="所属项目" prop='projectId'>
                <el-select v-model.trim="searchKey.projectId">
                    <el-option label="锁定" value="0"></el-option>
                    <el-option label="正常" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="人员" prop='personalName'>
                <el-input v-model.trim="searchKey.personalName"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop='status'>
                <el-select v-model.trim="searchKey.status">
                    <el-option label="锁定" value="0"></el-option>
                    <el-option label="正常" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始结束日期" prop='startDate'>
                <el-date-picker
                    v-model.trim="searchKey.startDate"
                    type="daterange"
                    :picker-options="timeOption"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="warning" icon="el-icon-search" @click="searchClick" :loading="searchloading">查询</el-button>
                <el-button type="warning" plain icon="el-icon-setting" @click="resetClick">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table 
            ref="table"
            class="c-mb-70"
            :data="listData"
            v-loading="tableLoading"
            border
            max-height="724">
            <el-table-column label="编号" type="index" :index="indexMethod"></el-table-column>
            <el-table-column min-width="100" label="人员" prop="personalName"></el-table-column>
            <el-table-column min-width="200" label="项目" prop="projectName"></el-table-column>
            <el-table-column min-width="200" label="任务名称" prop="taskName"></el-table-column>
            <el-table-column min-width="100" label="状态" prop="stateName"></el-table-column>
            <el-table-column min-width="150" :label="item[0]+' '+item[1]"   v-for="(item,index) in dateArr" :key="index">
                 <template slot-scope="scope">
                     <div class="schedule" v-if="$dateUtil.dateToMs(item[0])>=$dateUtil.dateToMs(scope.row.expectStartDate)&&$dateUtil.dateToMs(item[0])<=$dateUtil.dateToMs(scope.row.expectEndDate)">计划时间</div>
                     <div class="actual" v-if="$dateUtil.dateToMs(item[0])>=$dateUtil.dateToMs(scope.row.realStartDate)&&$dateUtil.dateToMs(item[0])<=$dateUtil.dateToMs(scope.row.realEndDate)">实际时间</div></template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <pagination :total="pageOption.total"  :page.sync="pageOption.page" :size.sync="pageOption.size" @pagination="initData"></pagination> -->
    </div>
</template>

<script>
import Pagination from '@/components/pagination';
export default {
    components: {
        Pagination,
    },
    filters:{
       
    },
    data () {
        return {
            dialogAddFlag:false,
            searchloading: false,
            tableLoading: false,
            pageOption: {
                size: 10,
                total: 0,
                page: 1     //从1开始
            },
            listData: [{
                "personalName": "张三",
                "id": 1,
                "taskCode": 1,
                "taskName": "任务管理系统-任务接口",
                "projectName": "任务管理项目",
                "expectStartDate": "2019-10-12",
                "expectEndDate": "2019-10-15",
                "realStartDate": "2019-08-05",
                "realEndDate": "2019-08-10",
                "rate": 80,
                "stateName": "未分派"

              },{
                "personalName": "张三",
                "id": 2,
                "taskCode": 2,
                "taskName": "任务管理系统-任务接口",
                "projectName": "任务管理项目",
                "expectStartDate": "2019-10-10",
                "expectEndDate": "2019-10-12",
                "realStartDate": "2019-08-06",
                "realEndDate": "2019-08-12",
                "rate": 80,
                "stateName": "已完成"
              },{
                "personalName": "张三",
                "id": 2,
                "taskCode": 2,
                "taskName": "任务管理系统-任务接口",
                "projectName": "任务管理项目",
                "expectStartDate": "2019-10-10",
                "expectEndDate": "2019-10-12",
                "realStartDate": "2019-08-06",
                "realEndDate": "2019-08-12",
                "rate": 80,
                "stateName": "已完成"
              },{
                "personalName": "张三",
                "id": 2,
                "taskCode": 2,
                "taskName": "任务管理系统-任务接口",
                "projectName": "任务管理项目",
                "expectStartDate": "2019-10-10",
                "expectEndDate": "2019-10-12",
                "realStartDate": "2019-08-06",
                "realEndDate": "2019-08-12",
                "rate": 80,
                "stateName": "已完成"
              },{
                "personalName": "张三",
                "id": 2,
                "taskCode": 2,
                "taskName": "任务管理系统-任务接口",
                "projectName": "任务管理项目",
                "expectStartDate": "2019-10-10",
                "expectEndDate": "2019-10-12",
                "realStartDate": "2019-08-06",
                "realEndDate": "2019-08-12",
                "rate": 80,
                "stateName": "已完成"
              },{
                "personalName": "张三",
                "id": 2,
                "taskCode": 2,
                "taskName": "任务管理系统-任务接口",
                "projectName": "任务管理项目",
                "expectStartDate": "2019-10-10",
                "expectEndDate": "2019-10-12",
                "realStartDate": "2019-08-06",
                "realEndDate": "2019-08-12",
                "rate": 80,
                "stateName": "已完成"
              },{},{},{},{},{},{},{},{},{},{},{},{},{},{}

],
            searchKey: {
                startDate: [this.$dateUtil.GetDateStr(15), this.$dateUtil.getNowFormatDate()],
                // endDate: [this.$dateUtil.GetDateStr(15), this.$dateUtil.getNowFormatDate()],
            },
            historySearchKey: {},
            dialogData:{
                title:'',
                data:''
            },
            rules:{
                startTime:[
                    { required: true, message: "开始时间不能为空!", trigger: 'change' }
                ],
                endTime:[ 
                    { required: true, message: "结束时间不能为空!", trigger: 'change' }
                ]

            },
            timeOption: {
                // disabledDate: time => {
                //     let _time = time.getTime(),
                //         _newTime = new Date().getTime();
                //     return _time > _newTime;
                // }
            },
            dateArr:[]
        }
    },
    methods: {
        initPageOption() {
            this.listData = [];
            this.pageOption.total = 0;
            this.pageOption.page = 1;
        },
        indexMethod(index) {
            return (this.pageOption.page-1) * this.pageOption.size + index + 1;
        },
        initData() {
            this.tableLoading = true;
            console.log("这里做请求，注意传参方式");

            // let _params= {
            //     name:  this.historySearchKey.name,
            //     region:  this.historySearchKey.region,
            //     startTime:  this.$dateUtil.dateToMs(this.historySearchKey.startTime),
            //     endTime:  this.$dateUtil.dateToMs(this.historySearchKey.endTime),

            //     pageSize: this.pageOption.size,
            //     pageIndex: this.pageOption.page - 1
            // }

            let _params = Object.assign({}, this.historySearchKey, {
                // startTime:  this.$dateUtil.dateToMs(this.historySearchKey.startTime),
                // endTime:  this.$dateUtil.dateToMs(this.historySearchKey.endTime)
            });

            // this.request(_params).then(res => {
            //     console.log("更新数据以及关闭loading");
            //     if(res.status == 200) {
            //         //处理数据
            //         this.listData = res.data.list;
            //         this.pageOption.total = res.data.pagaTotal || 0;
            //     }
            //     this.tableLoading = false;
            //     this.searchloading = false;
            // }).catch(err => {
            //     this.tableLoading = false;
            //     this.searchloading = false;
            // });

            setTimeout(() => {
                console.log("更新数据以及关闭loading");
                // this.listData = res.data.list;
                // this.pageOption.total = res.data.pagaTotal || 0;
                this.$refs.table.bodyWrapper.scrollTop = 0;
                this.tableLoading = false;
                this.searchloading = false;
            }, 2000);
        },
        searchClick(){
            this.$refs.searchForm.validate((valid) => {
                if (valid) {
                    this.searchloading = true;
                    this.historySearchKey = this.searchKey;
                    this.dateArr=this.$dateUtil.getDay(this.historySearchKey.startDate[0],this.historySearchKey.startDate[1]);
                    console.log(this.historySearchKey)
                    this.initPageOption();
                   this.initData();
                } else {
                    return false;
                }
            });
        },
        resetClick() {
            this.$refs.searchForm.resetFields();
        },
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';
.schedule{
    position: absolute;
    width: 100%;
    height: 50%;
    background:$yellow;
    left:0;
    top:0
}
.actual{
    position: absolute;
    width: 100%;
    height: 50%;
    background:$blue;
    left:0;
    bottom:0
}

</style>