<template>
  <div>
    <h4>图书列表<i title="添加图书" class="el-icon-circle-plus-outline"></i></h4>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="头像"
        width="180">
        <template slot-scope="scope">
          <el-popover placement="top">
            <div slot="reference" class="name-wrapper">
              <img :src="scope.row.img">
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="作者"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.author }}</p>
            <p>描述: {{ scope.row.desc }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.author }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期"
        width="250">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            <i class="el-icon-time"></i>
            <timer :time="scope.row.createTime"
                   style="float: right"></timer></span>
        </template>
      </el-table-column>
      <el-table-column
        label="index"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-message"></i>
          <span style="margin-left: 10px">{{ scope.row.index }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
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
  import timer from '../../components/timer'
  export default {
    components: {timer},
    data() {
      return {
        tableData: [],
        pn:1
      }
    },
    methods: {
      getUser() {
        console.log(this.pn);
        this.$axios.get(`${this.$api.book}?pn=${this.pn}&size=4`).then(res => {
          this.tableData = res.data
        })
      },
      handleEdit(index, row) {
        this.$router.push(`/index/changeBooks?bookId=${row._id}`)
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$axios.delete(`/book/${row._id}`).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: res.msg
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    },
    created() {
      this.getUser();
    },
    watch:{
      pn(){
        this.getUser();
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
