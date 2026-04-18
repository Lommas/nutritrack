
import React, { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function App(){
  const [foods,setFoods]=useState([]);
  const [name,setName]=useState('');
  const [cal,setCal]=useState('');
  const [protein,setProtein]=useState('');
  const [weight,setWeight]=useState('94');
  const [goal,setGoal]=useState('88');

  const total = useMemo(()=>foods.reduce((a,f)=>({
    cal:a.cal+Number(f.cal),
    protein:a.protein+Number(f.protein)
  }),{cal:0,protein:0}),[foods]);

  const currentWeight = Number(weight);
  const target = Number(goal);
  const bmr = Math.round(10*currentWeight + 6.25*180 - 5*30 + 5);
  const maintain = Math.round(bmr*1.35);
  const deficit = maintain - 500;

  const addFood=()=>{
    if(!name) return;
    setFoods([{name,cal:Number(cal||0),protein:Number(protein||0)},...foods]);
    setName(''); setCal(''); setProtein('');
  }

  const data = [
    {d:'1',w:currentWeight+1.2},
    {d:'2',w:currentWeight+0.8},
    {d:'3',w:currentWeight+0.5},
    {d:'4',w:currentWeight}
  ];

  return (
    <div style={{fontFamily:'Arial, sans-serif',padding:20,maxWidth:900,margin:'0 auto'}}>
      <h1>NutriTrack v1</h1>
      <p>Простая тестовая версия</p>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
        <Card title="Калории" value={`${total.cal} / ${deficit}`} sub={`Поддержание: ${maintain}`} />
        <Card title="Белок" value={`${total.protein} г`} sub="Цель: 180г" />
        <Card title="Вес" value={`${weight} кг`} sub={`Цель: ${goal} кг`} />
      </div>

      <h2 style={{marginTop:24}}>Настройки</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:10}}>
        <input placeholder="Текущий вес" value={weight} onChange={e=>setWeight(e.target.value)} />
        <input placeholder="Целевой вес" value={goal} onChange={e=>setGoal(e.target.value)} />
      </div>

      <h2 style={{marginTop:24}}>Добавить еду</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:10}}>
        <input placeholder="Название" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Ккал" value={cal} onChange={e=>setCal(e.target.value)} />
        <input placeholder="Белок" value={protein} onChange={e=>setProtein(e.target.value)} />
        <button onClick={addFood}>Добавить</button>
      </div>

      <div style={{marginTop:18}}>
        {foods.map((f,i)=>(
          <div key={i} style={{padding:'8px 0',borderBottom:'1px solid #ddd'}}>
            {f.name} — {f.cal} ккал · {f.protein}г белка
          </div>
        ))}
      </div>

      <h2 style={{marginTop:24}}>Тренд веса</h2>
      <div style={{height:260}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="d"/>
            <YAxis/>
            <Tooltip/>
            <Line type="monotone" dataKey="w" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function Card({title,value,sub}){
  return (
    <div style={{border:'1px solid #ddd',borderRadius:16,padding:16}}>
      <div style={{fontSize:14,color:'#666'}}>{title}</div>
      <div style={{fontSize:28,fontWeight:700,marginTop:6}}>{value}</div>
      <div style={{fontSize:13,color:'#666',marginTop:6}}>{sub}</div>
    </div>
  )
}
