<template>
   <div id="app">
    
    <div v-if="state.loading">等我一下~我去火星撈資料...</div>
    <div v-else-if="state.error">Error: {{state.error}}</div>
    
    <div v-else>
      <table>
        <tr>
          <th>編碼</th>
            <th>提案人</th>
            <th>類別</th>
            <th>說明</th>
            <th>檔案</th>
            <th>提案時間</th>
        </tr>
        <tr v-for="item in state.data" :key="item.iid">
          <td> {{ item.iid }}</td>
          <td> {{ item.userId }}</td>
             <td>{{item.type}}</td>
             <td>{{item.description}}</td>
             <td>{{ item.fileName}}</td>
            <td>{{ item.applyTime}}</td>
        
        </tr>
       
      </table>

      <input type="button" @click="backFn" value="Back">
    </div>
  </div>
</template>

<script type = "text/javascript">
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from "vue-router";

  
export default {
  setup() {
    
    const state = reactive({
      data: null,
      error: null,
      loading: true
    });
     
    axios.get('https://localhost:44372/vue').then(response => {
      state.data = response.data;
      state.loading = false;
    }).catch(error => {
      state.error = error;
      state.loading = false;
    });
    let router = useRouter();
        console.log(router);
        let backFn = () => {
            router.push({
              path: "App.vue",
            });
          };
    return {
      state,
      backFn
           };
    
  }
}
 </script>