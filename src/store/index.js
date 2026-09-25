import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import firebaseConfig from '../../firebase/firebase'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseApp = initializeApp(firebaseConfig)
var db = getFirestore(firebaseApp);
Vue.use(Vuex)



const Form = {
    namespaced: true,
    //メイン、編集ボタンの文章,入力画面、確認画面ののState
    state: {
        button: ["入力内容の確認", "送信", "戻る"],
        editbutton: "修正",
        component: ["TextareaComp", "StringComp"]
    },
    mutations: {},
    //ボタンアクション stepCount （ボタンの押したカウント）ごとに処理を変更
    actions: {
        buttonAction({ commit, state, rootState }) {


            //必須項目が全て入力されていたらsetStepCountの処理を走らせる
            if (rootState.errorFlag &&
                rootState.errorFlag2 &&
                rootState.errorFlag3 &&
                rootState.errorFlag4 &&
                rootState.errorFlag5 &&
                rootState.errorFlag6 &&
                rootState.errorFlag7 &&
                rootState.errorFlag8) {
                commit('setStepCount', null, { root: true })//rootへのアクセス
            }
            if (rootState.stepCount == 2) {
                //送信ボタンを押すとfirestoreにお問い合わせ内容を送信する
                addDoc(collection(db, "test1"), {
                        surname: rootState.surname + rootState.name,
                        surnamefurigana: rootState.surnamefurigana + rootState.furigana,
                        company: rootState.company,
                        email: rootState.email,
                        postnumber: rootState.postnumber1 + rootState.postnumber2,
                        prefectures: rootState.prefectures,
                        city: rootState.city,
                        selected: rootState.selected,
                        impression: rootState.impression,
                    })
                //お問い合わせ内容の送信
                console.log(rootState.surname + rootState.name)
                console.log(rootState.surnamefurigana + rootState.furigana)
                console.log(rootState.company)
                console.log(rootState.email)
                console.log(rootState.postnumber1, rootState.postnumber2)
                console.log(rootState.prefectures)
                console.log(rootState.city)
                console.log(rootState.phone)
                console.log(rootState.selected)
                console.log(rootState.subject)
                console.log(rootState.impression)
            } if (rootState.stepCount == 3) {
                //ページ,stateのリセット
                router.push('/')
                rootState.stepCount = 0
                rootState.impression = ''
                rootState.surname = ''
                rootState.name = ''
                rootState.surnamefurigana = ''
                rootState.furigana = ''
                rootState.company = ''
                rootState.email = ''
                rootState.checkemail = ''
                rootState.postnumber1 = ''
                rootState.postnumber2 = ''
                rootState.prefectures = ''
                rootState.city = ''
                rootState.phone = ''
                rootState.selected = ''
                rootState.subject = ''
                rootState.ischecked = false
                rootState.errorFlag = false
                rootState.errorFlag2 = false
                rootState.errorFlag3 = false
                rootState.errorFlag4 = false
                rootState.errorFlag5 = false
                rootState.errorFlag6 = false
                rootState.errorFlag7 = false
                rootState.errorFlag8 = false
                rootState.ischecked = false
            }
        }, editbuttonAction({ commit, state, rootState }) {
            if (rootState.stepCount == 1) {
                //stepCountを一つ減らすことで編集が可能に
                commit('setDownCount', null, { root: true })
            }
        }
    },
    //ボタンの繊維
    getters: {
        getButton(state, getters, rootState) {
            return state.button[rootState.stepCount]
        },
        getComponent(state, getters, rootState) {
            return state.component[rootState.stepCount]
        },
        geteditButton(state, getters, rootState) {
            if (rootState.stepCount == 1) {
                return state.editbutton
            } else {
                return null
            }
        }, getCount(state, getters, rootState) {
            return rootState.stepCount
        }
    }

}

//ヘッダーの繊維
const Head = {
    state: {
        title: ["お問い合わせフォーム", "確認画面", "送信完了"]
    },
    mutations: {},
    actions: {},
    getters: {
        getTitle(state, getters, rootState) {
            return state.title[rootState.stepCount]
        }
    }
}

const Textarea = {
    namespaced: true,
    //必須項目を埋めていないと出るエラー文
    state: {
        errorMsg: "必須項目の入力漏れがあります",
    },

    getters: {
        getError(state, getters, rootState) {
            //必須項目を全て入れたらエラー分を削除
            if (rootState.errorFlag &&
                rootState.errorFlag2 &&
                rootState.errorFlag3 &&
                rootState.errorFlag4 &&
                rootState.errorFlag5 &&
                rootState.errorFlag6 &&
                rootState.errorFlag7 &&
                rootState.errorFlag8 &&
                rootState.ischecked) {
                return null
            } else {
                return state.errorMsg
            }
        }
    }
}

const String = {
    namespaced: true,

    //入力した値をStringCompに送る

    getters: {
        getString(state, getters, rootState) {
            return rootState.impression
        },
        getSurName(state, getters, rootState) {
            return rootState.surname
        },
        getName(state, getters, rootState) {
            return rootState.name
        },
        getSurnameFurigana(state, getters, rootState) {
            return rootState.surnamefurigana
        },
        getFurigana(state, getters, rootState) {
            return rootState.furigana
        },
        getCompany(state, getters, rootState) {
            return rootState.company
        },
        getEmail(state, getters, rootState) {
            return rootState.email
        },
        getPostnumber1(state, getters, rootState) {
            return rootState.postnumber1
        },
        getPostnumber2(state, getters, rootState) {
            return rootState.postnumber2
        },
        getPrefectures(state, getters, rootState) {
            return rootState.prefectures
        },
        getCity(state, getters, rootState) {
            return rootState.city
        },
        getPhone(state, getters, rootState) {
            return rootState.phone
        },
        getSelected(state, getters, rootState) {
            return rootState.selected
        },
        getSubject(state, getters, rootState) {
            return rootState.subject
        },

    }
}


export default new Vuex.Store({
    state: {
        editbutton: null,
        stepCount: 0,
        errorFlag: false,//trueなら通過
        errorFlag2: false,//trueなら通過
        errorFlag3: false,//trueなら通過
        errorFlag4: false,//trueなら通過
        errorFlag5: false,//trueなら通過
        errorFlag6: false,//trueなら通過
        errorFlag7: false,//trueなら通過
        errorFlag8: false,//trueなら通過
        name: '',
        surname: '',
        surnamefurigana: '',
        furigana: '',
        company: '',
        email: '',
        checkemail: '',
        postnumber1: '',
        postnumber2: '',
        prefectures: '',
        city: '',
        phone: '',
        selected: '',
        subject: '',
        impression: "",
        ischecked: false
    },
    mutations: {
        //stepCountをカウントをたす
        setStepCount(state) {
            console.log("rootsetStepCount")
            state.stepCount++
        },
        //stepCountをカウントをひく
        setDownCount(state) {
            console.log("rootsetDownCount")
            state.stepCount--
        },


        //TextareaCompから値を受け取ってStateを更新する
        updateSurName(state, value) {
            state.surname = value
            if (state.surname) {
                state.errorFlag = true
            } else {
                state.errorFlag = false
            }
        },
        updateName(state, value) {
            state.name = value
            if (state.name) {
                state.errorFlag2 = true
            } else {
                state.errorFlag2 = false
            }
        },
        updateSurnameFurigana(state, value) {
            const reg = /^[あ-ん゛゜ぁ-ぉゃ-ょー「」、]+/;
            state.surnamefurigana = value
            if (state.surnamefurigana && reg.test(state.surnamefurigana)) {
                state.errorFlag3 = true
            } else {
                state.errorFlag3 = false
            }
        },
        updateFurigana(state, value) {
            const reg = /^[あ-ん゛゜ぁ-ぉゃ-ょー「」、]+/;
            state.furigana = value
            if (state.furigana && reg.test(state.furigana)) {
                state.errorFlag4 = true
            } else {
                state.errorFlag4 = false
            }
        },
        updateCompany(state, value) {
            state.company = value
        },
        updateEmail(state, value) {
            const reg = /^\S+@\S+\.\S+$/;
            state.email = value
            if (state.email && reg.test(state.email)) {
                state.errorFlag5 = true
            } else {
                state.errorFlag5 = false
            }
        },
        updateCheckemail(state, value) {
            const reg = /^\S+@\S+\.\S+$/;
            state.checkemail = value
            if (state.checkemail && reg.test(state.checkemail) && state.email === state.checkemail) {
                state.errorFlag6 = true
            } else {
                state.errorFlag6 = false
            }
        },
        updatePostnumber1(state, value) {
            state.postnumber1 = value
        },
        updatePostnumber2(state, value) {
            state.postnumber2 = value
        },
        updatePrefectures(state, value) {
            state.prefectures = value
        },
        updateCity(state, value) {
            state.city = value
        },
        updatePhone(state, value) {
            state.phone = value
        },
        updateSelected(state, value) {
            state.selected = value
        },
        updateSubject(state, value) {
            state.subject = value
            if (state.subject) {
                state.errorFlag7 = true
            } else {
                state.errorFlag7 = false
            }
        },
        updateImpression(state, value) {
            state.impression = value
            if (state.impression) {
                state.errorFlag8 = true
            } else {
                state.errorFlag8 = false
            }
        },
        updateisChecked(state, value) {
            state.ischecked = value
        }
    },
    modules: {
        Form,
        Head,
        Textarea,
        String,
    }
})
