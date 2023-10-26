import {useEffect, useState} from "react";

// amount=100&from=EUR&to=USD
function CurrencyConverterApp() {

  const baseUrl = `https://api.frankfurter.app/latest?`

  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("KRW")
  const [amount, setAmount] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const [output, setOutput] = useState(null)
  const styles = {fontSize: "29px"}
  const inputStyle = {width: "300px", height: "50px", fontSize: "28px"}
  const selectStyle = {width: "200px", height: "50px", fontSize: "28px"}

  useEffect(() => {
    async function getData() {
      // try, catch로 error 처리 해야함
      setIsLoading(true)
      const res = await fetch(`${baseUrl}amount=${amount}&from=${from}&to=${to}`)
      const data = await res.json()
      setOutput(data.rates[to])
      setIsLoading(false)
    }
    if(from === to) return setOutput(amount)
    getData()
  }, [amount, from, to]);

  return (
       <div style={styles}>
         <input type='number' value={amount} style={inputStyle}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isLoading}
         />
         <select style={selectStyle} value={from} disabled={isLoading}
                 onChange={(e) => setFrom(e.target.value)}>
           <option value="USD">USD(미국)</option>
           <option value="CNY">CNY(중국)</option>
           <option value="KRW">KRW</option>
           <option value="EUR">EUR(유럽)</option>
           <option value="JPY">JPY(일본)</option>
         </select>
         <select style={selectStyle} value={to} disabled={isLoading}
                 onChange={(e) => setTo(e.target.value)}>
           <option value="KRW">KRW</option>
           <option value="USD">USD(미국)</option>
           <option value="CNY">CNY(중국)</option>
           <option value="EUR">EUR(유럽)</option>
           <option value="JPY">JPY(일본)</option>
         </select>
         <div>{output && output.toLocaleString()} {to}</div>
       </div>
  );
}

export default CurrencyConverterApp;