<template>
<section class="container">
  <div class="col-sm-12 contenedor-90vh" id="contenedor_general_mis_colecciones">
      <div class="contenedor_tabla_mis_colecciones">
 <div class="content">
    <div class="block" style="margin-top:15px;">
            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" 
            :current-page="currentPage" 
            :page-sizes="[5,10,20,100,total_registros]" 
            :page-size="pageSize" 
            layout="total, sizes, prev, pager, next, jumper" 
            :total="result.length">
            </el-pagination>
        </div>
       <el-input
          v-model="search"
          size="mini"
          placeholder="Escribe para buscar"
          class="contenedor_etiquetas_barras_busqueda"
          />
      <el-table
   :data="result.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
     search: '',
     total_registros:0,

                                         currentPage: 1, // número de página actual
                                         total: 200, // número total
                                         pageSize: 5 // Número de datos por página
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
      ,// Se activa cuando cambia el número de entradas por página Seleccione cuántas líneas mostrar en una página
                handleSizeChange(val) {
                                         console.log (`$ {val} por página`);
                    this.currentPage = 1;
                    this.pageSize = val;
                },
                                 // Se activa cuando cambia la página actual Saltar a otras páginas
                handleCurrentChange(val) {
                                         console.log (`Página actual: $ {val}`);
                    this.currentPage = val;
                }
  },
  created() {
    axios.get("/user/api/getusers").then((result) => {
      this.result = result.data;
      this.total_registros=this.result.length;
      
    })
  }
};
</script>