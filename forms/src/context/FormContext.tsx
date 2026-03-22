import React, {createContext, useContext, useReducer, ReactNode} from 'react'

type State = {
  step: number
  totalSteps: number
  role: 'seller' | 'buyer' | null
  seller?: { category?: string; subcategory?: string }
  buyerMapping?: { main?: string; sub?: string; secondary?: string }
}

type Action =
  | {type: 'next'}
  | {type: 'back'}
  | {type: 'setStep'; step: number}
  | {type: 'setRole'; role: 'seller' | 'buyer'}
  | {type: 'updateSeller'; payload: Partial<State['seller']>}
  | {type: 'updateBuyer'; payload: Partial<State['buyerMapping']>}

const initialState: State = {
  step: 1,
  totalSteps: 4,
  role: null,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'next':
      return {...state, step: Math.min(state.totalSteps, state.step + 1)}
    case 'back':
      return {...state, step: Math.max(1, state.step - 1)}
    case 'setStep':
      return {...state, step: action.step}
    case 'setRole':
      return {...state, role: action.role}
    case 'updateSeller':
      return {...state, seller: {...(state.seller || {}), ...action.payload}}
    case 'updateBuyer':
      return {...state, buyerMapping: {...(state.buyerMapping || {}), ...action.payload}}
    default:
      return state
  }
}

const FormContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
  next: () => void
  back: () => void
}>({state: initialState, dispatch: () => null, next: () => null, back: () => null})

export function FormProvider({children}: {children: ReactNode}){
  const [state, dispatch] = useReducer(reducer, initialState)
  const next = () => dispatch({type: 'next'})
  const back = () => dispatch({type: 'back'})

  return (
    <FormContext.Provider value={{state, dispatch, next, back}}>
      {children}
    </FormContext.Provider>
  )
}

export function useForm(){
  return useContext(FormContext)
}

export default FormProvider
