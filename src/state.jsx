import create from "zustand"
const useStore = create(set => ({
    userId: '',
    setUserId:(id)=>set(state=>({userId: id})),
    expenditureBreakdown: {},
    setExpenditureBreakdown: (updatedData)=>
        set(_ => ({expenditureBreakdown: updatedData })),
    fetchExpenditureBreakdown: async()=>{
        const response = await fetch("https://api.github.com/search/users?q=john&per_page=5");
        const json = await response.json();
        set({expenditureBreakdown: {
            "totalSpent" : "3,000",
            "today": "200",
            "thisWeek": "500",
            "thisMonth": "1,000",
            "thisYear":"3000",
            "mostSpentOn": "Food",
            "mostSpentDay":"Thursday",
            "leastSpentDay":"Monday"
          }});
    },
    logout : () => {
      set(_ => ({userId: ""}))
    }
  }));
export default useStore;