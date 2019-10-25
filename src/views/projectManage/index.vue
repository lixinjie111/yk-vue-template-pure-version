<template>
    <div class="c-wrapper-20" v-cloak>
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
            <el-table-column label="编号" type="index" :index="indexMethod"></el-table-column>
            <el-table-column min-width="20%" label="项目名称" prop="plateNo"></el-table-column>
            <el-table-column min-width="20%" label="项目负责人" prop="routeId"></el-table-column>
            <el-table-column min-width="20%" label="启动时间">
                <template slot-scope="scope">{{$dateUtil.formatTime(scope.row.startTime)}}</template>
            </el-table-column>
            <el-table-column min-width="20%" label="项目状态" prop="fileName"></el-table-column>
            <el-table-column min-width="10%" label="客户名称" prop="fileName"></el-table-column>
            <el-table-column min-width="10%" label="操作">
                <template slot-scope="scope">
                    <el-button size="small" icon="el-icon-edit" circle type="warning" plain :loading="scope.row.viewLoading" @click="detailHandle(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :total="pageOption.total" :page.sync="pageOption.page" :size.sync="pageOption.size" @pagination="initData"></pagination>
        <dialog-add v-if="dialogAddFlag" :dialogData="dialogData" @addSubmitFunc="addSubmitFunc" @cancleFunc="cancleFunc"></dialog-add>
    </div>
</template>

<script>
import DialogAdd from "./components/add.vue";
import Pagination from '@/components/pagination';
export default {
    name: 'Index',
    data () {
        return {
            searchloading: false,
            tableLoading: false,
            pageOption: {
                size: 10,
                total: 0,
                page: 1     //从1开始
            },
            dialogAddFlag: false,
            title:'',
            listData: [
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
            dialogData:{
                title:'',
                data:''
            },
        }
    },
    components: {DialogAdd,Pagination},
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
    }
}
</script>
