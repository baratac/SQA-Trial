# SpotQA Full-Stack/Frontend Challenge

## Task1 Description

### Project setup
```
yarn install
```

#### Compiles and hot-reloads for development
```
yarn serve
```

#### Compiles and minifies for production
```
yarn build
```
### Project Dependencies

The project was developed with vue 3 and Nodejs v14.17.0. with following dependencies

* tailwindcss 2.0.2 - A utility-first CSS framework
* postcss 7 - required by tailwindcss
* axios 0.21 - to access the API as required
* chart.js 3.5.1 - used by charkick
* vue-chartkick - graphic library


### Project Description

For this project the bulk of the work to handle the data as required is located in a javascript module **DataManager** that exports 2 functions, one to retrieve the data **getData** and another to save the JSON formatted file _orgObject.json_ **saveData**

The async function **getData** will deliver all required data to the main App.vue, namely
1. Data Array with all the employee records which will be presented in a table
2. Organization Object data
3. Statistics Values Object

#### DataManager Function description

After loading each batch, the data is parsed and each line record is transformed in an object this object will be used to construct the organization structure, and to generated the counters that afterwards will be use to generate statistics, after loading all data requested the statistics are calculated and the data returned to the caller of **getData** function so the process unfolds in three steps with following functions,

* _Gather data_
  1. **getData** entry point, able to load one batch or all the missing data
  1. **loadBatch** handles the API call through **axios** and initiates the data processing in the results
* _Process Data_
  1. **processData** parses the data and manages de results updating the array on employee records and calling all the other functions of this step
  1. **getRecord** receives one string that represents employee record and the labels line and generates an object, adding the age field by calling **calculateDate**
  1. **updateOrganization** using the organization data of each employee record (divisionId/teamId/managerId, employeeId) updates the organization object
  1. **updateTeamStats** collects data of all the teams found aggregating the happiness indicators
  1. **updateSatistics** collects the aggregation values needed to calculate statistics
* _Evaluate Statistics_
  1. **closeStatistics** goes through the data collected and generates the structure required by **vue-chartkick** library to generate the statistics that will allow the correlation of age, income and satisfaction
  1. **evalTeamStats** after analyzing the results will produce the happier team and the sadder with the id of the manager and division

Apart from the main processing there are 2 functions to handle save the organization data, **saveData** will call **sortStructure** that will sort every id that it finds not only the division, also teams, managers and employees, before **saveData** processes the save in itself

#### Vue application

The vue app is deployed with the main **App** which will handle the data and execute the request to load and show data and two components **TaskOneTable** which renders the table with results and **TaskOneStats** that takes care of the rendering of statistics graphs and the facts.

## Conclusion  

I would like to thank the opportunity of this very interesting challenge, as I'm not currently working with Vue although I've done before, it was extra fun and challenging to work it out, give me the chance to learn a lot hope you find it fulfilling.
