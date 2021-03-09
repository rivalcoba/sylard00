<template>
<section class="container">
  <div class="col-sm-12 contenedor-90vh" id="contenedor_general_mis_colecciones">
      <div class="contenedor_tabla_mis_colecciones">
 <div class="content">
       <el-input
          v-model="search"
          size="mini"
          placeholder="Escribe para buscar"
          class="contenedor_etiquetas_barras_busqueda"
          />
      <el-table
    :data="result.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()) || data.email.toLowerCase().includes(search.toLowerCase()) || data.role.toLowerCase().includes(search.toLowerCase()) || data.about.toLowerCase().includes(search.toLowerCase()))"
    :default-sort = "{prop: 'date', order: 'descending'}"
    style="width: 100%"
    class="tabla_todos_los_usuarios"
    @selection-change="handleSelectionChange"
    >
        <el-table-column
      type="selection"
      width="55"
      class="checkbox_personalizada"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="usuario"
      sortable
      width="180"
      
      >
    </el-table-column>
    <el-table-column
      prop="email"
      label="email"
      sortable
      width="180">
    </el-table-column>
    
    <el-table-column
      prop="role"
      label="Privilegios"
      sortable
      width="180">
    </el-table-column>

    <el-table-column
      prop="about"
      label="Descripcion del usuario"
      sortable
      width="180">
    </el-table-column>

  </el-table>
  </div>
      </div>
  </div>
  </section>
 
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    result: [],
     search: ''
  }),
  methods:{
      formatter(row) {
        return row.address;
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
        },
         handleSelectionChange(val) {
        this.multipleSelection = val;
      }
  },
  created() {
    axios.get("/user/api/getusers").then((result) => {
      this.result = result.data;
    })
  }
};
</script>