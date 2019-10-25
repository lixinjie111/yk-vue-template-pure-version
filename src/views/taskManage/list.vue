<template>
    <div class="c-wrapper-20" v-cloak>
        <div v-if="taskAddFlag">
            <el-form ref="searchForm" :inline="true" :model="searchKey" :rules="rules" size="small">
                <el-form-item label="任务编号" prop='name'>
                    <el-input v-model.trim="searchKey.name"></el-input>
                </el-form-item>
                <el-form-item label="任务名称" prop='name'>
                    <el-input v-model.trim="searchKey.name"></el-input>
                </el-form-item>
                <el-form-item label="所属项目" prop='status'>
                    <el-select v-model.trim="searchKey.status">
                        <el-option label="锁定" value="0"></el-option>
                        <el-option label="正常" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属平台" prop='status'>
                    <el-select v-model.trim="searchKey.status">
                        <el-option label="锁定" value="0"></el-option>
                        <el-option label="正常" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="负责人" prop='name'>
                    <el-input v-model.trim="searchKey.name"></el-input>
                </el-form-item>
                <el-form-item label="任务状态" prop='name'>
                    <el-input v-model.trim="searchKey.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" icon="el-icon-search" @click="searchClick" :loading="searchloading">查询</el-button>
                    <el-button type="warning" plain icon="el-icon-setting" @click="resetClick">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="c-button-wrapper c-text-right">
                <el-button size="mini" plain icon="el-icon-plus" @click="toJump()">新增</el-button>
            </div>
            <el-table 
                ref="table"
                class="c-mb-70"
                :data="listData"
                v-loading="tableLoading" 
                @selection-change="handleSelectionChange"
                border
                max-height="724"
                stripe>
                <el-table-column label="编号" type="index" :index="indexMethod"></el-table-column>
                <el-table-column min-width="10%" label="任务名称" prop="serialNum"></el-table-column>
                <el-table-column min-width="10%" label="所属项目" prop="fileName"></el-table-column>
                <el-table-column min-width="10%" label="所属平台" prop="serialNum"></el-table-column>
                <el-table-column min-width="10%" label="负责人" prop="fileName"></el-table-column>
                <el-table-column min-width="20%" label="开始日期" prop="serialNum"></el-table-column>
                <el-table-column min-width="20%" label="结束日期" prop="fileName"></el-table-column>
                <el-table-column min-width="10%" label="当前进度" prop="fileName"></el-table-column>
                <el-table-column min-width="10%" label="任务状态" prop="fileName"></el-table-column>
                <el-table-column min-width="10%" label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" icon="el-icon-edit" circle type="warning" plain :loading="scope.row.viewLoading" @click="toJump(scope.row)"></el-button>
                        <el-button v-if="scope.row.lock" size="small" icon="el-icon-lock" circle type="warning" plain :loading="scope.row.viewLoading" @click="lock(scope.row)"></el-button>
                        <el-button v-else size="small" icon="el-icon-unlock" circle type="warning" plain :loading="scope.row.viewLoading" @click="lock(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <pagination :total="pageOption.total" :page.sync="pageOption.page" :size.sync="pageOption.size" @pagination="initData"></pagination>
        </div>
        <task-add v-else @cancleFunc="cancleFunc"></task-add>
    </div>
</template>

<script>
import Pagination from '@/components/pagination';
import TaskAdd from "./components/taskAdd";
export default {
    components: {
        Pagination,
        TaskAdd
    },
    data () {
        return {
            searchloading: false,
            tableLoading: false,
            pageOption: {
                size: 10,
                total: 0,
                page: 1     //从1开始
            },
             listData: [
            {
                endTime: 1562860724413,
                plateNo: "沪A923456",
                routeId: "B21E-00-024",
                startTime: 1562809632481,
                lock:'1'
            },{
                endTime: 1562860726413,
                plateNo: "沪A923456",
                routeId: "B21E-00-024",
                startTime: 1562860724413
            },{},{},{},{},{},{},{},{},
            {
                endTime: 1562860724413,
                plateNo: "沪A923456",
                routeId: "B21E-00-024",
                startTime: 1562809632481
            },{
                endTime: 1562860726413,
                plateNo: "沪A923456",
                routeId: "B21E-00-024",
                startTime: 1562860724413
            },{},{},{},{}],
            searchKey: {
                name: "",
                region: "",
                startTime: "",
                endTime: ""
            },
            historySearchKey: {},
            taskAddFlag:true
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
    	toJump(val) {
            let type='';
            if(val){//编辑
                console.log(val)
                type='edit';
            }else{//新增
                type='add';
            }
            this.$router.push({
                path: "/taskManage/taskAdd",
                query: {
                    type: type
                }
    		});
        }, 
        cancleFunc() {
            this.taskAddFlag = true;
        },
    }
}
</script>