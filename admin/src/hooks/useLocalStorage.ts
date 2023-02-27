
const useLocalStorage = <T>(key: string) => {
 
    let value = localStorage.getItem(key);
     value = value ? JSON.parse(value) : null;
  
  
  const set = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, set];
}