<template>
    <div class="c-wrapper-20" v-cloak>
        <el-form ref="searchForm" :inline="true" :model="searchKey" :rules="rules" size="small">
            <el-form-item label="姓名" prop='name'>
                <el-input v-model.trim="searchKey.name"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop='status'>
                <el-select v-model.trim="searchKey.status">
                    <el-option label="锁定" value="0"></el-option>
                    <el-option label="正常" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="warning" icon="el-icon-search" @click="searchClick" :loading="searchloading">查询</el-button>
                <el-button type="warning" plain icon="el-icon-setting" @click="resetClick">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="c-button-wrapper c-text-right">
            <el-button size="mini" plain icon="el-icon-plus" @click="detailHandle()">新增</el-button>
        </div>
        <el-table 
            ref="table"
            class="c-mb-70"
            :data="listData"
            v-loading="tableLoading" 
            border
            max-height="724"
            stripe>
            <el-table-column label="序号" type="index" :index="indexMethod"></el-table-column>
            <el-table-column min-width="12%" label="用户名" prop="serialNum"></el-table-column>
            <el-table-column min-width="12%" label="姓名" prop="fileName"></el-table-column>
            <el-table-column min-width="12%" label="岗位" prop="serialNum"></el-table-column>
            <el-table-column min-width="12%" label="人员类型" prop="fileName"></el-table-column>
            <el-table-column min-width="20%" label="手机号" prop="serialNum"></el-table-column>
            <el-table-column min-width="20%" label="邮箱" prop="fileName"></el-table-column>
            <el-table-column min-width="12%" label="状态" prop="fileName"></el-table-column>
            <el-table-column min-width="10%" label="操作">
                <template slot-scope="scope">
                    <el-button size="small" icon="el-icon-edit" circle type="warning" plain :loading="scope.row.viewLoading" @click="detailHandle(scope.row)"></el-button>
                    <el-button v-if="scope.row.lock" size="small" icon="el-icon-lock" circle type="warning" plain :loading="scope.row.viewLoading" @click="lock(scope.row)"></el-button>
                    <el-button v-else size="small" icon="el-icon-unlock" circle type="warning" plain :loading="scope.row.viewLoading" @click="lock(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pagination :total="pageOption.total"  :page.sync="pageOption.page" :size.sync="pageOption.size" @pagination="initData"></pagination>
        <dialog-add v-if="dialogAddFlag" :dialogData="dialogData" @addSubmitFunc="addSubmitFunc" @cancleFunc="cancleFunc"></dialog-add>
    </div>
</template>

<script>
import Pagination from '@/components/pagination';
import DialogAdd from "./components/add.vue";
export default {
    components: {
        Pagination,
        DialogAdd
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
            dialogData:{
                title:'',
                data:''
            },
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
        detailHandle(val) {
            if(val){
                this.dialogData.title = '编辑';
                this.dialogData.data = val;
            }else{
                this.dialogData.title = '新增';
            }
            this.dialogAddFlag = true;
        },
        cancleFunc() {
            this.dialogAddFlag = false;
        },
        lock(val){
            console.log(val)
        },
        addSubmitFunc(option) {
            this.dialogAddFlag = false;
            this.initData();
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
    }
}
</script>