<template>
  <div>
    <h4>管理员列表<i title="添加管理员" class="el-icon-circle-plus-outline" @click="addAdmin"></i></h4>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="头像"
        width="180">
        <template slot-scope="scope">
          <el-popover placement="top">
            <div slot="reference" class="name-wrapper">
              <img :src="scope.row.avatar">
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.username }}</p>
            <p>描述: {{ scope.row.desc }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="昵称"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="邮箱"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-message"></i>
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--<el-button-->
            <!--size="mini"-->
            <!--@click="handleEdit(scope.$index, scope.row)">编辑-->
          <!--</el-button>-->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-model="pn"></pagination>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        pn:1
      }
    },
    methods: {
      getUser() {
        this.$axios.get(`${this.$api.user}?pn=${this.pn}&size=5`).then(res => {
          this.tableData = res.data.map(item => {
            let time = new Date(item.createdTime)
            let year = time.getFullYear()
            let mon = time.getMonth()
            let day = time.getDate()
            let hour = time.getHours()
            let min = time.getMinutes()
            let sec = time.getSeconds()
            item.date = `${year}-${mon}-${day} ${hour}:${min}:${sec}`
            return item
          })
        })
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push(`/index/addAdmin?${row._id}`)
      },
      addAdmin() {
        this.$router.push('/index/addAdmin')
      },
      handleDelete(index, row) {
        let userIds = [row._id]
        console.log(userIds);
        this.$axios.post(this.$api.deleteAdmin,{userIds}).then(res=>{
           if(res.code == 200){
             this.getUser();
           }
         })
      }
    },
    created() {
      this.getUser();
    },
    watch:{
      pn(){
        this.getUser()
      }
    }
  }
</script>

<style scoped lang="scss">
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  h4 {
    i {
      margin-left: 20px;
      font-size: 20px;
      color: #888;
      vertical-align: middle;
    }
  }
</style>
<style>
  .el-table {
    text-align: center;
  }

  .el-table th > .cell {
    text-align: center;
  }
</style>
