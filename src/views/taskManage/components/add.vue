<template>
    <el-dialog 
        :title="dialogData.title" 
        :visible.sync="visible"
        :before-close="cancleFunc"
        :close-on-click-modal="false"
        width="30%">
        <el-form ref="dialogForm" :model="formParams" :rules="rules" size="small" label-position="right" label-width="85px">
            <el-form-item label="日期" prop='date'>
                <el-date-picker
                    v-model.trim="formParams.date"
                    type="datetime"
                    placeholder="开始时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="进度:" prop='name'>
                <el-input v-model.trim="formParams.name"></el-input>
            </el-form-item>
            <el-form-item label="进度日志" prop='causeUntying'>
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder=""        
                    v-model.trim="formParams.textarea">
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
                date:'',
                name: '',
                textarea:''
            },
            title:"",
            plateNoList: [],
            vehicleIdList: [],
            camCodeList: [],

            rules:{
                date:[
                    { required: true, message: '活动名称不能为空!', trigger: 'blur' },
                ],
                name:[
                    { required: true, message: '活动名称不能为空!', trigger: 'blur' },
                ],
                textarea:[
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