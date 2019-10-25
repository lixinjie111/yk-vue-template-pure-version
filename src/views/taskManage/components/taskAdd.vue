<template>
    <div class="wrapper" v-cloak>
        <div class="c-title-fixed">
            <h3 class="c-title">
                任务管理
                <el-page-header @back="backClick" class="c-return-btn"></el-page-header>
            </h3>
         </div>
        <div class="c-wrapper-20 c-detail-box">
            <div>
                <p class="c-title c-border-bottom">{{type=="add"?'新增':'编辑'}}</p>
                <div class="c-text-pack">
                    <div class="c-width-precent-40  c-padding-20">
                        <el-form ref="dialogForm" :model="formParams" :rules="rules" size="small" label-position="right" label-width="130px">
                            <el-form-item label="任务编号:" prop='rsPtName'>
                                <el-input v-model.trim="formParams.rsPtName"></el-input>
                            </el-form-item>
                            <el-form-item label="任务名称" prop='rsPtName'>
                                <el-input v-model.trim="formParams.rsPtName"></el-input>
                            </el-form-item>
                            <el-form-item label="任务描述" prop='causeUntying'>
                                <el-input
                                    type="textarea"
                                    :rows="3"
                                    placeholder=""        
                                    v-model.trim="formParams.causeUntying">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="建议方案" prop='causeUntying'>
                                <el-input
                                    type="textarea"
                                    :rows="3"
                                    placeholder=""        
                                    v-model.trim="formParams.causeUntying">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="所属项目" prop='status'>
                                <el-select v-model.trim="formParams.status">
                                    <el-option label="锁定" value="0"></el-option>
                                    <el-option label="正常" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所属平台" prop='status'>
                                <el-select v-model.trim="formParams.status">
                                    <el-option label="锁定" value="0"></el-option>
                                    <el-option label="正常" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="负责人" prop='status'>
                                <el-select v-model.trim="formParams.status">
                                    <el-option label="锁定" value="0"></el-option>
                                    <el-option label="正常" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="计划启动结束时间" prop='startTime'>
                                <el-date-picker
                                    v-model.trim="formParams.startTime"
                                    type="datetimerange"
                                    :picker-options="timeOption"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="实际启动结束时间" prop='startTime'>
                                <el-date-picker
                                    v-model.trim="formParams.startTime"
                                    type="datetimerange"
                                    :picker-options="timeOption"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="任务进度百分比" prop='rsPtName'>
                                <el-input v-model.trim="formParams.rsPtName"></el-input>
                            </el-form-item> 
                            <el-form-item label="状态" prop='status'>
                                <el-select v-model.trim="formParams.status">
                                    <el-option label="锁定" value="0"></el-option>
                                    <el-option label="正常" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="备注" prop='causeUntying'>
                                <el-input
                                    type="textarea"
                                    :rows="3"
                                    placeholder=""        
                                    v-model.trim="formParams.causeUntying">
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div v-if="type=='edit'">
                <p class="c-title c-border-top">任务评分</p>
                <div class="c-text-pack">
                    <div class=" c-padding-20">
                        <el-form ref="dialogForm" inline="true" :model="formParams" :rules="rules" size="small" label-position="right" label-width="130px">
                            <el-form-item label="代码评审:" prop='rsPtName'>
                                <el-input v-model.trim="formParams.rsPtName"></el-input>
                            </el-form-item>
                            <el-form-item label="功能评审:" prop='rsPtName'>
                                <el-input v-model.trim="formParams.rsPtName"></el-input>
                            </el-form-item>
                            <el-form-item label="质量评审:" prop='rsPtName'>
                                <el-input v-model.trim="formParams.rsPtName"></el-input>
                            </el-form-item>
                            <el-form-item label="综合评审:" prop='rsPtName'>
                                <el-input v-model.trim="formParams.rsPtName"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="c-text-center c-mb-20 c-pdb-20">
                <el-button type="warning" size="small" @click="submitFunc" :loading="submitloading">确定</el-button>
                <el-button type="warning" size="small" plain @click="backClick">取消</el-button>
            </div>
            <div v-if="type=='edit'" class="c-pdb-10">
                <p class="c-title c-border-top">进度日志</p>
                <div class="c-button-wrapper c-text-right">
                    <el-button size="mini" plain icon="el-icon-plus" @click="detailHandle()">新增</el-button>
                </div>
                <el-table 
                    ref="table"
                    class="c-mb-10"
                    :data="listData"
                    v-loading="tableLoading" 
                    @selection-change="handleSelectionChange"
                    border
                    max-height="724"
                    stripe>
                    <el-table-column min-width="20%" label="日期" prop="serialNum"></el-table-column>
                    <el-table-column min-width="20%" label="进度" prop="fileName"></el-table-column>
                    <el-table-column min-width="20%" label="日志" prop="serialNum"></el-table-column>
                    <el-table-column min-width="20%" label="作者" prop="fileName"></el-table-column>
                    <el-table-column min-width="20%" label="操作">
                        <template slot-scope="scope">
                            <el-button size="small" icon="el-icon-edit" circle type="warning" plain :loading="scope.row.viewLoading" @click="detailHandle(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <dialog-add v-if="dialogAddFlag" :dialogData="dialogData" @addSubmitFunc="addSubmitFunc" @cancleFunc="cancleFunc"></dialog-add>
    </div>
</template>

<script>
import DialogAdd from "./add.vue";

export default {
    components: {
        DialogAdd
    },
    data () {
        return {
            formParams:{
                startTime: [this.$dateUtil.GetDateStr(7), this.$dateUtil.getNowFormatDate()],
                endTime: [this.$dateUtil.GetDateStr(7), this.$dateUtil.getNowFormatDate()],
            },
            timeOption: {
                // disabledDate: time => {
                //     let _time = time.getTime(),
                //         _newTime = new Date().getTime();
                //     return _time > _newTime;
                // }
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
            type:'',
            dialogAddFlag:false,
            dialogData:{
                title:'',
                data:''
            },
        }
    },
    created() {
        this.type=this.$route.query.type;
    },
    methods: {
        backClick() {
            this.$router.go(-1);
        },
        detailHandle(val) {
            if(val){
                this.dialogData.title = '日志编辑';
                this.dialogData.data = val;
            }else{
                this.dialogData.title = '日志新增';
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
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';
</style>