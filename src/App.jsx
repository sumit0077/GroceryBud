import { useEffect, useState } from "react"

function App() {
  const [groceryList, setGroceryList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    setGroceryList([...groceryList, {
      name: inputValue,
      isCompleted: false,
    }]);
    setInputValue("");
  }
  useEffect(()=>{
    const storedItem = localStorage.getItem("groceryList");
    if(storedItem) {
      const data = localStorage.getItem("groceryList");
      setGroceryList(JSON.parse(data));
    }
     },[])

  useEffect(() => {
    localStorage.setItem("groceryList", JSON.stringify(groceryList))
  },[groceryList])

  return (
    <div className="bg-white text-black">
      <h1 className="font-bold text-3xl text-center mb-4 ">Grocery Bud</h1>
      <div className="border-[rgb(150,150,150)] rounded-md border-[2px] p-[1px] overflow-hidden focus:border-black">
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" className="outline-none px-2 " placeholder="Enter item" />
        <button onClick={addItem} className="bg-blue-500 text-white px-4">Add Item</button>
      </div>
      <div id="DisplayContainer" className="flex flex-col items-center py-4 ">
        {groceryList.length === 0 ? <p>No items added</p> : groceryList.map((item, index) => (
          <span className="flex mb-[10px] items-center" key={index}>
            
            <input type="checkbox" checked={item.isCompleted} onChange={() => {
              const updatedList = [...groceryList];
              updatedList[index].isCompleted = !updatedList[index].isCompleted;
              setGroceryList(updatedList);
            }} />
            <p  className={`w-[180px] ${item.isCompleted ? "line-through" : ""} tracking-wider text-[18px] text-black px-4 `}>{item.name}</p>
            <button className="w-[100px] bg-red-500 text-white px-4 rounded-md" onClick={() => {
              setGroceryList(groceryList.filter((_, i) => i !== index));
            }}>Delete</button>
          </span>
        ))}
      </div>
    </div>
  )
}

export default App
