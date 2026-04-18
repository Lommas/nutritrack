
import React, { useMemo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function App(){

  const [foods,setFoods]=useState([])
  const [name,setName]=useState('')
  const [cal,setCal]=useState('')
  const [protein,setProtein]=useState('')

  const [weight,setWeight]=useState(94)
  const [goal,setGoal]=useState(88)

  const total = useMemo(()=>foods.reduce((a,f)=>({
    cal:a.cal+Number(f.cal),
    protein:a.protein+Number(f.protein)
  }),{cal:0,protein:0}),[foods])

  const bmr = Math.round(10*weight + 6.25*180 - 5*30 + 5)
  const maintain = Math.round(bmr*1.35)
  const targetCalories = maintain - 500

  const addFood=()=>{
    if(!name) return
    setFoods([{name,cal:Number(cal||0),protein:Number(protein||0)},...foods])
    setName('');setCal('');setProtein('')
  }

  const extra = Math.max(total.cal - targetCalories,0)
  const stepsToFix = Math.round(extra / (weight*0.53))

  const data = [
    {d:'1',w:weight+1.2},
    {d:'2',w:weight+0.7},
    {d:'3',w:weight+0.3},
    {d:'4',w:weight}
  ]

  return (
    <div style={{fontFamily:'Arial',padding:20,maxWidth:900,margin:'0 auto'}}>

      <h1>NutriTrack V2</h1>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
        <Card title="Калории" value={`${total.cal} / ${targetCalories}`} />
        <Card title="Белок" value={`${total.protein}г`} />
        <Card title="Шаги для дефицита" value={`${stepsToFix} шагов`} />
      </div>

      <h2>Настройки</h2>
      <input value={weight} onChange={e=>setWeight(Number(e.target.value))} placeholder="Вес" />
      <input value={goal} onChange={e=>setGoal(Number(e.target.value))} placeholder="Цель" />

      <h2>Еда</h2>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Еда" />
      <input value={cal} onChange={e=>setCal(e.target.value)} placeholder="Ккал" />
      <input value={protein} onChange={e=>setProtein(e.target.value)} placeholder="Белок" />
      <button onClick={addFood}>Добавить</button>

      <ul>
        {foods.map((f,i)=><li key={i}>{f.name} {f.cal}ккал {f.protein}г</li>)}
      </ul>

      <div style={{height:250}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="d"/>
            <YAxis/>
            <Tooltip/>
            <Line dataKey="w" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}

function Card({title,value}){
  return (
    <div style={{border:'1px solid #ddd',padding:12,borderRadius:12}}>
      <div style={{fontSize:12,color:'#666'}}>{title}</div>
      <div style={{fontSize:20,fontWeight:700}}>{value}</div>
    </div>
  )
}
