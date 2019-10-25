<template>
    <el-dialog 
        :title="dialogData.title" 
        :visible.sync="visible"
        :before-close="cancleFunc"
        :close-on-click-modal="false"
        width="30%">
        <el-form ref="dialogForm" :model="formParams" :rules="rules" size="small" label-position="right" label-width="85px">
            <el-form-item label="项目编号:" prop='name'>
                <el-input v-model.trim="formParams.name"></el-input>
            </el-form-item>
            <el-form-item label="项目名称:" prop='name'>
                <el-input v-model.trim="formParams.name"></el-input>
            </el-form-item>
            <el-form-item label="负责人:" prop='plateNo'>
                <el-select
                    v-model.trim="formParams.plateNo">
                    <el-option
                        v-for="item in plateNoList"
                        :key="item.plateNo"
                        :label="item.plateNo"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="启动时间:" prop='startTime'>
                <el-date-picker
                    v-model.trim="formParams.startTime"
                    type="datetime"
                    placeholder="启动时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间:" prop='endTime'>
                <el-date-picker
                    v-model.trim="formParams.endTime"
                    type="datetime"
                    placeholder="结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="客户名称:" prop='name'>
                <el-input v-model.trim="formParams.name"></el-input>
            </el-form-item>
             <el-form-item label="项目状态:" prop='plateNo'>
                <el-select
                    v-model.trim="formParams.plateNo">
                    <el-option
                        v-for="item in plateNoList"
                        :key="item.plateNo"
                        :label="item.plateNo"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客户信息" prop='causeUntying'>
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入客户信息"        
                    v-model.trim="formParams.causeUntying">
                </el-input>
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
        <div class="c-text-center">
            <el-button type="warning" size="small" @click="submitFunc" :loading="submitloading">确定</el-button>
            <el-button type="warning" size="small" plain @click="cancleFunc">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: ['dialogData'],
    data() {
        return {
            
            visible: true,
            submitloading: false,
            formParams: {
                name: '',
                plateNo: '',
                vehicleId: '',
                camSerialNum:'',//摄像头序列号
                camDeviceId:'',//摄像头编号
                camDirection: '',
                startTime: '',
                endTime: '',
                protocal: ''
            },
            title:"",
            plateNoList: [],
            vehicleIdList: [],
            camCodeList: [],

            rules:{
                name:[
                    { required: true, message: '活动名称不能为空!', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        submitFunc() {
            this.$refs.dialogForm.validate((valid) => {
                if (valid) {
                    // 正则校验
                    this.submitloading = true;

                    setTimeout(() => {            // 接口调用
                        this.submitloading = false;
                        this.$emit("addSubmitFunc", this.formParams);
                        this.$message.success("新增或编辑成功");
                    }, 2000);
                } else {
                    return false;
                }
            });
        },
        cancleFunc() {
            this.$emit("cancleFunc");
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';
</style>