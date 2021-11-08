# SpotQA Full-Stack/Frontend Challenge

## Introduction

Welcome to the challenge for joining SpotQA's product team. By submitting a solution to the 
challenge you will be evaluated for a position as a full-stack/frontend engineer at SpotQA.

In this document you will find two tasks: 
1. The main programming task, which involves some data processing/analysis 
along with a number of additional sub-tasks,
2. A problem-solving task.

## Task 1

### Problem description

An employee survey has been conducted, and you've been asked to create an interface to present
the data and figure out useful insights from it. You are given an API which produces the data 
as a flat CSV for all employees across the company, containing the following columns:

```csv
divisionId, teamId, managerId, employeeId, firstName, lastName, birthdate, happiness, income
```

For example, one record (row) of the CSV file looks like the following:

```csv
1,7,3,24,Jon,Snow,1986-12-26,happy,4200
```

The API produces the data at 100 records maximum at a time, so you need to use multiple 
requests to fetch all data. The API signature is available as:

```
GET http://34.247.184.197:4242/challenge/survey/{start_record}/{end_record}
```

> The record indexes start at "`0`". You can also assume that there are no gaps in the 
data indexes. Your software should automatically detect when all records have been retrieved.

### Objective

Based on the description above, create a simple web application which uses the API, 
and creates an object internally that looks like the following:

```json
{
 "divisions": {
    "#divisionId": {
        "teams": {
            "#teamId": {
                "managers": {
                    "#managerId": {
                        "employees": {
                            "#employeeId": {
                                "id": "#employeeId",
                                "firstName": "Jon",
                                "lastName": "Snow",
                                "birthdate": "1986-12-26",
                                "happiness": "happy",
                                "income": 4200
                            }
                        }
                    }
                }
            }
        }
    }
 }
}
```

Afterwards, provide the following functionality on the UI:
1. List the data on the UI.
2. Provide functionality to sort employees by name (bonus point if you create generic sorting feature). Note that we take efficiency into consideration.
3. Provide functionality to export internal data as JSON with division IDs sorted.
4. Using visualisation (e.g., plotting the data using your favourite library), determine if there is a correlation between employee age, income and happiness.
5. [BONUS] Can you determine which managers have happier teams, and which have sadder teams?
6. [BONUS] can you make the application gradually build the internal dataset, in a sorted manner? (
e.g., receive first 100 records, create the data-structure, then receive second 200 records, sort them, and efficiently merge the two data-structures, and so forth).

### Language/Framework Requirements

Create the web application using the following frameworks:
- [Vue](https://vuejs.org/) for UI management,
    - Note: if you have little/no experience with Vue, that is fine and we do not expect
    you to need more than the basics of the framework to get up and running.
- [Axios](https://github.com/axios/axios) for API communications,
- [Jest](https://facebook.github.io/jest/) for testing (only if you will be doing any testing).

> **Suggestion:** To save time, we recommend you to set up up your environment using the Vue CLI, since it comes with
everything necessary to get up and running (e.g., webpack, hot-reloading, clean structure, etc.).

For the purpose of this challenge, use of jQuery, underscore, and similar libraries is
discouraged (please aim to rely mostly on VanillaJS).

We are also interested to see your use of ES2015+ features, and how you take advantage
of the new powerful features of JavaScript, to create readable and concise code. If you are an active user of TypeScript, you can feel free to implement the whole solution in TypeScript.
