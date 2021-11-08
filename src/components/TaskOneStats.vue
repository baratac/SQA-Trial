<template>
    <div v-if="dataReady" >
        <div class="facts-banner bg-indigo-400 flex flex-wrap justify-between">
            <div class="title-part m-2 p-6  bg-gray-50 rounded-lg  text-gray-700 flex flex-col text-tracking-wide text-2xl">
                Statistics & Facts
            </div>
            <div class="flex flex-wrap justify-center flex-grow m-2 rounded-lg bg-gray-50">
                <div class="m-2 p-4 whitespace-nowrap">
                    <p class="text-lg font-semibold text-gray-700">Company Numbers</p>
                    <p >Total Employees: {{ statsInfo.totalEmployees }}</p>
                    <p>Average Age: {{ statsInfo.averageAge }}</p>
                    <p>Average Income: {{ statsInfo.averageIncome }}</p>
                </div>
                <div class="m-2 p-4 whitespace-nowrap">
                    <p class="text-lg font-semibold text-gray-700">Happier Team</p>
                    <p>Division: {{ statsInfo.happyTeam.division }}</p>
                    <p>Team: {{ statsInfo.happyTeam.team }}</p>
                    <p>Manager: {{ statsInfo.happyTeam.manager }}</p>
                </div>
                <div class="m-2 p-4 whitespace-nowrap">
                   <p class="text-lg font-semibold text-gray-700">Unhappier Team</p>
                    <p>Division: {{ statsInfo.sadTeam.division }}</p>
                    <p>Team: {{ statsInfo.sadTeam.team }}</p>
                    <p>Manager: {{ statsInfo.sadTeam.manager }}</p>
                </div>
            </div>
        </div>
 
        <div class="my-10 px-2 text-lg font-semibold text-gray-500">Age/Satisfaction Graphs</div>
        <div class="flex mx-4 my-10  justify-between">
            <column-chart 
                :stacked="true" 
                :data="statsInfo.ageSPercentageTable"
                suffix="%"
                width="800px" height="320px"
                :max = "100"
                xtitle="10 year Age Slots" ytitle="Satisfaction Levels"
            ></column-chart>
            
            <div class="facts-banner mx-8 bg-indigo-200 flex-grow flex flex-wrap rounded-lg">
                <div class="title-part p-8 m-8  bg-gray-50 rounded-lg flex-grow text-gray-700 content-center self-center flex flex-col text-tracking-wide text-2xl">
                    Percentage of Satisfaction levels per 10 year slot ages
                </div>
            </div>
        </div>
        <div class="flex mx-4 my-10 justify-between">
            <div class="facts-banner mx-8 my-4  bg-indigo-200 flex-grow flex flex-wrap rounded-lg">
                <div class="title-part p-8 m-8  bg-gray-50 rounded-lg flex-grow text-gray-700 content-center self-center flex flex-col text-tracking-wide text-2xl">
                     Employee Satisfaction in numbers per 10 year slot ages
                </div>
            </div>
            <line-chart
                :data="statsInfo.ageSatisfactionTable"
                width="800px" height="320px"
                xtitle="10 year Age Slots" ytitle="Satisfaction Numbers"
            ></line-chart>
        </div>
        <div class="my-10 px-2 text-lg font-semibold text-gray-500">Income/Satisfaction Graphs</div>
        <div class="flex mx-4 my-10  justify-between">
            <column-chart 
                :stacked="true" 
                :data="statsInfo.incomeSPercentageTable"
                suffix="%"
                width="800px" height="320px"
                :max = "100"
                xtitle="Income on 500 Slots" ytitle="Satisfaction Levels"
            ></column-chart>
            
            <div class="facts-banner mx-8 bg-indigo-200 flex-grow flex flex-wrap rounded-lg">
                <div class="title-part p-8 m-8  bg-gray-50 rounded-lg flex-grow text-gray-700 content-center self-center flex flex-col text-tracking-wide text-2xl">
                    Percentage of Satisfaction levels per income one 500 slots
                </div>
            </div>
        </div>
        <div class="flex mx-4 my-10 justify-between">
            <div class="facts-banner mx-8 my-4  bg-indigo-200 flex-grow flex flex-wrap rounded-lg">
                <div class="title-part p-8 m-8  bg-gray-50 rounded-lg flex-grow text-gray-700 content-center self-center flex flex-col text-tracking-wide text-2xl">
                     Employee Satisfaction in numbers per income on 500 slots
                </div>
            </div>
            <line-chart
                :data="statsInfo.incomeSatisfactionTable"
                width="800px" height="320px"
                xtitle="Income on 500 Slots" ytitle="#Employees"
            ></line-chart>
        </div>
        <div class="my-10 px-2 text-lg font-semibold text-gray-500">Age Related Graphs</div>
        <div class="flex mx-4 my-10  justify-between">
            <column-chart 
                :data="statsInfo.ageDistribution"
                width="800px" height="320px"
                ytitle="#Employees" xtitle="10 year slot ages"
            ></column-chart>
            
            <div class="facts-banner mx-8 bg-indigo-200 flex-grow flex flex-wrap rounded-lg">
                <div class="title-part p-8 m-8  bg-gray-50 rounded-lg flex-grow text-gray-700 content-center self-center flex flex-col text-tracking-wide text-2xl">
                   Age Distribution in 10 year slots
                </div>
            </div>
        </div>
        <div class="flex mx-4 my-10 justify-between">
            <div class="facts-banner mx-8 my-4  bg-indigo-200 flex-grow flex flex-wrap rounded-lg">
                <div class="title-part p-8 m-8  bg-gray-50 rounded-lg flex-grow text-gray-700 content-center self-center flex flex-col text-tracking-wide text-2xl">
                     Average Income in  10 year slots
                </div>
            </div>
            <line-chart
                :data="statsInfo.ageIncomeTable"
                width="800px" height="320px"
                xtitle="10 year slot ages" ytitle="Average Income"
            ></line-chart>
        </div>
        <div class="my-10 px-2 text-lg font-semibold text-gray-500">Income Related Graphs</div>
        <div class="flex mx-4 my-10  justify-between">
            <column-chart 
                :data="statsInfo.incomeDistribution"
                width="800px" height="320px"
                ytitle="#Employees" xtitle="Income in 500 slots"
            ></column-chart>
            
            <div class="facts-banner mx-8 bg-indigo-200 flex-grow flex flex-wrap rounded-lg">
                <div class="title-part p-8 m-8  bg-gray-50 rounded-lg flex-grow text-gray-700 content-center self-center flex flex-col text-tracking-wide text-2xl">
                   Income Distribution in 500 currency slots
                </div>
            </div>
        </div>
        <div class="flex mx-4 my-10 justify-between">
            <div class="facts-banner mx-8 my-4  bg-indigo-200 flex-grow flex flex-wrap rounded-lg">
                <div class="title-part p-8 m-8  bg-gray-50 rounded-lg flex-grow text-gray-700 content-center self-center flex flex-col text-tracking-wide text-2xl">
                     Average Age per Income on 500 slots
                </div>
            </div>
            <line-chart
                :data="statsInfo.incomeAgeTable"
                width="800px" height="320px"
                xtitle="Income in 500 slots" ytitle="Average Age"
            ></line-chart>
        </div>
    </div>
</template>

<script>
    
    export default {
        props: ['statsInfo', 'dataReady'],
    }
</script>

<style  scoped>
    .fact-banner {
        height: 200px;
    }
    .title-part {
        width: 220px;
        word-break: normal;
    }
</style>
