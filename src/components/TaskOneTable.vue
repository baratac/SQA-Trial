<template>

  <div v-if="dataReady" class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-indigo-50">
              <tr>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div class="flex items-center">
                    <p class="text-center">Employee</p>
                    <div class="flex flex-col  w-6 mx-1">
                        <button @click="sortTable('employeeId', 'up')" class="p-1 w-4">
                            <img src="@/assets/chevron-up.svg" class="w-2 h-2" alt=".">
                        </button>
                        <button @click="sortTable('employeeId', 'down')" class="p-1 w-4">
                            <img src="@/assets/chevron-down.svg" class="w-2 h-2" alt=".">
                        </button>
                    </div>
                  </div>
                </th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div class="flex items-center">
                        <p class="text-center">Name</p>
                        <div class="flex flex-col  w-6 mx-1">
                            <button @click="sortTable('employeeName', 'up')" class="p-1 w-4">
                                <img src="@/assets/chevron-up.svg" class="w-2 h-2" alt=".">
                            </button>
                            <button @click="sortTable('employeeName', 'down')" class="p-1 w-4">
                                <img src="@/assets/chevron-down.svg" class="w-2 h-2" alt=".">
                            </button>
                        </div>
                    </div>
                </th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div class="flex items-center">
                        <p class="text-center">Birthdate</p>
                        <div class="flex flex-col  w-6 mx-1">
                            <button @click="sortTable('birthdate', 'up')" class="p-1 w-4">
                                <img src="@/assets/chevron-up.svg" class="w-2 h-2" alt=".">
                            </button>
                            <button @click="sortTable('birthdate', 'down')" class="p-1 w-4">
                                <img src="@/assets/chevron-down.svg" class="w-2 h-2" alt=".">
                            </button>
                        </div>
                    </div>
                </th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div class="flex items-center">
                        <p class="text-center">Happiness</p>
                        <div class="flex flex-col  w-6 mx-1">
                            <button @click="sortTable('happiness', 'up')" class="p-1 w-4">
                                <img src="@/assets/chevron-up.svg" class="w-2 h-2" alt=".">
                            </button>
                            <button @click="sortTable('happiness', 'down')" class="p-1 w-4">
                                <img src="@/assets/chevron-down.svg" class="w-2 h-2" alt=".">
                            </button>
                        </div>
                    </div>
                </th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div class="flex items-center">
                        <p class="text-center">Income</p>
                        <div class="flex flex-col  w-6 mx-1">
                            <button @click="sortTable('income', 'up')" class="p-1 w-4">
                                <img src="@/assets/chevron-up.svg" class="w-2 h-2" alt=".">
                            </button>
                            <button @click="sortTable('income', 'down')" class="p-1 w-4">
                                <img src="@/assets/chevron-down.svg" class="w-2 h-2" alt=".">
                            </button>
                        </div>
                    </div>
                </th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div class="flex items-center">
                        <p class="text-center">Team</p>
                        <div class="flex flex-col  w-6 mx-1">
                            <button @click="sortTable('teamId', 'up')" class="p-1 w-4">
                                <img src="@/assets/chevron-up.svg" class="w-2 h-2" alt=".">
                            </button>
                            <button @click="sortTable('teamId', 'down')" class="p-1 w-4">
                                <img src="@/assets/chevron-down.svg" class="w-2 h-2" alt=".">
                            </button>
                        </div>
                    </div>
                </th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div class="flex items-center">
                        <p class="text-center">Manager</p>
                        <div class="flex flex-col  w-6 mx-1">
                            <button @click="sortTable('managerId', 'up')" class="p-1 w-4">
                                <img src="@/assets/chevron-up.svg" class="w-2 h-2" alt=".">
                            </button>
                            <button @click="sortTable('managerId', 'down')" class="p-1 w-4">
                                <img src="@/assets/chevron-down.svg" class="w-2 h-2" alt=".">
                            </button>
                        </div>
                    </div>
                </th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div class="flex items-center">
                        <p class="text-center">Division</p>
                        <div class="flex flex-col  w-6 mx-1">
                            <button @click="sortTable('divisionId', 'up')" class="p-1 w-4">
                                <img src="@/assets/chevron-up.svg" class="w-2 h-2" alt=".">
                            </button>
                            <button @click="sortTable('divisionId', 'down')" class="p-1 w-4">
                                <img src="@/assets/chevron-down.svg" class="w-2 h-2" alt=".">
                            </button>
                        </div>
                    </div>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="person in dataToShow" :key="person.employeeId">
                <td class="px-4 py-4 whitespace-nowrap">
                      {{person.employeeId}}
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ person.firstName }} {{ person.lastName}}</div>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                    {{person.birthdate}}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{person.happiness}}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{person.income}}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{person.teamId}}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{person.managerId}}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{person.divisionId}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
    import { toRefs } from 'vue'
    export default {
        props: {
            detailInfo: Array,
            dataReady: Boolean
        },
        emits: ['sort-table'],
        setup(props) {
            const {detailInfo: dataToShow} = toRefs(props) 
            return { dataToShow }
        },
        methods: {
            sortTable (key, direction) {
                this.$emit('sort-table', key, direction)
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>
