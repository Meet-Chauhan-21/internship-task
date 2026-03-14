import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import './App.css'

// Atom — the source of truth
const countAtom = atom<number>({
  key: 'countAtom',
  default: 0,
})

// Selector — derived state
const doubleCountSelector = selector<number>({
  key: 'doubleCountSelector',
  get: ({ get }) => {
    return get(countAtom) * 2 
  }
})

function Counter() {
  const [count, setCount] = useRecoilState(countAtom)
  const doubleCount = useRecoilValue(doubleCountSelector)

  return (
    <div className="card">
      <h1>Recoil Counter</h1>
      <p>Count: <strong>{count}</strong></p>
      <p>Double (selector): <strong>{doubleCount}</strong></p>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button onClick={() => setCount(c => c - 1)}>-</button>

        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <h2>Simple Recoil Example</h2>
      <Counter />
    </>
  )
}

export default App
