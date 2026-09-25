<template>
  <div class="body">
    <div class="logoArea">
      <img src="../assets/ロゴ.png" alt />
    </div>

    <div class="header" id="toTop">
      <HeadComp></HeadComp>
    </div>
    <div class="textarea">
      <Explanation v-if="count==0"></Explanation>
      <component :is="isComponent"></component>
      <Thank v-if="count==2"></Thank>
      <div class="flex">
        <div class="center">
          <button
            class="mainbutton"
            v-on:click="buttonAction"
            v-scroll-to="'#toTop'"
          >{{button}}</button>
        </div>
        <div v-if="count==1" class="center2">
          <button
            class="editbutton"
            v-on:click="editbuttonAction"
          >{{editbutton}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadComp from "@/components/modules/HeadComp.vue";
import TextareaComp from "@/components/modules/TextareaComp.vue";
import StringComp from "@/components/modules/StringComp.vue";
import Explanation from "@/components/modules/Explanation.vue";
import Thank from "@/components/modules/Thank.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Form",
  //値をstoreに送る
  methods: mapActions("Form", {
    buttonAction: "buttonAction",
    editbuttonAction: "editbuttonAction"
  }),
  //値をstoreから受け取る
  computed: mapGetters("Form", {
    button: "getButton",
    isComponent: "getComponent",
    editbutton: "geteditButton",
    count: "getCount"
  }),
  components: {
    HeadComp,
    TextareaComp,
    StringComp,
    Explanation,
    Thank
  }
};
</script>

<style scoped>
.logoArea {
  text-align: center;
}
.header {
  text-align: center;
  border-bottom: 1px solid;
  font-size: 14px;
  margin: 40px;
}
.mainbutton {
  padding: 10px;
  font-weight: bold;
  background: black;
  color: white;
  border: #e1e1e1;
  font-size: 15px;
  text-align: center;
  border-radius: 18px;
  cursor: pointer;
}
.editbutton {
  padding: 10px;
  background: #c5c0c0;
  font-weight: bold;
  border: #e1e1e1;
  font-size: 15px;
  color: grey;
  text-align: center;
  border-radius: 18px;
  cursor: pointer;
}
.center,
.center2 {
  text-align: center;
}

img {
  width: 300px;
}
.explanation {
  margin: 40px;
}

.mainbutton {
  margin-bottom: 20px;
  width: 282px;
}
.editbutton {
  width: 282px;
}
.body {
  margin-bottom: 50px;
}
/*ウィンドウ幅が767px以上の場合に適用*/
@media screen and (min-width: 767px) {
  img {
    width: 320px;
  }
  .textarea {
    margin-top: 50px;
  }
  .thanktext {
    text-align: center;
    margin: 80px;
    font-size: 25px;
  }
  .header {
    font-size: 20px;
    margin: 50px 350px;
  }
  .mainbutton {
    width: 300px;
    margin-bottom: 50px;
  }
  .flex {
    display: flex;
    justify-content: center;
    margin-bottom: 70px;
  }
  .editbutton {
    width: 300px;
    margin-left: 12px;
  }
}
</style>