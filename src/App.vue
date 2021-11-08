<template>
  <section class="container px-2">
    <header id="top">
        <div class="top-banner flex flex-wrap justify-between bg-indigo-400">
            <div class="title-part font-semibold flex flex-col justify-between m-2 p-2 bg-gray-50 rounded-lg">
              <div class="text-gray-700 flex flex-col text-tracking-wide text-2xl">
                <div class="text-3xl text-gray-700 text-tracking-wider">SpotQA</div> 
                <div style="white-space: nowrap;">Full-Stack/Frontend</div>
                <div>Challenge</div>
              </div>
              <div class="tex-sm text-right text-tracking-wider text-gray-500">developed by Carlos Barata</div>
            </div>
            <div class="flex flex-wrap py-2 ml-auto mr-2">
                  <button @click="loadAllData" v-if="!noMoreData" class="relative ml-2 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700 disabled:opacity-50">
                      <div v-if="!loadingData" class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-indigo-500 animate-ping"></div>
                      Load Data
                  </button>
                <button @click="toggleShowOrg" :disabled="!dataAvailable"  class="ml-2 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600  hover:bg-indigo-800" >
                    <span v-if="showOrgData">Hide Org Data</span>
                    <span v-else>Show Org Data</span>
                </button>
                <button @click="saveIt" class="ml-2 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-800">
                    Save JSON.org
                </button>
            </div>
        </div>
        <p v-if="loadingData" class="animate-pulse text-xl text-indigo-700 font-semibold" >Loading data....</p>
        <a href="#statistics"  v-if="dataAvailable" class="font-medium underline  text-indigo-600 hover:text-indigo-500">GoTo Statistics</a>

    </header>
    <section id="org-data">
        <div v-if="dataAvailable && showOrgData">
            <pre>{{ orgData  }}</pre>
        </div>
    </section>
    <section id="results">
        <p v-if="dataAvailable">Records loaded: {{ dataSize }}</p>

        <task-one-table  @sort-table="sortTable" :detail-info="detailInfo" :data-ready="dataAvailable"></task-one-table>
    </section>
    <section id="statistics">
        <div  v-if="dataAvailable" class="bg-indigo-200 border border-blue-700 rounded-lg my-2 p-2">
            <a href="#top"  class="block  font-medium underline text-indigo-600 hover:text-indigo-500">GoTo Top</a>
            <a href="#results" class="block font-medium underline  text-indigo-600 hover:text-indigo-500">GoTo Table</a>
        </div>
        <task-one-stats :stats-info="statsInfo" :data-ready="dataAvailable"></task-one-stats>
    </section>
    <footer>
        <div v-if="dataAvailable" class="bg-indigo-200 border border-blue-700 rounded-lg my-2 p-2 flex flex-wrap justify-around">
            <a href="#top"   class="block font-medium underline text-indigo-600 hover:text-indigo-500">GoTo Top</a>
            <a href="#results" class="block font-medium underline  text-indigo-600 hover:text-indigo-500">GoTo Table</a>
            <a href="#statistics"  class="font-medium underline  text-indigo-600 hover:text-indigo-500">GoTo Statistics</a>
        </div>
    </footer>
  </section>
</template>

<script>

  import TaskOneStats from './components/TaskOneStats'
  import TaskOneTable from './components/TaskOneTable'

  import { getData, saveData }   from './util/DataManager';

  export default {
    name: 'App',

    components: {
      TaskOneStats,
      TaskOneTable
    },

    data() { 
      return {
        detailInfo: [],
        statsInfo: {},
        dataReady: false,
        showOrgData: false,
        orgData: {},
        noMoreData: false,
        dataAvailable: false,
        loadingData: false,
        dataSize: 0, 
        sortElemKey: '',
        sortDirection: '',
    }},
    methods: {
      loadAllData() {
        this.loadingData = true
        getData(true).then((res) => {
            // console.log("Full Results are: ", res)
            this.loadingData = false
            this.orgData = res.orgObject
            this.noMoreData = true
            this.dataReady = true
            this.detailInfo = res.dataInfo
            this.dataAvailable = res.dataInfo.length > 0
            this.dataSize = res.dataInfo.length
            this.statsInfo = res.statsInfo
        })
        .catch((err) => console.log(err))
      },
      saveIt() {
          saveData();
      },
      toggleShowOrg() {
          this.showOrgData = !this.showOrgData
      },
      sortTable(elemKey, direction) {

        if (elemKey === this.sortElemKey && direction === this.sortDirection) {
            return
        } else {
            this.sortDirection = elemKey
            this.sortDirection = direction
        }
        if (elemKey === 'employeeName') {
            if (direction == 'up') {
                this.detailInfo.sort((item1, item2) => {
                    const name1 = item1.firstName + item1.lastName
                    const name2 = item2.firstName + item2.lastName
                    return  name1 >= name2 ? 1 : -1
                })
                
            } else {
                this.detailInfo.sort((item1, item2) => {
                    const name1 = item1.firstName + item1.lastName
                    const name2 = item2.firstName + item2.lastName
                    return  name2 >= name1 ? 1 : -1
                })
            }
        } else if (elemKey === 'birthdate' || elemKey === 'happiness') {
            if (direction == 'up') {
                this.detailInfo.sort((item1, item2) => (item1[elemKey] >= item2[elemKey] ? 1 : -1))
            } else {
                this.detailInfo.sort((item1, item2) => (item2[elemKey] >= item1[elemKey] ? 1 : -1))
            }
        } else {
            if (direction == 'up') {
                this.detailInfo.sort((item1, item2) => (item1[elemKey] - item2[elemKey]))
            } else {
                this.detailInfo.sort((item1, item2) => (item2[elemKey] - item1[elemKey]))
            }
        }
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.top-banner {
  height: 200px
}
.title-part {
  width: 320px;
  word-break: normal;
}

</style>
