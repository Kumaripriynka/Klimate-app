import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface SearchHistoryItem{
    id:string;
    query:string;
    lat:number;
    lon:number;
    name:string;
    country:string;
    state?:string;
    searchedAt:number;
}

export function useSearchHistory(){
 // Type assertion to tell TypeScript what we're getting from useLocalStorage
 const storage = useLocalStorage<SearchHistoryItem[]>("search-history",[]);
 const history = storage[0]; 
 const setHistory = storage[1]; 

 const queryClient = useQueryClient()

 const historyQuery = useQuery({
    queryKey:["search-history"],
    queryFn : () => history,
    initialData: history,
 });
 const addToHistory = useMutation({
 mutationFn: async(search: Omit<SearchHistoryItem, "id" | "searchedAt">) => {
    const newSearch: SearchHistoryItem = {
     ...search,
     id: `${search.lat}-${search.lon}-${Date.now()}`,
     searchedAt : Date.now(),
    };

    const filteredHistory = history.filter((item: SearchHistoryItem) => !(item.lat === search.lat && item.lon === search.lon));

    const newHistory = [newSearch, ...filteredHistory].slice(0,10);

    setHistory(newHistory);
    return newHistory;
 },
 onSuccess: (newHistory) => {
 queryClient.setQueryData(["search-history"],newHistory)
 }
 });

const clearHistory = useMutation({
   mutationFn : async()=>{
      setHistory([]);
      return([])
   } ,
   onSuccess: () => {
      queryClient.setQueryData(["search-history"],[])
      // queryClient.invalidateQueries({queryKey: ["search-history"]});
      }

});
return{
   history: historyQuery.data??[],
   addToHistory,
   clearHistory,
}
}