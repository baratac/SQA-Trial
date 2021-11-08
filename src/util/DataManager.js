import axios from 'axios';

// import refOrgObjet from '../assets/orgObject.json'
import refFullObject from '../assets/fullObject.json'
axios.defaults.baseURL = 'http://34.247.184.197:4242/challenge/survey';

let dataInfo = []

let statsInfo = {
    ageIncomeTable: {},
    incomeAgeTable: {},
    ageSatisfactionTable: [],
    incomeSatisfactionTable: [],
    ageSPercentageTable: [],
    incomeSPercentageTable: [],
    incomeDistribution: {},
    ageDistribution: {},
    happyTeam: {division: '?', team: '?', manager: '?'},
    sadTeam: {division: '?', team: '?', manager: '?'},
    averageIncome: 0,
    averageAge: 0,
    totalEmployees: 0
}

let orgObject = {divisions: {}}

let tmpInfo = {
    managerTeams: {},
    teamStats: {},
    orgByNumbers: {divisions: 0, teams: 0, managers: 0, employees: 0},
    aTotals: {},
    iTotals: {},
    ageSTable: {},
    incSTable: {},
    ageIncTable: {},
    incAgeTable: {},
    totalIncome: 0,
    totalAge: 0,
    totalEmployees: 0
}


const loadBatchSize = 100;
let loadDataIndex = 0;
let endOfData = false

//
//  Wraps Up the stats Info object with latest stats 
//  Using the format required to use on Graph Library ChartKick
//
function closeStatistics () {

    // console.log("TMP INFO:", tmpInfo)
                                                    //--------- [ AGE vs Satisfaction ] 
    Object.keys(tmpInfo.ageSTable).forEach( key => {  
        const elem = {}
        elem.name = key

        elem.data = tmpInfo.ageSTable[key]
        statsInfo.ageSatisfactionTable.push(elem)
    })

    Object.keys(tmpInfo.ageSTable).forEach( key => {
        const elem = {}
        const data = {}
        elem.name = key

        Object.keys(tmpInfo.ageSTable[key]).forEach( key2 => {
            const val = tmpInfo.ageSTable[key][key2]
            const total = tmpInfo.aTotals[key2]
            data[key2] =  Math.round((val / total) * 100)
        })

        elem.data = data
        statsInfo.ageSPercentageTable.push(elem)
    })
                                                    //--------- [ INCOME vs Satisfaction ] 
    Object.keys(tmpInfo.incSTable).forEach( key => {
        const elem = {}
        elem.name = key
        elem.data = tmpInfo.incSTable[key]
        statsInfo.incomeSatisfactionTable.push(elem)
    })

    Object.keys(tmpInfo.incSTable).forEach( key => {
        const elem = {}
        const data = {}
        elem.name = key

        Object.keys(tmpInfo.incSTable[key]).forEach( key2 => {
            const val = tmpInfo.incSTable[key][key2]
            const total = tmpInfo.iTotals[key2]
            data[key2] =  Math.round((val / total) * 100)
        })

        elem.data = data
        statsInfo.incomeSPercentageTable.push(elem)
    })
                                                    //--------- [ AGE vs Income ] 
    Object.keys(tmpInfo.ageIncTable).forEach( key => {
  
        statsInfo.ageIncomeTable[key] = Math.round((tmpInfo.ageIncTable[key] / tmpInfo.aTotals[key]))
    })
                                                    //--------- [ INCOME vs Age ] 
    Object.keys(tmpInfo.incAgeTable).forEach( key => {
    
        statsInfo.incomeAgeTable[key] =  Math.round((tmpInfo.incAgeTable[key] / tmpInfo.iTotals[key]))
    })
                                                // //--------- [ AGE & Income Distribution ] 

    statsInfo.ageDistribution = tmpInfo.aTotals
    statsInfo.incomeDistribution = tmpInfo.iTotals


    statsInfo.averageAge = Math.floor(tmpInfo.totalAge/tmpInfo.totalEmployees)
    statsInfo.averageIncome = Math.floor(tmpInfo.totalIncome/tmpInfo.totalEmployees)
    statsInfo.totalEmployees = tmpInfo.totalEmployees
}
//
//  Updates statistics on each employee record on a tmp structure
//
function updateStatistics(employeeData) {

    const age = employeeData.age 
    const income = employeeData.income
    const happiness = employeeData.happiness

    tmpInfo.totalAge += +age
    tmpInfo.totalIncome += +income
    tmpInfo.totalEmployees++

    const aKey = Math.floor(age/10) * 10  // Divide results in age slots of 10
                                          //----------[ Colect Age related Stats ]
    if (tmpInfo.aTotals[aKey] != undefined) {
        tmpInfo.aTotals[aKey]++
    } else {
        tmpInfo.aTotals[aKey] = 1
    }

    if (tmpInfo.ageIncTable[aKey] != undefined) {
        tmpInfo.ageIncTable[aKey] += +income
    } else {
        tmpInfo.ageIncTable[aKey] = +income
    }

    if (tmpInfo.ageSTable[happiness] != undefined) {
        if (tmpInfo.ageSTable[happiness][aKey] != undefined) {
            tmpInfo.ageSTable[happiness][aKey]++
        } else {
            tmpInfo.ageSTable[happiness][aKey] = 1
        }
    } else {
        tmpInfo.ageSTable[happiness] = {}
        tmpInfo.ageSTable[happiness][aKey] = 1
    }
    
    const iKey = Math.floor(income/500) * 500 // Divide results in income slots of 500 
                                            //----------[ Colect Income related Stats ]
    if (tmpInfo.iTotals[iKey] != undefined) {
        tmpInfo.iTotals[iKey]++
    } else {
        tmpInfo.iTotals[iKey] = 1
    }

    if (tmpInfo.incSTable[happiness] != undefined) {
        if (tmpInfo.incSTable[happiness][iKey] != undefined) {
            tmpInfo.incSTable[happiness][iKey]++
        } else {
            tmpInfo.incSTable[happiness][iKey] = 1
        }
    } else {
        tmpInfo.incSTable[happiness] = {}
        tmpInfo.incSTable[happiness][iKey] = 1
    }

    if (tmpInfo.incAgeTable[iKey] != undefined) {
        tmpInfo.incAgeTable[iKey] += +age
    } else {
        tmpInfo.incAgeTable[iKey] = +age
    }

}
//
// Generates Structure to evaluate teamm satisfaction
//
function updateTeamStats(employeeData) {
    const teamId = employeeData.teamId
    const manId = employeeData.managerId
    const eStat = employeeData.happiness
    const teamTag =  `${employeeData.divisionId}-${teamId}-${manId}`

    if (tmpInfo.teamStats[teamTag] != undefined) {
        if (tmpInfo.teamStats[teamTag][eStat] != undefined) {
            tmpInfo.teamStats[teamTag][eStat]++;
        } else {
            tmpInfo.teamStats[teamTag][eStat] = 1;
        }
    } else {
        tmpInfo.teamStats[teamTag] = {}
        tmpInfo.teamStats[teamTag][eStat] = 1;
    }
    if (tmpInfo.managerTeams[manId] == undefined) {
        tmpInfo.managerTeams[manId] = new Set()
    }
    tmpInfo.managerTeams[manId].add(`${employeeData.divisionId}-${teamId}`)
}
//
//  Evaluates Team Stats
//
function evalTeamStats() {

    let resTab = []
    let max = -1
    let min = 1
    let hTeam = ''
    let sTeam = ''

    Object.keys(tmpInfo.teamStats).forEach( key => {
        const { sad=0, happy=0 } = tmpInfo.teamStats[key]
        const val = happy - sad
        if (val > max) {
            hTeam = key
            max = val
        } 
        if (val < min) {
            sTeam = key
            min = val
        }
    })
    
    resTab = hTeam.split('-')
    statsInfo.happyTeam.division = resTab[0]
    statsInfo.happyTeam.team = resTab[1]
    statsInfo.happyTeam.manager = resTab[2]
    resTab = sTeam.split('-')
    statsInfo.sadTeam.division = resTab[0]
    statsInfo.sadTeam.team = resTab[1]
    statsInfo.sadTeam.manager = resTab[2]
}
//
// Check and sort the Organization Object
//

function sortStructure(orgData) { 

    const theKeys = Object.keys(orgData); 
    if ( isNaN(theKeys[0])) {
        if (theKeys.length === 1) { // Organizational Level Divisions/Teams/Managers
            sortStructure(orgData[ theKeys[0] ])
        } 
    } else { // List level
        Object.fromEntries(Object.entries(orgData).sort())        // <---- SORTING the ID's
        theKeys.forEach( (key) => { sortStructure( orgData[key] ) })
    }
    return;
}

//
//  Using each employee data, update the organization Object
//
function updateOrganization(record) {

    let divLevel, teamLevel = {};

    if (orgObject['divisions'][record.divisionId] == undefined) {
        orgObject['divisions'][record.divisionId] = {teams: {}}
        divLevel = orgObject['divisions'][record.divisionId];

        divLevel['teams'][record.teamId] = {managers: {}}
        teamLevel = divLevel['teams'][record.teamId]

        teamLevel['managers'][record.managerId] = {employees: {}}
    } else {
        divLevel = orgObject['divisions'][record.divisionId];
        if (divLevel['teams'][record.teamId] == undefined) {
            divLevel['teams'][record.teamId] = {managers: {}}
            teamLevel = divLevel['teams'][record.teamId]
            teamLevel['managers'][record.managerId] = {employees: {}}
        } else {
            teamLevel = divLevel['teams'][record.teamId];
            if (teamLevel['managers'][record.managerId] == undefined) {
                teamLevel['managers'][record.managerId] = {employees: {}}
            }
        }
    }
    return teamLevel['managers'][record.managerId]['employees'];
}
//
// Parse every line of data to generate an employee record 
//
function calculateDate(dateStr) {
    const bDate = Date.parse(dateStr);
    const diff_ms = Date.now() - bDate;
    const age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function getRecord(dataValues, dataKeys) {
    const values = dataValues.split(",")

    if (values.length === dataKeys.length) {
        const record = {};
        values.forEach( (value, index) => {
            record[dataKeys[index]] = value;
        });
        record.age = calculateDate(record.birthdate)
        return record;
    }
    return null;
}
//
//  Iterate the batch data and 
//
function processData(data) {
    const buffer = data.split("\n")
    const labels = buffer.shift().split(",") // Take first line with labels

    buffer.forEach( (item) => {
       const record = getRecord(item, labels)

       if (record) {
            dataInfo.push(record)
       
            const ref = updateOrganization(record) // Returns position in the organization object to add employee data
  
            ref[record.employeeId] = 
                    {   id: record.employeeId, 
                        firstName: record.firstName, 
                        lastName: record.lastName, 
                        birthdate: record.birthdate,
                        happiness: record.happiness,
                        income: record.income
                    };
            updateTeamStats(record) // adds the record info to the statistic object
            updateStatistics(record)
       }
    })
 
    

    return buffer.length; // Number of records found and processed
}
//
// API call to load data and process it
//
async function loadBatch(start = 0, end=100) {

    try {
        const res = await axios.get(`/${start}/${end}`)
        return processData(res.data)
    }
    catch (error) {
        throw `Error Loading at index ${loadDataIndex} ${error}`
    }
}
//
// Entry point to read either a batch or all data available
//
async function getData(loadAll=false) {
    let rcvBatchSize = 0

    console.log("REF OBJECT:", refFullObject )
    if (loadAll) {
        while (!endOfData) {
            rcvBatchSize = await loadBatch(loadDataIndex, loadDataIndex + loadBatchSize)

            endOfData = rcvBatchSize < loadBatchSize 
            loadDataIndex += rcvBatchSize
        }

    } else {
        rcvBatchSize = await loadBatch(loadDataIndex, loadDataIndex + loadBatchSize)

        endOfData = rcvBatchSize < loadBatchSize 
        loadDataIndex += rcvBatchSize

    }

    closeStatistics()
    evalTeamStats()
    
    return {orgObject: orgObject, dataInfo: dataInfo, statsInfo: statsInfo, endOfData: endOfData}
}
//
// Save organization JSON file  
//
function saveData() {

    sortStructure(orgObject) // Checks Organization object and keeps it sorted

    const dataStr = JSON.stringify(orgObject);
    // const dataStr = JSON.stringify(dataInfo);
    
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = 'orgObject.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

export  { getData, saveData };