<template>
  <div id="app">
    <h3>需求申請單</h3>
    <form id="Add">
       <p>
        <select v-model="vUser.type" id="type">
          <option value="" disabled>請選擇類別</option>
          <option value="教育專業課程">教育專業課程</option>
          <option value="中等專門課程">中等專門課程</option>
          <option value="教保專業課程">教保專業課程</option>
          <option value="民族教育次專長">民族教育次專長</option>
          <option value="國小加註專長">國小加註專長</option>
          <option value="重大議題調查">重大議題調查</option>
          <option value="其他">其他</option>
        </select>
      </p>
      <p>提需求：<input v-model="vUser.userId" id="userId"></p>
      <p>需求說明：<textarea v-model="vUser.description" id="description"></textarea></p>
      <div>
        <input type="file" ref="files" accept=".pdf" @change="handleFiles">
        <el-button type="primary" v-if="vUser.fileName != ''" @click="downloadBlobByPost">檢視上傳檔案</el-button>
        <br/>
        <input type="button" @click="uploadFile" value="上傳檔案">
      </div>
      <input type="submit" @click="submitFn" value="Submit">
      <input type="button" @click="backFn" value="Back">
    </form>
    <!--<div v-html="state.action"></div>-->
  </div>
</template>
 
<script type = "text/javascript">
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from "vue-router";



export default {
  setup() {
    var vUser = reactive({
      userId: "",
      description: "",
      type: "",
      fileName: "",

    });
    var file = reactive({
      file: null,

    });
    
    function submitFn() {
      var vUrl = "https://localhost:44372/Vue/AddDataView";

      axios({
        method: "post",
        url: vUrl,
        data: vUser,
        headers: {
          'Content-Type': 'application/json',
        }
      }
      ).then(res => {
        console.log(res);

      }).catch(function (error) {
        console.log(error)
      });
    }

    let router = useRouter();
    console.log(router);
    let backFn = () => {
      router.push({
        path: "/App.vue",
      });
    };
    return {
      vUser,
      file,
      submitFn,
      backFn,
    }
  },
  methods: {
    handleFiles(event) {
      this.file = event.target.files[0];
      if (!this.file.type.match('pdf.*')) {
        alert('請上傳PDF檔');
        return;
      }
      if (this.size > 5000000) {
        alert('請確認檔案少於5MB')
        return;
      }
    },
    uploadFile() {
      var UploadUrl = 'https://localhost:44372/Vue/UploadFile';

      if (this.file == undefined || this.file == "") {
        alert('請選擇PDF檔')
        return false;
      }
      const pdfload = new FormData();
      pdfload.append('file', this.file)
      axios({
        method: 'post',
        url: UploadUrl,
        data: pdfload,
        headers: {
          'Content-Type': 'multipart/form-data',
        },

      }).then((res) => {

        if (res.data !== null && res.data.length > 1) {
          this.vUser.fileName = res.data;
          alert('上傳成功');
          console.log(res.data)
        }

      })
        .catch((error) => {
          console.log(error)
        })


    },
    async downloadBlobByPost() {
                let urlPost = "https://localhost:44372/Vue/DownloadFile?fileName="+this.vUser.fileName;
                let fileData = await axios({
                    method: "post",
                    url: urlPost, // 請求地址
                    responseType: "blob" // 表明返回伺服器返回的資料型別
                })
                let URL = window.URL || window.webkitURL;
                let downloadUrl = URL.createObjectURL(fileData.data);
                let a = document.createElement("a");
                a.download = this.vUser.fileName;
                a.href = downloadUrl;
                a.click();
                a = null;
                downloadUrl && URL.revokeObjectURL(downloadUrl);
            },

  }


}



</script>